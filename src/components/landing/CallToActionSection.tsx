'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  BookOpen,
  FlaskConical,
  ArrowRight,
  Check,
  Terminal,
} from 'lucide-react';

export const CallToActionSection: React.FC = () => {
  return (
    <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#050506] font-sans">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
          <Badge variant="default" dot className="mb-2">
            Pusat Gerbang Pembelajaran
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
            Pilih Jalur Belajar Anda Hari Ini
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Mulai dari penguatan fondasi konsep teori atau langsung menguji analisis di laboratorium simulasi.
          </p>
        </div>

        {/* Two Grand Destination Gateway Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {/* Card 1: Ruang Teori Mnemonik */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.18] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/[0.02] blur-3xl transition-all duration-500 group-hover:bg-white/[0.04] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-white">
                  <BookOpen className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <Badge variant="default">Jalur Teori</Badge>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-2">
                Ruang Teori Mnemonik
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                Pelajari 7 topik utama keamanan informasi tanpa kelelahan membaca teks panjang. Setiap bab dirancang ringkas (maksimal 2 paragraf per konsep), dilengkapi glosarium interaktif dan visualisasi mnemonik responsif.
              </p>

              <div className="space-y-2 mb-6 text-xs text-zinc-300 font-sans">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-zinc-400 shrink-0" strokeWidth={1.75} />
                  <span>Model visual interaktif CIA Triad & Enkripsi Cipher</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-zinc-400 shrink-0" strokeWidth={1.75} />
                  <span>Auto-Tooltip analogi istilah teknis saat disentuh kursor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-zinc-400 shrink-0" strokeWidth={1.75} />
                  <span>Estimasi waktu baca 15–25 menit per modul</span>
                </div>
              </div>
            </div>

            <Link href="/materi" className="w-full">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center group/btn font-sans h-9 text-xs sm:text-sm"
              >
                <span>Buka Katalog Modul Teori</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" strokeWidth={1.75} />
              </Button>
            </Link>
          </div>

          {/* Card 2: Laboratorium Sandbox Virtual */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.18] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] flex flex-col justify-between">
            <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-white/[0.02] blur-3xl transition-all duration-500 group-hover:bg-white/[0.04] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-white">
                  <FlaskConical className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <Badge variant="cyan">Jalur Lab</Badge>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-2">
                Laboratorium Sandbox
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                Eksplorasi simulasi serangan nyata dan pertahanan sistem di lingkungan terisolasi. Hadapi tantangan pemodelan ancaman, konfigurasi aturan firewall, mitigasi SQLi, hingga rekonstruksi time-travel forensik digital.
              </p>

              <div className="space-y-2 mb-6 text-xs text-zinc-300 font-sans">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-zinc-400 shrink-0" strokeWidth={1.75} />
                  <span>Dual Mode: Asesmen Praktikum vs Visualisasi Teknis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-zinc-400 shrink-0" strokeWidth={1.75} />
                  <span>Simulasi topologi jaringan, tabel proses memori, & bit RGB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-zinc-400 shrink-0" strokeWidth={1.75} />
                  <span>Perolehan lencana prestasi otomatis saat selesai</span>
                </div>
              </div>
            </div>

            <Link href="/laboratorium" className="w-full">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center group/btn font-sans h-9 text-xs sm:text-sm"
              >
                <Terminal className="h-3.5 w-3.5 mr-1.5 text-zinc-300" strokeWidth={1.75} />
                <span>Masuk ke Laboratorium</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" strokeWidth={1.75} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
