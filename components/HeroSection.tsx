'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface HeroSectionProps {
  appIcon?: string | null;
}

export default function HeroSection({ appIcon }: HeroSectionProps) {
  const t = useTranslations('hero');
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* App Icon */}
        {appIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={appIcon}
                alt="Phocam App Icon"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
        >
          {t('title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-3xl mb-4 text-gray-700 dark:text-gray-300"
        >
          {t('subtitle')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl mb-12 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          {t('description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            href={`/${currentLocale}#download`}
            className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-lg font-semibold hover:opacity-80 transition-opacity"
          >
            {t('downloadButton')}
          </Link>
        </motion.div>

        {/* Decorative gradient blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 rounded-full blur-3xl opacity-20 -z-10" />
      </div>
    </section>
  );
}
