"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/data/translations";

export default function EntryFeeNotice() {
  const { language } = useLanguage();

  return (
    <section className="relative bg-[#218251] py-1 sm:py-1">
      <div className="container-custom">
        <div className="mx-auto flex max-w-2xl items-start gap-3 sm:gap-4 rounded-2xl border border-[#FFC531]/50 bg-[#FFC531]/15 px-4 sm:px-6 py-4 sm:py-5 shadow-sm">
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#FFC531] text-base sm:text-lg">
            ℹ️
          </span>

          <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-[#ffffff]">
            {getTranslation("festival.entryFeeNotice", language)}
          </p>
        </div>
      </div>
    </section>
  );
}