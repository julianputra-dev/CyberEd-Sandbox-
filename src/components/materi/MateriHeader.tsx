'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';

export interface MateriHeaderProps {
  completedTheoryCount: number;
  totalModules?: number;
}

export const MateriHeader: React.FC<MateriHeaderProps> = ({
  completedTheoryCount,
  totalModules = 7,
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const [isAuroraHovered, setIsAuroraHovered] = useState(false);

  // Dynamic cursor tracking for interactive Aurora Grid animation
  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    headerRef.current.style.setProperty('--mouse-x', `${x}px`);
    headerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleHeaderMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTitleEnter = (e: React.MouseEvent) => {
    updateCoordinates(e.clientX, e.clientY);
    setIsAuroraHovered(true);
  };

  const handleTitleLeave = () => {
    setIsAuroraHovered(false);
  };

  const progressPercent = Math.round((completedTheoryCount / totalModules) * 100);

  return (
    <section
      ref={headerRef}
      onMouseMove={handleHeaderMouseMove}
      className="relative overflow-hidden pt-10 pb-10 md:pt-14 md:pb-12 border-b border-white/[0.06] bg-[#050506]"
    >
      {/* Default Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-radial-mask pointer-events-none opacity-40" />

      {/* Interactive Aurora Grid (Follows cursor movement within a dynamic radius) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out ${
          isAuroraHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Soft Ambient Aurora Backdrop Glow strictly within cursor radius */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(320px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(6,182,212,0.22) 0%, rgba(16,185,129,0.18) 25%, rgba(99,102,241,0.2) 50%, rgba(168,85,247,0.16) 75%, transparent 100%)',
            filter: 'blur(50px)',
          }}
        />

        {/* SVG Grid with Aurora Gradient, masked to cursor position radius */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage:
              'radial-gradient(300px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(300px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="aurora-grid-grad-materi" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#10b981" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#a855f7" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
              </linearGradient>

              <pattern
                id="aurora-grid-pattern-materi"
                width="64"
                height="64"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 64 0 L 0 0 0 64"
                  fill="none"
                  stroke="url(#aurora-grid-grad-materi)"
                  strokeWidth="1.25"
                />
              </pattern>
            </defs>

            <rect
              width="100%"
              height="100%"
              fill="url(#aurora-grid-pattern-materi)"
            />
          </svg>
        </div>
      </div>

      {/* Atmospheric Soft Light (Top Center) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[260px] w-[500px] max-w-full rounded-full bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          {/* Title Section with Aurora Hover Trigger */}
          <div
            className="group/materi-title relative cursor-default select-none max-w-3xl"
            onMouseEnter={handleTitleEnter}
            onMouseLeave={handleTitleLeave}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge variant="default" dot className="mb-2.5">
                Ruang Teori Mnemonik • {totalModules} Modul Terbuka Bebas
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.035em] text-white leading-[1.15] transition-transform duration-300 group-hover/materi-title:scale-[1.006]">
                Katalog Materi Teori{' '}
                <span className="bg-gradient-to-b from-white via-white/90 to-white/45 bg-clip-text text-transparent">
                  Keamanan Sistem Informasi
                </span>
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl font-sans">
                Pelajari konsep fundamental keamanan siber tanpa kelelahan membaca teks panjang. Setiap bab dirancang ringkas (maksimal 2 paragraf per konsep), dilengkapi glosarium interaktif dan visualisasi mnemonik responsif.
              </p>
            </motion.div>
          </div>

          {/* Live Progress Summary Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 sm:p-5 shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] min-w-[270px]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                Progres Teori
              </span>
              <span className="font-mono text-xs font-semibold text-white">
                {completedTheoryCount}/{totalModules} Modul Selesai
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="h-full bg-gradient-to-r from-zinc-300 to-white rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Akses Tanpa Gembok</span>
              </span>
              <span className="font-mono text-zinc-300">
                {progressPercent}%
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

