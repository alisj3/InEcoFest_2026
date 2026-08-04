'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Clock, Users, ExternalLink } from 'lucide-react';
import { festivalZones } from '@/data/festival-data';
import { createPortal } from "react-dom";
import OptimizedImage from './ui/OptimizedImage';
import { NatureBackground } from './decor/SectionBackgrounds';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';
import CompanyPopover from './CompanyPopover';

export default function InteractiveMap() {
  const { language } = useLanguage();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId);
  };

  const handleDownloadMap = () => {
    const link = document.createElement('a');
    link.href = '/festival-map.pdf';
    link.download = 'InEco_Fest_2025_Карта.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActivityTranslation = (count: number, language: "ru" | "kk") => {
    if (language === "kk") {
      return getTranslation("map.activity", language);
    }

    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) {
      return getTranslation("map.activity", language);
    }

    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
      return getTranslation("map.activity_plural", language);
    }

    return getTranslation("map.activity_plural-2", language);
  };

  return (
    <section id="map" className="relative overflow-hidden bg-gradient-to-b from-[#388c67] to-[#388c67] py-16 sm:py-20 md:py-28">
      <NatureBackground />

      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 sm:mb-16 max-w-4xl text-center px-2"
        >
          <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-[#f9bf00] break-words">
            {getTranslation('map.title', language)}
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-white/80">
            {getTranslation('map.description', language)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl sm:rounded-3xl border border-black/5 bg-white p-4 sm:p-6"
          >
            <div className="mb-4 sm:mb-6 overflow-hidden rounded-xl sm:rounded-2xl">
              <OptimizedImage
                src="/images/festival-map.jpg"
                alt="Карта фестиваля InEco Fest"
                width={600}
                height={420}
                className="w-full h-auto"
                priority={true}
              />
            </div>

            <button
              onClick={handleDownloadMap}
              className="w-full flex items-center justify-center gap-2 sm:space-x-3 rounded-2xl bg-[#17351E] py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" strokeWidth={1.5} />
              <span className="text-center">{getTranslation('map.download', language)}</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl sm:rounded-3xl border border-black/5 bg-white p-4 sm:p-6"
          >
            <h3 className="mb-2 text-xl sm:text-2xl font-bold text-[#17351E] break-words">{getTranslation('map.selectZone', language)}</h3>
            <p className="mb-4 sm:mb-6 text-sm text-[#6D7568]">
              {getTranslation('map.selectZoneDescription', language)}
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {festivalZones.slice(0, 11).map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => handleZoneClick(zone.id)}
                  className="rounded-xl sm:rounded-2xl border border-black/5 bg-[#F3F5EF] p-3 sm:p-3.5 text-left transition-colors hover:bg-[#E8ECE3]"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div
                      className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: zone.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm leading-tight text-[#17351E] break-words">
                        {language === "kk" ? zone.nameKk : zone.name}
                      </p>

                      <p className="text-xs text-[#6D7568] mt-0.5">
                        {zone.activities.length} {getActivityTranslation(zone.activities.length, language)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

      {mounted && 
      createPortal(
        <AnimatePresence>
          {selectedZone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#17351E]/40 backdrop-blur-md p-3 sm:p-4"
              onClick={() => setSelectedZone(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[24px] sm:rounded-[32px] bg-white p-5 sm:p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const zone = festivalZones.find((z) => z.id === selectedZone);
                  if (!zone) return null;

                  return (
                    <div>
                      <div className="mb-4 sm:mb-6 flex items-start justify-between gap-3">
                        <h3 className="min-w-0 flex-1 break-words text-xl sm:text-2xl font-bold text-[#17351E]">
                          {language === "kk" ? zone.nameKk : zone.name}
                        </h3>

                        <button
                          onClick={() => setSelectedZone(null)}
                          className="shrink-0 rounded-xl bg-[#F3F5EF] p-2.5 sm:p-3 hover:bg-[#E8ECE3]"
                          aria-label={getTranslation("map.close", language)}
                        >
                          <X className="h-5 w-5" strokeWidth={1.5} />
                        </button>
                      </div>

                      <p className="mb-4 sm:mb-6 text-lg leading-relaxed text-[#000] break-words">
                        {language === "kk" ? zone.descriptionKk : zone.description}
                      </p>

                      <div className="space-y-3 sm:space-y-4">
                        {zone.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="rounded-xl sm:rounded-2xl bg-[#F3F5EF] p-3.5 sm:p-4"
                          >
                            <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                              <h4 className="min-w-0 flex-1 break-words text-sm font-semibold text-[#17351E]">
                                {language === "kk" ? activity.titleKk : activity.title}
                              </h4>

                              <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs text-[#6D7568]">
                                {activity.time}
                              </span>
                            </div>

                            <p className="mb-2 text-sm text-[#5F675B] break-words">
                              {language === "kk"
                                ? activity.descriptionKk
                                : activity.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8A9086]">
                              {!activity.duration?.includes("240") && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                                  <span>{activity.duration}</span>
                                </span>
                              )}

                              {activity.speaker && (
                                <span className="flex items-center gap-1 min-w-0">
                                  <Users className="h-3 w-3 shrink-0" strokeWidth={1.5} />

                                  {activity.company ? (
                                    <CompanyPopover company={activity.company} language={language} align="left">
                                      <span className="break-words underline decoration-dotted underline-offset-2">
                                        {language === 'kk' ? activity.speakerKk ?? activity.speaker : activity.speaker}
                                      </span>
                                    </CompanyPopover>
                                  ) : (
                                    <span className="break-words">
                                      {language === 'kk' ? activity.speakerKk ?? activity.speaker : activity.speaker}
                                    </span>
                                  )}

                                  {activity.speakerLink && (
                                    
                                      <a href={activity.speakerLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="ml-0.5 inline-flex shrink-0 items-center text-[#4c6eb9] transition-colors hover:text-[#388c67]"
                                    >
                                      {getTranslation('map.link', language)}
                                      <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                                    </a>
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
          document.body 
        )}

      </div>
    </section>
  );
}