'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Leaf, Target, TreePine, Flower2, Globe } from 'lucide-react';
import { festivalInfo } from '@/data/festival-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';
import { HalftoneBackground } from './decor/SectionBackgrounds';

export default function About() {
  const { language } = useLanguage();

  const features = [
    {
      icon: Users,
      title: getTranslation('values.inclusivity', language),
      description: getTranslation('values.inclusivity.desc', language),
      rotate: '-rotate-2',
      bg: '#FFC531',
    },
    {
      icon: Leaf,
      title: getTranslation('values.ecology', language),
      description: getTranslation('values.ecology.desc', language),
      rotate: 'rotate-1',
      bg: '#FF6B4A',
    },
    {
      icon: Heart,
      title: getTranslation('values.community', language),
      description: getTranslation('values.community.desc', language),
      rotate: '-rotate-1',
      bg: '#3DAEDB',
    },
    {
      icon: Target,
      title: getTranslation('values.education', language),
      description: getTranslation('values.education.desc', language),
      rotate: 'rotate-2',
      bg: '#8B3FC4',
    },
  ];

  const stats = [
    { number: '11', label: getTranslation('stats.platforms', language), icon: TreePine, bg: '#FFC531' },
    { number: '50+', label: getTranslation('stats.workshops', language), icon: Flower2, bg: '#FF6B4A' },
    { number: '2000+', label: getTranslation('stats.guests', language), icon: Users, bg: '#3DAEDB' },
    { number: '9', label: getTranslation('stats.hours', language), icon: Globe, bg: '#8B3FC4' },
  ];

  return (
    <section
      id='about'
      style={{ backgroundColor: '#218251' }}
      className="relative overflow-hidden pt-12 pb-10 sm:pt-20 sm:pb-16 md:pt-28 md:pb-24"
    >
        <HalftoneBackground />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: '8%', left: '5%', size: 16, color: '#FFC531' },
          { top: '15%', left: '92%', size: 20, color: '#FF6B4A' },
          { top: '60%', left: '3%', size: 14, color: '#3DAEDB' },
          { top: '90%', left: '88%', size: 18, color: '#FFC531' },
        ].map((dot, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            className="absolute rounded-full"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, backgroundColor: dot.color }}
          />
        ))}
      </div>

      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-3 sm:mb-6 flex justify-center"
        >
          <span
             className="text-center mx-auto inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/90 backdrop-blur-sm"
             style={{ color: '#fff' }}
          >
            {getTranslation("about.title", language)}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-16 md:mb-24 rounded-2xl sm:rounded-[32px] border border-white/15 bg-white/10 p-4 sm:p-8 backdrop-blur-xl md:p-12"
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,.12)' }}
        >
          <span
            className="mb-2.5 sm:mb-6 inline-flex rounded-full bg-white/15 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white backdrop-blur"
            style={{ backgroundColor: '#3DAEDB', color: '#fff' }}
          >
            {getTranslation('about.mission.title', language)}
          </span>
          <p
            className="text-base sm:text-2xl md:text-3xl leading-snug font-bold"
            style={{ fontFamily: '"Baloo 2", sans-serif', color: '#fff' }}
          >
            {language === 'kk' ? (festivalInfo as any).missionKk || festivalInfo.mission : festivalInfo.mission}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 mb-6 sm:mb-16 md:mb-24">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                className="rounded-2xl sm:rounded-[32px] border border-white/15 bg-white/10 p-3 sm:p-6 backdrop-blur-xl"
                style={{ boxShadow: '0 20px 50px rgba(0,0,0,.12)' }}
              >
                <div
                  className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-5"
                  style={{ backgroundColor: feature.bg, border: '2px solid #12291B' }}
                >
                  <IconComponent className="h-4 w-4 sm:h-7 sm:w-7" style={{ color: '#fff' }} strokeWidth={2.2} />
                </div>
                <h4
                  className="text-xs sm:text-lg mb-1 sm:mb-2 font-bold leading-tight"
                  style={{ fontFamily: '"Baloo 2", sans-serif', color: '#fff' }}
                >
                  {feature.title}
                </h4>
                <p className="text-[11px] sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none" style={{ color: '#fff' }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6"
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex h-full flex-col items-center justify-center rounded-2xl sm:rounded-[28px] border border-white/15 bg-white/10 p-3 sm:p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
              >
                <div
                  className="mx-auto mb-1.5 sm:mb-3 w-7 h-7 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: stat.bg, border: '2px solid #12291B' }}
                >
                  <IconComponent className="h-3.5 w-3.5 sm:h-6 sm:w-6" style={{ color: '#12291B' }} strokeWidth={2.2} />
                </div>
                <div
                  className="text-xl sm:text-4xl md:text-5xl mb-0.5 font-bold"
                  style={{ fontFamily: '"Baloo 2", sans-serif', color: '#fff' }}
                >
                  {stat.number}
                </div>
                <div className="text-[11px] sm:text-sm font-medium" style={{ color: '#fff' }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}