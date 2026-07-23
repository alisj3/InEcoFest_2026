'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ChevronDown, Leaf } from 'lucide-react';
import { festivalInfo } from '@/data/festival-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';
import OptimizedImage from './ui/OptimizedImage';
import { HillsBackground } from './decor/SectionBackgrounds';

export default function Hero() {
  const { language } = useLanguage();

  const info = [
    { icon: Calendar, value: festivalInfo.date, label: getTranslation('hero.date', language), bg: '#f9bf00' },
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
              <span style={{ color: '#f9bf00' }}>Fest</span>
              : {getTranslation('hero.river', language)}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl mb-2 sm:mb-4 max-w-2xl mx-auto text-white/95 font-medium px-2">
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
                  className="group flex items-center sm:items-start gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-white/15 bg-white/10 p-3 sm:p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl"
                  style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                >
                  <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white/15">
                      <IconComponent
                          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                          strokeWidth={2}
                      />
                  </div>
                  <div className="flex min-h-0 sm:min-h-[56px] flex-col justify-center text-left">
                    <p className="text-sm sm:text-base font-bold leading-snug break-words" style={{ color: '#fff' }}>{item.value}</p>
                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm leading-tight" style={{ color: '#f4f4f4' }}>{item.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-7 sm:mb-14 flex justify-center"
          >
            <motion.a
              href={language === 'kk' ? '/program-kk.docx' : '/program-ru.docx'}
              download={language === 'kk' ? 'InEco_Fest_2025_Baғdarlama.docx' : 'InEco_Fest_2025_Программа.docx'}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-full bg-[#FFD45A] px-6 py-3 text-sm sm:px-10 sm:py-4 sm:text-lg font-semibold text-[#17351E] shadow-lg transition-all duration-300 hover:shadow-2xl"
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
            className="max-w-3xl mx-auto px-2"
          >
            <p className="text-sm sm:text-lg leading-relaxed mb-3 sm:mb-6 text-white/95">
              {language === 'kk' ? (festivalInfo as any).descriptionKk || festivalInfo.description : festivalInfo.description}
            </p>
            <div
               className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/90 backdrop-blur-sm"
              style={{ color: "#fff" }}
            >
              <Leaf className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: '#fff' }} strokeWidth={2.5} />
              <span className="font-bold text-xs sm:text-sm" style={{ color: '#fff' }}>
                {getTranslation('hero.platforms', language)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}