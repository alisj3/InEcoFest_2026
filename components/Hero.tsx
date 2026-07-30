'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ChevronDown, Leaf, Info } from 'lucide-react';
import { festivalInfo } from '@/data/festival-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';
import OptimizedImage from './ui/OptimizedImage';
import { HillsBackground } from './decor/SectionBackgrounds';

// Картинки для фоновой карусели. Положи файлы в public/images/hero/
// и при необходимости поменяй пути/добавь ещё.
const heroImages = [
  '/images/hero/1.webp',
  '/images/hero/2.webp',
  '/images/hero/3.webp',
];

const SLIDE_DURATION = 5000; // мс между сменой слайдов

function HeroBackgroundCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={heroImages[index]}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4, ease: 'easeInOut' }, scale: { duration: SLIDE_DURATION / 1000 + 1.4, ease: 'linear' } }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[index]}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Цветной оверлей в тон секции, чтобы карусель не спорила по палитре с сайтом */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(131,164,0,0.88) 0%, rgba(131,164,0,0.72) 35%, rgba(23,53,30,0.55) 75%, rgba(18,41,27,0.78) 100%)',
        }}
      />
      {/* Дополнительное затемнение снизу — под текст и кнопки */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(18,41,27,0) 0%, rgba(18,41,27,0.35) 70%, rgba(18,41,27,0.55) 100%)',
        }}
      />
    </div>
  );
}

export default function Hero() {
  const { language } = useLanguage();

  const info = [
    { icon: Calendar, value: language === 'kk' ? festivalInfo.dateKk : festivalInfo.date, label: getTranslation('hero.date', language), bg: '#f9bf00' },
    {
      icon: MapPin,
      value: language === 'kk' ? (festivalInfo as any).locationKk || festivalInfo.location : festivalInfo.location,
      label: getTranslation('hero.location', language),
      bg: '#FF6B4A',
    },
    { icon: Clock, value: festivalInfo.time, label: getTranslation('hero.time', language), bg: '#3DAEDB' },
  ];

  return (
    <section
      id="home"
      style={{ backgroundColor: '#83a400' }}
      className="relative overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16 md:pt-40 md:pb-28"
    >
      <HeroBackgroundCarousel />
      <HillsBackground />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: '12%', left: '8%', size: 18, color: '#f9bf00' },
          { top: '20%', left: '85%', size: 24, color: '#FF6B4A' },
          { top: '70%', left: '6%', size: 16, color: '#3DAEDB' },
          { top: '78%', left: '90%', size: 20, color: '#f9bf00' },
          { top: '45%', left: '92%', size: 14, color: '#8B3FC4' },
          { top: '85%', left: '35%', size: 18, color: '#FF6B4A' },
        ].map((dot, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -14, 0] }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            className="absolute rounded-full"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, backgroundColor: dot.color }}
          />
        ))}
      </div>

      <div className="container-custom relative z-[5]">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="mb-4 sm:mb-8 flex justify-center"
          >
            <div className="bg-white rounded-full p-3 sm:p-6 shadow-lg">
              <OptimizedImage
                src="/images/logos/ineco.png"
                alt="InEco Fest Logo"
                width={100}
                height={100}
                className="max-w-[80px] sm:max-w-[160px] md:max-w-[200px]"
                priority={true}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-5 sm:mb-10"
          >
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-3 sm:mb-6 leading-[1] sm:leading-[0.95] text-white"
              style={{ fontFamily: 'var(--font-cera)', fontWeight: 700, textShadow: '4px 4px 0 rgba(0,0,0,0.12)' }}
            >
              InEco
              <span style={{ color: '#f9bf00' }}> Fest</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl mb-2 sm:mb-4 max-w-2xl mx-auto text-white/95 font-semibold px-2">
              {getTranslation('hero.subtitle', language)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-12"
          >
            {info.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="group flex items-center gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-white/15 bg-white/10 p-3 sm:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl"
                  style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                >
                  <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white/15">
                      <IconComponent
                          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                          strokeWidth={2}
                      />
                  </div>
                  <div className="flex min-h-0 sm:min-h-[56px] flex-col justify-center text-left">
                    <p className="text-base sm:text-lg font-bold leading-snug break-words" style={{ color: '#fff' }}>
                      {item.value}
                    </p>
                    <p className="mt-0.5 sm:mt-1 text-xl sm:text-lg leading-tight" style={{ color: '#f4f4f4' }}>{item.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Уведомление о входном билете — в том же стеклянном стиле, что и остальной Hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-6 sm:mb-10 flex justify-center"
          >
            <div
              className="flex max-w-2xl items-start gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-[#f9bf00]/30 bg-white/10 px-4 sm:px-6 py-3.5 sm:py-4 backdrop-blur-md"
              style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
            >
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#f9bf00]">
                <Info className="h-4 w-4 sm:h-5 sm:w-5 text-[#17351E]" strokeWidth={2.5} />
              </span>
              <p className="text-center text-xs sm:text-sm leading-5 sm:leading-6 text-white/95">
                {getTranslation('festival.entryFeeNotice', language)}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 sm:mb-12 flex justify-center"
          >
            <motion.a
              href={language === 'kk' ? '/program-kk.docx' : '/program-ru.docx'}
              download={'InEco_Fest_2026_Программа.docx'}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-full bg-[#f9bf00] px-6 py-3 text-sm sm:px-10 sm:py-4 sm:text-lg font-semibold text-[#fff] shadow-lg transition-all duration-300 hover:shadow-2xl"
              style={{
                boxShadow: '0 12px 35px rgba(0,0,0,.18)',
              }}
            >
              {getTranslation('hero.download', language)}
            </motion.a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.5 }} 
            className="mx-auto max-w-3xl px-4">
              <p className="mb-3 text-base font-bold leading-relaxed text-white/95 text-center whitespace-normal sm:mb-6 sm:text-xl">
              {language === 'kk' ? (festivalInfo as any).descriptionKk || festivalInfo.description : festivalInfo.description}
              </p>
            </motion.div>
        </div>
      </div>
    </section>
  );
}