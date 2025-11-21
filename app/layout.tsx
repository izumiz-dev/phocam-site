import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://phocam.app'),
  title: "Phocam - フォトカードと一緒に写真を撮ろう",
  description: "推しと一緒に、毎日をもっと特別に。Phocamは、あなたの大切なフォトカードと一緒に写真を撮影できるアプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
