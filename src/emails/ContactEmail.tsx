  // emails/ContactEmail.tsx
  import {
    Html,
    Head,
    Body,
    Container,
    Text,
    Section,
  } from '@react-email/components';

  type ContactEmailProps = {
    name: string;
    email: string;
    subject: string;
    message: string;
  };

  export default function ContactEmail({
    name,
    email,
    subject,
    message,
  }: ContactEmailProps) {
    return (
      <Html>
        <Head />
        <Body style={{ backgroundColor: '#f9f9f9', fontFamily: 'Arial' }}>
          <Container style={{ padding: '20px' }}>
            <Section>
              <Text>
                <strong>Name:</strong> {name}
              </Text>
              <Text>
                <strong>Email:</strong> {email}
              </Text>
              <Text>
                <strong>Subject:</strong> {subject}
              </Text>
              <Text>
                <strong>Message:</strong>
                <br />
                {message}
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
