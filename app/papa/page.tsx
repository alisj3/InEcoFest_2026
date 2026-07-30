'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PapaHero from '@/components/papa/PapaHero';
import PapaConcept from '@/components/papa/PapaConcept';
import PapaSchedule from '@/components/papa/PapaSchedule';
import PapaResults from '@/components/papa/PapaParticipation';
import PapaParticipation from '@/components/papa/PapaParticipation';
import PapaHeader from '@/components/papa/PapaHeader';
import PapaPartners from '@/components/papa/PapaPartners';
import PapaGallery from '@/components/papa/PapaGallery';

export default function PapaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
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
              { href: '/#about', label: 'О фестивале' },
              { href: '/#program', label: 'Программа' },
              { href: '/#map', label: 'Карта' },
              { href: '/#partners', label: 'Партнеры' },
              { href: '/#contact', label: 'Контакты' },
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

      <PapaHeader onMenuClick={() => setIsMenuOpen(true)} />

      <main>
        <PapaHero />
        <PapaConcept />
        <PapaSchedule />
        <PapaParticipation />
        <PapaGallery />
        <PapaPartners/>
      </main>

      <Footer />
    </div>
  );
}