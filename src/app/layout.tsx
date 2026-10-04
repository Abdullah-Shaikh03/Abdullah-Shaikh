import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdullah Shaikh — Software Engineer & AI/ML Developer",
  description: "Terminal-first portfolio of Abdullah Shaikh, a software engineer focused on full-stack and backend development, AI/ML, and computer vision.",
  openGraph: {
    title: "Abdullah Shaikh — Software Engineer & AI/ML Developer",
    description: "Explore full-stack products, backend systems, and applied computer-vision projects through an interactive terminal.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistMono.variable} h-full antialiased`}><body>{children}</body></html>;
}
