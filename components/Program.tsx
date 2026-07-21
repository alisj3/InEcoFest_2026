'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, MapPin, Calendar, Sparkles, TreePine, Flower2, Globe, X } from 'lucide-react';
import { festivalZones, stageEvents, exhibitions } from '@/data/festival-data';
import { entities, type Entity } from '@/data/entities';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';
import { createPortal } from 'react-dom';

type TabType = 'zones' | 'stage' | 'exhibitions';

export default function Program() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('zones');
  const [openedEntity, setOpenedEntity] = useState<Entity | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Блокируем прокрутку страницы при открытой модалке и гарантируем центрирование относительно окна
  useEffect(() => {
    if (!openedEntity) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openedEntity]);

  const tabs = [
    { id: 'zones', labelKey: 'program.tabs.zones', icon: TreePine },
    { id: 'stage', labelKey: 'program.tabs.stage', icon: Sparkles },
    { id: 'exhibitions', labelKey: 'program.tabs.exhibitions', icon: Flower2 }
  ] as const;

  const pick = (ru?: string, kk?: string) => (language === 'kk' ? (kk || ru || '') : (ru || kk || ''));

  const normalize = (value?: string): string =>
    (value || '')
      .toLowerCase()
      .normalize('NFD')
      // убираем диакритики (ğ -> g)
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[«»“”"'`]/g, '')
      .trim();

  // Явные синонимы/варианты написаний → id сущности
  const entityAliasMap: Record<string, string> = {
    'american maker space': 'american-space-almaty',
    'american makerspace': 'american-space-almaty',
    'makerspace almaty': 'makerspace-almaty',
    'american space almaty': 'american-space-almaty',
    'tabigat labs': 'tabigat-labs',
    'tabigatlabs': 'tabigat-labs',
    'айжан беккуловой': 'aizhan-bekkulova',
    'айжан беккулова': 'aizhan-bekkulova'
  };

  const findEntityBySpeaker = (speaker?: string): Entity | null => {
    const source = normalize(speaker?.split(',')[0]);
    if (!source) return null;
    // Проверка по алиасам
    const aliasId = entityAliasMap[source];
    if (aliasId) {
      const byAlias = entities.find((e) => e.id === aliasId);
      if (byAlias) return byAlias;
    }
    return (
      entities.find((e) => {
        const name = normalize(e.name);
        return name.includes(source) || source.includes(name);
      }) || null
    );
  };

  return (
    <section id="program" className="section-padding bg-gradient-to-br from-white/80 to-eco-sage/10 backdrop-blur-sm relative overflow-hidden">
      {/* Декоративные элементы */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="pointer-events-none absolute top-20 right-20 w-40 h-40 bg-eco-green/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="pointer-events-none absolute bottom-20 left-20 w-32 h-32 bg-eco-orange/5 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-[5]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black text-gradient mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {getTranslation('program.title', language)}
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {getTranslation('program.subtitle', language)}
          </motion.p>
        </motion.div>

        {/* Вкладки */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`program-tab flex items-center space-x-3 ${activeTab === tab.id ? 'active' : ''}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="h-5 w-5" />
                <span>{getTranslation(tab.labelKey, language)}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Контент вкладок */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'zones' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {festivalZones.map((zone, index) => (
                  <motion.div
                    key={zone.id}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="card-eco p-8 group"
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-start mb-6">
                      <motion.div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                        style={{ backgroundColor: `${zone.color}20` }}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {zone.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gradient transition-all duration-300">
                          {pick(zone.name, zone.nameKk)}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{pick(zone.description, zone.descriptionKk)}</p>
                      </div>
                    </div>
                    
                      <div className="space-y-4">
                      {zone.activities.map((activity) => (
                        <motion.div 
                          key={activity.id} 
                          className="border-l-4 border-eco-green/30 pl-4 py-3 bg-white/50 rounded-r-lg"
                          whileHover={{ borderLeftColor: zone.color, backgroundColor: `${zone.color}10` }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-lg">{pick(activity.title, activity.titleKk)}</h4>
                              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{pick(activity.description, activity.descriptionKk)}</p>
                              {activity.speaker && (
                                <div className="flex items-center mt-3 text-sm text-gray-500">
                                  <User className="h-4 w-4 mr-2" />
                                    <button
                                      type="button"
                                      className="font-medium underline decoration-dotted hover:text-eco-green inline-flex items-center px-1 py-0.5 rounded border border-eco-green/20 hover:border-eco-green/40 focus:outline-none focus:ring-2 focus:ring-eco-green/50"
                                      onClick={() => {
                                        const found = findEntityBySpeaker(activity.speaker);
                                        if (found) {
                                          setOpenedEntity(found);
                                        } else {
                                          // Fallback: открыть модалку даже без каталога entities
                                          setOpenedEntity({
                                            id: `ad-hoc-${activity.id}`,
                                            name: pick(activity.speaker, activity.speakerKk) || 'Информация',
                                            shortRu: activity.description,
                                            shortKk: activity.descriptionKk
                                          } as unknown as Entity);
                                        }
                                      }}
                                    >
                                      {pick(activity.speaker, activity.speakerKk)}
                                    </button>
                                </div>
                              )}
                            </div>
                            <div className="text-right ml-6 pr-2">
                              <motion.div 
                                className="text-lg sm:text-xl font-bold text-gradient whitespace-nowrap"
                                whileHover={{ scale: 1.1 }}
                              >
                                {activity.time}
                              </motion.div>
                              <div className="text-[10px] sm:text-xs text-gray-500 mt-1 font-medium whitespace-nowrap">
                                {activity.duration}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'stage' && (
              <div className="max-w-5xl mx-auto">
                <motion.div 
                  className="card-eco p-8 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-black text-gradient mb-4">{language === 'kk' ? 'Басты сахна' : 'Главная сцена'}</h3>
                    <p className="text-lg text-gray-700">Официальные церемонии, лекции и тренинги от спикеров, фильмы, концерт и лечебная музыка</p>
                  </div>
                  <div className="space-y-6">
                    {stageEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{pick(event.title, event.titleKk)}</h4>
                            <p className="text-gray-700 mb-4 leading-relaxed">{pick(event.description, event.descriptionKk)}</p>
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="h-4 w-4 mr-2" />
                              <span className="font-medium">{pick(event.speaker, event.speakerKk)}</span>
                            </div>
                          </div>
                          <div className="text-right ml-6 pr-4">
                            <motion.div 
                              className="text-3xl font-black text-gradient"
                              whileHover={{ scale: 1.1 }}
                            >
                              {event.time}
                            </motion.div>
                            <div className="text-sm text-gray-600 mt-2 font-medium">
                              {event.duration}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'exhibitions' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {exhibitions.map((exhibition, index) => (
                  <motion.div
                    key={exhibition.id}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card-eco p-8 group"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gradient transition-all duration-300">
                      {pick(exhibition.title, exhibition.titleKk)}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{pick(exhibition.description, exhibition.descriptionKk)}</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-3 text-eco-green" />
                        <span className="font-medium">{exhibition.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-3 text-eco-orange" />
                        <span className="font-medium">{pick(exhibition.location, exhibition.locationKk)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Кнопка скачивания программы */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            href={language === 'kk' ? '/program-kk.docx' : '/program-ru.docx'}
            download={language === 'kk' ? 'InEco_Fest_2025_Baғdarlama.docx' : 'InEco_Fest_2025_Программа.docx'}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-xl px-12 py-5 font-bold inline-flex items-center cursor-pointer"
          >
            <Calendar className="h-6 w-6 mr-3" />
            Скачать полную программу (DOCX)
          </motion.a>
        </motion.div>
      </div>

      {/* Модальное окно сущности через портал в body (исключаем влияние transform у родителей) */}
      {isClient && createPortal(
        <AnimatePresence>
          {openedEntity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setOpenedEntity(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <h3 className="text-xl font-bold">{openedEntity.name}</h3>
                  <button className="p-2 rounded-xl hover:bg-gray-100" onClick={() => setOpenedEntity(null)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6">
                  {Array.isArray((openedEntity as any).images) && (openedEntity as any).images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(openedEntity as any).images.map((src: string) => (
                        <div key={src} className="rounded-2xl border p-3">
                          <img src={src} alt={openedEntity.name} className="w-full h-auto rounded-xl" />
                        </div>
                      ))}
                    </div>
                  ) : openedEntity.image ? (
                    <img src={openedEntity.image} alt={openedEntity.name} className="w-full h-auto rounded-2xl border" />
                  ) : (
                    <div className="w-full h-48 rounded-2xl border border-dashed flex items-center justify-center text-gray-400 select-none" aria-label={pick('Фото отсутствует','Фото жоқ')}>
                      {pick('Фото отсутствует','Фото жоқ')}
                    </div>
                  )}
                </div>
                <div className="px-6 pb-6 text-gray-700 leading-relaxed whitespace-pre-line">
                  {pick(
                    (openedEntity as any).fullRu || (openedEntity as any).shortRu || (openedEntity as any).description,
                    (openedEntity as any).fullKk || (openedEntity as any).shortKk || (openedEntity as any).description
                  )}
                </div>
                {openedEntity.links && openedEntity.links.length > 0 && (
                  <div className="px-6 pb-6 flex flex-wrap gap-3">
                    {openedEntity.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="btn-outline text-sm px-4 py-2">
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
} 