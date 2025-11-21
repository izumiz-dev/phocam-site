import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const t = useTranslations('privacyPage');

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
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.intro.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.intro.content')}
              </p>
            </section>

            {/* Data Collection */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.dataCollection.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.dataCollection.content')}
              </p>
            </section>

            {/* Data Usage */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.dataUsage.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.dataUsage.content')}
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.dataSecurity.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.dataSecurity.content')}
              </p>
            </section>

            {/* Third Party */}
            <section>
              <h2 className="text-2xl font-bold mb-4">{t('sections.thirdParty.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('sections.thirdParty.content')}
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
