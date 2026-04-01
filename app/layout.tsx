import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "bit8 composer",
  description: "Short 8bit loop composer for web and future NFT export",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
