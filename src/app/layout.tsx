'use client';

import { useParams } from 'next/navigation';
import "./globals.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
