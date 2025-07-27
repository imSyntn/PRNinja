import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PR Ninja",
  description: "Code Reviews, Powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <meta property="og:title" content="PR Ninja" />
        <meta
          property="og:description"
          content="Code Reviews, Powered by AI."
        />
        <meta property="og:url" content="https://pr-ninja.sayantan.site/" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1751229991/PR_Ninja_xukjsr.jpg"
        />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>
            <Header />
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
