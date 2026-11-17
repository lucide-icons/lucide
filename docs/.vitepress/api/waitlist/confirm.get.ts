import { defineEventHandler, getQuery, sendRedirect } from 'h3';
import { waitlistProducts } from '../../theme/components/waitlist/products';
import {
  verifyConfirmToken,
  type VerifyResult,
  type WaitlistSignup,
} from '../../lib/waitlist/token.ts';
import { addToWaitlist } from '../../lib/waitlist/resend.ts';

const CONFIRMED_PAGE = '/waitlist/confirmed';

function confirmedPageUrl(
  product: string | undefined,
  status?: 'invalid' | 'error',
  confirmed?: { signup: WaitlistSignup; contactId: string },
) {
  const params = new URLSearchParams();

  if (product && Object.hasOwn(waitlistProducts, product)) {
    params.set('product', product);
  }

  if (status) {
    params.set('status', status);
  }

  // Hidden fields for the survey. The Resend contact ID links a submission to the contact
  // without putting the email address in the URL.
  if (confirmed) {
    params.set('contactId', confirmed.contactId);
    if (confirmed.signup.useCase) params.set('use-case', confirmed.signup.useCase);
  }

  const query = params.toString();
  return query ? `${CONFIRMED_PAGE}?${query}` : CONFIRMED_PAGE;
}

/**
 * GET /api/waitlist/confirm?token=…
 *
 * The link from the confirmation email. Verifies the signed token, creates the Resend contact
 * in the Waitlist segment, then redirects to the confirmed page. The page shows the thank-you
 * survey when only `product` is set, and the expired state when `status` is set.
 */
export default defineEventHandler(async (event) => {
  const { token } = getQuery(event);
  const result: VerifyResult =
    typeof token === 'string' ? verifyConfirmToken(token) : { valid: false };

  // `in` narrows the union even without `strictNullChecks`, unlike checking `result.valid`.
  if (!('signup' in result)) {
    return sendRedirect(event, confirmedPageUrl(result.product, 'invalid'), 302);
  }

  const { signup } = result;

  if (!Object.hasOwn(waitlistProducts, signup.product)) {
    return sendRedirect(event, confirmedPageUrl(undefined, 'invalid'), 302);
  }

  let contactId: string;
  try {
    contactId = await addToWaitlist(signup);
  } catch (error) {
    console.error('[waitlist] Could not add the contact to the waitlist', error);
    return sendRedirect(event, confirmedPageUrl(signup.product, 'error'), 302);
  }

  return sendRedirect(event, confirmedPageUrl(signup.product, undefined, { signup, contactId }), 302);
});
