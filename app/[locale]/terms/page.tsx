import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SECTION_KEYS = ['agreement', 'service', 'imageRights', 'testVersion', 'disclaimer', 'changes'] as const;

export default function TermsPage() {
  const t = useTranslations('termsPage');

  return (
    <>
      <Header />
      <main className="min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('title')}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-12">
            {t('lastUpdated')}: 2025-11-21
          </p>

          {/* Sections */}
          <div className="space-y-12">
            {SECTION_KEYS.map((key) => (
              <section key={key}>
                <h2 className="text-2xl font-bold mb-4">{t(`sections.${key}.title`)}</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`sections.${key}.content`)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
