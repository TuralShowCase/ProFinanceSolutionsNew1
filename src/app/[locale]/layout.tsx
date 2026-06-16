import { notFound } from 'next/navigation';
import { routing, type Locale } from '../../i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Root layout (app/layout.tsx) handles HTML, provider, GA, and WhatsApp.
// This layout validates the locale param and returns children directly.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  return <>{children}</>;
}
