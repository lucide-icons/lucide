import { createHmac, timingSafeEqual } from 'node:crypto';

/** How long a confirmation link stays valid. */
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface WaitlistTokenPayload {
  email: string;
  product: string;
  use_case: string;
  /** When the form was submitted, as an ISO string. */
  signed_up_at: string;
  /** Expiry, in milliseconds since the epoch. */
  exp: number;
}

function getSecret() {
  const secret = process.env.WAITLIST_TOKEN_SECRET;

  if (!secret) {
    throw new Error('WAITLIST_TOKEN_SECRET is not set');
  }

  return secret;
}

function sign(data: string) {
  return createHmac('sha256', getSecret()).update(data).digest('base64url');
}

/**
 * Signs the signup into the confirmation link itself, so nothing has to be stored
 * until the person confirms.
 */
export function createWaitlistToken(payload: Omit<WaitlistTokenPayload, 'exp'>) {
  const data = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + TOKEN_TTL_MS })).toString(
    'base64url',
  );

  return `${data}.${sign(data)}`;
}

/**
 * Returns the payload when the signature matches and the token hasn't expired.
 */
export function verifyWaitlistToken(token: string): WaitlistTokenPayload | null {
  const [data, signature, ...rest] = token.split('.');

  if (!data || !signature || rest.length) return null;

  const expected = Buffer.from(sign(data));
  const received = Buffer.from(signature);

  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf-8'));

    if (
      typeof payload?.email !== 'string' ||
      typeof payload?.product !== 'string' ||
      typeof payload?.exp !== 'number' ||
      payload.exp < Date.now()
    ) {
      return null;
    }

    return {
      email: payload.email,
      product: payload.product,
      use_case: typeof payload.use_case === 'string' ? payload.use_case : '',
      signed_up_at:
        typeof payload.signed_up_at === 'string' ? payload.signed_up_at : new Date().toISOString(),
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}
