import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { FanNavigation } from '@/components/fan-navigation';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SIR Model Simulation',
  description:
    '感染症の数理モデルシミュレーション - 常微分方程式モデル（数値解法）と個体ベースモデル',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FanNavigation />
        {children}
      </body>
    </html>
  );
}
