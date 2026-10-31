import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G-Events — Campus Activity Platform",
  description: "Your campus activities, all in one place. Manage events, schedules, volunteers, and coordination for schools and colleges.",
  icons: {
    icon: "/favicon.ico",
  },
};

// Wait until the DOM is loaded to add the manifest and install button logic
// This is done in the client component to avoid SSR issues

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* iOS apple-touch-icon support */}
        <link rel="apple-touch-icon" sizes="180x180" href="/G-Events logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased antialiased-lg antialiased">
        {children}
        {/* PWA Install Button - appears on mount if installable */}
        <PWAInstallButton className="mt-6 md:mt-0" />
      </body>
    </html>
  );
}