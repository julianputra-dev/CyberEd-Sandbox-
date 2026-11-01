'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, BookOpen } from 'lucide-react';

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

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      role="button"
      aria-label={`Glosarium: ${term}`}
    >
      {/* Target Word with dashed underline */}
      <span className="font-medium text-white underline decoration-dashed decoration-zinc-500 underline-offset-4 cursor-help hover:decoration-white hover:text-zinc-100 transition-colors duration-200">
        {children || term}
      </span>

      {/* Floating Glassmorphism Pop-up (Modern Neutral Dark SaaS) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 z-50 w-72 sm:w-80 p-3.5 rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.08)] pointer-events-none text-left"
          >
            {/* Top Bar with Tag & Term */}
            <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/[0.06]">
              <span className="text-[10px] font-mono font-medium tracking-wider text-zinc-300 uppercase flex items-center gap-1.5">
                <BookOpen className="h-3 w-3 text-zinc-400" />
                Glosarium Istilah
              </span>
              <span className="text-[9px] font-mono text-zinc-500">Auto-Tooltip</span>
            </div>

            {/* Term Title */}
            <div className="text-xs font-semibold text-white tracking-tight mb-1">
              {term}
            </div>

            {/* Everyday Language Analogy / Explanation */}
            <p className="text-[11px] leading-relaxed text-zinc-300 font-sans">
              {explanation}
            </p>

            {/* Bottom Arrow Indicator */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-zinc-900 border-r border-b border-white/10 rotate-45 -mt-1"
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
