'use client';

import React from 'react';
import Link from 'next/link';
import { FlaskConical, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ModulCtaCardProps {
  labRoute: string;
  labTitle: string;
  labDescription: string;
  modeBadge?: string;
}

export const ModulCtaCard: React.FC<ModulCtaCardProps> = ({
  labRoute,
  labTitle,
  labDescription,
  modeBadge = 'Mode Praktikum Asesmen',
}) => {
  return (
    <div className="pt-8 border-t border-white/[0.08]">
      <div className="relative group overflow-hidden rounded-2xl p-6 sm:p-8 bg-zinc-950/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        {/* Subtle, elegant white ambient halo (No neon AI colors) */}
        <div
          className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-white/[0.02] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            {/* Elegant Monochromatic Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-300 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 inline-block" />
              <span>Langkah Berikutnya • {modeBadge}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-2">
              {labTitle}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              {labDescription}
            </p>
          </div>

          <Link href={labRoute} className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-xs sm:text-sm font-sans font-medium px-5 py-2.5 shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_0_25px_rgba(255,255,255,0.14)] transition-all group/btn"
            >
              <FlaskConical className="h-4 w-4 mr-2 text-zinc-950" strokeWidth={1.75} />
              <span>Uji Pemahaman di Laboratorium Praktikum</span>
              <ArrowRight
                className="h-4 w-4 ml-2 text-zinc-950 group-hover/btn:translate-x-1 transition-transform"
                strokeWidth={1.75}
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
