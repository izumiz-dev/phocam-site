'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { DOWNLOAD_URLS } from '@/config/download';
import TermsModal from './TermsModal';

export default function DownloadSection() {
  const t = useTranslations('download');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDownloadUrl, setPendingDownloadUrl] = useState<string | null>(null);

  const isUrlAvailable = (url: string) => url && url !== '' && url !== '#';

  const handleDownloadClick = (url: string) => {
    setPendingDownloadUrl(url);
    setIsModalOpen(true);
  };

  const handleAcceptTerms = () => {
    if (pendingDownloadUrl) {
      window.location.href = pendingDownloadUrl;
    }
    setIsModalOpen(false);
    setPendingDownloadUrl(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPendingDownloadUrl(null);
  };

  return (
    <section id="download" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* TestFlight */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-8 rounded-3xl border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold mb-2">{t('testflightNote')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {t('testflight')}
            </p>
            {isUrlAvailable(DOWNLOAD_URLS.TESTFLIGHT) ? (
              <button
                onClick={() => handleDownloadClick(DOWNLOAD_URLS.TESTFLIGHT)}
                className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-center font-semibold transition-colors"
              >
                TestFlight
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 dark:bg-gray-600 text-white px-6 py-3 rounded-full text-center font-semibold cursor-not-allowed opacity-60"
              >
                {t('comingSoon')}
              </button>
            )}
          </div>

          {/* APK */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-8 rounded-3xl border border-green-200 dark:border-green-800">
            <h3 className="text-2xl font-bold mb-2">{t('apkNote')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {t('apk')}
            </p>
            {isUrlAvailable(DOWNLOAD_URLS.APK) ? (
              <button
                onClick={() => handleDownloadClick(DOWNLOAD_URLS.APK)}
                className="inline-block w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-center font-semibold transition-colors"
              >
                APK
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 dark:bg-gray-600 text-white px-6 py-3 rounded-full text-center font-semibold cursor-not-allowed opacity-60"
              >
                {t('comingSoon')}
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Terms Modal */}
      <TermsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccept={handleAcceptTerms}
      />
    </section>
  );
}
