import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import type { Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '나는 솔로 이상형 월드컵',
  description: '나는 솔로 이상형 월드컵',
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
const notoSansKr = Noto_Sans_KR({
  weight: ['500'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
