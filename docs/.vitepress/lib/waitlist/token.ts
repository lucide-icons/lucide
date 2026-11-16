import { createHmac, timingSafeEqual } from 'node:crypto';

/** How long a confirmation link stays valid. */
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface WaitlistSignup {
  email: string;
  product: string;
  useCase: string;
  source: string;
  /** ISO date of the form submission, stored on the contact as `signed_up_at`. */
  signedUpAt: string;
}

interface TokenPayload extends WaitlistSignup {
  /** Expiry as a Unix timestamp in milliseconds. */
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
 * Packs the signup into a signed token for the confirmation link, so no pending signups
 * need to be stored. Format: `<base64url JSON payload>.<base64url HMAC-SHA256>`.
 */
export function createConfirmToken(signup: WaitlistSignup) {
  const payload: TokenPayload = { ...signup, exp: Date.now() + TOKEN_TTL_MS };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');

  return `${data}.${sign(data)}`;
}

function decodePayload(data: string): Partial<TokenPayload> | undefined {
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    return payload && typeof payload === 'object' ? payload : undefined;
  } catch {
    return undefined;
  }
}

export type VerifyResult =
  | { valid: true; signup: WaitlistSignup }
  /** `product` is only set when the token was signed by us, so it is safe to redirect with. */
  | { valid: false; product?: string };

/**
 * Checks the signature and expiry of a confirmation token.
 */
export function verifyConfirmToken(token: string): VerifyResult {
  const [data, signature, ...rest] = token.split('.');

  if (!data || !signature || rest.length) {
    return { valid: false };
  }

  const expected = Buffer.from(sign(data));
  const actual = Buffer.from(signature);

  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    return { valid: false };
  }

  const payload = decodePayload(data);

  if (
    typeof payload?.email !== 'string' ||
    typeof payload.product !== 'string' ||
    typeof payload.exp !== 'number'
  ) {
    return { valid: false };
  }

  if (payload.exp < Date.now()) {
    return { valid: false, product: payload.product };
  }

  return {
    valid: true,
    signup: {
      email: payload.email,
      product: payload.product,
      useCase: payload.useCase ?? '',
      source: payload.source ?? '',
      signedUpAt: payload.signedUpAt ?? new Date().toISOString(),
    },
  };
}
