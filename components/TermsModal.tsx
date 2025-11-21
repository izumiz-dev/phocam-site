'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  const t = useTranslations('termsModal');
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked) {
      onAccept();
      setIsChecked(false); // Reset for next time
    }
  };

  const handleClose = () => {
    onClose();
    setIsChecked(false); // Reset on close
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl md:text-3xl font-bold">{t('title')}</h2>
              </div>

              {/* Content */}
              <div className="px-8 py-6 overflow-y-auto max-h-[50vh]">
                {/* Image Rights Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">
                    {t('imageRights.title')}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>{t('imageRights.line1')}</p>
                    <p>{t('imageRights.line2')}</p>
                    <p className="font-semibold text-red-600 dark:text-red-400">
                      {t('imageRights.line3')}
                    </p>
                  </div>
                </div>

                {/* Test Version Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3 text-orange-600 dark:text-orange-400">
                    {t('testVersion.title')}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>{t('testVersion.line1')}</p>
                    <p className="font-semibold text-red-600 dark:text-red-400">
                      {t('testVersion.line2')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <div className="px-8 py-4 border-t border-gray-200 dark:border-gray-800">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t('checkboxLabel')}
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleAccept}
                  disabled={!isChecked}
                  className={`flex-1 px-6 py-3 rounded-full font-semibold transition-all ${
                    isChecked
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {t('acceptButton')}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
