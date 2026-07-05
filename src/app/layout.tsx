import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "flowEdge - AI 港股交易大师",
  description:
    "五位传奇投资人实时辩论港股，结合风控闸门与交易者方程，生成可验证、可回放的交易决策。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#F0F0F0] text-[#0A0A0A] antialiased">{children}</body>
    </html>
  );
}
