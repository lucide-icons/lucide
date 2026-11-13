import { Resend } from 'resend';
import type { WaitlistProduct } from '../../theme/components/waitlist/products';
import type { WaitlistTokenPayload } from './token';

const DEFAULT_FROM = 'Lucide <info@lucide.dev>';

let client: Resend | undefined;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }

  client ??= new Resend(apiKey);

  return client;
}

/** The site the confirmation link and redirects point to. */
export function getSiteUrl() {
  return (process.env.WAITLIST_SITE_URL ?? 'https://lucide.dev').replace(/\/$/, '');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendConfirmationEmail({
  email,
  product,
  confirmUrl,
}: {
  email: string;
  product: WaitlistProduct;
  confirmUrl: string;
}) {
  const name = escapeHtml(product.name);
  const url = escapeHtml(confirmUrl);

  const { error } = await getResend().emails.send({
    from: process.env.WAITLIST_FROM ?? DEFAULT_FROM,
    to: email,
    subject: `Confirm your spot on the ${product.name} waitlist`,
    text: [
      `Thanks for your interest in ${product.name}.`,
      '',
      'Confirm your email to join the waitlist:',
      confirmUrl,
      '',
      "The link is valid for 7 days. If you didn't sign up, ignore this email and nothing happens.",
      '',
      'Lucide',
    ].join('\n'),
    html: `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f6f6f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1f1f1f;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;">
      <tr>
        <td style="padding:32px;">
          <h1 style="margin:0 0 16px;font-size:20px;line-height:28px;">Confirm your spot on the ${name} waitlist</h1>
          <p style="margin:0 0 24px;font-size:15px;line-height:24px;">Thanks for your interest in ${name}. Click the button to confirm your email and join the waitlist.</p>
          <a href="${url}" style="display:inline-block;padding:12px 20px;background:#f56565;color:#fff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">Confirm my email</a>
          <p style="margin:24px 0 0;font-size:13px;line-height:20px;color:#6b6b6b;">The link is valid for 7 days. If you didn't sign up, ignore this email and nothing happens.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  });

  if (error) {
    throw new Error(`Resend could not send the confirmation email: ${error.message}`);
  }
}

/**
 * Creates the contact, or updates it when the email is already a contact, and adds it to
 * the waitlist segment and the product updates topic.
 */
export async function upsertWaitlistContact(signup: WaitlistTokenPayload) {
  const resend = getResend();
  const segmentId = process.env.RESEND_WAITLIST_SEGMENT_ID;
  const topicId = process.env.RESEND_PRODUCT_UPDATES_TOPIC_ID;

  const properties = {
    product: signup.product,
    use_case: signup.use_case || null,
    source: 'lucide.dev',
    signed_up_at: signup.signed_up_at,
  };

  const created = await resend.contacts.create({
    email: signup.email,
    unsubscribed: false,
    properties,
    segments: segmentId ? [{ id: segmentId }] : undefined,
    topics: topicId ? [{ id: topicId, subscription: 'opt_in' }] : undefined,
  });

  if (!created.error) return;

  // Most likely the contact already exists, e.g. someone who confirmed twice.
  const updated = await resend.contacts.update({
    email: signup.email,
    unsubscribed: false,
    properties,
  });

  if (updated.error) {
    throw new Error(
      `Resend could not create or update the contact: ${created.error.message} / ${updated.error.message}`,
    );
  }

  // Adding to a segment or topic the contact is already in is harmless, so errors are only logged.
  if (segmentId) {
    const { error } = await resend.contacts.segments.add({ email: signup.email, segmentId });
    if (error) console.warn('[waitlist] Could not add contact to segment:', error.message);
  }

  if (topicId) {
    const { error } = await resend.contacts.topics.update({
      email: signup.email,
      topics: [{ id: topicId, subscription: 'opt_in' }],
    });
    if (error) console.warn('[waitlist] Could not subscribe contact to topic:', error.message);
  }
}
