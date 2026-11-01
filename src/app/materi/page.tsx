'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MODULES_DATA } from '@/data/modulesData';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { MateriHeader } from '@/components/materi/MateriHeader';
import { ModuleCard } from '@/components/materi/ModuleCard';
import { Button } from '@/components/ui/Button';
import { Search, X } from 'lucide-react';

export default function MateriMenuPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { completedTheoryHashes } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute completed theory modules count
  const completedTheoryCount = mounted
    ? MODULES_DATA.filter((m) =>
        completedTheoryHashes.some((h) => decodeId(h) === m.id)
      ).length
    : 0;

  // Filter modules based on search query
  const filteredModules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MODULES_DATA;

    return MODULES_DATA.filter((m) => {
      return (
        m.title.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.keyConcepts.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-[#050506] text-[#ededed] font-sans pb-24 overflow-hidden">
      {/* 1. Header Section with Interactive Aurora Grid & Progress Tracker */}
      <MateriHeader
        completedTheoryCount={completedTheoryCount}
        totalModules={MODULES_DATA.length}
      />

      {/* 2. Modules Catalog Section with Clean Search Bar */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar: Title & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mb-6">
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm font-semibold tracking-tight text-white uppercase font-mono">
              Daftar Modul Pembelajaran
            </h2>
            <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-full">
              {filteredModules.length} dari {MODULES_DATA.length} Modul
            </span>
          </div>

          {/* Refined Search Input */}
          <div className="relative w-full sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500"
              strokeWidth={1.75}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi, konsep (CIA, SQLi, LSB)..."
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/25 focus:ring-1 focus:ring-white/10 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200 transition-colors"
                title="Hapus pencarian"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Modules Grid with Staggered Entrance Animation */}
        {filteredModules.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 rounded-2xl border border-white/[0.06] bg-white/[0.01]"
          >
            <Search className="h-8 w-8 text-zinc-600 mx-auto mb-3" strokeWidth={1.75} />
            <h3 className="text-sm font-semibold text-white">Tidak ada materi yang cocok</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              Tidak ditemukan materi teori dengan kata kunci &quot;{searchQuery}&quot;. Coba gunakan istilah lain seperti CIA, Firewall, atau Kriptografi.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery('')}
              className="mt-4 text-xs"
            >
              Reset Pencarian
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key={searchQuery ? 'filtered' : 'all'}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredModules.map((module) => {
              const isTheoryDone =
                mounted && completedTheoryHashes.some((h) => decodeId(h) === module.id);

              return (
                <ModuleCard
                  key={module.id}
                  module={module}
                  isTheoryDone={isTheoryDone}
                />
              );
            })}
          </motion.div>
        )}
      </main>
    </div>
  );
}
