import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G-Events — Campus Activity Platform",
  description: "Your campus activities, all in one place. Manage events, schedules, volunteers, and coordination for schools and colleges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
