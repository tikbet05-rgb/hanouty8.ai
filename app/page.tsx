import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RIBH AI',
  description: 'Global smart earning platform MVP'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

