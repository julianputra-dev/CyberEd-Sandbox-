'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MODULES_DATA } from '@/data/modulesData';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  BookOpen,
  FlaskConical,
  Clock,
  Award,
  CheckCircle2,
  Unlock,
  SlidersHorizontal,
  Eye,
} from 'lucide-react';

export const ModulesOverviewGrid: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { completedTheoryHashes, completedLabHashes } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#050506] font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-7 sm:mb-8 gap-4">
          <div className="max-w-2xl">
            <Badge variant="default" dot className="mb-2">
              Kurikulum 7 Modul Interaktif
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
              Eksplorasi Terbuka Tanpa Gembok Prasyarat
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Seluruh materi dan laboratorium dapat Anda jelajahi secara mandiri dan fleksibel sesuai kebutuhan perkuliahan hari ini.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/[0.02] border border-white/[0.06] rounded-full px-3 py-1 shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
            <Unlock className="h-3 w-3 text-zinc-400" strokeWidth={1.75} />
            <span className="text-[11px]">NON-LINEAR • ALL UNLOCKED</span>
          </div>
        </div>

        {/* 7 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          {MODULES_DATA.map((module) => {
            const isTheoryDone = mounted && completedTheoryHashes.some((h) => decodeId(h) === module.id);
            const isLabDone = mounted && completedLabHashes.some((h) => decodeId(h) === module.id);
            const isFullyDone = isTheoryDone && isLabDone;

            return (
              <Card
                key={module.id}
                glowEffect
                glowColor={
                  module.labMode === 'VISUALISASI TEKNIS' ? 'cyan' : 'amber'
                }
                className="flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="p-4 sm:p-5 pb-2.5">
                    {/* Top Row: Module Index & Status */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] font-semibold text-zinc-400 uppercase tracking-wider bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded">
                          MODUL 0{module.order}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {module.category}
                        </span>
                      </div>

                      {isFullyDone ? (
                        <Badge variant="emerald" dot>
                          Lulus
                        </Badge>
                      ) : isTheoryDone || isLabDone ? (
                        <Badge variant="amber" dot>
                          Berjalan
                        </Badge>
                      ) : (
                        <Badge variant="outline">Terbuka</Badge>
                      )}
                    </div>

                    {/* Title */}
                    <CardTitle className="text-sm sm:text-base text-white font-medium">
                      {module.title}
                    </CardTitle>

                    {/* Tagline */}
                    <CardDescription className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {module.tagline}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 sm:p-5 pt-0 space-y-2.5">
                    {/* Lab Mode & Estimated Time */}
                    <div className="flex items-center justify-between text-xs border-t border-b border-white/[0.04] py-1.5">
                      <div>
                        {module.labMode === 'PRAKTIKUM' ? (
                          <div className="flex items-center gap-1 text-amber-300 text-[10px] font-mono">
                            <SlidersHorizontal className="h-3 w-3 text-amber-400" strokeWidth={1.75} />
                            <span>Mode Praktikum</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-cyan-300 text-[10px] font-mono">
                            <Eye className="h-3 w-3 text-cyan-400" strokeWidth={1.75} />
                            <span>Visualisasi Teknis</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-zinc-500 font-mono text-[10px]">
                        <Clock className="h-3 w-3 text-zinc-500" strokeWidth={1.75} />
                        <span>{module.estimatedTime}</span>
                      </div>
                    </div>

                    {/* Badge Info */}
                    <div className="flex items-center justify-between rounded-xl bg-black/40 p-2 border border-white/[0.04]">
                      <div className="flex items-center gap-1.5">
                        <Award
                          className={`h-3.5 w-3.5 ${
                            isFullyDone ? 'text-amber-400' : 'text-zinc-600'
                          }`}
                          strokeWidth={1.75}
                        />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">
                            Lencana Prestasi
                          </span>
                          <span
                            className={`text-[11px] font-medium font-sans ${
                              isFullyDone ? 'text-amber-300' : 'text-zinc-300'
                            }`}
                          >
                            {module.badgeName}
                          </span>
                        </div>
                      </div>
                      {isFullyDone && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" strokeWidth={1.75} />
                      )}
                    </div>

                    {/* Key Concept Chips */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {module.keyConcepts.slice(0, 3).map((concept, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-mono text-zinc-400 bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/[0.04]"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>

                {/* Footer Action Buttons */}
                <CardFooter className="p-4 sm:p-5 pt-2.5 border-t border-white/[0.05] flex items-center gap-2">
                  <Link
                    href={`/materi/${module.id}`}
                    className="flex-1"
                    title={`Pelajari Teori ${module.title}`}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full text-xs justify-center font-sans h-7.5"
                    >
                      <BookOpen className="h-3 w-3 mr-1 text-zinc-400" strokeWidth={1.75} />
                      <span>Teori</span>
                    </Button>
                  </Link>

                  <Link
                    href={`/laboratorium/${module.id}`}
                    className="flex-1"
                    title={`Buka Laboratorium ${module.title}`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs justify-center font-sans h-7.5"
                    >
                      <FlaskConical className="h-3 w-3 mr-1 text-zinc-400" strokeWidth={1.75} />
                      <span>Lab</span>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
