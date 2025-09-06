
"use client";

import React from "react";
import {
  Brain,
  StoreIcon,
  GlobeIcon,
  GaugeIcon,
  LightbulbIcon,
  Infinity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ServiceModals from "@/components/ServiceModals";

type Service = {
  title: string;
  desc: string[] | string;
  icon: React.ReactNode;
  alt?: string;
};

const VISIBLE_COUNT = 3;

const Page = () => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedService, setSelectedService] = React.useState<string | null>(
    null
  );

  const services = React.useMemo<Service[]>(
    () => [
      {
        title: "Custom Web Site",
        desc: [
          "I create custom websites tailored to your business needs, ensuring a unique online presence that stands out.",
          "I use modern technologies and design to create websites that are both functional and visually appealing.",
          "Websites are optimized for performance, SEO, and responsiveness across devices.",
          "I work closely with you so the site reflects your brand and business goals.",
        ],
        icon: <GlobeIcon className="h-6 w-6" />,
        alt: "Globe icon",
      },
      {
        title: "E-commerce Platforms",
        desc: [
          "Fast, secure e-commerce stores (Next.js + PostgreSQL) with payment integration.",
          "Custom product catalogs, user accounts, and order management tailored to you.",
          "Scalable solutions built to grow with your business for a seamless shopping experience.",
          "Integration with payment gateways and shipping providers to streamline operations.",
        ],
        icon: <StoreIcon className="h-6 w-6" />,
        alt: "Storefront icon",
      },
      {
        title: "AI / ML Integration",
        desc: [
          "Deploy ML models (PyTorch / TensorFlow) to production APIs with inference endpoints.",
          "Integrate AI features like chatbots, recommendation engines, and image recognition.",
          "Build realtime pipelines and monitor model performance in production.",
          "Provide ongoing support to optimize inference latency and cost.",
        ],
        icon: <Brain className="h-6 w-6" />,
        alt: "AI brain icon",
      },
      {
        title: "Performance & SEO",
        desc: [
          "Optimize performance (code-splitting, caching) and accessibility to improve UX.",
          "Perform comprehensive audits and implement best practices for SEO and speed.",
          "Mobile optimization and progressive enhancement to reach more users.",
          "Ongoing monitoring and tuning to maintain top performance and rankings.",
        ],
        icon: <GaugeIcon className="h-6 w-6" />,
        alt: "Speedometer icon",
      },
      {
        title: "DevOps & CI/CD",
        desc: [
          "Set up CI/CD pipelines, infra (AWS EC2, S3, RDS) and monitoring for reliable deployments.",
          "Implement Infrastructure as Code (Terraform / CloudFormation) for repeatable infra.",
          "Monitor app & infra health with CloudWatch / Prometheus and alerting strategies.",
          "Ensure high availability, backups, and disaster recovery plans.",
          "Automate deployments with GitHub Actions, Jenkins, or other tooling.",
          "Collaborate with teams to streamline release processes and rollback strategies.",
        ],
        icon: <Infinity className="h-6 w-6" />,
        alt: "DevOps icon",
      },
      {
        title: "MVP & Consulting",
        desc: [
          "Rapid prototyping — from idea to MVP with user-focused iteration and analytics.",
          "Validate ideas quickly, build the MVP, and iterate based on customer feedback.",
          "Advice on architecture, tooling, and scaling strategies.",
          "Work closely with stakeholders to align product roadmap and technical execution.",
        ],
        icon: <LightbulbIcon className="h-6 w-6" />,
        alt: "Lightbulb icon",
      },
    ],
    []
  );

  // number of possible carousel positions (when showing VISIBLE_COUNT cards at once)
  const maxStartIndex = Math.max(0, services.length - VISIBLE_COUNT);

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxStartIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const visibleServices = services.slice(
    currentIndex,
    currentIndex + VISIBLE_COUNT
  );

  const openQuoteFor = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <>
      <section id="services" className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Services
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I offer a wide range of services to help you achieve your
                business goals!
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="Previous services"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex gap-6 overflow-hidden px-12">
                {visibleServices.map((service, index) => (
                  <div
                    key={currentIndex + index}
                    className="glass rounded-2xl ease-in duration-200 flex-1 min-w-0"
                  >
                    <Card className="overflow-hidden h-full flex flex-col">
                      <CardContent className="flex-1 flex flex-col p-6">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-xl flex items-center font-bold">
                            <span className="text-primary flex items-center">
                              {service.icon}
                            </span>
                            <span className="ml-3">{service.title}</span>
                          </CardTitle>
                        </CardHeader>

                        <CardDescription className="text-sm text-muted-foreground flex-1 leading-relaxed">
                          {Array.isArray(service.desc) ? (
                            <ul className="list-disc list-inside space-y-2 pl-1">
                              {service.desc.map((point, i) => (
                                <li key={i} className="text-sm">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>{service.desc}</p>
                          )}
                        </CardDescription>

                        <CardFooter className="mt-6 pt-4">
                          <CardAction className="w-full">
                            <Button
                              onClick={() => openQuoteFor(service.title)}
                              className="w-full"
                            >
                              Get A Quote
                            </Button>
                          </CardAction>
                        </CardFooter>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={nextSlide}
                disabled={currentIndex >= maxStartIndex}
                aria-label="Next services"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Carousel indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: maxStartIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? "bg-primary" : "bg-muted"}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controlled modal instance (pre-fills selectedService) */}
      <ServiceModals
        open={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
        defaultService={selectedService ?? undefined}
      />
    </>
  );
};

export default Page;
