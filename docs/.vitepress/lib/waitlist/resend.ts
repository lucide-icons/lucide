import React from 'react';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import ConfirmationEmail from './ConfirmationEmail.tsx';
import type { WaitlistSignup } from './token.ts';

const FROM_ADDRESS = 'Lucide <info@lucide.dev>';

function getEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

let client: Resend | undefined;

function getResend() {
  client ??= new Resend(getEnv('RESEND_API_KEY'));
  return client;
}

/** The SDK returns errors instead of throwing, this turns them back into exceptions. */
function unwrap<T>(
  result: { data: T; error: null } | { data: null; error: { name: string; message: string } },
  action: string,
): T {
  if (result.error) {
    throw new Error(`Resend: could not ${action} (${result.error.name}: ${result.error.message})`);
  }

  return result.data;
}

export async function sendConfirmationEmail({
  email,
  productName,
  confirmUrl,
}: {
  email: string;
  productName: string;
  confirmUrl: string;
}) {
  const message = React.createElement(ConfirmationEmail, { productName, confirmUrl });

  const result = await getResend().emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: `Confirm your spot on the ${productName} waitlist`,
    html: await render(message),
    text: await render(message, { plainText: true }),
  });

  unwrap(result, 'send the confirmation email');
}

/** Contact properties only hold one value, so a contact on several waitlists gets a comma-separated list. */
function mergeProducts(existing: string | undefined, product: string) {
  const products = new Set(existing?.split(',').filter(Boolean));
  products.add(product);
  return [...products].join(',');
}

/**
 * Creates the Resend contact for a confirmed signup, or updates it when the email is already a
 * contact (a second product, or a confirmation link clicked twice). Either way the contact ends up
 * in the Waitlist segment and opted in to the Product updates topic.
 *
 * Returns the contact's Resend ID, which the survey uses to link submissions to the contact.
 */
export async function addToWaitlist(signup: WaitlistSignup): Promise<string> {
  const resend = getResend();
  const segmentId = getEnv('RESEND_WAITLIST_SEGMENT_ID');
  const topicId = getEnv('RESEND_PRODUCT_UPDATES_TOPIC_ID');

  const existing = await resend.contacts.get({ email: signup.email });

  if (existing.error && existing.error.name !== 'not_found') {
    unwrap(existing, 'look up the contact');
  }

  if (!existing.data) {
    const created = await resend.contacts.create({
      email: signup.email,
      properties: {
        product: signup.product,
        use_case: signup.useCase || null,
        source: signup.source || null,
        signed_up_at: signup.signedUpAt,
      },
      segments: [{ id: segmentId }],
      topics: [{ id: topicId, subscription: 'opt_in' }],
    });

    return unwrap(created, 'create the contact').id;
  }

  const current = existing.data.properties ?? {};
  const currentValue = (key: string) => {
    const value = current[key]?.value;
    return value == null || value === '' ? undefined : String(value);
  };

  const updated = await resend.contacts.update({
    email: signup.email,
    // Clicking the confirmation link is a fresh opt-in, even after an earlier unsubscribe.
    unsubscribed: false,
    properties: {
      product: mergeProducts(currentValue('product'), signup.product),
      use_case: signup.useCase || currentValue('use_case') || null,
      source: currentValue('source') ?? (signup.source || null),
      signed_up_at: currentValue('signed_up_at') ?? signup.signedUpAt,
    },
  });
  unwrap(updated, 'update the contact');

  unwrap(
    await resend.contacts.segments.add({ email: signup.email, segmentId }),
    'add the contact to the Waitlist segment',
  );
  unwrap(
    await resend.contacts.topics.update({
      email: signup.email,
      topics: [{ id: topicId, subscription: 'opt_in' }],
    }),
    'opt the contact in to Product updates',
  );

  return existing.data.id;
}
