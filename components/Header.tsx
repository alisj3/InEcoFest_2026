'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';
import OptimizedImage from './ui/OptimizedImage';

interface HeaderProps {
  onMenuClick: () => void;
}

const partners = [
  { src: '/images/logos/chevron.png', alt: 'Chevron' },
  { src: '/images/logos/iteachme.png', alt: 'ITeachMe' },
  { src: '/images/logos/ineco.png', alt: 'InEco Fest' },
  { src: '/images/logos/botsad.png', alt: 'Ботанический сад' },
  { src: '/images/logos/institute.png', alt: 'Институт ботаники и фитоинтродукции' },
];

export default function Header({ onMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'kk' : 'ru');
  };

  const navItems = [
    { href: '#home', key: 'nav.home' },
    { href: '#about', key: 'nav.about' },
    { href: '#program', key: 'nav.program' },
    { href: '#map', key: 'nav.map' },
    { href: '#contact', key: 'nav.contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-10 transition-all duration-300"
      style={{
        background: isScrolled ? 'rgba(255,255,255,0.82)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(18px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0,0,0,.08)' : '1px solid transparent',
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-3">
          {/* Логотипы партнеров */}
          <div className="flex items-center space-x-3">
            {partners.map((partner) => (
              <div
                key={partner.alt}
                className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md transition hover:bg-white/20"
              >
                <OptimizedImage
                  src={partner.src}
                  alt={partner.alt}
                  width={50}
                  height={50}
                  className="w-full h-full object-contain p-1"
                />
              </div>
            ))}
          </div>

          {/* Десктопная навигация */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="rounded-full px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300"
                style={{
                  color: isScrolled ? '#12291B' : '#FFFFFF',
                }}
                initial={false}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{
                  backgroundColor: isScrolled ? '#FFC531' : 'rgba(255,255,255,0.2)',
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
                backgroundColor: '#FFC531',
                color: '#12291B',
                border: '2px solid #12291B',
              }}
            >
              {language === 'ru' ? 'RU / KK' : 'KK / RU'}
            </button>
          </nav>

          {/* Мобильная кнопка меню */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl"
            style={{
              backgroundColor: '#FFC531',
              border: '2px solid #12291B',
              color: '#12291B',
            }}
          >
            <Menu className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}