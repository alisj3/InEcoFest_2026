"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { talks, concerts, welcomes, SpeakerEntry } from "@/data/festival-data";
import { NatureBackground } from "./decor/SectionBackgrounds";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "./ui/OptimizedImage";
import { getTranslation } from "@/data/translations";

function getTimeMinutes(time?: string): number {
  if (!time) return Number.MAX_SAFE_INTEGER;
  const match = time.match(/(\d{1,2}):(\d{2})/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

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
      className="group relative h-full rounded-2xl sm:rounded-3xl border border-white/20 bg-white p-5 sm:p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="mb-4 sm:mb-6 flex items-center justify-between gap-2">
        <span className="rounded-full bg-[#4CB963]/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#4CB963]">
          {language === "kk" ? (entry.typeKk ?? entry.type) : entry.type}
        </span>

        <div className="relative flex items-center">
          <span
            className="
      hidden sm:inline-flex
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
            className="h-4 w-4 sm:h-5 sm:w-5 text-[#4CB963] transition-transform duration-300 group-hover:translate-x-1"
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

      <h3 className="mb-3 sm:mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl font-bold leading-tight text-[#17351E] break-words">
        {language === "kk" ? (entry.titleKk ?? entry.title) : entry.title}
      </h3>

      {entry.speaker && (
        <p className="text-base sm:text-lg font-semibold text-[#17351E] break-words">
          {language === "kk"
            ? (entry.speakerKk ?? entry.speaker)
            : entry.speaker}
        </p>
      )}

      {entry.org && (
        <p className="mt-2 text-sm sm:text-base text-[#6D7568] break-words">
          {language === "kk" ? (entry.orgKk ?? entry.org) : entry.org}
        </p>
      )}

      {entry.note && (
        <div className="mt-4 sm:mt-6 inline-flex rounded-full bg-[#F3F5EF] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-[#6D7568]">
          {entry.note}
        </div>
      )}

      {entry.time && (
        <span
          className="
      inline-flex items-center
      rounded-full
      border border-[#4CB963]/20
      bg-[#4CB963]/8
      backdrop-blur-sm
      mt-3
      px-4 py-2
      text-xs sm:text-sm
      font-bold
      tracking-wide
      text-[#218251]
      shadow-sm
    "
        >
          {entry.time}
        </span>
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
  return (
    <div className="mb-8 sm:mb-12 md:mb-16">
      <span className="mb-4 sm:mb-6 block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/70">
        {label}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-5 sm:gap-y-8 md:gap-y-10">
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

function ScheduleStrip({
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
      className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 rounded-2xl border border-white/20 bg-white px-4 sm:px-6 py-4 sm:py-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex-shrink-0 sm:w-24 md:w-28">
        <span className="inline-block whitespace-nowrap rounded-full bg-[#4CB963]/8 px-2.5 py-1 text-xs sm:text-sm font-bold leading-tight text-[#218251] sm:bg-transparent sm:px-0 sm:py-0">
          {entry.time ?? "—"}
        </span>
      </div>

      <div className="hidden sm:block h-10 w-px flex-shrink-0 bg-[#E8ECE3]" />

      <div className="min-w-0 flex-1">
        <span className="mb-1 inline-block rounded-full bg-[#4CB963]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#4CB963]">
          {language === "kk" ? (entry.typeKk ?? entry.type) : entry.type}
        </span>

        <h4 className="truncate text-sm sm:text-base font-bold text-[#17351E]">
          {language === "kk" ? (entry.titleKk ?? entry.title) : entry.title}
        </h4>

        {entry.speaker && (
          <p className="truncate text-xs sm:text-sm text-[#6D7568]">
            {language === "kk"
              ? (entry.speakerKk ?? entry.speaker)
              : entry.speaker}
          </p>
        )}
      </div>

      <svg
        className="hidden sm:block h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-[#4CB963] transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    </div>
  );
}

function ScheduleList({
  entries,
  onSelect,
}: {
  entries: SpeakerEntry[];
  onSelect: (speaker: SpeakerEntry) => void;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:gap-4">
      {entries.map((entry, i) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.03 }}
        >
          <ScheduleStrip entry={entry} onClick={() => onSelect(entry)} />
        </motion.div>
      ))}
    </div>
  );
}

export default function Speakers() {
  const { language } = useLanguage();
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerEntry | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("talks");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedSpeaker) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSpeaker]);

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);

    return match?.[1];
  };

  const scheduleEntries = [...welcomes, ...talks, ...concerts].sort(
    (a, b) => getTimeMinutes(a.time) - getTimeMinutes(b.time),
  );

  const tabs = [
    { id: "schedule", labelKey: "speaker.schedule" },
    { id: "talks", labelKey: "speaker.report" },
    { id: "welcomes", labelKey: "speaker.welcome" },
    { id: "concerts", labelKey: "speaker.concert" },
  ];

  return (
    <section
      id="program"
      className="relative overflow-hidden bg-[#309155] py-16 sm:py-20 md:py-28"
    >
      <NatureBackground />
      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 sm:mb-14 md:mb-20 max-w-4xl text-center px-2"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-4 text-xl/4 font-semibold uppercase tracking-[0.3em] text-white/90">
            {getTranslation("stage.title", language)}
          </span>

          {/* <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-white break-words">
            {getTranslation('speakers.title', language)}
          </h2> */}

          <p className="mx-auto mt-3 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-8 text-white/80">
            {getTranslation("speakers.description", language)}
          </p>
        </motion.div>

        {/* Табы: скроллятся по горизонтали на узких экранах вместо выхода за рамки страницы */}
        <div className="mb-8 sm:mb-10 md:mb-12 px-4">
          <div
            className="
      flex flex-col
      sm:flex-row
      w-full
      sm:w-fit
      mx-auto
      gap-2
      rounded-3xl
      sm:rounded-full
      border-2
      border-[#12291B]
      bg-white
      p-2
    "
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full sm:w-auto rounded-full px-6 py-3 text-sm sm:text-base font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#FFC531] text-[#12291B]"
                    : "text-[#12291B] hover:bg-[#F3F5EF]"
                }`}
              >
                {getTranslation(tab.labelKey, language)}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "schedule" && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ScheduleList
              entries={scheduleEntries}
              onSelect={setSelectedSpeaker}
            />
          </motion.div>
        )}

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

        {mounted &&
          createPortal(
            <AnimatePresence>
              {selectedSpeaker && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#17351E]/40 backdrop-blur-md p-3 sm:p-6"
                  onClick={() => setSelectedSpeaker(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] sm:rounded-[32px] bg-white p-5 sm:p-8 shadow-2xl"
                  >
                    <div className="mb-5 sm:mb-8 flex flex-col gap-4 sm:gap-6 md:flex-row items-center">
                      <div className="flex-1 min-w-0 w-full">
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <span className="rounded-full bg-[#4CB963]/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase text-[#4CB963]">
                            Главная сцена
                          </span>

                          <button
                            onClick={() => setSelectedSpeaker(null)}
                            className="shrink-0 rounded-xl bg-[#F3F5EF] p-2.5 sm:p-3 hover:bg-[#E8ECE3]"
                          >
                            ✕
                          </button>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#17351E] break-words">
                          {language === "kk"
                            ? (selectedSpeaker.titleKk ?? selectedSpeaker.title)
                            : selectedSpeaker.title}
                        </h2>

                        {selectedSpeaker.image && (
                          <div className="mt-4 flex h-full flex-shrink-0 items-end">
                            <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl">
                              <OptimizedImage
                                src={selectedSpeaker.image}
                                alt={selectedSpeaker.speaker ?? ""}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          </div>
                        )}

                        {selectedSpeaker.speaker && (
                          <p className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold break-words">
                            {language === "kk"
                              ? (selectedSpeaker.speakerKk ??
                                selectedSpeaker.speaker)
                              : selectedSpeaker.speaker}
                          </p>
                        )}

                        {selectedSpeaker.org && (
                          <p className="mt-2 text-sm sm:text-base text-[#66705F] break-words">
                            {language === "kk"
                              ? (selectedSpeaker.orgKk ?? selectedSpeaker.org)
                              : selectedSpeaker.org}
                          </p>
                        )}

                        {(selectedSpeaker.time || selectedSpeaker.location) && (
                          <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-3">
                            {selectedSpeaker.time && (
                              <span className="flex items-center gap-2 rounded-full bg-[#F3F5EF] px-3 py-1.5 sm:px-4 sm:py-2 text-sm text-[#5F675B]">
                                <span>🕒</span>
                                <span>{selectedSpeaker.time}</span>
                              </span>
                            )}

                            {selectedSpeaker.location && (
                              <span className="flex items-center gap-2 rounded-full bg-[#F3F5EF] px-3 py-1.5 sm:px-4 sm:py-2 text-sm text-[#5F675B]">
                                <span>📍</span>
                                <span className="break-words">
                                  {language === "kk"
                                    ? (selectedSpeaker.locationKk ??
                                      selectedSpeaker.location)
                                    : selectedSpeaker.location}
                                </span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-sm sm:text-base leading-6 sm:leading-8 text-[#5F675B] break-words">
                      {language === "kk"
                        ? (selectedSpeaker.descriptionKk ??
                          selectedSpeaker.description)
                        : selectedSpeaker.description}
                    </p>

                    {selectedSpeaker.video && (
                      <div className="mt-5 sm:mt-8">
                        <h3 className="mb-3 sm:mb-4 text-base sm:text-xl font-bold text-[#17351E]">
                          Видео выступления
                        </h3>

                        <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
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
            document.body,
          )}
      </div>
    </section>
  );
}
