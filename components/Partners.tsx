'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Globe, Leaf, Sparkles, TreePine, Heart, Users, BookOpen } from 'lucide-react';
import OptimizedImage from './ui/OptimizedImage';
import { NatureBackground } from './decor/SectionBackgrounds';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';

// Единая высота "коробки" под логотип для ВСЕХ карточек —
// это то, что выравнивает контент под логотипами по одной линии.
const LOGO_BOX_MOBILE = 64;
const LOGO_BOX_DESKTOP = 140;

const partners = [
  // {
  //   name: 'InEco',
  //   nameKk: 'InEco',
  //   description: 'Организатор фестиваля',
  //   descriptionKk: 'Фестиваль ұйымдастырушысы',
  //   logo: '/images/logos/ineco.png',
  // },
  {
    name: 'Шеврон',
    nameKk: 'Шеврон',
    description: 'Главный партнер фестиваля',
    descriptionKk: 'Фестивальдің бас серіктесі',
    logo: '/images/logos/chevron.png',
    sizeMobile: 64,
    sizeDesktop: 96,
  },
  {
    name: 'ITeachMe',
    nameKk: 'ITeachMe',
    description: 'Организатор фестиваля',
    descriptionKk: "Фестиваль ұйымдастырушысы",
    logo: '/images/logos/iteachme.png',
    sizeMobile: 64,
    sizeDesktop: 96,
  },
  {
    name: 'Главный Ботанический сад ',
    nameKk: 'Бас Ботаникалық бақ',
    description: 'Организатор фестиваля и площадка проведения',
    descriptionKk: 'Фестиваль ұйымдастырушысы және фестиваль өтетін орын',
    logo: '/images/logos/botsad.png',
    sizeMobile: 64,
    sizeDesktop: 80,
  },
  {
    name: 'Институт ботаники и фитоинтродукции',
    nameKk: 'Ботаника және фитоинтродукция институты',
    description: 'Научные исследования',
    descriptionKk: 'Ғылыми зерттеулер',
    logo: '/images/logos/institute.png',
    sizeMobile: 64,
    sizeDesktop: 80,
  },
  {
    name: 'Шинхан Банк Казахстан',
    nameKk: 'Шинхан Банк Казахстан',
    description: 'Партнер фестиваля',
    descriptionKk: 'Фестивальдің серіктесі',
    logo: '/images/logos/shinhan_bank_kazakhstan.png',
    sizeMobile: 64,
    sizeDesktop: 140,
  },
  {
    name: 'GlobalCare',
    nameKk: 'GlobalCare',
    description: 'Партнер фестиваля',
    descriptionKk: 'Фестивальдің серіктесі',
    logo: '/images/logos/global_care.png',
    sizeMobile: 64,
    sizeDesktop: 130,
  },
];

export default function Partners() {
  const { language } = useLanguage();
  const kk = language === 'kk';

  return (
    <section
      id="partners"
      className="relative overflow-hidden py-28"
      style={{ backgroundColor: '#388c67' }}
    >
      <NatureBackground />

      <style jsx>{`
        .partner-logo-outer {
          width: var(--box-mobile);
          height: var(--box-mobile);
        }
        .partner-logo-inner {
          width: var(--w-mobile);
          height: var(--w-mobile);
        }
        @media (min-width: 640px) {
          .partner-logo-outer {
            width: var(--box-desktop);
            height: var(--box-desktop);
          }
          .partner-logo-inner {
            width: var(--w-desktop);
            height: var(--w-desktop);
          }
        }
      `}</style>

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
                {/* Логотип: та же логика "коробки", что и в PapaPartners —
                    внешняя коробка одинакового размера у всех карточек,
                    внутренняя задаёт реальный размер конкретного лого. */}
                <div className="mb-6 flex justify-center">
                  <div
                    className="partner-logo-outer flex flex-shrink-0 items-center justify-center rounded-full"
                    style={{
                      ['--box-mobile' as string]: `${LOGO_BOX_MOBILE}px`,
                      ['--box-desktop' as string]: `${LOGO_BOX_DESKTOP}px`,
                    }}
                  >
                    <div
                      className="partner-logo-inner flex items-center justify-center"
                      style={{
                        ['--w-mobile' as string]: `${partner.sizeMobile}px`,
                        ['--w-desktop' as string]: `${partner.sizeDesktop}px`,
                      }}
                    >
                      <OptimizedImage
                        src={partner.logo}
                        alt={kk ? partner.nameKk : partner.name}
                        width={partner.sizeDesktop}
                        height={partner.sizeDesktop}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Название */}
                <h3 className="text-center text-2xl font-bold text-[#17351E]">
                  {kk ? partner.nameKk : partner.name}
                </h3>

                {/* Акцентная линия */}
                <div
                  className="mx-auto mt-4 mb-5 h-1 w-10 rounded-full"
                  style={{ backgroundColor: accent }}
                />

                {/* Описание */}
                <p className="text-center leading-7 text-[#6D7568]">
                  {kk ? partner.descriptionKk : partner.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}