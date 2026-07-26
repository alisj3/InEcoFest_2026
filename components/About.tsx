'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Leaf, GraduationCap, TreePine, Palette, Mic, Globe } from 'lucide-react';
import { festivalInfo } from '@/data/festival-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';
import { HalftoneBackground } from './decor/SectionBackgrounds';
import OptimizedImage from './ui/OptimizedImage';

export default function About() {
  const { language } = useLanguage();

  const features = [
    {
      image: "/images/icons/11.png",
      title: getTranslation('values.inclusivity', language),
      description: getTranslation('values.inclusivity.desc', language),
      rotate: '-rotate-2',
      bg: '#f9bf00',
    },
    {
      image: "/images/leafes/leaf-3.png",
      title: getTranslation('values.ecology', language),
      description: getTranslation('values.ecology.desc', language),
      rotate: 'rotate-1',
      bg: '#388c67',
      filter: 'invert(38%) sepia(98%) saturate(269%) hue-rotate(31deg) brightness(138%) contrast(198%)', // -> #AED900
    },
    {
      image: '/images/icons/heart.png',
      title: getTranslation('values.community', language),
      description: getTranslation('values.community.desc', language),
      rotate: '-rotate-1',
      bg: '#7465A3',
      filter: 'brightness(0) invert(1)', // -> белый
    },
    {
      icon: GraduationCap,
      title: getTranslation('values.education', language),
      description: getTranslation('values.education.desc', language),
      rotate: 'rotate-2',
      bg: '#3D7894',
      strokeWidth: 1.6,
    },
  ];

  const stats = [
    { number: '50+', label: getTranslation('stats.workshops', language), icon: Palette, bg: '#FF6B4A', iconColor: '#12291B' },
    { number: '2000+', label: getTranslation('stats.guests', language), icon: Users, bg: '#3DAEDB', iconColor: '#12291B' },
    { number: '8+', label: 'Выступлений на сцене', icon: Mic, bg: '#8B3FC4', iconColor: '#fff' },
  ];

  return (
    <section
      id='about'
      style={{ backgroundColor: '#388c67' }}
      className="relative overflow-hidden pt-12 pb-10 sm:pt-20 sm:pb-16 md:pt-28 md:pb-24"
    >
        <HalftoneBackground />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: '8%', left: '5%', size: 16, color: '#f9bf00' },
          { top: '15%', left: '92%', size: 20, color: '#FF6B4A' },
          { top: '60%', left: '3%', size: 14, color: '#3DAEDB' },
          { top: '90%', left: '88%', size: 18, color: '#f9bf00' },
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
          className="mb-6 sm:mb-10 md:mb-14 text-center"
        >
          <span
            className="text-5xl sm:text-7xl md:text-7xl lg:text-7xl font-black leading-none"
            style={{ fontFamily: 'var(--font-cera)', color: '#fff' }}
          >
            {getTranslation("about.title", language)}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-10 md:mb-14 rounded-2xl sm:rounded-[32px] border border-white/15 bg-white/10 p-4 sm:p-8 backdrop-blur-xl md:p-12"
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,.12)' }}
        >
          <span
            className="mb-4 sm:mb-8 inline-flex rounded-full bg-white/15 px-5 py-2.5 sm:px-7 sm:py-3 text-base sm:text-2xl font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white backdrop-blur"
            style={{ backgroundColor: '#f9bf00 ', color: '#fff' }}
          >
            {getTranslation('about.mission.title', language)}
          </span>
          <p
            className="text-base sm:text-xl md:text-2xl leading-snug font-bold"
            style={{ fontFamily: 'var(--font-cera)', color: '#fff' }}
          >
            {language === 'kk' ? (festivalInfo as any).missionKk || festivalInfo.mission : festivalInfo.mission}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 mb-6 sm:mb-10 md:mb-14">
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
                  className="mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: feature.bg }}
                >
                  {feature.image ? (
                    <div
                      className="h-12 w-12 sm:h-14 sm:w-14"
                      style={feature.filter ? { filter: feature.filter } : undefined}
                    >
                      <OptimizedImage
                        src={feature.image}
                        alt={feature.title}
                        width={56}
                        height={56}
                        className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                      />
                    </div>
                  ) : IconComponent ? (
                    <IconComponent
                      className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                      style={{ color: "#fff" }}
                      strokeWidth={feature.strokeWidth ?? 2.2}
                    />
                  ) : null}
                </div>
                <h4
                  className="text-sm sm:text-xl mb-1 sm:mb-2 font-bold leading-tight"
                  style={{ fontFamily: 'var(--font-cera)', color: '#fff' }}
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
          className="grid grid-cols-3 gap-2.5 sm:gap-6"
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
                  <IconComponent className="h-3.5 w-3.5 sm:h-6 sm:w-6" style={{ color: stat.iconColor }} strokeWidth={2.2} />
                </div>
                <div
                  className="text-xl sm:text-4xl md:text-5xl mb-0.5 font-bold"
                  style={{ fontFamily: 'var(--font-cera)', color: '#fff' }}
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