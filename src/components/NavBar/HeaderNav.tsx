"use client"
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconHome,
  IconBrandLinkedin,
  IconPhone,
  IconAward,
} from "@tabler/icons-react";

const HeaderNav = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    }, 
    {
      title: "Certifications",
      icon: (
        <IconAward className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/certifications",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/abdullah-shaikh-8984b9204/",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/AbdullahSK03",
    },
    {
      title:"Contact",
      icon:(
        <IconPhone className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/contact",
    }
  ];
  return (
    <div className="flex items-center justify-center mt-16 w-full z-10">
      <FloatingDock
        items={links}

      />
    </div>
  );
};

export default HeaderNav;
