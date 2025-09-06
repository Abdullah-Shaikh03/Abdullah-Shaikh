// emails/ContactMessageEmail.tsx
import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type ContactMessageEmailProps = {
  name: string;
  senderEmail: string;
  subject: string;
  message: string;
  ip?: string;
  submittedAt?: Date | string;
  siteUrl?: string;
  brandName?: string;
};

export default function ContactMessageEmail({
  name,
  senderEmail,
  subject,
  message,
  ip = "unknown",
  submittedAt = new Date().toISOString(),
  siteUrl = "",
  brandName = "Portfolio",
}: ContactMessageEmailProps) {
  // normalize submittedAt to a Date and handle invalid dates
  const dateObj = new Date(submittedAt as string | number);
  const prettyDate = isNaN(dateObj.getTime())
    ? "Unknown"
    : dateObj.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });

  return (
    <Html>
      <Head />
      <Preview>
        New {brandName} contact message from {name} — “{subject}”
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.card}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.brand}>{brandName}</Text>
            <Text style={styles.kicker}>New contact message</Text>
          </Section>

          {/* Meta info */}
          <Section style={styles.metaRow}>
            <Text style={styles.metaLabel}>From</Text>
            <Text style={styles.metaValue}>
              {name} <Text style={styles.muted}>&lt;{senderEmail}&gt;</Text>
            </Text>
          </Section>
          <Section style={styles.metaRow}>
            <Text style={styles.metaLabel}>Subject</Text>
            <Text style={styles.metaValue}>{subject}</Text>
          </Section>
          <Section style={styles.metaRow}>
            <Text style={styles.metaLabel}>Received</Text>
            <Text style={styles.metaValue}>{prettyDate}</Text>
          </Section>
          <Section style={styles.metaRow}>
            <Text style={styles.metaLabel}>IP</Text>
            <Text style={styles.metaValue}>{ip}</Text>
          </Section>

          <Hr style={styles.hr} />

          {/* Message */}
          <Section>
            <Text style={styles.blockLabel}>Message</Text>
            {/* Use Text with pre-wrap to preserve line breaks but avoid raw <pre> */}
            <Text style={{ ...styles.message, display: "block", whiteSpace: "pre-wrap" }}>
              {message}
            </Text>
          </Section>

          <Hr style={styles.hr} />

          {/* Actions */}
          <Section style={styles.footerRow}>
            <Link href={`mailto:${senderEmail}`} style={styles.button}>
              Reply to {name.split(" ")[0] || "sender"}
            </Link>
            {siteUrl ? (
              <Link href={siteUrl} style={styles.secondaryLink}>
                View submission on site ↗
              </Link>
            ) : null}
          </Section>

          {/* Footer */}
          <Section>
            <Text style={styles.footerText}>
              You’re receiving this because someone used the contact form on{" "}
              {siteUrl || brandName}.
            </Text>
            <Text style={{ ...styles.footerText, marginTop: 0 }}>
              If this looks like spam, consider enabling CAPTCHA or a honeypot.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#0b1020",
    margin: 0,
    padding: "24px",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  card: {
    maxWidth: "640px",
    margin: "0 auto",
    background: "#0f172a",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
    overflow: "hidden",
    color: "#e5e7eb",
  },
  header: {
    background:
      "linear-gradient(135deg, rgba(99,102,241,0.22), rgba(16,185,129,0.22))",
    padding: "20px 24px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  brand: {
    margin: 0,
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#a5b4fc",
    fontWeight: 700,
  },
  kicker: {
    margin: "4px 0 0",
    fontSize: 18,
    color: "#e9ffe7",
  },
  metaRow: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    gap: "8px 16px",
    padding: "12px 24px",
  },
  metaLabel: {
    color: "#9ca3af",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  metaValue: {
    color: "#e5e7eb",
    fontSize: 14,
  },
  muted: {
    color: "#9aa2b1",
  },
  hr: {
    border: "none",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    margin: "8px 24px",
  },
  blockLabel: {
    color: "#9ca3af",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    margin: "8px 24px",
  },
  message: {
    margin: "4px 24px 16px",
    padding: "16px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 14,
    lineHeight: 1.6,
    color: "#f3f4f6",
  },
  footerRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "8px 24px 16px",
  },
  button: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 10,
    background: "linear-gradient(135deg, #6366f1, #10b981)",
    color: "#0b1020",
    textDecoration: "none",
    fontWeight: 700,
  },
  secondaryLink: {
    display: "inline-block",
    textDecoration: "none",
    color: "#a5b4fc",
  },
  footerText: {
    color: "#9aa2b1",
    fontSize: 12,
    padding: "0 24px 12px",
  },
};
