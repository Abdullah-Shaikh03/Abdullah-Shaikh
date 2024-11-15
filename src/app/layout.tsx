import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Boxes } from "@/components/ui/background-boxes";
import HeaderNav from "@/components/NavBar/HeaderNav";
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdullah Shaikh",
  description: "My Portfolio website, see my project, skills, tech stack, for freelance work send a message.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <div className="min-h-screen relative w-full overflow-hidden bg-slate-900 text-white flex flex-col rounded-lg">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <HeaderNav />
          {children}
          <Boxes />
        </div>
      </body>
    </html>
  );
}
