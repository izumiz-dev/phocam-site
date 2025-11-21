'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  const t = useTranslations('header');
  const params = useParams();
  const currentLocale = params.locale as string;

  const locales = [
    { code: 'ja', label: '日本語', short: 'JA' },
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'ko', label: '한국어', short: 'KO' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href={`/${currentLocale}`} className="text-xl sm:text-2xl font-bold">
          Phocam
        </Link>

        <div className="flex items-center gap-3 sm:gap-8">
          {/* Navigation Links - Hidden on mobile */}
          <Link
            href={`/${currentLocale}#features`}
            className="hidden sm:block text-sm hover:opacity-70 transition-opacity"
          >
            {t('features')}
          </Link>
          <Link
            href={`/${currentLocale}#download`}
            className="hidden sm:block text-sm hover:opacity-70 transition-opacity"
          >
            {t('download')}
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 sm:gap-2">
            {locales.map((locale) => (
              <Link
                key={locale.code}
                href={`/${locale.code}`}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  currentLocale === locale.code
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {/* Show short label on mobile, full on desktop */}
                <span className="sm:hidden">{locale.short}</span>
                <span className="hidden sm:inline">{locale.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
