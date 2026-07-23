'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NatureBackground } from './decor/SectionBackgrounds';
import OptimizedImage from './ui/OptimizedImage';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';

interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  altKk: string;
}

const photos: GalleryPhoto[] = [
  {
    id: 'g1',
    src: '/images/gallery/1.webp',
    alt: 'Яркие моменты фестиваля',
    altKk: 'Фестивальдің жарқын сәттері',
  },
  {
    id: 'g2',
    src: '/images/gallery/2.webp',
    alt: 'Хорошее настроение',
    altKk: 'Көтеріңкі көңіл-күй',
  },
  {
    id: 'g3',
    src: '/images/gallery/3.webp',
    alt: 'Вдохновение природой',
    altKk: 'Табиғаттан шабыт',
  },
  {
    id: 'g4',
    src: '/images/gallery/4.webp',
    alt: 'Улыбки гостей',
    altKk: 'Қонақтардың күлкісі',
  },
  {
    id: 'g5',
    src: '/images/gallery/5.webp',
    alt: 'Творческая атмосфера',
    altKk: 'Шығармашылық атмосфера',
  },
  {
    id: 'g6',
    src: '/images/gallery/6.webp',
    alt: 'Незабываемые эмоции',
    altKk: 'Ұмытылмас әсерлер',
  },
  {
    id: 'g7',
    src: '/images/gallery/7.webp',
    alt: 'Единение с природой',
    altKk: 'Табиғатпен үндестік',
  },
  {
    id: 'g8',
    src: '/images/gallery/8.webp',
    alt: 'Семейный отдых',
    altKk: 'Отбасылық демалыс',
  },
  {
    id: 'g9',
    src: '/images/gallery/9.webp',
    alt: 'Интересные открытия',
    altKk: 'Қызықты жаңалықтар',
  },
  {
    id: 'g10',
    src: '/images/gallery/10.webp',
    alt: 'Живая атмосфера',
    altKk: 'Жанды атмосфера',
  },
  {
    id: 'g11',
    src: '/images/gallery/11.webp',
    alt: 'Красота природы',
    altKk: 'Табиғаттың сұлулығы',
  },
  {
    id: 'g12',
    src: '/images/gallery/12.webp',
    alt: 'Вместе ярче',
    altKk: 'Бірге қызығырақ',
  },
];

export default function Gallery() {
  const { language } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === 'ArrowLeft') setSelectedIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#388c67] py-28">
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
            {getTranslation('gallery.badge', language)}
          </span>
          <h2 className="mt-6 text-5xl font-black leading-tight text-white md:text-6xl">{getTranslation('gallery.title', language)}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            {getTranslation('gallery.subtitle', language)}
          </p>
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (i % 8) * 0.03 }}
              onClick={() => setSelectedIndex(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-3xl border border-white/20 bg-white/10"
            >
              <OptimizedImage
                src={photo.src}
                alt={language === 'kk' ? photo.altKk : photo.alt}
                width={480}
                height={480}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[#12291B]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="p-4 text-left text-sm font-semibold text-white">{language === 'kk' ? photo.altKk : photo.alt}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedIndex !== null && photos[selectedIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#17351E]/80 backdrop-blur-md p-6"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl"
              >
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute -top-14 right-0 rounded-xl bg-white/10 p-3 text-white hover:bg-white/20"
                  aria-label="Закрыть"
                >
                  ✕
                </button>

                <div className="overflow-hidden rounded-[32px] bg-white">
                  <OptimizedImage
                    src={photos[selectedIndex].src}
                    alt={
                      language === 'kk'
                        ? photos[selectedIndex].altKk
                        : photos[selectedIndex].alt
                    }
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[75vh] object-contain"
                  />
                  <p className="p-5 text-center font-semibold text-[#17351E]">{photos[selectedIndex].alt}</p>
                </div>

                <button
                  onClick={() => setSelectedIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#12291B] hover:bg-white"
                  aria-label="Предыдущее фото"
                >
                  ←
                </button>
                <button
                  onClick={() => setSelectedIndex((i) => (i === null ? i : (i + 1) % photos.length))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#12291B] hover:bg-white"
                  aria-label="Следующее фото"
                >
                  →
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}