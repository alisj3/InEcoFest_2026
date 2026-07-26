'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Leaf, 
  Heart,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  TreePine,
  Flower2,
  Speaker
} from 'lucide-react';
import { festivalInfo } from '@/data/festival-data';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Program from '@/components/Program';
import InteractiveMap from '@/components/InteractiveMap';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';
import HostProfile from '@/components/Daniel';
import Speakers from '@/components/Speakers';
import { NatureBackground } from '@/components/decor/SectionBackgrounds';
import Gallery from '@/components/Gallery';
import MezzoProfile from '@/components/Mezzo';
import PerformersCarousel from '@/components/PerformersCarousel';
import EntryFeeNotice from "@/components/EntryFeeNotice";
import PapaPromo from '@/components/PapaPromo';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [leaves, setLeaves] = useState<Array<{id: number, left: number, delay: number, type: string}>>([]);
  const { language } = useLanguage();

  useEffect(() => {
    // Уменьшено количество декоративных элементов (было 25) — это одна из главных причин лагов
    const newLeaves = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      type: ['leaf', 'flower', 'sparkle'][Math.floor(Math.random() * 3)]
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-cream via-white to-eco-sage/20 relative overflow-x-hidden">
      {/* Анимированные элементы фона */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className={`absolute ${leaf.type === 'leaf' ? 'leaf' : leaf.type === 'flower' ? 'flower' : 'sparkle'}`}
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${12 + Math.random() * 8}s`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: leaf.delay * 0.1 }}
        />
      ))}

      {/* Плавающие элементы природы — оставлен только один, остальные убраны для производительности */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 text-eco-green/20 hidden md:block"
      >
        <TreePine size={60} />
      </motion.div>

      {/* Мобильное меню (рендерим только когда открыто, чтобы не перекрывать контент при проблемах со стилями) */}
      {isMenuOpen && (
        <div className="mobile-menu fixed inset-0 z-50 min-[1367px]:hidden open">
          <div className="flex justify-between items-center p-6 border-b border-eco-green/20">
            <motion.h2 
              className="text-2xl font-bold text-gradient"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              InEco Fest
            </motion.h2>
            <motion.button 
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-eco-green/10 hover:bg-eco-green/20 transition-colors"
            >
              <X className="h-6 w-6 text-eco-green" />
            </motion.button>
          </div>
          <nav className="p-6 space-y-4">
            {[
              { href: '#about', label: 'О фестивале' },
              { href: '#program', label: 'Программа' },
              { href: '#map', label: 'Карта' },
              { href: '#partners', label: 'Партнеры' },
              { href: '#contact', label: 'Контакты' }
            ].map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="block py-3 px-4 text-lg font-medium rounded-2xl hover:bg-eco-green/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </div>
      )}

      {/* Основной контент */}
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* <EntryFeeNotice /> */}

        {/* 2. Даты / о фестивале */}
        <About />

        {/* 3. Обратный отсчёт до даты фестиваля */}
        <section
          id="countdown"
          className="relative overflow-hidden pt-16 pb-14 sm:pt-28 sm:pb-20 md:pt-44 md:pb-32"
          style={{ background: 'linear-gradient(180deg, #388c67 0%, #388c67 100%)' }}
        >
          <NatureBackground />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[
              { top: '10%', left: '8%', size: 16, color: '#f9bf00' },
              { top: '20%', left: '90%', size: 20, color: '#FF6B4A' },
              { top: '80%', left: '5%', size: 14, color: '#FFFFFF' },
            ].map((dot, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                className="absolute rounded-full opacity-70"
                style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, backgroundColor: dot.color }}
              />
            ))}
          </div>

          <div className="container-custom relative z-[5]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2
                className="text-2xl sm:text-4xl md:text-6xl mb-4 sm:mb-20 mt-2 sm:mt-0"
                style={{ fontFamily: 'var(--font-cera)', fontWeight: 700, color: '#f9bf00', textShadow: '3px 3px 0 rgba(0,0,0,0.12)' }}
              >
                {getTranslation('countdown.title', language)}
              </h2>
              <CountdownTimer targetDate="2026-08-07T11:00:00" />
            </motion.div>
          </div>
        </section>

        {/* 4. Карта и программа */}
        <InteractiveMap />
{/* 
        <HostProfile />

        <MezzoProfile /> */}

        <PerformersCarousel />

        <Speakers />

        <PapaPromo />
        
        {/* <Program /> */}
        <Gallery />
        
        <Partners />
        
        <Contact />
      </main>

      <Footer />
    </div>
  );
}