import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ProFinance Solutions',
  description: 'Maliyyə Konsaltinqi · Bakı, Azərbaycan',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body style={{ margin: 0, height: '100%' }}>{children}</body>
    </html>
  );
}
