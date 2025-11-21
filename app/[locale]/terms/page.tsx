import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
            {/* Agreement */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.agreement.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.agreement.content')}
              </p>
            </section>

            {/* Service */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.service.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.service.content')}
              </p>
            </section>

            {/* Image Rights */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.imageRights.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.imageRights.content')}
              </p>
            </section>

            {/* Test Version */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.testVersion.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.testVersion.content')}
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.disclaimer.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.disclaimer.content')}
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.changes.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.changes.content')}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
