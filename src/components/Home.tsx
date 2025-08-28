"use client";
import Link from "next/link";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  ArrowDownNarrowWideIcon,
} from "lucide-react";
import About from "./about";




const Page = () => {
  const downloadResume = () => {
    const resumeUrl =
      "https://abdullahs-portfolio-img.s3.ap-south-1.amazonaws.com/certificates/AbdullahShaikh.pdf"; // Replace with your resume file path
    window.open(resumeUrl, "_blank");
  };
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="min-h-screen">
      {/* Landing */}
      <motion.section
        style={{ opacity, scale }}
        className="h-screen flex flex-col items-center justify-center text-center px-4 relative"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.7, 1, 0.72, 1], delay: 0.0 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 space-x-8"
        >
          <span>Hi! I&apos;m</span>
          <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent font-extrabold">
            Abdullah Shaikh
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-primary text-sm sm:text-base md:text-xl font-semibold max-w-2xl "
        >
          Full-Stack Software Engineer | Artificial Intelligence and Machine
          Learning Specialist
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 space-x-4 flex flex-col space-y-4"
        >
          <motion.div className="mt-8 space-x-4 flex">
            <Button
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 hover:bg-transparent border-2 border-primary hover:text-primary text-foreground"
            >
              <Link href={"/projects"}>Explore My Work</Link>
            </Button>
            <Button
              size={"lg"}
              className="text-base sm:text-lg px-6 sm:px-8 cursor-pointer bg-transparent border-2 border-primary text-primary hover:text-foreground"
              onClick={downloadResume}
            >
              <ArrowDownNarrowWideIcon size={20} />
              Resume
            </Button>
          </motion.div>
          <motion.div>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/maskeynihal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://www.linkedin.com/in/abdullah-shaikh-8984b9204/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:abdullah.sk0517@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 "
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
        <motion.div className="flex gap-4 mt-6"></motion.div>
      </motion.section>
      {/* About */}
      <motion.section>
        <About />
      </motion.section>
      {/* Experiences */}
      <motion.section></motion.section>
      {/* Education */}
      <motion.section></motion.section>
      {/* Skills */}
      <motion.section></motion.section>
      {/* Projects */}
      <motion.section></motion.section>
    </div>
  );
};

export default Page;
