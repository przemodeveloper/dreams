import "./globals.css";
import { Roboto } from "next/font/google";
import UserProvider from "@/providers/UserProvider";
import type { Metadata } from "next";
import MatchesDrawer from "@/components/matchesDrawer/MatchesDrawer";

export const metadata: Metadata = {
  title: "Dreams",
  description:
    "Dreams is a unique dating app designed to connect people who share similar aspirations and plans for the future. By focusing on alignment in values and goals, Dreams fosters meaningful relationships that stand the test of time.",
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/android-chrome-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: "/android-chrome-512x512.png",
    },
  ],
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://dreams-a672f.firebaseapp.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://apis.google.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={roboto.className}>
        <MatchesDrawer />
        <div className="pb-[64px]">
          <UserProvider>{children}</UserProvider>
        </div>
      </body>
    </html>
  );
}
