import type { Metadata } from "next";
import { Delius } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";

const delius = Delius({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shaikh Abdullah - Full Stack AI/ML Developer",
  description:
    "Portfolio of Shaikh Abdullah, showcasing expertise in web development, machine learning, and innovative projects.",
  keywords: [
    "Shaikh Abdullah",
    "Full Stack Developer",
    "AI Developer",
    "Machine Learning Engineer",
    "Portfolio",
    "Web Development",
    "Projects",
    "Experience",
    "Education",
    "Contact",
    "ML Models",
  ],
  authors: [{ name: "Shaikh Abdullah", url: "https://abdullah-shaikh.me" }],
  creator: "Shaikh Abdullah",
  openGraph: {
    title: "Shaikh Abdullah - Full Stack AI/ML Developer",
    description:
      "Portfolio of Shaikh Abdullah, showcasing expertise in web development, machine learning, and innovative projects.",
    url: "https://abdullah-shaikh.me",
    siteName: "Shaikh Abdullah Portfolio",
    images: [
      {
        url: "https://abdullah-shaikh.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shaikh Abdullah Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        className={`${delius.className} min-h-screen antialiased relative flex flex-col`}
      >
        {/* Global background layers */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-aurora vignette"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>\
<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter>\
<rect width='100%' height='100%' filter='url(#n)' opacity='0.8'/></svg>\")",
            backgroundSize: "160px 160px",
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Glassy nav wrapper */}
          <Navigation />

          {/* Main content should expand */}
          <main className="relative mx-auto max-w-6xl px-4 flex-1">
            {children}
          </main>

          {/* Footer will stick at bottom */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
