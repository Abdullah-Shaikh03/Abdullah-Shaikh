"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Brain, Cloud, Users, Database, Newspaper } from "lucide-react";

const features = [
  {
    icon: <Code2 className="h-10 w-10 text-primary" />,
    title: "Full Stack Development",
    description:
      "Experienced with React.js, Next.js, Flask, Express.js, and MERN stack applications",
  },
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: "AI & Machine Learning",
    description:
      "Hands-on with PyTorch, TensorFlow, Scikit-Learn; built ML models for sentiment analysis, recommendations, and sports analytics",
  },
  {
    icon: <Cloud className="h-10 w-10 text-primary" />,
    title: "Cloud & DevOps",
    description:
      "Proficient in AWS (EC2, S3, RDS, DynamoDB), GitHub Actions CI/CD, and scalable deployments on Vercel & Azure",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Freelance & Team Collaboration",
    description:
      "Delivered production-ready solutions for international clients; collaborated with IEEE & QuickSO teams to ship impactful products",
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "Database Management",
    description:
      "Skilled in SQL, MongoDB, and data modeling; designed efficient databases for web applications and ML models",
  },
  {
    icon: <Newspaper className="h-10 w-10 text-primary" />,
    title: "Technical Writing",
    description:
      "Authored research papers and articles on AI/ML topics;",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, when: "beforeChildren" },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function About() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 px-4 glass rounded-2xl border-primary border-2 backdrop-blur-3xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">About</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Full-Stack Software Engineer and AI/ML enthusiast with 2+ years of
          experience building scalable web apps, deploying ML models, and
          consulting for international clients.
        </p>
        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
          Skilled in designing performant, secure, and production-ready systems
          using React, Next.js, Flask, Express.js, and AWS. Background in AI/ML
          with research in computer vision for healthcare and applied projects
          like real-time offside detection (VAR) and recommendation systems.
          Comfortable working solo as a freelance consultant and with
          cross-functional teams to deliver high-impact solutions.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        variants={container}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full glass border-primary border-2">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
