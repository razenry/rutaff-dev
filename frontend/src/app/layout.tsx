import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RUTAF SUPER APP",
  description: "Enterprise Islamic Education Ecosystem",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0ea5e9",
};
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { PWARegistration } from "@/components/providers/PWARegistration";
import { Toaster } from "sonner";

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
        <Toaster position="top-center" richColors />
        <PWARegistration />
        <ReactQueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
