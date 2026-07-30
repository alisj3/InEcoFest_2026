'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { HalftoneBackground } from '../decor/SectionBackgrounds';

const text = {
  ru: {
    title: 'О проекте',
    body: 'Семейное мероприятие для пап и детей, включая семьи, где инвалидность есть у ребёнка или отца. Игры, общение и время на природе помогают стать ближе друг к другу.',    
    points: [
      { icon: Users, text: 'Папы и дети играют в одной команде' },
      { icon: Heart, text: 'Инклюзивный формат, доступный всем' },
      { icon: Leaf, text: 'На территории Ботанического Сада' },
    ],
  },
  kk: {
    title: 'Жоба туралы',
    body: 'Әкелер мен балаларға арналған отбасылық іс-шара. Оған баласында немесе әкесінде мүгедектігі бар отбасылар да қатыса алады. Бірлескен ойындар, қарым-қатынас және табиғат аясындағы уақыт отбасы мүшелерін жақындастырады.',    
    points: [
      { icon: Users, text: 'Әкелер мен балалар бір командада ойнайды' },
      { icon: Heart, text: 'Барлығына қолжетімді инклюзивті формат' },
      { icon: Leaf, text: 'Ботаникалық бақтың аумағында' },
    ],
  },
};

export default function PapaConcept() {
  const { language } = useLanguage();
  const t = language === 'kk' ? text.kk : text.ru;

  return (
    <section
      id="papa_about"
      style={{ background: 'linear-gradient(180deg, #A8341E 0%, #C1442E 100%)' }}
      className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 md:pt-20 md:pb-16"
    >
      <HalftoneBackground />

      <div className="pointer-events-none absolute -left-20 top-1/4 h-[280px] w-[280px] rounded-full bg-[#f9bf00]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[280px] w-[280px] rounded-full bg-white/10 blur-[110px]" />

      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-white/15 bg-white/10 p-5 sm:p-10 backdrop-blur-xl text-center"
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,.18)' }}
        >
          <h3 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-4xl font-black leading-tight text-[#fff] break-words">
            {t.title}
          </h3>

          <p className="mt-3 sm:mt-5 text-sm sm:text-base leading-relaxed text-white/90">
            {t.body}
          </p>

          <div className="mt-5 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {t.points.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.text}
                  className="flex items-center sm:flex-col gap-2.5 sm:gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 sm:py-4 text-left sm:text-center"
                >
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#f9bf00]">
                    <Icon className="h-4 w-4 text-[#3A1409]" strokeWidth={2.2} />
                  </div>
                  <p className="text-xs sm:text-sm leading-snug text-white/90">{point.text}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}