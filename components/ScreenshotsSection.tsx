'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function ScreenshotsSection() {
  const t = useTranslations('screenshots');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Placeholder for screenshots - users will add their own
  const screenshots = [
    { id: 1, alt: 'Screenshot 1' },
    { id: 2, alt: 'Screenshot 2' },
    { id: 3, alt: 'Screenshot 3' },
  ];

  return (
    <section className="py-32 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative aspect-[9/19] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Placeholder for actual screenshots */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-600">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-sm">
                    Screenshot {screenshot.id}
                    <br />
                    <span className="text-xs">(Add images to public/images/)</span>
                  </p>
                </div>
              </div>
              {/* Uncomment and use when you add actual screenshots */}
              {/* <Image
                src={`/images/screenshot-${screenshot.id}.png`}
                alt={screenshot.alt}
                fill
                className="object-cover"
              /> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
