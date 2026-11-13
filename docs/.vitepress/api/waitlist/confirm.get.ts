import { defineEventHandler, getQuery, sendRedirect } from 'h3';
import { waitlistProducts } from '../../theme/components/waitlist/products';
import { verifyWaitlistToken } from '../../lib/waitlist/token';
import { getSiteUrl, upsertWaitlistContact } from '../../lib/waitlist/resend';

/**
 * Step 2 of the double opt-in, opened from the confirmation email. Only here does the
 * signup become a Resend contact. Redirects to `/waitlist/confirmed`, which shows the
 * result and the follow-up survey.
 */
export default defineEventHandler(async (event) => {
  const { token } = getQuery(event);
  const confirmedPage = `${getSiteUrl()}/waitlist/confirmed`;
  const signup = typeof token === 'string' ? verifyWaitlistToken(token) : null;

  if (!signup || !Object.hasOwn(waitlistProducts, signup.product)) {
    return sendRedirect(event, `${confirmedPage}?status=invalid`, 302);
  }

  const product = encodeURIComponent(signup.product);

  try {
    await upsertWaitlistContact(signup);
  } catch (error) {
    console.error('[waitlist]', error);
    return sendRedirect(event, `${confirmedPage}?product=${product}&status=error`, 302);
  }

  return sendRedirect(event, `${confirmedPage}?product=${product}`, 302);
});
