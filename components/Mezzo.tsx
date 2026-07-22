'use client';

import OptimizedImage from "./ui/OptimizedImage";
import Mezzo from "../public/images/Mezzo.webp";
import { HalftoneBackground } from "./decor/SectionBackgrounds";
import { getTranslation } from '@/data/translations';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MezzoProfile() {
  const { language } = useLanguage();

  const stats = [
    { value: "5", label: getTranslation("mezzo.stats.experience", language) },
    { value: "70+", label: getTranslation("mezzo.stats.events", language) },
    { value: "20+", label: getTranslation("mezzo.stats.clients", language) },
    { value: "5000+", label: getTranslation("mezzo.stats.guests", language) },
  ];

  return (
    <section className="relative overflow-hidden bg-[#218251] py-24">
      <HalftoneBackground />

      {/* Декоративные пятна */}
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />
      <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-[#6FA0B8]/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Левая колонка — фото */}
          <div className="relative flex justify-center order-1">

            <div className="absolute h-[520px] w-[520px] rounded-full bg-[#6FA0B8]/20 blur-[120px]" />

            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/10 backdrop-blur">
              <OptimizedImage
                src={Mezzo.src}
                alt="MEZZO"
              />
            </div>

            <div className="absolute bottom-8 right-8 rounded-2xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur">
              <div className="text-sm uppercase tracking-[0.25em] text-[#BFE7F5]">
                Live
              </div>
              <div className="mt-1 text-xl font-bold text-white">
                {getTranslation("mezzo.mood", language)}
              </div>
              <div className="text-white/60">
                {getTranslation("mezzo.tags", language)}
              </div>
            </div>

          </div>

          {/* Правая колонка — текст */}
          <div className="order-2">
            <span className="inline-flex rounded-full border border-[#6FA0B8]/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#BFE7F5]">
              {getTranslation("mezzo.badge", language)}
            </span>

            <h1 className="mt-6 text-5xl font-black leading-none text-white md:text-5xl">
              MEZZO
            </h1>

            <div className="mt-5 text-lg text-[#fff]">
              {getTranslation("mezzo.role", language)}
            </div>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#fff]">
              {getTranslation("mezzo.description", language)}
            </p>

            <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur"
                >
                  <div className="text-3xl font-bold text-white">
                    {item.value}
                  </div>
                  <div className="mt-2 text-sm leading-5 text-[#fff]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}