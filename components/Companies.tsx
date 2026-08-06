'use client';

import Image, { StaticImageData } from 'next/image';

import asm from '../public/images/company_logos_bgr/asm-jukebox-bg-removed.png';
import asylMiras from '../public/images/company_logos_bgr/asyl_miras-jukebox-bg-removed.png';
import community from '../public/images/company_logos_bgr/community-jukebox-bg-removed.png';
import dara from '../public/images/company_logos_bgr/dara-jukebox-bg-removed.png';
import fenix from '../public/images/company_logos_bgr/fenix-jukebox-bg-removed.png';
import greenRanger from '../public/images/company_logos_bgr/green_ranger-jukebox-bg-removed.png';
import harmony from '../public/images/company_logos_bgr/harmony-jukebox-bg-removed.png';
import iteachme from '../public/images/company_logos_bgr/iteachme-jukebox-bg-removed.png';
import kazgasa from '../public/images/company_logos_bgr/kazgasa-jukebox-bg-removed.png';
import lemanaPro from '../public/images/company_logos_bgr/lemana_pro-jukebox-bg-removed.png';
import mamapro from '../public/images/company_logos_bgr/mamapro-jukebox-bg-removed.png';
import museum from '../public/images/company_logos_bgr/museum-jukebox-bg-removed.png';
import orkenPuzzle from '../public/images/company_logos_bgr/orken_puzzle-jukebox-bg-removed.png';
import recycleBirge from '../public/images/company_logos_bgr/recycle_birge-jukebox-bg-removed.png';
import scienceAlmaty from '../public/images/company_logos_bgr/science_almaty-jukebox-bg-removed.png';
import sos from '../public/images/company_logos_bgr/sos-jukebox-bg-removed.png';
import srod from '../public/images/company_logos_bgr/srod-jukebox-bg-removed.png';
import umaiBook from '../public/images/company_logos_bgr/umai_book-jukebox-bg-removed.png';
import vasilek from '../public/images/company_logos_bgr/Vasilek-jukebox-bg-removed.png';
import zerteStudio from '../public/images/company_logos_bgr/Zerte Studio-jukebox-bg-removed.png';
import zhuldyz from '../public/images/company_logos_bgr/Zhuldyz-jukebox-bg-removed.png';
import Koktem from '../public/images/company_logos_bgr/Koktem-jukebox-bg-removed.png';
import CCI from "../public/images/company_logos_bgr/cci.png"
import { getTranslation } from '@/data/translations';
import { useLanguage } from '@/contexts/LanguageContext';

interface LogoItem {
  src: StaticImageData;
  alt: string;
  bgClassName?: string;
}

const logos: LogoItem[] = [
  { src: asm, alt: 'ASM' },
  { src: asylMiras, alt: 'Asyl Miras' },
  { src: community, alt: 'Community' },
  { src: dara, alt: 'Dara' },
  { src: fenix, alt: 'Fenix' },
  { src: greenRanger, alt: 'Green Ranger' },
  { src: harmony, alt: 'Harmony' },
  { src: iteachme, alt: 'ITeachMe' },
  { src: kazgasa, alt: 'KazGASA' },
  { src: lemanaPro, alt: 'Lemana Pro' },
  { src: mamapro, alt: 'MamaPro' },
  { src: museum, alt: 'Museum' },
  { src: orkenPuzzle, alt: 'Orken Puzzle' },
  { src: recycleBirge, alt: 'Recycle Birge' },
  { src: scienceAlmaty, alt: 'Science Almaty' },
  { src: sos, alt: 'SOS' },
  { src: srod, alt: 'SROD', bgClassName: 'bg-slate-800' },
  { src: umaiBook, alt: 'Umai Book' },
  { src: vasilek, alt: 'Vasilek' },
  { src: zerteStudio, alt: 'Zerte Studio' },
  { src: zhuldyz, alt: 'Zhuldyz' },
  { src: Koktem, alt: 'Koktem' },
  { src: CCI, alt: "CCI"}
];

export default function CompanyLogosMarquee() {
  const marqueeLogos = [...logos, ...logos];
  const { language } = useLanguage();

  return (
    <div className="w-full overflow-hidden bg-[#388c67] py-14 sm:py-20 md:py-28">
        <h2 className="text-center mb-8 sm:mb-10 mt-2 sm:mt-6 text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-[#f9bf00] break-words">
            {getTranslation('other.partners.title', language)}
        </h2>
      <div className="flex w-max animate-marquee gap-6">
        {marqueeLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className={`flex h-28 w-[calc((100vw-4.5rem)/2)] shrink-0 items-center justify-center rounded-2xl ${logo.bgClassName ?? 'bg-white'} p-4 shadow-sm sm:h-28 sm:w-[calc((100vw-6rem)/3)] sm:p-4 md:h-28 md:w-[calc((100vw-7.5rem)/6)] md:p-5`}
          >
            <div className="relative h-full w-full">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain grayscale opacity-70 transition-opacity duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}