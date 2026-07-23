'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeartHandshake } from 'lucide-react';
import OptimizedImage from '../ui/OptimizedImage';

const partners = [
  {
    name: 'ITeachMe',
    nameKk: 'ITeachMe',
    description: 'Организатор проекта',
    descriptionKk: 'Жоба ұйымдастырушысы',
    src: '/images/logos/iteachme.png',
  },
  {
    name: 'Шинхан Банк Казахстан',
    nameKk: 'Шинхан Банк Казахстан',
    description: 'Партнёр проекта',
    descriptionKk: 'Жобаның серіктесі',
    src: '/images/logos/shinhan_bank_kazakhstan.png',
  },
  {
    name: 'GlobalCare',
    nameKk: 'GlobalCare',
    description: 'Партнёр проекта',
    descriptionKk: 'Жобаның серіктесі',
    src: '/images/logos/global_care.png',
  },
  {
    name: 'InEco Fest',
    nameKk: 'InEco Fest',
    description: 'Партнёр проекта',
    descriptionKk: 'Жобаның серіктесі',
    src: '/images/logos/ineco.png',
  },
];

export default function PapaPartners() {
  const { language } = useLanguage();
  const kk = language === 'kk';

  return (
    <section
      id="papa_partners"
      style={{ background: 'linear-gradient(180deg, #FF8C42 0%, #FFC531 100%)' }}
      className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20"
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-[280px] w-[280px] rounded-full bg-white/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-[#3A1409]/10 blur-[120px]" />

      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/90 backdrop-blur-sm">
            <HeartHandshake className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.4} />
            {kk ? 'Серіктестер' : 'Партнёры'}
          </span>
        </motion.div>

        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="flex flex-col items-center gap-2 sm:gap-4 rounded-2xl sm:rounded-[24px] border border-white/40 bg-white p-3 sm:p-7 text-center transition-all duration-300 hover:shadow-2xl"
              style={{ boxShadow: '0 12px 30px rgba(58,20,9,0.12)' }}
            >
              <div className="flex h-11 w-11 sm:h-20 sm:w-20 items-center justify-center">
                <OptimizedImage
                  src={partner.src}
                  alt={kk ? partner.nameKk : partner.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-[10px] sm:text-sm leading-snug text-[#6D5347]">
                {kk ? partner.descriptionKk : partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}