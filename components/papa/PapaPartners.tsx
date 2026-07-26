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
    // размеры картинки: mobile / desktop (в px)
    sizeMobile: 44,
    sizeDesktop: 80,
  },
  {
    name: 'Шинхан Банк Казахстан',
    nameKk: 'Шинхан Банк Казахстан',
    description: 'Партнёр проекта',
    descriptionKk: 'Жобаның серіктесі',
    src: '/images/logos/shinhan_bank_kazakhstan.png',
    sizeMobile: 44,
    sizeDesktop: 120,
  },
  {
    name: 'GlobalCare',
    nameKk: 'GlobalCare',
    description: 'Партнёр проекта',
    descriptionKk: 'Жобаның серіктесі',
    src: '/images/logos/global_care.png',
    sizeMobile: 44,
    sizeDesktop: 120,
  },
  {
    name: 'InEco Fest',
    nameKk: 'InEco Fest',
    description: 'Партнёр проекта',
    descriptionKk: 'Жобаның серіктесі',
    src: '/images/logos/ineco.png',
    sizeMobile: 44,
    sizeDesktop: 100,
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
          <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-[#fff] break-words">
            {kk ? 'Серіктестер' : 'Партнёры'}
          </h2>
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
              <div
                className="flex items-center justify-center"
                style={{
                  ['--w-mobile' as string]: `${partner.sizeMobile}px`,
                  ['--w-desktop' as string]: `${partner.sizeDesktop}px`,
                  width: 'var(--w-mobile)',
                  height: 'var(--w-mobile)',
                }}
              >
                <style jsx>{`
                  @media (min-width: 640px) {
                    div {
                      width: var(--w-desktop) !important;
                      height: var(--w-desktop) !important;
                    }
                  }
                `}</style>
                <OptimizedImage
                  src={partner.src}
                  alt={kk ? partner.nameKk : partner.name}
                  width={partner.sizeDesktop}
                  height={partner.sizeDesktop}
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