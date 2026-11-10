'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  KeyRound,
  Lock,
  Unlock,
  Radio,
  EyeOff,
  Eye,
  CheckCircle2,
  RefreshCw,
  Cpu,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const MnemonikKriptografi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simetris' | 'asimetris' | 'hashing'>('simetris');

  // State Simetris: 0 = Informasi awal, 1 = Dikunci & dilihat orang lain (kata acak), 2 = Penerima buka dengan kunci yang sama
  const [symPhase, setSymPhase] = useState<0 | 1 | 2>(0);
  const symSecretKey = 'KUNCI_SIMETRIS_BERSAMA';
  const symOriginalInfo = 'JADWAL UJIAN RAHASIA PTI';
  const symRandomWords = '7F#9B2@E1$ 8D3*K0Z! 4L#8X1';

  // State Asimetris: 0 = Informasi awal, 1 = Dikunci kunci publik & dikirim (kode acak), 2 = Penerima buka dengan kunci privat berbeda
  const [asymPhase, setAsymPhase] = useState<0 | 1 | 2>(0);
  const asymOriginalInfo = 'KODE OTORISASI NILAI A+';
  const asymRandomCode = '4A9F#E18D$3K0Z!7C2L#Q8M9';

  // State Hashing
  const [hashInput, setHashInput] = useState<string>('Nilai Mahasiswa: A');
  const calculateSimulatedHash = (str: string) => {
    let hashVal = 0;
    for (let i = 0; i < str.length; i++) {
      hashVal = (hashVal << 5) - hashVal + str.charCodeAt(i);
      hashVal |= 0;
    }
    const hex = Math.abs(hashVal).toString(16).padStart(8, '0');
    return `${hex}d91f4c728e05b38a${hex}2a7c4e910b5f8d3`;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik Interaktif • Mekanisme Penguncian Kriptografi
          </span>
        </div>
        <span className="text-xs text-zinc-400 font-mono">Pilih Paradigma Simulasi</span>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/[0.06] mb-5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => {
            setActiveTab('simetris');
            setSymPhase(0);
          }}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'simetris'
              ? 'bg-white text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          1. Kriptografi Simetris (Kunci yang Sama)
        </button>
        <button
          onClick={() => {
            setActiveTab('asimetris');
            setAsymPhase(0);
          }}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'asimetris'
              ? 'bg-white text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          2. Kriptografi Asimetris (Kunci yang Berbeda)
        </button>
        <button
          onClick={() => setActiveTab('hashing')}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'hashing'
              ? 'bg-white text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          3. Mekanisme Hash Satu Arah
        </button>
      </div>

      {/* ========================================================
          TAB 1: KRIPTOGRAFI SIMETRIS (KUNCI YANG SAMA)
          ======================================================== */}
      {activeTab === 'simetris' && (
        <div className="space-y-4">
          {/* Info Banner Simetris */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-zinc-300">
              <span className="text-zinc-400">Kunci Rahasia Bersama:</span>
              <span className="font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap">
                {symSecretKey}
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400 shrink-0">
              Prinsip: Pengirim & Penerima Memakai <strong className="text-white">Kunci yang Sama</strong>
            </div>
          </div>

          {/* Grid 3 Panel Simetris */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Panel 1: Sisi Pengirim */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">1. Sisi Pengirim</span>
                  <KeyRound className="h-3.5 w-3.5 text-zinc-400" />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                  INFORMASI ASLI:
                </span>
                <div className="h-16 p-2.5 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-xs text-emerald-400 flex items-center justify-center text-center break-words">
                  &quot;{symOriginalInfo}&quot;
                </div>
              </div>

              <div className="h-10 flex items-center text-[11px] text-zinc-400 leading-snug">
                Pengirim menyembunyikan informasi asli menggunakan kunci bersama.
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => setSymPhase(1)}
                  disabled={symPhase !== 0}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    symPhase === 0
                      ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm'
                      : 'bg-white/[0.04] text-zinc-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {symPhase === 0 ? 'Kunci Informasi dengan Kunci' : 'Informasi Telah Dikunci'}
                </button>
              </div>
            </div>

            {/* Panel 2: Saat Dilihat Orang Lain / Saluran Publik */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-300">2. Dilihat Orang Lain</span>
                  <EyeOff className={`h-3.5 w-3.5 ${symPhase >= 1 ? 'text-amber-400 animate-pulse' : 'text-zinc-600'}`} />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                  KATA ACAK DI SALURAN:
                </span>
                <div className="h-16 p-2.5 rounded-lg bg-zinc-950 border border-white/10 font-mono text-xs flex items-center justify-center text-center">
                  {symPhase === 0 ? (
                    <span className="text-zinc-600 text-[11px]">Belum ada informasi melintas</span>
                  ) : (
                    <motion.span
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-amber-400 font-semibold break-all"
                    >
                      {symRandomWords}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="h-10 flex items-center text-[11px] text-zinc-400 leading-snug">
                {symPhase === 0
                  ? 'Saat dikunci, pihak luar di saluran hanya melihat kata acak.'
                  : 'Orang lain hanya melihat kata acak dan tidak dapat membaca isinya.'}
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <div
                  className={`w-full py-2 px-3 rounded-lg text-xs font-mono text-center flex items-center justify-center gap-1.5 ${
                    symPhase >= 1
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium'
                      : 'bg-white/[0.02] border border-white/5 text-zinc-600'
                  }`}
                >
                  <EyeOff className="h-3 w-3" />
                  <span>{symPhase >= 1 ? 'Kata Acak Terproteksi' : 'Saluran Transmisi Terbuka'}</span>
                </div>
              </div>
            </div>

            {/* Panel 3: Sisi Penerima (Membuka dengan Kunci yang Sama) */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">3. Sisi Penerima</span>
                  <Unlock className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                  HASIL BUKA PESAN:
                </span>
                <div className="h-16 p-2.5 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-xs flex items-center justify-center text-center">
                  {symPhase === 0 && <span className="text-zinc-600 text-[11px]">Menunggu berkas masuk</span>}
                  {symPhase === 1 && (
                    <span className="text-amber-400 text-[11px]">Pesan acak diterima, siap dibuka</span>
                  )}
                  {symPhase === 2 && (
                    <motion.span
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-emerald-400 font-semibold break-words"
                    >
                      &quot;{symOriginalInfo}&quot;
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="h-10 flex items-center text-[11px] text-zinc-400 leading-snug">
                Penerima memasukkan kunci yang persis sama untuk memulihkan isi pesan.
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => setSymPhase(2)}
                  disabled={symPhase !== 1}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    symPhase === 1
                      ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-sm'
                      : symPhase === 2
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : 'bg-white/[0.04] text-zinc-600 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {symPhase === 2
                    ? 'Berhasil Dibuka (Kunci Sama)'
                    : symPhase === 1
                    ? 'Buka dengan Kunci yang Sama'
                    : 'Menunggu Pesan Masuk'}
                </button>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          {symPhase !== 0 && (
            <div className="flex justify-end pt-1">
              <button
                onClick={() => setSymPhase(0)}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Ulangi Simulasi Kriptografi Simetris</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 2: KRIPTOGRAFI ASIMETRIS (KUNCI YANG BERBEDA)
          ======================================================== */}
      {activeTab === 'asimetris' && (
        <div className="space-y-4">
          {/* Info Banner Asimetris yang Rapi & Proporsional */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-zinc-300">
              <span className="text-zinc-400">Sepasang Kunci Bob (Penerima):</span>
              <span className="font-mono text-zinc-200 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-md text-[11px] whitespace-nowrap">
                Kunci Publik (Kunci 1: Bebas)
              </span>
              <span className="text-zinc-500 font-bold">+</span>
              <span className="font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap">
                Kunci Privat (Kunci 2: Rahasia Sendiri)
              </span>
            </div>
            <div className="text-[11px] font-mono text-zinc-400 shrink-0">
              Prinsip: Mengunci & Membuka Memakai <strong className="text-white">Kunci Berbeda</strong>
            </div>
          </div>

          {/* Grid 3 Panel Asimetris (Ketinggian & Elemen Simetris Sejajar) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Panel 1: Pengirim (Alice Mengunci dengan Kunci Publik Bob) */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">1. Pengirim (Alice)</span>
                  <KeyRound className="h-3.5 w-3.5 text-zinc-400" />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                  INFORMASI ASLI:
                </span>
                <div className="h-16 p-2.5 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-xs text-zinc-200 flex items-center justify-center text-center break-words">
                  &quot;{asymOriginalInfo}&quot;
                </div>
              </div>

              <div className="h-10 flex items-center text-[11px] text-zinc-400 leading-snug">
                Alice mengunci pesan menggunakan <strong className="text-zinc-200 ml-1">Kunci Publik milik Bob</strong>.
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => setAsymPhase(1)}
                  disabled={asymPhase !== 0}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    asymPhase === 0
                      ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm'
                      : 'bg-white/[0.04] text-zinc-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {asymPhase === 0 ? 'Kunci dengan Kunci Publik Bob' : 'Terkunci dengan Kunci Publik'}
                </button>
              </div>
            </div>

            {/* Panel 2: Dikirim ke Penerima (Dilihat Orang Lain di Saluran) */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-300">2. Dikirim (Dilihat Orang Lain)</span>
                  <Radio className={`h-3.5 w-3.5 ${asymPhase >= 1 ? 'text-amber-400 animate-pulse' : 'text-zinc-600'}`} />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                  KODE ACAK DI SALURAN:
                </span>
                <div className="h-16 p-2.5 rounded-lg bg-zinc-950 border border-white/10 font-mono text-xs flex items-center justify-center text-center">
                  {asymPhase === 0 ? (
                    <span className="text-zinc-600 text-[11px]">Menunggu pengiriman pesan</span>
                  ) : (
                    <motion.span
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-amber-400 font-semibold break-all"
                    >
                      {asymRandomCode}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="h-10 flex items-center text-[11px] text-zinc-400 leading-snug">
                {asymPhase === 0
                  ? 'Data berubah menjadi kode acak saat melintas di saluran terbuka.'
                  : 'Orang lain tidak dapat membuka kode ini, bahkan dengan kunci publik sekalipun!'}
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <div
                  className={`w-full py-2 px-3 rounded-lg text-xs font-mono text-center flex items-center justify-center gap-1.5 ${
                    asymPhase >= 1
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium'
                      : 'bg-white/[0.02] border border-white/5 text-zinc-600'
                  }`}
                >
                  <EyeOff className="h-3 w-3" />
                  <span>{asymPhase >= 1 ? 'Kode Acak Terproteksi' : 'Saluran Transmisi Terbuka'}</span>
                </div>
              </div>
            </div>

            {/* Panel 3: Penerima Membuka dengan Kunci Privat Berbeda */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white">3. Penerima (Bob)</span>
                  <Unlock className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                  HASIL BUKA PESAN:
                </span>
                <div className="h-16 p-2.5 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-xs flex items-center justify-center text-center">
                  {asymPhase === 0 && <span className="text-zinc-600 text-[11px]">Menunggu berkas masuk</span>}
                  {asymPhase === 1 && (
                    <span className="text-amber-400 text-[11px]">Kode acak diterima, siap dibuka</span>
                  )}
                  {asymPhase === 2 && (
                    <motion.span
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-emerald-400 font-semibold break-words"
                    >
                      &quot;{asymOriginalInfo}&quot;
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="h-10 flex items-center text-[11px] text-zinc-400 leading-snug">
                Bob membuka kode acak memakai <strong className="text-emerald-400 ml-1">Kunci Privatnya sendiri</strong>.
              </div>

              <div className="pt-2 border-t border-white/[0.06]">
                <button
                  onClick={() => setAsymPhase(2)}
                  disabled={asymPhase !== 1}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    asymPhase === 1
                      ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-sm'
                      : asymPhase === 2
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                      : 'bg-white/[0.04] text-zinc-600 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {asymPhase === 2
                    ? 'Terbuka (Kunci Privat)'
                    : asymPhase === 1
                    ? 'Buka dengan Kunci Privat Bob'
                    : 'Menunggu Kode Masuk'}
                </button>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          {asymPhase !== 0 && (
            <div className="flex justify-end pt-1">
              <button
                onClick={() => setAsymPhase(0)}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Ulangi Simulasi Kriptografi Asimetris</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 3: MEKANISME HASHING SATU ARAH
          ======================================================== */}
      {activeTab === 'hashing' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold text-white">Eksperimen Fenomena Efek Longsor (Avalanche Effect)</span>
              <span className="text-[11px] font-mono text-zinc-400">Algoritma: SHA-256 Digest Simulasi</span>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                Ketik Kalimat Bebas (Coba ubah 1 huruf saja):
              </label>
              <input
                type="text"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white/30"
                placeholder="Ketik teks di sini..."
              />
            </div>

            <div className="p-3 rounded-lg bg-zinc-950/80 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Nilai Hash (Sidik Jari Digital 256-bit):</span>
                <span className="text-[10px] font-mono text-emerald-400">Panjang Tetap 64 Karakter</span>
              </div>
              <div className="font-mono text-xs text-zinc-300 break-all p-2 rounded bg-black/40 border border-white/[0.04]">
                {calculateSimulatedHash(hashInput)}
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans text-justify pt-1">
              Perhatikan bahwa fungsi hash bekerja secara satu arah. Tidak ada rumus matematika untuk membalikkan nilai hash di atas
              kembali ke kalimat asal. Jika ada satu titik atau spasi yang berubah pada dokumen asal, seluruh nilai hash akan berubah total.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
