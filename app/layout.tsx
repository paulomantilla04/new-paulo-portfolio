import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paulo Mantilla — Desarrollador Web & Ingeniero de Software",
  description:
    "Portafolio de Paulo Mantilla, Ingeniero de Software especializado en desarrollo de aplicaciones web modernas y escalables con React, Next.js, TypeScript y más.",
  keywords: [
    "Paulo Mantilla",
    "Desarrollador Web",
    "Ingeniero de Software",
    "React",
    "Next.js",
    "TypeScript",
    "Laravel",
    "Spring Boot",
    "Portafolio",
  ],
  authors: [{ name: "Paulo Mantilla", url: "https://paulomantilla.dev" }],
  creator: "Paulo Mantilla",
  metadataBase: new URL("https://paulomantilla.dev"),
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://paulomantilla.dev",
    title: "Paulo Mantilla — Desarrollador Web & Ingeniero de Software",
    description:
      "Portafolio de Paulo Mantilla, Ingeniero de Software especializado en desarrollo de aplicaciones web modernas y escalables.",
    siteName: "Paulo Mantilla",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paulo Mantilla — Desarrollador Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulo Mantilla — Desarrollador Web & Ingeniero de Software",
    description:
      "Portafolio de Paulo Mantilla, Ingeniero de Software especializado en desarrollo de aplicaciones web modernas y escalables.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#111",
              border: "1px solid #222",
              color: "#fff",
            },
            classNames: {
              success: "border-[#2CFF68]/30",
              error: "border-red-500/30",
            },
          }}
        />
      </body>
    </html>
  );
}
