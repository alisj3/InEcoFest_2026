'use client';

import { motion } from 'framer-motion';
import { ClipboardEdit, Phone, AlertCircle, ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { papaRegistration } from '@/data/papa-data';

export default function PapaRegistration() {
  const { language } = useLanguage();
  const kk = language === 'kk';
  const t = papaRegistration;

  return (
    <section
      id="registration"
      style={{ background: 'linear-gradient(135deg, #7A2415 0%, #C1442E 50%, #FF6B4A 100%)' }}
      className="relative overflow-hidden pt-14 pb-14 sm:pt-20 sm:pb-20 md:pt-28 md:pb-28"
    >
      {/* Крупные плавающие фоновые пятна на всю секцию */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[440px] w-[440px] rounded-full bg-[#FFC531]/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-white/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-[#3A1409]/20 blur-[120px]" />

      {/* Плавающие декоративные фигуры по всей секции */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { top: '10%', left: '6%', size: 14, color: '#FFC531' },
          { top: '18%', left: '92%', size: 20, color: '#FFFFFF' },
          { top: '85%', left: '12%', size: 16, color: '#FFC531' },
          { top: '75%', left: '88%', size: 12, color: '#FFFFFF' },
          { top: '45%', left: '3%', size: 10, color: '#FFC531' },
        ].map((dot, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            className="absolute rounded-full opacity-60"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, backgroundColor: dot.color }}
          />
        ))}
      </div>

      {/* Огромная полупрозрачная фоновая иконка */}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        whileInView={{ opacity: 0.06, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -right-10 bottom-0 hidden lg:block"
      >
        <ClipboardEdit className="h-72 w-72 text-white" strokeWidth={0.8} />
      </motion.div>

      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/90 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.4} />
            {kk ? 'Тіркелу' : 'Регистрация'}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Левая колонка — заголовок и текст */}
          <div className="text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl sm:text-5xl md:text-6xl leading-[1.05] text-white"
              style={{ fontFamily: '"Baloo 2", sans-serif', fontWeight: 700, textShadow: '3px 3px 0 rgba(0,0,0,0.15)' }}
            >
              {kk ? t.titleKk : t.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-sm sm:text-lg leading-relaxed text-white/85"
            >
              {kk ? t.introKk : t.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-5 sm:mt-7 mx-auto lg:mx-0 flex max-w-xl items-start gap-2.5 rounded-xl sm:rounded-2xl border border-[#FFC531]/30 bg-black/15 px-4 py-3 text-left backdrop-blur-sm"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#FFC531]" strokeWidth={2.2} />
              <p className="text-xs sm:text-sm leading-snug text-white/90">
                {kk ? t.eligibilityKk : t.eligibility}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-2.5 text-white/80"
            >
              <Phone className="h-4 w-4 flex-shrink-0" strokeWidth={2} />
              <span className="text-xs sm:text-sm">
                {kk ? t.contactLabelKk : t.contactLabel}{' '}
                
                 <a href={`tel:${t.contactPhone.replace(/\s/g, '')}`}
                  className="font-semibold text-white hover:text-[#FFC531] transition-colors"
                  >
                  {t.contactPhone}
                </a>{' '}
                ({t.contactName})
              </span>
            </motion.div>
          </div>

          {/* Правая колонка — крупный CTA-блок */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className="flex flex-col items-center gap-4 sm:gap-5"
          >
            <motion.a
              href={t.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex w-full max-w-xs sm:max-w-sm flex-col items-center gap-3 sm:gap-4 overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#FFC531] px-6 sm:px-10 py-7 sm:py-10 text-center"
              style={{ boxShadow: '0 20px 50px rgba(0,0,0,.3)' }}
            >
              {/* Пульсирующее свечение вокруг кнопки */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[36px] bg-white/40"
              />

              <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#3A1409] transition-transform duration-300 group-hover:rotate-12">
                <ClipboardEdit className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFC531]" strokeWidth={2.3} />
              </div>

              <span className="relative text-base sm:text-xl font-bold text-[#3A1409]" style={{ fontFamily: '"Baloo 2", sans-serif' }}>
                {kk ? t.ctaKk : t.cta}
              </span>

              <span className="relative flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3A1409]/70 transition-transform duration-300 group-hover:translate-x-1">
                {kk ? 'Бастау' : 'Начать'}
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
              </span>
            </motion.a>

            <p className="text-[10px] sm:text-xs text-white/60">
              {kk ? 'Google Forms арқылы' : 'Через Google Forms'} · 2 {kk ? 'мин' : 'мин'}
            </p>
          </motion.div>
        </div>

        {/* Партнёры — растянуто на всю ширину внизу */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 sm:mt-16 flex items-center justify-center gap-2.5 border-t border-white/10 pt-5 sm:pt-8"
        >
          <HeartHandshake className="h-3.5 w-3.5 flex-shrink-0 text-white/50" strokeWidth={2} />
          <p className="text-[10px] sm:text-xs leading-snug text-white/50 text-center">
            {kk ? t.partnersKk : t.partners}
          </p>
        </motion.div>
      </div>
    </section>
  );
}