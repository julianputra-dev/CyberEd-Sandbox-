'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ModuleItem } from '@/data/modulesData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BookOpen, Clock, Award, ArrowRight } from 'lucide-react';

export interface ModuleCardProps {
  module: ModuleItem;
  isTheoryDone: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, isTheoryDone }) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition(null);
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.07] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-colors duration-300 hover:border-white/[0.18]"
    >
      {/* Subtle cursor spotlight halo (Vercel/Linear style micro-glow) */}
      {isHovered && mousePosition && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.05), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle top-right ambient accent glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/[0.02] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Card Header */}
        <div className="p-4 sm:p-5 pb-3">
          {/* Top Row: Module Index & Status */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-semibold text-zinc-400 uppercase tracking-wider bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded">
                MODUL 0{module.order}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {module.category}
              </span>
            </div>

            {isTheoryDone ? (
              <Badge variant="emerald" dot>
                Selesai
              </Badge>
            ) : (
              <Badge variant="outline">Tersedia</Badge>
            )}
          </div>

          {/* Module Title */}
          <h3 className="text-base text-white font-medium group-hover:text-zinc-100 transition-colors tracking-tight leading-snug">
            {module.title}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {module.tagline}
          </p>
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-5 pt-0 space-y-3.5">
          {/* Detailed Module Description */}
          <p className="text-xs text-zinc-400/90 leading-relaxed font-sans line-clamp-3">
            {module.description}
          </p>

          {/* Highlights: Duration & Badge Reward */}
          <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-b border-white/[0.04] py-2.5">
            <div className="flex items-center gap-1.5 text-zinc-400 font-mono">
              <Clock className="h-3 w-3 text-zinc-500" strokeWidth={1.75} />
              <span>{module.estimatedTime}</span>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-300">
              <Award
                className={`h-3.5 w-3.5 ${
                  isTheoryDone ? 'text-amber-400' : 'text-zinc-500'
                }`}
                strokeWidth={1.75}
              />
              <span className="truncate">{module.badgeName}</span>
            </div>
          </div>

          {/* Key Concepts Chips */}
          <div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1.5">
              Konsep Kunci
            </span>
            <div className="flex flex-wrap gap-1">
              {module.keyConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-mono text-zinc-400 bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/[0.05] group-hover:border-white/[0.1] transition-colors"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="relative z-10 p-4 sm:p-5 pt-3 border-t border-white/[0.05] flex items-center justify-between mt-2">
        <span className="text-[10px] text-zinc-500 font-mono">
          Sub-materi interaktif
        </span>

        <Button
          variant="primary"
          size="sm"
          className="text-xs h-7.5 px-3 font-sans group/btn shadow-[0_0_12px_rgba(255,255,255,0.06)] hover:shadow-[0_0_16px_rgba(255,255,255,0.12)] transition-shadow"
        >
          <BookOpen className="h-3 w-3 mr-1 text-zinc-950" strokeWidth={1.75} />
          <span>Buka Modul 0{module.order}</span>
          <ArrowRight className="h-3 w-3 ml-1 text-zinc-950 group-hover/btn:translate-x-0.5 transition-transform" strokeWidth={1.75} />
        </Button>
      </div>
    </motion.div>
  );
};

