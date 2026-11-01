import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { OrientationBento } from '@/components/landing/OrientationBento';
import { AcademicRelevanceSection } from '@/components/landing/AcademicRelevanceSection';
import { ModulesOverviewGrid } from '@/components/landing/ModulesOverviewGrid';
import { CallToActionSection } from '@/components/landing/CallToActionSection';
import { ProgressManager } from '@/components/shared/ProgressManager';
import { Badge } from '@/components/ui/Badge';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#050506] text-[#ededed] font-sans">
      {/* 1. Hero Section with Interactive Aurora Grid */}
      <HeroSection />

      {/* 2. Seksi Orientasi: Mengapa & Apa (Bento Grid) */}
      <OrientationBento />

      {/* 3. Seksi Pengantar Universal: Relevansi Akademik PTI & TI */}
      <AcademicRelevanceSection />

      {/* 4. Panel Manajemen Profil Lokal (Backup & Restore JSON) */}
      <section className="relative py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#050506] font-sans">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 max-w-xl">
            <Badge variant="default" dot className="mb-2">
              Privasi & Portabilitas
            </Badge>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
              Pusat Manajemen Progres Belajar
            </h2>
            <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
              Kelola data belajar yang tersimpan di peramban Anda. Anda dapat mengunduh berkas cadangan dan memuatnya kembali saat berpindah komputer.
            </p>
          </div>
          <ProgressManager inline />
        </div>
      </section>

      {/* 5. Peta 7 Modul Terbuka (Bento Grid) */}
      <ModulesOverviewGrid />

      {/* 6. Panel Navigasi Utama (Dua Gateway Card CTA: /materi & /laboratorium) */}
      <CallToActionSection />
    </div>
  );
}
