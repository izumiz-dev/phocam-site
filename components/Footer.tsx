'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const params = useParams();
  const locale = params?.locale || 'ja';

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Phocam</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
            <Link
              href={`/${locale}/terms`}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t('terms')}
            </Link>
            <div className="text-gray-600 dark:text-gray-400">
              © {currentYear} Phocam. {t('rights')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
