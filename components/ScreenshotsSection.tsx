'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface Screenshot {
  id: number;
  filename: string;
  alt: string;
}

interface ScreenshotsSectionProps {
  screenshots: Screenshot[];
}

export default function ScreenshotsSection({ screenshots }: ScreenshotsSectionProps) {
  const t = useTranslations('screenshots');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // If no screenshots are provided, show placeholder
  if (screenshots.length === 0) {
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

          <div className="text-center text-gray-500 dark:text-gray-600 py-20">
            <div className="text-6xl mb-4">📱</div>
            <p className="text-lg">
              No screenshots yet
              <br />
              <span className="text-sm">(Add images to public/images/)</span>
            </p>
          </div>
        </div>
      </section>
    );
  }

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

        <div className={
          screenshots.length === 1
            ? 'grid grid-cols-1 max-w-md mx-auto gap-8'
            : 'flex flex-row overflow-x-auto gap-4 px-6 py-4 -mx-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] md:gap-8 md:px-8 md:-mx-8 md:[mask-image:linear-gradient(to_right,transparent_0%,black_3%,black_97%,transparent_100%)]'
        }>
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative aspect-[9/19] rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] md:hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] dark:md:hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-black/10 dark:ring-white/10 ${screenshots.length === 1 ? '' : screenshots.length === 2 ? 'w-[85vw] md:w-96 flex-shrink-0' : 'w-[85vw] md:w-80 flex-shrink-0'} md:cursor-pointer transition-shadow duration-300`}
            >
              <Image
                src={`/images/${screenshot.filename}`}
                alt={screenshot.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
