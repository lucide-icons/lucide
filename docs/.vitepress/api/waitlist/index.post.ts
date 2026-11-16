import { createError, defineEventHandler, getRequestURL, readBody } from 'h3';
import { checkBotId } from 'botid/server';
import { waitlistProducts } from '../../theme/components/waitlist/products';
import { createConfirmToken } from '../../lib/waitlist/token.ts';
import { sendConfirmationEmail } from '../../lib/waitlist/resend.ts';

const MAX_EMAIL_LENGTH = 254;
const MAX_USE_CASE_LENGTH = 200;
const MAX_SOURCE_LENGTH = 100;
// Deliberately loose: the confirmation email is the real check.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

/**
 * POST /api/waitlist
 *
 * Runs the spam checks and sends a confirmation email with a signed link. Nothing is stored yet:
 * the contact is only created in Resend once the link is clicked (see `confirm.get.ts`).
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown> | undefined>(event).catch(() => undefined);

  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' });
  }

  // Honeypot: people never see this field. Answer as if it worked, so bots learn nothing.
  if (typeof body.website === 'string' && body.website !== '') {
    return { ok: true };
  }

  const verification = await checkBotId({
    advancedOptions: { headers: event.node.req.headers },
  });

  if (verification.isBot) {
    throw createError({ statusCode: 403, statusMessage: 'Access denied' });
  }

  const email = asTrimmedString(body.email, MAX_EMAIL_LENGTH + 1).toLowerCase();
  const product = typeof body.product === 'string' ? body.product : '';

  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' });
  }

  if (!Object.hasOwn(waitlistProducts, product)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown product' });
  }

  const token = createConfirmToken({
    email,
    product,
    useCase: asTrimmedString(body.use_case, MAX_USE_CASE_LENGTH),
    source: asTrimmedString(body.source, MAX_SOURCE_LENGTH),
    signedUpAt: new Date().toISOString(),
  });

  const confirmUrl = new URL('/api/waitlist/confirm', getRequestURL(event).origin);
  confirmUrl.searchParams.set('token', token);

  try {
    await sendConfirmationEmail({
      email,
      productName: waitlistProducts[product].name,
      confirmUrl: confirmUrl.href,
    });
  } catch (error) {
    console.error('[waitlist] Could not send the confirmation email', error);
    throw createError({ statusCode: 502, statusMessage: 'Could not send the confirmation email' });
  }

  return { ok: true };
});
