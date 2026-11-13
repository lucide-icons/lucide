import { createError, defineEventHandler, readBody, setResponseStatus } from 'h3';
import { checkBotId } from 'botid/server';
import { waitlistProducts } from '../../theme/components/waitlist/products';
import { createWaitlistToken } from '../../lib/waitlist/token';
import { getSiteUrl, sendConfirmationEmail } from '../../lib/waitlist/resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_USE_CASE_LENGTH = 200;

/**
 * Step 1 of the double opt-in: runs the spam checks and emails a signed confirmation link.
 * Nothing is stored until `/api/waitlist/confirm` is opened from that email.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown> | null>(event).catch(() => null);

  // Honeypot: people never see this field. Answer as if it worked so bots don't adapt.
  if (body?.website) {
    setResponseStatus(event, 202);
    return { ok: true };
  }

  const verification = await checkBotId({
    advancedOptions: { headers: event.node.req.headers },
  });

  if (verification.isBot) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const product = typeof body?.product === 'string' ? body.product : '';
  const useCase =
    typeof body?.use_case === 'string' ? body.use_case.trim().slice(0, MAX_USE_CASE_LENGTH) : '';

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' });
  }

  if (!Object.hasOwn(waitlistProducts, product)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown product' });
  }

  const token = createWaitlistToken({
    email,
    product,
    use_case: useCase,
    signed_up_at: new Date().toISOString(),
  });

  const confirmUrl = `${getSiteUrl()}/api/waitlist/confirm?token=${encodeURIComponent(token)}`;

  try {
    await sendConfirmationEmail({ email, product: waitlistProducts[product], confirmUrl });
  } catch (error) {
    console.error('[waitlist]', error);
    throw createError({ statusCode: 502, statusMessage: 'Could not send confirmation email' });
  }

  setResponseStatus(event, 202);
  return { ok: true };
});
