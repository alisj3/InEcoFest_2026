'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Clock, Users } from 'lucide-react';
import { festivalZones } from '@/data/festival-data';
import { createPortal } from "react-dom";
import OptimizedImage from './ui/OptimizedImage';
import { NatureBackground } from './decor/SectionBackgrounds';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';

export default function InteractiveMap() {
  const { language } = useLanguage();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

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

  return (
    <section id="map" className="relative overflow-hidden bg-gradient-to-b from-[#4CB963] to-[#2F8F54] py-28">
      <NatureBackground />

      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm">
            {getTranslation('map.badge', language)}
          </span>
          <h2 className="mt-6 text-5xl font-black leading-tight text-white md:text-6xl">
            {getTranslation('map.title', language)}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            {getTranslation('map.description', language)}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-black/5 bg-white p-6"
          >
            <div className="mb-6 overflow-hidden rounded-2xl">
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
              className="w-full flex items-center justify-center space-x-3 rounded-2xl bg-[#17351E] py-3.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-5 w-5" strokeWidth={1.5} />
              <span>{getTranslation('map.download', language)}</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-black/5 bg-white p-6"
          >
            <h3 className="mb-2 text-2xl font-bold text-[#17351E]">{getTranslation('map.selectZone', language)}</h3>
            <p className="mb-6 text-sm text-[#6D7568]">
              {getTranslation('map.selectZoneDescription', language)}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {festivalZones.slice(0, 11).map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => handleZoneClick(zone.id)}
                  className="rounded-2xl border border-black/5 bg-[#F3F5EF] p-3.5 text-left transition-colors hover:bg-[#E8ECE3]"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: zone.color }}
                    />
                    <div>
                      <p className="text-sm leading-tight text-[#17351E]">
                        {language === "kk" ? zone.nameKk : zone.name}
                      </p>

                      <p className="text-xs text-[#6D7568]">
                        {zone.activities.length} {getTranslation("map.activity", language)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

      {createPortal(
        <AnimatePresence>
          {selectedZone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#17351E]/40 backdrop-blur-md p-4"
              onClick={() => setSelectedZone(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[32px] bg-white p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const zone = festivalZones.find((z) => z.id === selectedZone);
                  if (!zone) return null;

                  return (
                    <div>
                      <div className="mb-6 flex items-start justify-between">
                        <h3 className="text-2xl font-bold text-[#17351E]">
                          {language === "kk" ? zone.nameKk : zone.name}
                        </h3>

                        <button
                          onClick={() => setSelectedZone(null)}
                          className="rounded-xl bg-[#F3F5EF] p-3 hover:bg-[#E8ECE3]"
                          aria-label={getTranslation("map.close", language)}
                        >
                          <X className="h-5 w-5" strokeWidth={1.5} />
                        </button>
                      </div>

                      <p className="mb-6 text-sm leading-relaxed text-[#5F675B]">
                        {language === "kk" ? zone.descriptionKk : zone.description}
                      </p>

                      <div className="space-y-4">
                        {zone.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="rounded-2xl bg-[#F3F5EF] p-4"
                          >
                            <div className="mb-1.5 flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-[#17351E]">
                                {language === "kk" ? activity.titleKk : activity.title}
                              </h4>

                              <span className="rounded-full bg-white px-2.5 py-1 text-xs text-[#6D7568]">
                                {activity.time}
                              </span>
                            </div>

                            <p className="mb-2 text-sm text-[#5F675B]">
                              {language === "kk"
                                ? activity.descriptionKk
                                : activity.description}
                            </p>

                            <div className="flex items-center space-x-4 text-xs text-[#8A9086]">
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" strokeWidth={1.5} />
                                <span>{activity.duration}</span>
                              </span>

                              {activity.speaker && (
                                <span className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" strokeWidth={1.5} />
                                  <span>
                                    {language === "kk"
                                      ? activity.speakerKk ?? activity.speaker
                                      : activity.speaker}
                                  </span>
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