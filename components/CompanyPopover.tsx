'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Facebook, Send, Globe } from 'lucide-react';

export interface CompanySocials {
  instagram?: string;
  facebook?: string;
  telegram?: string;
  website?: string;
}

export interface CompanyInfo {
  name: string;
  logo: string;
  description: string;
  descriptionKk?: string;
  socials?: CompanySocials;
}

interface CompanyPopoverProps {
  company: CompanyInfo;
  language?: 'ru' | 'kk';
  children: React.ReactNode;
  align?: 'center' | 'left' | 'right';
}

const POPOVER_WIDTH = 340; // было 256 (w-64) — увеличено
const GAP = 10;
const MARGIN = 12;

export default function CompanyPopover({
  company,
  language = 'ru',
  children,
  align = 'center',
}: CompanyPopoverProps) {
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setIsTouch(!window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();

    let left = rect.left + rect.width / 2 - POPOVER_WIDTH / 2;
    if (align === 'left') left = rect.left;
    if (align === 'right') left = rect.right - POPOVER_WIDTH;

    left = Math.max(MARGIN, Math.min(left, window.innerWidth - POPOVER_WIDTH - MARGIN));

    let top = rect.bottom + GAP;
    // если попап не влезает снизу — показываем сверху триггера
    const estimatedHeight = 240; // увеличено под новый размер
    if (top + estimatedHeight > window.innerHeight - MARGIN) {
      top = rect.top - estimatedHeight - GAP;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // закрытие по клику вне (мобильные)
  useEffect(() => {
    if (!isTouch || !open) return;
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        popoverRef.current && !popoverRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isTouch, open]);

  const handleClick = (e: React.MouseEvent) => {
    if (isTouch) {
      e.stopPropagation();
      setOpen((prev) => !prev);
    }
  };

  const description =
    language === 'kk' && company.descriptionKk ? company.descriptionKk : company.description;

  return (
    <>
      <span
        ref={triggerRef}
        className="cursor-pointer"
        onMouseEnter={() => !isTouch && setOpen(true)}
        onMouseLeave={() => !isTouch && setOpen(false)}
        onClick={handleClick}
      >
        {children}
      </span>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={popoverRef}
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'fixed',
                  top: coords.top,
                  left: coords.left,
                  width: POPOVER_WIDTH,
                  zIndex: 9999,
                }}
                className="rounded-3xl border border-black/5 bg-white p-5 sm:p-6 shadow-2xl"
                onMouseEnter={() => !isTouch && setOpen(true)}
                onMouseLeave={() => !isTouch && setOpen(false)}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 flex items-center gap-3.5">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-2xl bg-[#F3F5EF] flex items-center justify-center">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-lg font-semibold text-[#17351E] break-words leading-tight">
                    {company.name}
                  </p>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-[#5F675B] break-words">
                  {description}
                </p>

                {company.socials && (
                  <div className="flex items-center gap-2.5">
                    {company.socials.instagram && (
                      
                        <a href={company.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-xl bg-[#F3F5EF] p-2.5 text-[#17351E] transition-colors hover:bg-[#E8ECE3]"
                      >
                        <Instagram className="h-5 w-5" strokeWidth={1.5} />
                      </a>
                    )}
                    {company.socials.facebook && (
                      
                        <a href={company.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-xl bg-[#F3F5EF] p-2.5 text-[#17351E] transition-colors hover:bg-[#E8ECE3]"
                      >
                        <Facebook className="h-5 w-5" strokeWidth={1.5} />
                      </a>
                    )}
                    {company.socials.telegram && (
                      
                        <a href={company.socials.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-xl bg-[#F3F5EF] p-2.5 text-[#17351E] transition-colors hover:bg-[#E8ECE3]"
                      >
                        <Send className="h-5 w-5" strokeWidth={1.5} />
                      </a>
                    )}
                    {company.socials.website && (
                      
                        <a href={company.socials.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-xl bg-[#F3F5EF] p-2.5 text-[#17351E] transition-colors hover:bg-[#E8ECE3]"
                      >
                        <Globe className="h-5 w-5" strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}