"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import { talks, concerts, welcomes, SpeakerEntry } from '@/data/festival-data';
import { NatureBackground } from "./decor/SectionBackgrounds";
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from "./ui/OptimizedImage";
import { getTranslation } from '@/data/translations';

function SpeakerCard({
  entry,
  onClick,
}: {
  entry: SpeakerEntry;
  onClick: () => void;
}) {
  const { language } = useLanguage();

  return (
    <div
      onClick={onClick}
      className="group relative h-full rounded-3xl border border-white/20 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-full bg-[#4CB963]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#4CB963]">
          {language === "kk" ? entry.typeKk ?? entry.type : entry.type}
        </span>

        <div className="relative flex items-center">
  <span
    className="
      absolute right-8 whitespace-nowrap rounded-full
      bg-[#17351E] px-3 py-1 text-xs font-medium text-white
      opacity-0 translate-x-2
      transition-all duration-300
      group-hover:opacity-100 group-hover:translate-x-0
      pointer-events-none
    "
  >
    {language === "kk"
      ? "Толығырақ көру үшін басыңыз"
      : "Нажмите, чтобы узнать"}
  </span>

  <svg
    className="h-5 w-5 text-[#4CB963] transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
</div>
      </div>

      <h3 className="mb-6 text-2xl font-bold leading-tight text-[#17351E]">
        {language === "kk" ? entry.titleKk ?? entry.title : entry.title}
      </h3>

      {entry.speaker && (
        <p className="text-lg font-semibold text-[#17351E]">{language === "kk"
          ? entry.speakerKk ?? entry.speaker
          : entry.speaker}</p>
      )}

      {entry.org && <p className="mt-2 text-[#6D7568]">{language === "kk" ? entry.orgKk ?? entry.org : entry.org}</p>}

      {entry.note && (
        <div className="mt-6 inline-flex rounded-full bg-[#F3F5EF] px-4 py-2 text-sm text-[#6D7568]">
          {entry.note}
        </div>
      )}
    </div>
  );
}

function SpeakerGroup({
  label,
  entries,
  onSelect,
}: {
  label: string;
  entries: SpeakerEntry[];
  onSelect: (speaker: SpeakerEntry) => void;
}) {
  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

  return (
    <div className="mb-16">
      <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
        {label}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <SpeakerCard entry={entry} onClick={() => onSelect(entry)} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Speakers() {
  const { language } = useLanguage();
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerEntry | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("talks");

  useEffect(() => {
    if (selectedSpeaker) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSpeaker]);

  const getYoutubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
    );

    return match?.[1];
  };

  return (
    <section
      id="program"
      className="relative overflow-hidden bg-[#309155] py-28"
    >
      <NatureBackground />
      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-sm">
            {getTranslation('stage.title', language)}
          </span>

          <h2 className="mt-6 text-5xl font-black leading-tight text-white md:text-6xl">
            {getTranslation('speakers.title', language)}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            {getTranslation('speakers.description', language)}
          </p>
        </motion.div>

        <div className="mb-12 flex justify-center">
          <div className="flex rounded-full border-2 border-[#12291B] bg-white p-1">
            <button
              onClick={() => setActiveTab("talks")}
              className={`rounded-full px-8 py-3 font-bold transition-all ${
                activeTab === "talks"
                  ? "bg-[#FFC531] text-[#12291B]"
                  : "text-[#12291B] hover:bg-[#F3F5EF]"
              }`}
            >
              {getTranslation('speaker.report', language)}
            </button>

            <button
              onClick={() => setActiveTab("welcomes")}
              className={`rounded-full px-8 py-3 font-bold transition-all ${
                activeTab === "welcomes"
                  ? "bg-[#FFC531] text-[#12291B]"
                  : "text-[#12291B] hover:bg-[#F3F5EF]"
              }`}
            >
              {getTranslation('speaker.welcome', language)}
            </button>

            <button
              onClick={() => setActiveTab("concerts")}
              className={`rounded-full px-8 py-3 font-bold transition-all ${
                activeTab === "concerts"
                  ? "bg-[#FFC531] text-[#12291B]"
                  : "text-[#12291B] hover:bg-[#F3F5EF]"
              }`}
            >
              {getTranslation('speaker.concert', language)}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "talks" && (
            <motion.div
              key="talks"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SpeakerGroup
                label="Доклады"
                entries={talks}
                onSelect={setSelectedSpeaker}
              />
            </motion.div>
          )}

          {activeTab === "concerts" && (
            <motion.div
              key="concerts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpeakerGroup
                label="Концерты"
                entries={concerts}
                onSelect={setSelectedSpeaker}
              />
            </motion.div>
          )}

          {activeTab === "welcomes" && (
            <motion.div
              key="welcomes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SpeakerGroup
                label="Приветственные слова"
                entries={welcomes}
                onSelect={setSelectedSpeaker}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {createPortal(
          <AnimatePresence>
            {selectedSpeaker && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#17351E]/40 backdrop-blur-md p-6"
                onClick={() => setSelectedSpeaker(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-white p-8 shadow-2xl"
                >
                  <div className="mb-8 flex flex-col gap-6 md:flex-row items-center">
                    <div className="flex-1">
                      <div className="mb-3 flex items-start justify-between">
                        <span className="rounded-full bg-[#4CB963]/10 px-4 py-2 text-xs font-semibold uppercase text-[#4CB963]">
                          Главная сцена
                        </span>

                        <button
                          onClick={() => setSelectedSpeaker(null)}
                          className="rounded-xl bg-[#F3F5EF] p-3 hover:bg-[#E8ECE3]"
                        >
                          ✕
                        </button>
                      </div>

                      <h2 className="text-3xl font-bold text-[#17351E]">
                          {language === "kk"
                            ? selectedSpeaker.titleKk ?? selectedSpeaker.title
                            : selectedSpeaker.title}
                      </h2>

                    {selectedSpeaker.image && (
                      <div className="mt-4 flex h-full flex-shrink-0 items-end">
                        <div className="w-full overflow-hidden rounded-3xl">
                            <OptimizedImage
                              src={selectedSpeaker.image}
                              alt={selectedSpeaker.speaker ?? ""}
                              className="h-full w-full object-contain"
                            />
                        </div>
                      </div>
                    )}

                      {selectedSpeaker.speaker && (
                        <p className="mt-4 text-xl font-semibold">
                          {language === "kk"
                            ? selectedSpeaker.speakerKk ?? selectedSpeaker.speaker
                            : selectedSpeaker.speaker}
                        </p>
                      )}

                      {selectedSpeaker.org && (
                        <p className="mt-2 text-[#66705F]">
                          {language === "kk"
                            ? selectedSpeaker.orgKk ?? selectedSpeaker.org
                            : selectedSpeaker.org}
                        </p>
                      )}

                      {(selectedSpeaker.time || selectedSpeaker.location) && (
                        <div className="mt-5 flex flex-wrap gap-3">
                          {selectedSpeaker.time && (
                            <span className="flex items-center gap-2 rounded-full bg-[#F3F5EF] px-4 py-2 text-[#5F675B]">
                              <span>🕒</span>
                              <span>{selectedSpeaker.time}</span>
                            </span>
                          )}

                          {selectedSpeaker.location && (
                            <span className="flex items-center gap-2 rounded-full bg-[#F3F5EF] px-4 py-2 text-[#5F675B]">
                              <span>📍</span>
                              <span>
                                {language === "kk"
                                  ? selectedSpeaker.locationKk ?? selectedSpeaker.location
                                  : selectedSpeaker.location}
                              </span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="leading-8 text-[#5F675B]">
                    {language === "kk"
                      ? selectedSpeaker.descriptionKk ?? selectedSpeaker.description
                      : selectedSpeaker.description}
                  </p>

                  {selectedSpeaker.video && (
                    <div className="mt-8">
                      <h3 className="mb-4 text-xl font-bold text-[#17351E]">
                        Видео выступления
                      </h3>

                      <div className="overflow-hidden rounded-3xl">
                        <iframe
                          className="aspect-video w-full"
                          src={`https://www.youtube.com/embed/${getYoutubeId(selectedSpeaker.video)}`}
                          title={selectedSpeaker.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}
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
