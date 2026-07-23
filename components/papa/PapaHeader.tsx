"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/data/translations";
import OptimizedImage from "../ui/OptimizedImage";

interface HeaderProps {
  onMenuClick: () => void;
}

const partners = [
  { src: "/images/logos/iteachme.png", alt: "ITeachMe" },
  { src: "/images/logos/shinhan_bank_kazakhstan.png", alt: "Shinhan Bank" },
  { src: "/images/logos/global_care.png", alt: "GlobalCare" },
  { src: "/images/logos/ineco.png", alt: "InEco Fest" },
];

export default function PapaHeader({ onMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "ru" ? "kk" : "ru");
  };

  const navItems = [
    { href: "#papa-hero", key: "nav.home" },
    { href: "#papa_about", key: "nav.about" },
    { href: "#papa_schedule", key: "nav.program" },
    { href: "#registration", key: "nav.registration" },
  ];

  const burgerColor = isScrolled ? "#12291B" : "#FFFFFF";

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-10 transition-all duration-300"
      style={{
        background: isScrolled ? "rgba(255,255,255,0.82)" : "transparent",
        backdropFilter: isScrolled ? "blur(18px)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(0,0,0,.08)"
          : "1px solid transparent",
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-2 md:py-3 gap-3">
          {/* Логотипы партнеров */}
          <div className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-hide">
            {partners.map((partner) => (
              <div
  className="
    shrink-0
    flex
    h-10 w-10
    sm:h-12 sm:w-12
    md:h-[70px] md:w-[70px]
    items-center
    justify-center
    rounded-xl
    md:rounded-2xl
    border border-black/10
    bg-white
    shadow-lg
    overflow-hidden
  "
>
                <OptimizedImage
                  src={partner.src}
                  alt={partner.alt}
                  width={50}
                  height={50}
                  className="h-full w-full object-contain p-1 transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Десктопная навигация — теперь только от 1367px и выше */}
          <nav className="hidden min-[1367px]:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300"
                style={{
                  color: isScrolled ? "#12291B" : "#FFFFFF",
                }}
                initial={false}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{
                  backgroundColor: isScrolled
                    ? "#f9bf00"
                    : "rgba(255,255,255,0.2)",
                }}
              >
                {getTranslation(item.key, language)}
              </motion.a>
            ))}

            {/* Языковой переключатель */}
            <button
              onClick={toggleLanguage}
              className="flex items-center px-4 py-2 rounded-full text-sm font-bold transition-colors"
              style={{
                fontFamily: '"Baloo 2", sans-serif',
                backgroundColor: "#f9bf00",
                color: "#12291B",
                border: "2px solid #12291B",
              }}
            >
              {language === "ru" ? "RU / KK" : "KK / RU"}
            </button>
          </nav>

          {/* Мобильная / планшетная / до-1367px кнопка меню — минималистичные 3 линии */}
          <button
            onClick={onMenuClick}
            aria-label={getTranslation("nav.menu", language) || "Menu"}
            className="min-[1367px]:hidden shrink-0 flex flex-col items-center justify-center gap-[5px] w-9 h-9"
          >
            <span
              className="block h-[2px] w-6 rounded-full transition-colors duration-300"
              style={{ backgroundColor: burgerColor }}
            />
            <span
              className="block h-[2px] w-6 rounded-full transition-colors duration-300"
              style={{ backgroundColor: burgerColor }}
            />
            <span
              className="block h-[2px] w-6 rounded-full transition-colors duration-300"
              style={{ backgroundColor: burgerColor }}
            />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
