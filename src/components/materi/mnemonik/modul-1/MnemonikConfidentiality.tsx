'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, EyeOff, Eye, Lock, Unlock } from 'lucide-react';

export const MnemonikConfidentiality: React.FC = () => {
  const [mode, setMode] = useState<'encrypted' | 'plain'>('encrypted');

  const handleSend = (selectedMode: 'encrypted' | 'plain') => {
    setMode(selectedMode);
  };

  const isEncrypted = mode === 'encrypted';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik 01 • Kerahasiaan (Confidentiality)
          </span>
        </div>
        <div className="text-xs text-zinc-400 font-sans">
          Simulasi Pertukaran Pesan: <span className="text-white font-medium">Alice</span> ke{' '}
          <span className="text-white font-medium">Bob</span>
        </div>
      </div>

      {/* Interactive Communication Stage */}
      <div className="relative py-4 px-2 sm:px-6 bg-black/40 rounded-xl border border-white/[0.05] mb-5">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center relative z-10">
          {/* Node 1: Alice (Pengirim) */}
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="w-11 h-11 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
              <User className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-white">Alice</span>
            <span className="text-[10px] text-zinc-400 font-mono">Pengirim Dokumen</span>
            <div className="mt-2 text-[10px] bg-black/60 border border-white/[0.08] px-2 py-1 rounded text-zinc-300 font-mono w-full truncate">
              Nilai IPK: 3.98
            </div>
          </div>

          {/* Node 2: Eve (Pihak Ketiga / Penyerang di Tengah Jaringan) */}
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] relative">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${
                isEncrypted
                  ? 'bg-zinc-800 text-zinc-400 border border-white/10'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
              }`}
            >
              {isEncrypted ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </div>
            <span className="text-xs font-semibold text-white">Eve (Pihak Luar)</span>
            <span className="text-[10px] text-zinc-400 font-mono">Penyadap Jaringan</span>

            {/* Balon Apa yang Dilihat Eve */}
            <div
              className={`mt-2 text-[10px] px-2 py-1 rounded font-mono w-full border transition-all ${
                isEncrypted
                  ? 'bg-zinc-900 border-white/[0.08] text-zinc-400'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300 font-semibold'
              }`}
            >
              {isEncrypted ? (
                <span className="truncate block">Teks Tersandi (Terkunci)</span>
              ) : (
                <span className="truncate block">Nilai IPK: 3.98 (Terbaca)</span>
              )}
            </div>
          </div>

          {/* Node 3: Bob (Penerima) */}
          <div className="flex flex-col items-center text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              <User className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-white">Bob</span>
            <span className="text-[10px] text-zinc-400 font-mono">Penerima Sah</span>
            <div className="mt-2 text-[10px] bg-black/60 border border-emerald-500/20 px-2 py-1 rounded text-emerald-400 font-mono w-full truncate">
              {isEncrypted ? 'Membuka Kunci: 3.98' : 'Menerima: 3.98'}
            </div>
          </div>
        </div>

        {/* Transmission Track Status */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">Status Saluran Pengiriman:</span>
            {isEncrypted ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Lock className="h-3 w-3" /> Paket Terenkripsi Kuat
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1">
                <Unlock className="h-3 w-3" /> Paket Terbuka Tanpa Sandi
              </span>
            )}
          </div>
          <span className="text-zinc-500 hidden sm:inline">Jaringan Terbuka</span>
        </div>
      </div>

      {/* Two Explicit Buttons Required by User */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {/* Tombol 1: Pesan Tidak Bisa Dilihat Orang Lain (Terenkripsi) */}
        <button
          onClick={() => handleSend('encrypted')}
          className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
            isEncrypted
              ? 'bg-white/[0.06] border-emerald-500/40 text-white shadow-[0_0_20px_rgba(16,185,129,0.08)]'
              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block mb-0.5">
              1. Pesan Tidak Bisa Dilihat Orang Lain
            </span>
            <p className="text-[11px] text-zinc-400 leading-snug text-justify">
              Data diubah menjadi sandi sebelum dikirim. Pihak asing yang mencoba menyadap di tengah jalur
              hanya melihat karakter acak tanpa arti.
            </p>
          </div>
        </button>

        {/* Tombol 2: Pesan Dilihat Orang Lain (Plaintext) */}
        <button
          onClick={() => handleSend('plain')}
          className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
            !isEncrypted
              ? 'bg-white/[0.06] border-rose-500/40 text-white shadow-[0_0_20px_rgba(244,63,94,0.08)]'
              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
            <Unlock className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block mb-0.5">
              2. Pesan Dilihat Pihak Luar
            </span>
            <p className="text-[11px] text-zinc-400 leading-snug text-justify">
              Data dikirimkan secara terbuka tanpa perlindungan sandi sehingga siapa pun yang memantau
              jalur koneksi dapat membaca isinya secara langsung.
            </p>
          </div>
        </button>
      </div>

      {/* Explanatory Conclusion */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300 flex items-start gap-2.5">
        <ShieldCheck className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-justify">
          {isEncrypted ? (
            <span>
              <strong className="text-emerald-400">Prinsip Kerahasiaan Terjaga:</strong> Kerahasiaan memastikan
              bahwa meskipun data berhasil diambil di tengah perjalanan, informasi tetap tidak dapat dimengerti
              oleh siapa pun kecuali oleh pihak yang memegang kunci pembuka yang sah.
            </span>
          ) : (
            <span>
              <strong className="text-rose-400">Terjadinya Kebocoran Data:</strong> Tanpa perlindungan sandi,
              pihak ketiga yang terhubung di jaringan yang sama dapat mengintip dan menyalin data rahasia
              Anda tanpa meninggalkan jejak yang terlihat langsung.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
