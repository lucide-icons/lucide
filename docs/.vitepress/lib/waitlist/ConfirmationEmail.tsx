import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface ConfirmationEmailProps {
  productName: string;
  confirmUrl: string;
}

const colors = {
  text: '#1f2328',
  muted: '#59636e',
  border: '#e5e7eb',
  accent: '#f56565',
};

const styles = {
  body: {
    margin: 0,
    padding: '32px 0',
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: colors.text,
  },
  container: { maxWidth: '480px', margin: '0 auto', padding: '0 24px' },
  heading: { fontSize: '22px', lineHeight: '30px', fontWeight: 600, margin: '0 0 16px' },
  text: { fontSize: '15px', lineHeight: '24px', margin: '0 0 16px' },
  button: {
    display: 'inline-block',
    padding: '12px 20px',
    borderRadius: '8px',
    backgroundColor: colors.accent,
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    textDecoration: 'none',
  },
  link: { color: colors.muted, wordBreak: 'break-all' as const },
  hr: { borderColor: colors.border, margin: '32px 0 16px' },
  footer: { fontSize: '12px', lineHeight: '18px', color: colors.muted, margin: 0 },
};

export default function ConfirmationEmail({ productName, confirmUrl }: ConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Confirm your email to join the {productName} waitlist.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Confirm your spot on the waitlist</Heading>
          <Text style={styles.text}>
            Thanks for your interest in {productName}. Click the button below to confirm your
            email, and we'll send you launch updates for {productName} only.
          </Text>
          <Button
            href={confirmUrl}
            style={styles.button}
          >
            Confirm my email
          </Button>
          <Text style={{ ...styles.text, marginTop: '24px', color: colors.muted }}>
            Or paste this link into your browser:{' '}
            <Link
              href={confirmUrl}
              style={styles.link}
            >
              {confirmUrl}
            </Link>
          </Text>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            The link expires in 7 days. If you didn't sign up, ignore this email and you won't
            hear from us again.{' '}
            <Link
              href="https://lucide.dev/privacy"
              style={{ color: colors.muted }}
            >
              Privacy statement
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
