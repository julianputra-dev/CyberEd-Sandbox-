'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  BookOpen,
  FlaskConical,
  ShieldCheck,
  Zap,
  ArrowRight,
  Terminal,
  Activity,
  Layers,
  Lock,
  Cpu,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
    sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTitleEnter = (e: React.MouseEvent) => {
    updateCoordinates(e.clientX, e.clientY);
    setIsHovered(true);
  };

  const handleTitleLeave = () => {
    setIsHovered(false);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden pt-10 pb-12 md:pt-14 md:pb-16 bg-[#050506]"
    >
      {/* 1. Default Faint Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-radial-mask pointer-events-none opacity-60" />

      {/* 2. Interactive Aurora Grid (Follows cursor movement within a dynamic radius) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out ${
          isHovered ? 'opacity-100' : 'opacity-0'
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
              <linearGradient id="aurora-grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#10b981" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.95" />
                <stop offset="75%" stopColor="#a855f7" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
              </linearGradient>

              <pattern
                id="aurora-grid-pattern"
                width="64"
                height="64"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 64 0 L 0 0 0 64"
                  fill="none"
                  stroke="url(#aurora-grid-grad)"
                  strokeWidth="1.25"
                />
              </pattern>
            </defs>

            <rect
              width="100%"
              height="100%"
              fill="url(#aurora-grid-pattern)"
            />
          </svg>
        </div>
      </div>

      {/* Atmospheric Soft Neutral Light (Top Center) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] max-w-full rounded-full bg-gradient-to-b from-white/[0.05] via-transparent to-transparent blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Main Hero Headline with Interactive Aurora Spotlight on Hover */}
          <div
            className="group/hero-title relative cursor-default select-none py-1"
            onMouseEnter={handleTitleEnter}
            onMouseLeave={handleTitleLeave}
          >
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.1] transition-transform duration-300 group-hover/hero-title:scale-[1.008]"
            >
              Kuasai Keamanan Sistem Informasi{' '}
              <span className="bg-gradient-to-b from-white via-white/95 to-white/45 bg-clip-text text-transparent block sm:inline">
                Tanpa Risiko Merusak Sistem Asli
              </span>
            </motion.h1>
          </div>

          {/* Contextual Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-3.5 max-w-2xl text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans"
          >
            Platform pembelajaran interaktif berbasis web untuk mahasiswa{' '}
            <span className="text-zinc-200 font-medium">Teknik Informatika</span> dan{' '}
            <span className="text-zinc-200 font-medium">Pendidikan Teknik Informatika</span>. 
            Pelajari konsep abstrak lewat <span className="text-zinc-200">animasi mnemonik</span> dan uji keahlian di{' '}
            <span className="text-zinc-200">laboratorium isolasi virtual</span> langsung dari peramban Anda.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full sm:w-auto"
          >
            <Link href="/materi" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto justify-center group font-sans h-9 px-5 text-xs sm:text-sm"
              >
                <BookOpen className="h-3.5 w-3.5 mr-1 text-zinc-950" strokeWidth={1.75} />
                <span>Mulai Belajar Materi Teori</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1 text-zinc-950 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.75} />
              </Button>
            </Link>

            <Link href="/laboratorium" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                className="w-full sm:w-auto justify-center group font-sans h-9 px-5 text-xs sm:text-sm"
              >
                <FlaskConical className="h-3.5 w-3.5 mr-1 text-zinc-300" strokeWidth={1.75} />
                <span>Masuk ke Laboratorium</span>
              </Button>
            </Link>
          </motion.div>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400 font-sans"
          >
            <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.06] rounded-full px-3 py-0.5 text-[11px]">
              <ShieldCheck className="h-3 w-3 text-zinc-400" strokeWidth={1.75} />
              7 Modul Terbuka Bebas
            </span>
            <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.06] rounded-full px-3 py-0.5 text-[11px]">
              <Zap className="h-3 w-3 text-zinc-400" strokeWidth={1.75} />
              Animasi Mnemonik 60 FPS
            </span>
            <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/[0.06] rounded-full px-3 py-0.5 text-[11px]">
              <Lock className="h-3 w-3 text-zinc-400" strokeWidth={1.75} />
              LocalStorage Portabel
            </span>
          </motion.div>

          {/* Telemetry Window Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="mt-8 w-full max-w-4xl relative"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c10]/85 backdrop-blur-2xl p-2 sm:p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              {/* Window Header */}
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.06] mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-white/[0.15]" />
                  <div className="h-2 w-2 rounded-full bg-white/[0.15]" />
                  <div className="h-2 w-2 rounded-full bg-white/[0.15]" />
                  <span className="ml-2 font-mono text-[10px] text-zinc-500">
                    cybered@client-sandbox: ~
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] text-emerald-400 bg-emerald-500/[0.08] border border-emerald-500/20 px-2 py-0.5 rounded">
                    <Activity className="h-2.5 w-2.5 animate-pulse" strokeWidth={1.75} />
                    SANDBOX: ACTIVE
                  </span>
                </div>
              </div>

              {/* Technical Telemetry Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left p-0.5">
                <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">PILAR CIA TRIAD</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white tracking-tight">Status Integritas</div>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                    Kerahasiaan, Integritas, dan Ketersediaan terverifikasi aktif pada memori lokal.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    100% PROTECTED
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">FIREWALL ACL</span>
                    <Layers className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white tracking-tight">Inspeksi Paket Topologi</div>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                    Aturan ACL menyaring trafik port 80/443 dan memisahkan anomali ke zona DMZ.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[9px] font-mono text-zinc-400">
                    <span className="h-1 w-1 rounded-full bg-cyan-400" />
                    TOPOLOGY READY
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">ISOLASI HOST</span>
                    <Cpu className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white tracking-tight">Zero Exploitation Risk</div>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                    Seluruh skenario malware dieksekusi via manipulasi state murni tanpa eksekusi biner.
                  </p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[9px] font-mono text-zinc-400">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    RAM & OS TERISOLASI
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
