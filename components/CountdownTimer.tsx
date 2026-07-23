'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Timer, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/data/translations';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDateTime = new Date(targetDate + '+05:00');
      const now = new Date();
      const difference = targetDateTime.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: getTranslation('countdown.days', language), icon: Calendar, accent: '#1F3626' },
    { value: timeLeft.hours, label: getTranslation('countdown.hours', language), icon: Clock, accent: '#C1622D' },
    { value: timeLeft.minutes, label: getTranslation('countdown.minutes', language), icon: Timer, accent: '#6FA0B8' },
    { value: timeLeft.seconds, label: getTranslation('countdown.seconds', language), icon: Leaf, accent: '#D9A441' },
  ];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div
        className="absolute top-[26px] left-0 right-0 hidden md:block"
        style={{ borderTop: '1px dashed rgba(255,255,255,0.35)' }}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {timeUnits.map((unit, index) => {
          const IconComponent = unit.icon;
          return (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              <div
                className="mx-auto mb-2 sm:mb-4 rounded-full flex items-center justify-center relative z-[5] w-10 h-10 sm:w-[52px] sm:h-[52px]"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: `2px solid #12291B`,
                }}
              >
                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: unit.accent }} strokeWidth={1.5} />
              </div>

              <motion.div
                key={unit.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl mb-1 tabular-nums font-bold"
                style={{ color: '#fff' }}
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.div>

              <div
                className="text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase"
                style={{ color: '#fff' }}
              >
                {unit.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}