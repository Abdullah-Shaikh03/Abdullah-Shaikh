"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email",
      value: "abdullah.sk0517@gmail.com",
      link: "mailto:abdullah.sk0517@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Location",
      value: "Mumbai, India",
      link: "https://maps.google.com/?q=Mumbai,India",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone",
      value: "Available on request",
      link: null,
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;
    const formData = {
      name: (target.elements.namedItem("name") as HTMLInputElement)?.value || "",
      email: (target.elements.namedItem("email") as HTMLInputElement)?.value || "",
      subject: (target.elements.namedItem("subject") as HTMLInputElement)?.value || "",
      message: (target.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
    };

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setIsSubmitted(true);
        target.reset(); // clear form after submit
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <section id="contact" className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get In Touch
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or want to discuss opportunities? I'd
                love to hear from you!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 p-8 bg-accent-foreground/60 rounded-4xl glass">
              <div className="lg:col-span-2">
                <Card className="">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" name="name" placeholder="Your name" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" name="email" type="email" placeholder="Your email" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" name="subject" placeholder="Subject of your message" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea id="message" name="message" placeholder="Your message" className="min-h-[150px]" required />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>

                      {isSubmitted && (
                        <p className="text-green-600 text-center mt-2">Message sent successfully!</p>
                      )}
                      {error && (
                        <p className="text-red-600 text-center mt-2">{error}</p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">{info.icon}</div>
                      <div>
                        <h3 className="font-medium">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target={info.title === "Location" ? "_blank" : undefined}
                            rel={info.title === "Location" ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
