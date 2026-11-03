'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export interface TooltipTextProps {
  term: string;
  explanation: string;
  children?: React.ReactNode;
}

export const TooltipText: React.FC<TooltipTextProps> = ({
  term,
  explanation,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [hAlign, setHAlign] = useState<'center' | 'left' | 'right'>('center');
  const [vAlign, setVAlign] = useState<'top' | 'bottom'>('top');

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

    // 1. Penentuan Horizontal Alignment (Agar tidak condong ke kanan dan tidak terpotong)
    // Jika posisi kata berada di bagian kanan layar (jarak ke kanan < 340px atau melewati 55% lebar layar)
    if (windowWidth - rect.right < 340 || rect.left > windowWidth * 0.55) {
      setHAlign('right'); // Kotak mengembang ke kiri, sisi kanan sejajar dengan kata
    } else if (rect.left < 340) {
      setHAlign('left'); // Kotak mengembang ke kanan, sisi kiri sejajar dengan kata
    } else {
      setHAlign('center'); // Berada di tengah
    }

    // 2. Penentuan Vertical Alignment (Jika terlalu mepet dengan bagian atas viewport)
    if (rect.top < 180) {
      setVAlign('bottom'); // Tampilkan di bawah kata jika di atas sempit
    } else {
      setVAlign('top'); // Default tampil di atas kata
    }
  };

  const handleOpen = () => {
    updatePosition();
    setIsOpen(true);
  };

  return (
    <span
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={handleOpen}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={handleOpen}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      role="button"
      aria-label={`Glosarium: ${term}`}
    >
      {/* Kata Target dengan Garis Bawah Putus-Putus */}
      <span className="font-medium text-white underline decoration-dashed decoration-zinc-500 underline-offset-4 cursor-help hover:decoration-white hover:text-zinc-100 transition-colors duration-200">
        {children || term}
      </span>

      {/* Pop-up Glosarium Mengambang (Glassmorphism Dark SaaS) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: vAlign === 'top' ? 6 : -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: vAlign === 'top' ? 4 : -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 w-72 sm:w-80 max-w-[calc(100vw-32px)] p-3.5 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.08)] pointer-events-none text-left ${
              vAlign === 'top' ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
            } ${
              hAlign === 'right'
                ? 'right-0'
                : hAlign === 'left'
                ? 'left-0'
                : 'left-1/2 -translate-x-1/2'
            }`}
          >
            {/* Top Bar Label Glosarium */}
            <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/[0.06]">
              <span className="text-[10px] font-mono font-medium tracking-wider text-zinc-300 uppercase flex items-center gap-1.5">
                <BookOpen className="h-3 w-3 text-zinc-400" />
                Glosarium Istilah
              </span>
              <span className="text-[9px] font-mono text-zinc-500">Auto-Tooltip</span>
            </div>

            {/* Judul Istilah */}
            <div className="text-xs font-semibold text-white tracking-tight mb-1">
              {term}
            </div>

            {/* Penjelasan Bahasa Sehari-hari */}
            <p className="text-[11px] leading-relaxed text-zinc-300 font-sans text-justify">
              {explanation}
            </p>

            {/* Panah Indikator Penunjuk (Menunjuk Tepat ke Kata) */}
            <div
              className={`absolute w-2 h-2 bg-zinc-900 rotate-45 ${
                vAlign === 'top'
                  ? 'top-full -mt-1 border-r border-b border-white/10'
                  : 'bottom-full -mb-1 border-l border-t border-white/10'
              } ${
                hAlign === 'right'
                  ? 'right-4'
                  : hAlign === 'left'
                  ? 'left-4'
                  : 'left-1/2 -translate-x-1/2'
              }`}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
