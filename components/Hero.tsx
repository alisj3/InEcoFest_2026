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
    { icon: Calendar, value: festivalInfo.date, label: getTranslation('hero.date', language), bg: '#FFC531' },
    {
      icon: MapPin,
      value: language === 'kk' ? (festivalInfo as any).locationKk || festivalInfo.location : festivalInfo.location,
      label: getTranslation('hero.location', language),
      bg: '#FF6B4A',
    },
    { icon: Clock, value: festivalInfo.time, label: getTranslation('hero.time', language), bg: '#3DAEDB' },
  ];

  return (
    <section id="home" style={{ backgroundColor: '#2F9E44' }} className="relative overflow-hidden ...">
      <HillsBackground />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: '12%', left: '8%', size: 18, color: '#FFC531' },
          { top: '20%', left: '85%', size: 24, color: '#FF6B4A' },
          { top: '70%', left: '6%', size: 16, color: '#3DAEDB' },
          { top: '78%', left: '90%', size: 20, color: '#FFC531' },
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
            className="mb-8 flex justify-center"
          >
            <div className="bg-white rounded-full p-6 shadow-lg">
              <OptimizedImage
                src="/images/logos/ineco.png"
                alt="InEco Fest Logo"
                width={100}
                height={100}
                className="max-w-[160px] md:max-w-[200px]"
                priority={true}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-10"
          >
            <h1
              className="text-6xl md:text-8xl lg:text-7xl mb-6 leading-[0.9] text-white"
              style={{ fontFamily: '"Baloo 2", sans-serif', fontWeight: 700, textShadow: '4px 4px 0 rgba(0,0,0,0.12)' }}
            >
              InEco
              <span style={{ color: '#FFC531' }}>Fest</span>
              : {getTranslation('hero.river', language)}
            </h1>
            <p className="text-xl md:text-2xl mb-4 max-w-2xl mx-auto text-white/95 font-medium">
              {getTranslation('hero.subtitle', language)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
          >
            {info.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="group flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl"
                  style={{ minHeight: '110px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                      <IconComponent
                          className="h-6 w-6 text-white"
                          strokeWidth={2}
                      />
                  </div>
                  <div>
                    <p className="font-bold leading-tight" style={{ color: '#fff' }}>{item.value}</p>
                    <p className="text-sm leading-tight" style={{ color: '#f4f4f4' }}>{item.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-14 flex justify-center"
          >
            <motion.a
              href={language === 'kk' ? '/program-kk.docx' : '/program-ru.docx'}
              download={language === 'kk' ? 'InEco_Fest_2025_Baғdarlama.docx' : 'InEco_Fest_2025_Программа.docx'}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-full bg-[#FFD45A] px-10 py-4 text-lg font-semibold text-[#17351E] shadow-lg transition-all duration-300 hover:shadow-2xl"
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
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg leading-relaxed mb-6 text-white/95">
              {language === 'kk' ? (festivalInfo as any).descriptionKk || festivalInfo.description : festivalInfo.description}
            </p>
            <div
               className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm"
              style={{ color: "#fff" }}
            >
              <Leaf className="h-4 w-4" style={{ color: '#fff' }} strokeWidth={2.5} />
              <span className="font-bold text-sm" style={{ color: '#fff' }}>
                {getTranslation('hero.platforms', language)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}