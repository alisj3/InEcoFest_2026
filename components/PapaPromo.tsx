'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NatureBackground } from './decor/SectionBackgrounds';

const text = {
  ru: {
    badge: 'Ещё один проект',
    title: 'Папа может всё',
    subtitle: 'Инклюзивный семейный квест для пап и детей',
    description:
      'Отдельное мероприятие в рамках экосистемы наших проектов — семейный день для пап и детей, включая семьи, где инвалидность есть у ребёнка или отца. Через игру и совместные активности на природе семьи становятся ближе друг к другу.',
    date: '7 августа 2026',
    location: 'Ботанический сад, Алматы',
    cta: 'Узнать подробнее',
  },
  kk: {
    badge: 'Тағы бір жоба',
    title: 'Әке бәрін де істей алады',
    subtitle: 'Әкелер мен балаларға арналған инклюзивті отбасылық квест',
    description:
      'Біздің жобалар экожүйесі аясындағы отбасылық іс-шара. Баласында немесе әкесінде мүгедектігі бар отбасылар да қатыса алады. Ойындар мен табиғат аясындағы бірлескен белсенділіктер отбасы мүшелерін жақындастырады.',
    date: '2026 жылғы 7 тамыз',
    location: 'Ботаникалық бақ, Алматы',
    cta: 'Толығырақ білу',
  },
};

export default function PapaPromo() {
  const { language } = useLanguage();
  const t = language === 'kk' ? text.kk : text.ru;

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 md:py-24"
      style={{ backgroundColor: '#218251' }}
    >
      <NatureBackground />

      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl overflow-hidden rounded-2xl sm:rounded-[32px] border border-white/10"
          style={{
            background: 'linear-gradient(135deg, #C1442E 0%, #FF6B4A 55%, #FF8C42 100%)',
            boxShadow: '0 25px 60px rgba(0,0,0,.25)',
          }}
        >
          <div className="relative p-5 sm:p-10 md:p-14">
            {/* Декоративная полупрозрачная иконка */}
            <div className="pointer-events-none absolute -right-6 -top-6 opacity-10">
              <Heart className="h-32 w-32 sm:h-48 sm:w-48 text-white" fill="white" strokeWidth={0} />
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/90 backdrop-blur-sm">
              <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="white" strokeWidth={0} />
              {t.badge}
            </span>

            <h2
              className="mt-4 sm:mt-6 text-2xl sm:text-4xl md:text-5xl leading-tight text-white"
              style={{ fontFamily: '"Baloo 2", sans-serif', fontWeight: 700, textShadow: '3px 3px 0 rgba(0,0,0,0.15)' }}
            >
              {t.title}
            </h2>

            <p className="mt-2 sm:mt-3 text-sm sm:text-lg font-semibold text-white/95">
              {t.subtitle}
            </p>

            <p className="mt-3 sm:mt-5 max-w-2xl text-xs sm:text-base leading-relaxed text-white/85">
              {t.description}
            </p>

            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-sm text-white/90 backdrop-blur-sm">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={2} />
                {t.date}
              </span>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-sm text-white/90 backdrop-blur-sm">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={2} />
                {t.location}
              </span>
            </div>

            <Link href="/papa">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 sm:mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-[#C1442E] shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
                style={{ boxShadow: '0 12px 30px rgba(0,0,0,.2)' }}
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}