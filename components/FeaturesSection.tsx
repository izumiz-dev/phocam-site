'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    key: 'multipleCards',
    icon: '📸',
  },
  {
    key: 'easyCapture',
    icon: '✨',
  },
  {
    key: 'flexibleSize',
    icon: '🔍',
  },
  {
    key: 'shareEasily',
    icon: '💫',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const t = useTranslations('features');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
    >
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h3 className="text-2xl font-bold mb-3">{t(`${feature.key}.title`)}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {t(`${feature.key}.description`)}
      </p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const t = useTranslations('features');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="py-32 px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.key} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
