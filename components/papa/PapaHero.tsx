'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { papaInfo } from '@/data/papa-data';
import { HillsBackground, HillsBackgroundYellow } from '../decor/SectionBackgrounds';

// Картинки для фоновой карусели PapaHero. Положи файлы в public/images/papa-hero/
// и при необходимости поменяй пути/добавь ещё.
const papaHeroImages = [
  '/images/papa-hero/1.webp',
  '/images/papa-hero/2.webp',
  '/images/papa-hero/3.webp',
  '/images/papa-hero/4.webp',
];

const SLIDE_DURATION = 5000; // мс между сменой слайдов

function PapaHeroBackgroundCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % papaHeroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={papaHeroImages[index]}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4, ease: 'easeInOut' }, scale: { duration: SLIDE_DURATION / 1000 + 1.4, ease: 'linear' } }}
          className="absolute inset-0"
        >
          <Image
            src={papaHeroImages[index]}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Цветной оверлей в тон секции PapaHero, чтобы карусель не спорила по палитре с сайтом */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(193,68,46,0.88) 0%, rgba(255,107,74,0.75) 60%, rgba(255,140,66,0.6) 100%)',
        }}
      />
      {/* Дополнительное затемнение снизу — под текст и карточки */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(122,36,21,0) 0%, rgba(122,36,21,0.3) 70%, rgba(122,36,21,0.55) 100%)',
        }}
      />
    </div>
  );
}

export default function PapaHero() {
  const { language } = useLanguage();
  const kk = language === 'kk';

  const info = [
    { icon: Calendar, value: kk ? papaInfo.dateKk : papaInfo.date, label: kk ? 'Күні' : 'Дата' },
    { icon: MapPin, value: `${kk ? papaInfo.locationKk : papaInfo.location}, ${kk ? papaInfo.cityKk : papaInfo.city}`, label: kk ? 'Орналасуы' : 'Локация' },
    { icon: Clock, value: kk ? papaInfo.timeKk : papaInfo.time, label: kk ? 'Уақыты' : 'Время' },
  ];

  return (
    <section
      id="papa-hero"
      style={{ background: 'linear-gradient(160deg, #C1442E 0%, #FF6B4A 60%, #FF8C42 100%)' }}
      className="
        relative
        overflow-hidden
        min-h-screen
        flex
        items-center
        pt-20
        sm:pt-28
        md:pt-36
        pb-16
        sm:pb-20
      "
    >
      <PapaHeroBackgroundCarousel />
      <HillsBackgroundYellow />

      {/* Мягкие светящиеся пятна на фоне для глубины */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#f9bf00]/25 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-[380px] w-[380px] rounded-full bg-white/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-[#7A2415]/30 blur-[100px]" />

      {/* Крупная полупрозрачная иконка-акцент за заголовком */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 0.12, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute right-[4%] top-[12%] hidden md:block"
      >
        <Heart className="h-56 w-56 text-white" strokeWidth={1} fill="white" />
      </motion.div>

      {/* Плавающие декоративные фигуры */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: '14%', left: '8%', size: 16, color: '#f9bf00' },
          { top: '22%', left: '88%', size: 22, color: '#FFFFFF' },
          { top: '78%', left: '10%', size: 14, color: '#f9bf00' },
          { top: '50%', left: '4%', size: 10, color: '#FFFFFF' },
          { top: '88%', left: '78%', size: 18, color: '#f9bf00' },
          { top: '35%', left: '95%', size: 12, color: '#FFFFFF' },
        ].map((dot, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -14, 0] }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            className="absolute rounded-full opacity-70"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, backgroundColor: dot.color }}
          />
        ))}
      </div>

      <div className="container-custom relative z-[5]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl leading-[1.02] text-white"
            style={{ fontFamily: '"Baloo 2", sans-serif', fontWeight: 700, textShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}
          >
            {kk ? papaInfo.titleKk : papaInfo.title}
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 sm:mt-6  inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/90 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f9bf00] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f9bf00]" />
            </span>
            {kk ? papaInfo.badgeKk : papaInfo.badge}
          </motion.span>

          {/* Декоративный разделитель под заголовком */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 sm:mt-6 flex items-center justify-center gap-2"
          >
            <span className="h-1 w-6 sm:w-10 rounded-full bg-white/40" />
            <Heart className="h-4 w-4 text-[#FFC531]" fill="#FFC531" strokeWidth={0} />
            <span className="h-1 w-6 sm:w-10 rounded-full bg-white/40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4"
          >
            {info.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.04, y: -3 }}
                  className="flex items-center sm:flex-col sm:items-center gap-3 sm:gap-2 rounded-2xl border border-white/15 bg-white/10 p-3 sm:p-5 backdrop-blur-md text-left sm:text-center transition-all duration-300 hover:bg-white/15 hover:shadow-xl"
                  style={{ boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-white leading-tight">{item.value}</p>
                    <p className="text-[10px] sm:text-xs tracking-wide text-white/70 mt-0.5">{item.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 sm:mt-8 text-xs sm:text-sm text-white/80"
          >
            {kk ? papaInfo.addressKk : papaInfo.address}
          </motion.p> */}
        </div>
      </div>

      

      {/* Волнообразный переход к следующей секции */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4]">
        <svg viewBox="0 0 1440 80" className="w-full h-[50px] sm:h-[80px]" preserveAspectRatio="none">
          <path
            d="M0,32 C240,80 480,0 720,24 C960,48 1200,80 1440,32 L1440,80 L0,80 Z"
            fill="#A8341E"
            fillOpacity="0.9"
          />
        </svg>
      </div>
    </section>
  );
}