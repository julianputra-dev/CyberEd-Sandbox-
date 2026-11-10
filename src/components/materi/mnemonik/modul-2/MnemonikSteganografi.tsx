'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scan,
  AlertTriangle,
  FileSearch,
  Sparkles,
  RefreshCw,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface AnomalyItem {
  id: number;
  label: string;
  coords: string;
  binary: string;
  decodedWord: string;
  cx: number;
  cy: number;
}

export const MnemonikSteganografi: React.FC = () => {
  // Alur tahap inspeksi: 0 = foto normal, 1 = pemindaian & deteksi anomali, 2 = analisis & terjemah kata, 3 = penyusunan kalimat utuh
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const anomalies: AnomalyItem[] = [
    { id: 1, label: 'Klaster A (Piksel #104)', coords: 'X: 140, Y: 65', binary: '01001011', decodedWord: 'KUNCI', cx: 140, cy: 65 },
    { id: 2, label: 'Klaster B (Piksel #218)', coords: 'X: 250, Y: 130', binary: '01000001', decodedWord: 'AKSES', cx: 250, cy: 130 },
    { id: 3, label: 'Klaster C (Piksel #365)', coords: 'X: 370, Y: 85', binary: '01001100', decodedWord: 'LABORATORIUM', cx: 370, cy: 85 },
    { id: 4, label: 'Klaster D (Piksel #490)', coords: 'X: 470, Y: 145', binary: '01010000', decodedWord: 'PTI_2026', cx: 470, cy: 145 },
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStage(1);
    }, 1200);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik Interaktif • Mekanisme Inspeksi Steganografi
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500">Status Analisis:</span>
          {stage === 0 && <span className="text-zinc-300">Foto Normal</span>}
          {stage === 1 && <span className="text-amber-400 font-semibold">Anomali Terdeteksi</span>}
          {stage === 2 && <span className="text-sky-400 font-semibold">Menerjemahkan Bit</span>}
          {stage === 3 && <span className="text-emerald-400 font-semibold">Pesan Terungkap</span>}
        </div>
      </div>

      {/* Main Canvas Area (Pure SVG Scenery) */}
      <div className="relative rounded-xl overflow-hidden bg-black/60 border border-white/[0.06] mb-5">
        <div className="relative h-60 w-full overflow-hidden flex items-center justify-center">
          {/* SVG Pemandangan Alam Normal */}
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 600 240"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="stegoSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="50%" stopColor="#2e1065" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
              <linearGradient id="stegoSunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>

            {/* Background Sky & Sun */}
            <rect width="600" height="240" fill="url(#stegoSkyGrad)" />
            <circle cx="300" cy="120" r="45" fill="url(#stegoSunGrad)" opacity="0.85" />

            {/* Mountains Silhouette */}
            <polygon points="20,240 180,100 340,240" fill="#18181b" opacity="0.9" />
            <polygon points="220,240 390,80 560,240" fill="#09090b" opacity="0.95" />
            <polygon points="100,240 280,120 460,240" fill="#030712" />

            {/* Anomali Markers on Canvas (Muncul saat stage >= 1) */}
            {stage >= 1 &&
              anomalies.map((item) => (
                <g key={item.id} className="cursor-pointer">
                  <circle
                    cx={item.cx}
                    cy={item.cy}
                    r="12"
                    fill="none"
                    stroke={stage === 3 ? '#10b981' : '#f59e0b'}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="animate-spin origin-center"
                    style={{ transformOrigin: `${item.cx}px ${item.cy}px` }}
                  />
                  <circle
                    cx={item.cx}
                    cy={item.cy}
                    r="4"
                    fill={stage === 3 ? '#10b981' : '#f59e0b'}
                    className="animate-ping"
                  />
                </g>
              ))}
          </svg>

          {/* Animasi Sinar Pemindai / Scanner Beam */}
          {isScanning && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ repeat: 1, duration: 1.2, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_rgba(56,189,248,0.8)] pointer-events-none"
            />
          )}

          {/* Keterangan Sudut Foto */}
          <div className="absolute top-2.5 left-3 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-zinc-300">
            Berkas: kampus_senja.png (Ukuran: 1.2 MB)
          </div>
        </div>

        {/* Panel Interaksi & Analisis Tahap demi Tahap */}
        <div className="p-4 bg-zinc-950/90 border-t border-white/[0.06] space-y-3">
          {/* TAHAP 0: Tombol Mulai Inspeksi */}
          {stage === 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Secara visual, foto lanskap di atas tampak normal tanpa cacat. Klik tombol untuk memulai audit struktur bit terdalam.
              </p>
              <button
                onClick={handleStartScan}
                disabled={isScanning}
                className="shrink-0 inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all shadow-sm"
              >
                <Scan className="h-3.5 w-3.5" />
                <span>{isScanning ? 'Memindai Bit...' : 'Mulai Inspeksi Steganografi'}</span>
              </button>
            </div>
          )}

          {/* TAHAP 1: Anomali Terdeteksi */}
          {stage === 1 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                <AlertTriangle className="h-4 w-4" />
                <span>Peringatan: Terdeteksi 4 Fluktuasi Bit Tidak Wajar pada Saluran LSB</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                Retina manusia tidak melihat perubahan warna, namun audit matematis menemukan pola bit paritas tidak acak pada 4 koordinat piksel berikut:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {anomalies.map((a) => (
                  <div key={a.id} className="p-2.5 rounded-lg bg-white/[0.02] border border-amber-500/20 text-center font-mono">
                    <span className="text-[10px] text-zinc-400 block">{a.label}</span>
                    <span className="text-xs text-amber-300 font-semibold">{a.coords}</span>
                    <span className="text-[10px] text-zinc-500 block mt-1">Bit: {a.binary}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setStage(2)}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-sky-500 text-zinc-950 font-semibold text-xs hover:bg-sky-400 transition-all"
                >
                  <span>Analisis & Terjemahkan Setiap Anomali</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAHAP 2: Analisis & Penerjemahan Menjadi Kata */}
          {stage === 2 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
                <FileSearch className="h-4 w-4" />
                <span>Hasil Ekstraksi & Penerjemahan Bit Biner Menjadi Kata:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {anomalies.map((a) => (
                  <motion.div
                    key={a.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 space-y-1 font-mono text-center"
                  >
                    <span className="text-[10px] text-zinc-400 block">{a.label}</span>
                    <div className="text-[11px] text-zinc-500">{a.binary}</div>
                    <div className="text-sm font-semibold text-sky-300 bg-sky-950/60 py-1 rounded border border-sky-500/30">
                      &quot;{a.decodedWord}&quot;
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setStage(3)}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 transition-all"
                >
                  <span>Rangkai Menjadi Pesan Rahasia Utuh</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAHAP 3: Penyusunan Kalimat Utuh */}
          {stage === 3 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Pesan Rahasia Berhasil Dirangkai Utuh dari Bit Gambar:</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center"
              >
                <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">
                  Pesan Tersembunyi yang Diekstrak:
                </span>
                <div className="text-base sm:text-lg font-mono font-bold text-white tracking-wide">
                  &quot;KUNCI AKSES LABORATORIUM PTI_2026&quot;
                </div>
              </motion.div>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify pt-1">
                Inilah inti mekanisme steganografi: pihak luar hanya melihat foto pemandangan kampus yang wajar, namun pihak penerima yang mengetahui koordinat injeksi LSB dapat memindai anomali bit dan menyusunnya kembali menjadi pesan berharga.
              </p>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setStage(0)}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Ulangi Simulasi Inspeksi dari Awal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
