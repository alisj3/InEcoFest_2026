"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "./ui/OptimizedImage";
import Daniel from "../public/images/Daniel_James.webp";
import Mezzo from "../public/images/Mezzo.webp";
import Abilay from "../public/images/Abilay.webp";
import Aiman from "../public/images/Aiman.webp";
import Madina from "../public/images/Madina.webp";
import Twiano from "../public/images/Twiano.webp";
import Dmitriy from "../public/images/Dmitriy.webp";
import { HalftoneBackground } from "./decor/SectionBackgrounds";
import { getTranslation } from "@/data/translations";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatItem {
  value: string;
  labelKey: string;
}

interface SocialLink {
  label: string;
  href: string;
}

interface Performer {
  id: string;
  name: string;
  image: string;
  imageSide: "left" | "right";
  accent: {
    bg: string;
    blur: string;
    badgeBorder: string;
    badgeText: string;
  };
  keys: {
    badge: string;
    role: string;
    description: string;
    mood: string;
    tags: string;
  };
  stats: StatItem[];
  socials?: SocialLink[];
}

// Чтобы добавить нового участника — просто добавьте ещё один объект в этот массив.
const performers: Performer[] = [
  {
    id: "daniel",
    name: "Даниэль Джеймс",
    image: Daniel.src,
    imageSide: "right",
    accent: {
      bg: "#388c67",
      blur: "#C9A15A",
      badgeBorder: "#C9A15A",
      badgeText: "#F6D48D",
    },
    keys: {
      badge: "host.badge",
      role: "host.role",
      description: "host.description",
      mood: "host.mood",
      tags: "host.tags",
    },
    stats: [
      { value: "5", labelKey: "host.stats.experience" },
      { value: "70+", labelKey: "host.stats.events" },
      { value: "20+", labelKey: "host.stats.clients" },
      { value: "5000+", labelKey: "host.stats.guests" },
    ],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/danieljames.kz/",
      },
      {
        label: "Threads",
        href: "https://www.threads.com/@danieljames.kz",
      },
    ],
  },
  {
    id: "mezzo",
    name: "MEZZO",
    image: Mezzo.src,
    imageSide: "left",
    accent: {
      bg: "#388c67",
      blur: "#6FA0B8",
      badgeBorder: "#6FA0B8",
      badgeText: "#BFE7F5",
    },
    keys: {
      badge: "mezzo.badge",
      role: "mezzo.role",
      description: "mezzo.description",
      mood: "mezzo.mood",
      tags: "mezzo.tags",
    },
    stats: [
      { value: "13", labelKey: "mezzo.stats.experience" },
      { value: "4", labelKey: "mezzo.stats.events" },
      { value: "10+", labelKey: "mezzo.stats.clients" },
      { value: "330.000", labelKey: "mezzo.stats.guests" },
    ],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/mezzo_kz/",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/user/mezzokz",
      },
    ],
  },
  {
    id: "dance",
    name: "JOLDA DANCE THEATRE",
    image: "/images/Jolda.webp",
    imageSide: "right",
    accent: {
      bg: "#388c67",
      blur: "#FF6B4A",
      badgeBorder: "#FF6B4A",
      badgeText: "#FFD9CC",
    },
    keys: {
      badge: "dance.badge",
      role: "dance.role",
      description: "dance.description",
      mood: "dance.mood",
      tags: "dance.tags",
    },
    stats: [
      { value: "2020", labelKey: "dance.stats.experience" },
      { value: "3", labelKey: "dance.stats.events" },
      { value: "4", labelKey: "dance.stats.clients" },
      { value: "1", labelKey: "dance.stats.guests" },
    ],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/jolda_/",
      },
    ],
  },
  {
    id: "abylay",
    name: "Абылай Исин",
    image: Abilay.src,
    imageSide: "right",
    accent: {
      bg: "#388c67",
      blur: "#C9A15A",
      badgeBorder: "#C9A15A",
      badgeText: "#F6D48D",
    },
    keys: {
      badge: "abylay.badge",
      role: "abylay.role",
      description: "abylay.description",
      mood: "abylay.mood",
      tags: "abylay.tags",
    },
    stats: [
      { value: "10", labelKey: "abylay.stats.experience" },
      { value: "14", labelKey: "abylay.stats.journalism" },
      // { value: "0", labelKey: "abylay.stats.clients" },
      // { value: "0", labelKey: "abylay.stats.media" },
    ],
    socials: [
      {
        label: "Phone",
        href: "tel:+77073688650",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/abylai.isin/",
      },
    ],
  },
  {
    id: "inclusive-founder",
    name: "Айман Молдабекова",
    image: Aiman.src,
    imageSide: "right",
    accent: {
      bg: "#388c67",
      blur: "#C9A15A",
      badgeBorder: "#C9A15A",
      badgeText: "#F6D48D",
    },
    keys: {
      badge: "inclusive.badge",
      role: "inclusive.role",
      description: "inclusive.description",
      mood: "inclusive.mood",
      tags: "inclusive.tags",
    },
    stats: [
      { value: "30", labelKey: "inclusive.stats.forbes" },
    ],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/aymanulya/",
      },
    ],
  },
  {
    id: "madina",
    name: "Мадина Ашилова",
    image: Madina.src,
    imageSide: "right",
    accent: {
      bg: "#388c67",
      blur: "#C9A15A",
      badgeBorder: "#C9A15A",
      badgeText: "#F6D48D",
    },
    keys: {
      badge: "glacier.badge",
      role: "glacier.role",
      description: "glacier.description",
      mood: "glacier.mood",
      tags: "glacier.tags",
    },
    stats: [
      { value: "20+", labelKey: "glacier.stats.hiked" },
      { value: "2", labelKey: "glacier.stats.countries" },
    ],
  },
  {
    id: "twiano",
    name: "Twiano",
    image: Twiano.src,
    imageSide: "right",
    accent: {
      bg: "#388c67",
      blur: "#C9A15A",
      badgeBorder: "#C9A15A",
      badgeText: "#F6D48D",
    },
    keys: {
      badge: "twiano.badge",
      role: "twiano.role",
      description: "twiano.description",
      mood: "twiano.mood",
      tags: "twiano.tags",
    },
    stats: [
      { value: "2", labelKey: "twiano.stats.pianists" },
    ],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/twiano.duet",
      },
    ],
  },
  {
    id: "dmitriy",
    name: "Дмитрий Гребенкин",
    image: Dmitriy.src,
    imageSide: "right",
    accent: {
      bg: "#388c67",
      blur: "#C9A15A",
      badgeBorder: "#C9A15A",
      badgeText: "#F6D48D",
    },
    keys: {
      badge: "dmitriy.badge",
      role: "dmitriy.role",
      description: "dmitriy.description",
      mood: "dmitriy.mood",
      tags: "dmitriy.tags",
    },
    stats: [
      { value: "0", labelKey: "dmitriy.stats.shows" },
      { value: "0", labelKey: "dmitriy.stats.years" },
    ],
    socials: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/dmitriy",
      },
    ],
  },
];

const AUTOPLAY_MS = 8000;

export default function PerformersCarousel() {
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  const goTo = useCallback((newIndex: number, dir: number) => {
    setDirection(dir);
    setIndex((newIndex + performers.length) % performers.length);
  }, []);

  const manualGoTo = useCallback(
    (newIndex: number, dir: number) => {
      goTo(newIndex, dir);
      setResetSignal((s) => s + 1);
    },
    [goTo],
  );

  // Следим, находится ли секция во вьюпорте — автоплей идёт только когда слайдер виден
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % performers.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, inView, resetSignal]);

  const performer = performers[index];

  const imageBlock = (
    <div className="relative flex justify-center">
      <div
        className="pointer-events-none absolute h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ backgroundColor: `${performer.accent.blur}33` }}
      />
      <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/10 backdrop-blur">
        <OptimizedImage src={performer.image} alt={performer.name} />
      </div>
      <div
        className={`absolute bottom-8 ${performer.imageSide === "right" ? "left-8" : "right-8"} rounded-2xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur`}
      >
        <div
          className="text-sm uppercase tracking-[0.25em]"
          style={{ color: performer.accent.badgeText }}
        >
          Live
        </div>
        <div className="mt-1 text-xl font-bold text-white">
          {getTranslation(performer.keys.mood, language)}
        </div>
        <div className="text-white/60">
          {getTranslation(performer.keys.tags, language)}
        </div>
      </div>
    </div>
  );

  const textBlock = (
    <div>
      <span
        className="inline-flex rounded-full border bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em]"
        style={{
          borderColor: `${performer.accent.badgeBorder}66`,
          color: performer.accent.badgeText,
        }}
      >
        {getTranslation(performer.keys.badge, language)}
      </span>

      <h1 className="mt-6 text-5xl font-black leading-none text-white md:text-5xl">
        {performer.name}
      </h1>

      <div className="mt-5 text-lg text-white">
        {getTranslation(performer.keys.role, language)}
      </div>

      <p className="mt-8 max-w-xl text-lg leading-8 text-white">
        {getTranslation(performer.keys.description, language)}
      </p>

      {performer.socials && performer.socials.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">
          {performer.socials.map((social) => (
            
              <a key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
            >
              {social.label}
            </a>
          ))}
        </div>
      )}

      <div className="mt-16 mx-auto grid max-w-2xl grid-cols-2 gap-3">
        {performer.stats.map((item) => (
          <div
            key={item.labelKey}
            className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur"
          >
            <div className="text-xl md:text-2xl font-bold text-white leading-none">
              {item.value}
            </div>

            <div className="mt-2 text-xs leading-4 text-white break-words">
              {getTranslation(item.labelKey, language)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 transition-colors duration-700"
      style={{ backgroundColor: performer.accent.bg }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <HalftoneBackground />

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />
      <div
        className="absolute right-0 bottom-0 h-96 w-96 rounded-full blur-[150px] transition-colors duration-700"
        style={{ backgroundColor: `${performer.accent.blur}33` }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-6xl font-black leading-tight text-[#f9bf00] break-words">
            {getTranslation("performers.badge", language)}
          </h2>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={performer.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="grid items-center gap-20 lg:grid-cols-2"

            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(e, info) => {
              const swipe = info.offset.x;

              if (swipe < -80) {
                manualGoTo(index + 1, 1);
              }

              if (swipe > 80) {
                manualGoTo(index - 1, -1);
              }
            }}
          >
            {performer.imageSide === "left" ? (
              <>
                {imageBlock}
                {textBlock}
              </>
            ) : (
              <>
                {textBlock}
                {imageBlock}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Навигация */}
        <div className="mt-14 flex items-center justify-center gap-6">
          <button
            onClick={() => manualGoTo(index - 1, -1)}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2">
            {performers.map((p, i) => (
              <button
                key={p.id}
                onClick={() => manualGoTo(i, i > index ? 1 : -1)}
                aria-label={p.name}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? "28px" : "10px",
                  backgroundColor:
                    i === index ? "#fff" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => manualGoTo(index + 1, 1)}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}