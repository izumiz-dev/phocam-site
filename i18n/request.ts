import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['ja', 'en', 'ko'] as const;
export const defaultLocale = 'ja' as const;

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale - this will be provided by Next.js
  const locale = await requestLocale;

  // Validate locale
  if (!locale || !locales.includes(locale as any)) {
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default
    };
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
