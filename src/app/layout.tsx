import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: '나는 솔로 이상형 월드컵',
  description: '나는 솔로 이상형 월드컵',
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
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
