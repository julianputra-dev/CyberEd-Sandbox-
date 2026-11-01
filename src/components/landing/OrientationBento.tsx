'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ShieldAlert,
  Sparkles,
  Zap,
  Cpu,
  Layers,
  HelpCircle,
  Clock,
  Eye,
  SlidersHorizontal,
  Check,
} from 'lucide-react';

export const OrientationBento: React.FC = () => {
  return (
    <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#050506] font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
          <Badge variant="default" dot className="mb-2">
            Filosofi Pedagogi
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
            Mengapa & Bagaimana CyberEd Sandbox Berbeda
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Menghilangkan beban server, ancaman infeksi sistem nyata, dan kejenuhan slide pasif.
          </p>
        </div>

        {/* True Asymmetric Bento Grid (12-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5">
          {/* Card 1: Safe Sandbox (Spans 7 cols on LG) */}
          <Card
            glowEffect
            glowColor="emerald"
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <CardHeader className="p-4 sm:p-5 pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="emerald" dot>
                  Zero Host Risk
                </Badge>
                <ShieldAlert className="h-4 w-4 text-zinc-400" strokeWidth={1.75} />
              </div>
              <CardTitle className="text-base sm:text-lg text-white">
                Tanpa Risiko Merusak Sistem Operasi Mahasiswa
              </CardTitle>
              <CardDescription className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
                Praktikum keamanan tradisional kerap menuntut instalasi VM yang berat atau eksekusi sampel berbahaya di laptop lokal. Di sini, seluruh manipulasi berjalan di memori peramban tanpa risiko infeksi nyata.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 pt-0">
              {/* Visual Mock: Host OS vs Browser Sandbox */}
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-3 font-mono text-xs shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 mb-2">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Cpu className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
                    <span className="text-[10px]">ISOLASI HOST OS</span>
                  </div>
                  <span className="text-emerald-400 text-[9px] font-semibold bg-emerald-500/[0.08] px-2 py-0.5 rounded border border-emerald-500/20">
                    SANDBOX TERKUNCI
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400">
                  <div className="bg-white/[0.015] p-2 rounded-lg border border-white/[0.04]">
                    <span className="text-[9px] text-zinc-500 block uppercase">Metode Tradisional</span>
                    <span className="text-zinc-400 font-sans text-xs">Instalasi biner berbahaya berisiko merusak registry & storage.</span>
                  </div>
                  <div className="bg-emerald-500/[0.04] p-2 rounded-lg border border-emerald-500/20">
                    <span className="text-[9px] text-emerald-400 block uppercase">CyberEd Sandbox</span>
                    <span className="text-zinc-200 font-sans text-xs">Simulasi visual State DOM aman tanpa payload biner berbahaya.</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Zero Friction Onboarding (Spans 5 cols on LG) */}
          <Card glowEffect glowColor="neutral" className="lg:col-span-5 flex flex-col justify-between">
            <CardHeader className="p-4 sm:p-5 pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="default" dot>
                  Zero-Friction
                </Badge>
                <Zap className="h-4 w-4 text-zinc-400" strokeWidth={1.75} />
              </div>
              <CardTitle className="text-base sm:text-lg text-white">
                Langsung Belajar Tanpa Login
              </CardTitle>
              <CardDescription className="text-zinc-400 text-xs sm:text-sm mt-1">
                Akses instan tanpa formulir registrasi, kata sandi, atau ketergantungan server database eksternal.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 pt-0">
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-2.5 space-y-1.5 text-xs font-sans">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Check className="h-3.5 w-3.5 text-zinc-400 shrink-0" strokeWidth={1.75} />
                  <span>Progres tersimpan otomatis di LocalStorage</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Check className="h-3.5 w-3.5 text-zinc-400 shrink-0" strokeWidth={1.75} />
                  <span>Dukungan ekspor & impor file JSON portabel</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Check className="h-3.5 w-3.5 text-zinc-400 shrink-0" strokeWidth={1.75} />
                  <span>Semua 7 modul terbuka bebas sejak hari pertama</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Anti-PPT & Mnemonic Animations (Spans 4 cols on LG) */}
          <Card glowEffect glowColor="neutral" className="lg:col-span-4 flex flex-col justify-between">
            <CardHeader className="p-4 sm:p-5 pb-2.5">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="default" dot>
                  Mnemonik Visual
                </Badge>
                <Sparkles className="h-4 w-4 text-zinc-400" strokeWidth={1.75} />
              </div>
              <CardTitle className="text-sm sm:text-base text-white">
                Anti-Slide Panjang & Model Mnemonik
              </CardTitle>
              <CardDescription className="text-zinc-400 text-xs mt-1">
                Konsep abstrak disajikan lewat model visual interaktif yang merespons klik dan geseran.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 pt-0">
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <Clock className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.75} />
                  <span>Maks. 2 paragraf per konsep</span>
                </div>
                <span className="font-mono text-zinc-500 text-[10px]">60 FPS ENGINE</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Dynamic Auto-Tooltip Glossary (Spans 4 cols on LG) */}
          <Card glowEffect glowColor="amber" className="lg:col-span-4 flex flex-col justify-between">
            <CardHeader className="p-4 sm:p-5 pb-2.5">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="amber" dot>
                  Terminologi Ramah
                </Badge>
                <HelpCircle className="h-4 w-4 text-zinc-400" strokeWidth={1.75} />
              </div>
              <CardTitle className="text-sm sm:text-base text-white">
                Auto-Tooltip Analogi Nyata
              </CardTitle>
              <CardDescription className="text-zinc-400 text-xs mt-1">
                Istilah teknis asing dilengkapi garis putus-putus dan penjelasan analogi saat disentuh kursor.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 pt-0">
              <div className="rounded-xl border border-white/[0.06] bg-black/40 p-2.5 text-xs">
                <div className="p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-zinc-300">
                  Prinsip <span className="border-b border-dashed border-amber-400/80 text-amber-300 font-medium">Confidentiality</span> menjaga data hanya dibaca pihak berwenang.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 5: Strict Dual-Mode Laboratory (Spans 4 cols on LG) */}
          <Card glowEffect glowColor="cyan" className="lg:col-span-4 flex flex-col justify-between">
            <CardHeader className="p-4 sm:p-5 pb-2.5">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="cyan" dot>
                  Dual Laboratory
                </Badge>
                <Layers className="h-4 w-4 text-zinc-400" strokeWidth={1.75} />
              </div>
              <CardTitle className="text-sm sm:text-base text-white">
                Dua Mode Laboratorium Spesifik
              </CardTitle>
              <CardDescription className="text-zinc-400 text-xs mt-1">
                Pemisahan tegas antara uji pemahaman prosedural dan visualisasi cara kerja internal komputer.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-5 pt-0">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-zinc-300">
                  <SlidersHorizontal className="h-3 w-3 shrink-0 text-amber-400" strokeWidth={1.75} />
                  <span><strong>Praktikum:</strong> Tantangan bertahap & asesmen.</span>
                </div>
                <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-zinc-300">
                  <Eye className="h-3 w-3 shrink-0 text-cyan-400" strokeWidth={1.75} />
                  <span><strong>Visualisasi:</strong> Time-travel & bit biner.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
