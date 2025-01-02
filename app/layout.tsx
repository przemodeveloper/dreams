import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dreams",
  description: "New dating app for dreamers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
