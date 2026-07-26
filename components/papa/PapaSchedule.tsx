'use client';

import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Mic2,
  ListChecks,
  Gamepad2,
  Flag,
  Award,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { papaSchedule } from '@/data/papa-data';
import { NatureBackground } from '../decor/SectionBackgrounds';

const ICONS: Record<string, any> = {
  registration: ClipboardCheck,
  opening: Mic2,
  rules: ListChecks,
  games: Gamepad2,
  'quest-end': Flag,
  closing: Award,
};

export default function PapaSchedule() {
  const { language } = useLanguage();
  const kk = language === 'kk';

  const schedule = papaSchedule.filter((item) => item.id !== 'fenix');

  return (
    <section
      id="papa_schedule"
      style={{ background: 'linear-gradient(180deg, #FF6B4A 0%, #FF8C42 100%)' }}
      className="relative overflow-hidden pt-12 pb-10 sm:pt-20 sm:pb-16 md:pt-28 md:pb-24"
    >
      <NatureBackground />

      <div className="pointer-events-none absolute -left-24 top-1/4 h-[320px] w-[320px] rounded-full bg-white/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[300px] w-[300px] rounded-full bg-[#3A1409]/10 blur-[100px]" />

      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-14 text-center"
        >
          <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-[#fff] break-words">
            {kk ? 'Бағдарлама' : 'Программа'}
          </h2>
        </motion.div>

        <div className="mx-auto max-w-2xl">
          {schedule.map((item, i) => {
            const isLast = i === schedule.length - 1;
            const Icon = ICONS[item.id] ?? Flag;

            return (
              <div key={item.id} className="relative flex gap-3 sm:gap-5">
                {/* Линия таймлайна + узел */}
                <div className="flex flex-shrink-0 flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05, type: 'spring' }}
                    className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-lg"
                    style={{ border: '3px solid #FF8C42' }}
                  >
                    <div
                      className={`
                        flex h-12 w-12 shrink-0 items-center justify-center
                        rounded-2xl shadow-lg transition-all duration-300
                      `}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: '#D45A3B' }}
                        strokeWidth={2.3}
                      />
                    </div>
                  </motion.div>
                  {!isLast && (
                    <div className="w-px flex-1 bg-white/30" style={{ minHeight: '100%' }} />
                  )}
                </div>

                {/* Карточка */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="mb-3 sm:mb-4 flex-1 overflow-hidden rounded-2xl border border-white/20 bg-white px-4 sm:px-5 py-3 sm:py-4"
                >
                  <span className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#C1442E]">
                    {item.time}
                  </span>
                  <p className="mt-0.5 text-sm sm:text-base font-bold leading-snug text-[#3A1409]">
                    {kk ? item.titleKk : item.title}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}