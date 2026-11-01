'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { MODULES_DATA } from '@/data/modulesData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  X,
} from 'lucide-react';

export const ProgressManager: React.FC<{ inline?: boolean }> = ({ inline = false }) => {
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    completedTheoryHashes,
    completedLabHashes,
    exportProgressData,
    importProgressData,
    resetAllProgress,
  } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedTheoryCount = mounted
    ? MODULES_DATA.filter((m) =>
        completedTheoryHashes.some((h) => decodeId(h) === m.id)
      ).length
    : 0;

  const completedLabCount = mounted
    ? MODULES_DATA.filter((m) =>
        completedLabHashes.some((h) => decodeId(h) === m.id)
      ).length
    : 0;

  const totalPossible = MODULES_DATA.length;

  const handleExport = () => {
    try {
      const dataStr = exportProgressData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `progres-cybered-sandbox-${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setNotification({
        type: 'success',
        message: 'File cadangan progres berhasil diunduh.',
      });
      setTimeout(() => setNotification(null), 4000);
    } catch {
      setNotification({
        type: 'error',
        message: 'Gagal membuat file cadangan progres.',
      });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importProgressData(content);
      if (success) {
        setNotification({
          type: 'success',
          message: 'Data progres berhasil dipulihkan dari berkas JSON.',
        });
      } else {
        setNotification({
          type: 'error',
          message: 'Format berkas cadangan tidak valid atau rusak.',
        });
      }
      setTimeout(() => setNotification(null), 4000);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    resetAllProgress();
    setShowConfirmReset(false);
    setNotification({
      type: 'success',
      message: 'Seluruh progres lokal telah direset ke setelan awal.',
    });
    setTimeout(() => setNotification(null), 4000);
  };

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 animate-pulse">
        <div className="h-5 w-40 bg-white/[0.05] rounded mb-3" />
        <div className="h-3 w-64 bg-white/[0.03] rounded" />
      </div>
    );
  }

  return (
    <div
      className={
        inline
          ? 'relative rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-md p-6 sm:p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] overflow-hidden font-sans'
          : 'p-1 font-sans'
      }
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <HardDrive className="w-4 h-4 text-zinc-300" strokeWidth={1.75} />
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Manajemen Progres Belajar
            </h3>
            <Badge variant="default" dot>
              Client Storage
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
            Data modul dan laboratorium tersimpan di{' '}
            <code className="text-zinc-300 bg-white/[0.05] px-1.5 py-0.5 rounded text-[11px] font-mono border border-white/[0.06]">
              localStorage
            </code>{' '}
            browser tanpa server. Ekspor file cadangan jika ingin berpindah perangkat.
          </p>
        </div>

        {/* Status Score Indicator */}
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-2.5 shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Total Progres</span>
            <span className="text-sm font-semibold text-white font-mono">
              {completedTheoryCount}/{totalPossible} <span className="text-xs text-zinc-500 font-sans font-normal">Teori</span> •{' '}
              {completedLabCount}/{totalPossible} <span className="text-xs text-zinc-500 font-sans font-normal">Lab</span>
            </span>
          </div>
          <div className="w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-zinc-200" strokeWidth={1.75} />
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        <div className="bg-white/[0.015] rounded-xl p-3 border border-white/[0.05]">
          <div className="flex justify-between text-xs text-zinc-400 mb-2 font-mono">
            <span className="font-sans text-zinc-300 text-xs">Penyelesaian Teori</span>
            <span>{Math.round((completedTheoryCount / totalPossible) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-200 rounded-full transition-all duration-500"
              style={{ width: `${(completedTheoryCount / totalPossible) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/[0.015] rounded-xl p-3 border border-white/[0.05]">
          <div className="flex justify-between text-xs text-zinc-400 mb-2 font-mono">
            <span className="font-sans text-zinc-300 text-xs">Penyelesaian Laboratorium</span>
            <span>{Math.round((completedLabCount / totalPossible) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${(completedLabCount / totalPossible) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/[0.05]">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleExport}
          className="text-xs font-sans"
        >
          <Download className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.75} />
          <span>Unduh Cadangan (JSON)</span>
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleImport}
          className="hidden"
          id="import-progress-file-input"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs font-sans"
        >
          <Upload className="w-3.5 h-3.5 text-zinc-300" strokeWidth={1.75} />
          <span>Pulihkan Progres (Impor JSON)</span>
        </Button>

        {!showConfirmReset ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfirmReset(true)}
            className="text-zinc-500 hover:text-rose-400 text-xs ml-auto font-sans"
          >
            <RotateCcw className="w-3 h-3" strokeWidth={1.75} />
            <span>Reset Data</span>
          </Button>
        ) : (
          <div className="flex items-center gap-2 ml-auto bg-rose-500/[0.08] border border-rose-500/20 rounded-xl px-3 py-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" strokeWidth={1.75} />
            <span className="text-xs text-rose-300 font-sans font-medium">Hapus data lokal?</span>
            <button
              onClick={handleReset}
              className="text-xs font-medium text-rose-300 hover:text-white bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30 transition-colors"
            >
              Ya, Reset
            </button>
            <button
              onClick={() => setShowConfirmReset(false)}
              className="text-zinc-400 hover:text-zinc-200 p-0.5"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>

      {notification && (
        <div
          className={`mt-4 flex items-center gap-2 p-3 rounded-xl border text-xs font-medium font-sans animate-in fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-500/[0.08] border-emerald-500/20 text-emerald-300'
              : 'bg-rose-500/[0.08] border-rose-500/20 text-rose-300'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.75} />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" strokeWidth={1.75} />
          )}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
};
