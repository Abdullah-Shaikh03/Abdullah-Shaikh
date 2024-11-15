import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "John Doe is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function Projects() {
  return (
    <div className="flex items-center justify-center mt-4 font-f1 mb-8">
      <div className="z-10 bg-primary-foreground/10 border-2 rounded-3xl" >
        <Container>
          <span className="text-4xl">✉️</span>
          <Heading className="text-primary-foreground mb-2 font-f2 font-extralight">Contact Me</Heading>
          <Paragraph className="mb-10 max-w-xl font-f1">
            Reach out to me over email or fill up this contact form. I will get
            back to you ASAP - I promise.{" "}
          </Paragraph>
          <Contact />
        </Container>
      </div>
      
    </div>
  );
}
