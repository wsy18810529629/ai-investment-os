import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Investment OS",
  description: "年轻投资者每天打开的 AI 投资研究与成长系统。",
};

/**
 * Root layout sets the document language and global metadata.
 * The actual product shell is kept inside the page so the home experience can own theme behavior.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
