'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Globe, Leaf, Sparkles, TreePine, Heart, Users, BookOpen } from 'lucide-react';
import OptimizedImage from './ui/OptimizedImage';
import { NatureBackground } from './decor/SectionBackgrounds';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';

const partners = [
  // {
  //   name: 'InEco',
  //   nameKk: 'InEco',
  //   description: 'Организатор фестиваля',
  //   descriptionKk: 'Фестиваль ұйымдастырушысы',
  //   logo: '/images/logos/ineco.png',
  // },
  {
    name: 'Chevron',
    nameKk: 'Chevron',
    description: 'Главный партнер фестиваля',
    descriptionKk: 'Фестивальдің бас серіктесі',
    logo: '/images/logos/chevron.png',
  },
  {
    name: 'ITeachMe',
    nameKk: 'ITeachMe',
    description: 'Организатор фестиваля',
    descriptionKk: "Фестиваль ұйымдастырушысы",
    logo: '/images/logos/iteachme.png',
  },
  {
    name: 'Ботанический Сад',
    nameKk: 'Ботаникалық Бақ',
    description: 'Организатор фестиваля и площадка проведения',
    descriptionKk: 'Фестиваль ұйымдастырушысы және фестиваль өтетін орын',
    logo: '/images/logos/botsad.png',
  },
  {
    name: 'Институт ботаники и фитоинтродукции',
    nameKk: 'Ботаника және фитоинтродукция институты',
    description: 'Научные исследования',
    descriptionKk: 'Ғылыми зерттеулер',
    logo: '/images/logos/institute.png',
  },
  {
    name: 'Шинхан Банк Казахстан',
    nameKk: 'Шинхан Банк Казахстан',
    description: 'Партнер фестиваля',
    descriptionKk: 'Фестивальдің серіктесі',
    logo: '/images/logos/shinhan_bank_kazakhstan.png',
  },
  {
    name: 'GlobalCare',
    nameKk: 'GlobalCare',
    description: 'Партнер фестиваля',
    descriptionKk: 'Фестивальдің серіктесі',
    logo: '/images/logos/global_care.png',
  },
];

export default function Partners() {
  const { language } = useLanguage();
  
  return (
    <section
      id="partners"
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: '#388c67' }}
    >
  <NatureBackground />

  <div className="container-custom relative z-[5]">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-20 text-center"
    >

      <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-[#f9bf00] break-words">
        {getTranslation('partners.title', language)}
      </h2>

      <p className="font-bold mx-auto mt-6 max-w-3xl text-lg text-white/80">
        {getTranslation('partners.description', language)}
      </p>
    </motion.div>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
{partners.map((partner, index) => {
  const accent =
    index % 3 === 0 ? '#f9bf00' : index % 3 === 1 ? '#3DAEDB' : '#FF6B4A';

  return (
    <motion.div
      key={partner.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative rounded-3xl border border-black/5 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Логотип */}
      <div className="mb-6 flex justify-center">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full"
        >
          <OptimizedImage
            src={partner.logo}
            alt={partner.name}
            width={72}
            height={72}
            className="object-contain"
          />
        </div>
      </div>

      {/* Название */}
      <h3 className="text-center text-2xl font-bold text-[#17351E]">
        {partner.name}
      </h3>

      {/* Акцентная линия */}
      <div
        className="mx-auto mt-4 mb-5 h-1 w-10 rounded-full"
        style={{ backgroundColor: accent }}
      />

      {/* Описание */}
      <p className="text-center leading-7 text-[#6D7568]">
        {language === 'kk'
          ? partner.descriptionKk
          : partner.description}
      </p>
    </motion.div>
  );
})}
</div>
  </div>
</section>
  );
} 