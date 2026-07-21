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
    { number: '18', label: getTranslation('stats.platforms', language), icon: TreePine, bg: '#FFC531' },
    { number: '50+', label: getTranslation('stats.workshops', language), icon: Flower2, bg: '#FF6B4A' },
    { number: '2000+', label: getTranslation('stats.guests', language), icon: Users, bg: '#3DAEDB' },
    { number: '24', label: getTranslation('stats.hours', language), icon: Globe, bg: '#8B3FC4' },
  ];

  return (
    <section id='about' style={{ backgroundColor: '#218251' }} className="relative overflow-hidden ...">
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
          className="mb-6 flex justify-center"
        >
          <span
             className="text-center mx-auto inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm"
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
          className="mb-24 rounded-[32px] border border-white/15 bg-white/10 p-8 backdrop-blur-xl md:p-12"
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,.12)' }}
        >
          <span
            className="mb-6 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur"
            style={{ backgroundColor: '#3DAEDB', color: '#fff' }}
          >
            {getTranslation('about.mission.title', language)}
          </span>
          <p
            className="text-2xl md:text-3xl leading-snug font-bold"
            style={{ fontFamily: '"Baloo 2", sans-serif', color: '#fff' }}
          >
            {language === 'kk' ? (festivalInfo as any).missionKk || festivalInfo.mission : festivalInfo.mission}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
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
                className="mb-4 rounded-[32px] border border-white/15 bg-white/10 p-6 backdrop-blur-xl md:p-6"
                style={{ boxShadow: '0 20px 50px rgba(0,0,0,.12)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: feature.bg, border: '2px solid #12291B' }}
                >
                  <IconComponent className="h-7 w-7" style={{ color: '#fff' }} strokeWidth={2.2} />
                </div>
                <h4
                  className="text-lg mb-2 font-bold"
                  style={{ fontFamily: '"Baloo 2", sans-serif', color: '#fff' }}
                >
                  {feature.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#fff' }}>
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex h-full flex-col items-center justify-center rounded-[28px] border border-white/15 bg-white/10 p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
              >
                <div
                  className="mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: stat.bg, border: '2px solid #12291B' }}
                >
                  <IconComponent className="h-6 w-6" style={{ color: '#12291B' }} strokeWidth={2.2} />
                </div>
                <div
                  className="text-4xl md:text-5xl mb-1 font-bold"
                  style={{ fontFamily: '"Baloo 2", sans-serif', color: '#fff' }}
                >
                  {stat.number}
                </div>
                <div className="text-sm font-medium" style={{ color: '#fff' }}>
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