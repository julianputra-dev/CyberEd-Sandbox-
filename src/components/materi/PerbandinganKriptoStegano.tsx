'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  Image as ImageIcon,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Layers,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export const PerbandinganKriptoStegano: React.FC = () => {
  // Alur animasi interaktif 4 tahap kombinasi pertahanan berlapis
  const [pipelineStep, setPipelineStep] = useState<number>(1);

  const rawPlaintext = 'KODE_AKSES_BANK_SOAL_PTI';
  const encryptedCiphertext = '7F#9B2@E1$8D3*K0Z!';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Matriks Perbedaan Konseptual
          </span>
        </div>
        <span className="text-xs text-zinc-400 font-mono">Kriptografi vs Steganografi</span>
      </div>

      {/* Comparison Grid Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Kolom 1: Kriptografi */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Kriptografi</h4>
              <span className="text-[10px] text-zinc-400 font-mono">Seni Mengacak Makna Pesan</span>
            </div>
          </div>

          <ul className="text-xs text-zinc-300 space-y-2 font-sans text-justify">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
              <span>
                <strong className="text-white">Tujuan Pokok:</strong> Mengaburkan isi pesan sehingga pihak mana pun yang menyadap tidak dapat memahami artinya tanpa kunci pembuka.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
              <span>
                <strong className="text-white">Wujud Berkas:</strong> Menghasilkan teks acak tidak beraturan yang tampak mencurigakan bagi pengawas saluran jaringan.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
              <span>
                <strong className="text-white">Reaksi Penyusup:</strong> Menyadari adanya informasi penting yang sedang dikirimkan, tetapi kesulitan dan tidak dapat melihat isi asli dari pesan tersebut karena terkunci rapat.
              </span>
            </li>
          </ul>
        </div>

        {/* Kolom 2: Steganografi */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center text-white">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Steganografi</h4>
              <span className="text-[10px] text-zinc-400 font-mono">Seni Mengaburkan Keberadaan</span>
            </div>
          </div>

          <ul className="text-xs text-zinc-300 space-y-2 font-sans text-justify">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
              <span>
                <strong className="text-white">Tujuan Pokok:</strong> Menyembunyikan keberadaan fakta bahwa sedang terjadi pertukaran informasi rahasia.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
              <span>
                <strong className="text-white">Wujud Berkas:</strong> Berkas tampak seperti media lumrah sehari-hari (foto kegiatan kampus, lagu audio, atau dokumen biasa).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
              <span>
                <strong className="text-white">Reaksi Penyusup:</strong> Mengabaikan berkas karena menganggap berkas tersebut hanyalah kiriman foto normal.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ========================================================
          ANIMASI SIMULATOR PERTAHANAN BERLAPIS (DEFENSE-IN-DEPTH)
          ======================================================== */}
      <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-white/[0.08] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-400" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">
              Simulator Interaktif: 4 Tahap Kombinasi Pertahanan Berlapis
            </h4>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            Tahap {pipelineStep} dari 4
          </span>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { step: 1, label: '1. Enkripsi Kriptografi' },
            { step: 2, label: '2. Injeksi Steganografi' },
            { step: 3, label: '3. Penyadapan Publik' },
            { step: 4, label: '4. Ekstraksi & Buka' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setPipelineStep(item.step)}
              className={`py-1.5 px-2 rounded-lg text-center text-[10px] font-mono transition-all ${
                pipelineStep === item.step
                  ? 'bg-white text-zinc-950 font-bold shadow-sm'
                  : pipelineStep > item.step
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-white/[0.04] text-zinc-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Stage Display */}
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] min-h-[160px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {/* TAHAP 1: Enkripsi Kriptografi */}
            {pipelineStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Tahap 1: Mengunci Makna Pesan (Kriptografi)</span>
                  <span className="text-[10px] font-mono text-zinc-400">Teks Asli -&gt; Ciphertext</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 w-full text-center">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Plaintext Asal:</span>
                    <span className="font-mono text-xs text-emerald-400">{rawPlaintext}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-500 shrink-0 rotate-90 sm:rotate-0" />
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 w-full text-center">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Ciphertext Terkunci Kunci:</span>
                    <span className="font-mono text-xs text-amber-400 font-semibold">{encryptedCiphertext}</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans text-justify">
                  Sebelum disembunyikan, teks asli terlebih dahulu diacak menggunakan algoritma kriptografi. Jika data langsung disembunyikan tanpa dienkripsi, data tersebut akan telanjang begitu steganografinya terdeteksi.
                </p>
              </motion.div>
            )}

            {/* TAHAP 2: Injeksi Steganografi */}
            {pipelineStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Tahap 2: Menyembunyikan Jejak (Steganografi)</span>
                  <span className="text-[10px] font-mono text-zinc-400">Ciphertext -&gt; Berkas Stego</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 w-full text-center">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Ciphertext Input:</span>
                    <span className="font-mono text-xs text-amber-400 font-semibold">{encryptedCiphertext}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-500 shrink-0 rotate-90 sm:rotate-0" />
                  <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20 w-full text-center">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Media Penampung:</span>
                    <span className="font-mono text-xs text-sky-300">foto_wisuda_fakultas.png</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans text-justify">
                  Teks sandi yang sudah teracak diinjeksi ke dalam bit LSB gambar foto wisuda. Berkas keluaran tampak wajar dan tidak mencurigakan, siap dikirim melalui saluran publik.
                </p>
              </motion.div>
            )}

            {/* TAHAP 3: Uji Penyadapan di Saluran Publik */}
            {pipelineStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Tahap 3: Uji Ketahanan Terhadap Penyadapan</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">Kebal 2 Skenario Serangan</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 space-y-1">
                    <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                      <Eye className="h-3.5 w-3.5 text-zinc-400" />
                      <span>Skenario A (Pengawas Kasat Mata):</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      Pengawas hanya melihat kiriman foto biasa. Tidak ada rasa curiga, komunikasi lolos tanpa hambatan.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Skenario B (Audit Pemindai Bit):</span>
                    </div>
                    <p className="text-zinc-300 text-[11px] leading-relaxed">
                      Jika pemindai mendeteksi bit anomali, penyerang hanya mendapati kode sandi acak tanpa kunci, sehingga isi pesan tetap terlindungi 100%.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAHAP 4: Ekstraksi & Buka di Sisi Penerima */}
            {pipelineStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400">Tahap 4: Ekstraksi & Dekripsi Sisi Penerima Sah</span>
                  <span className="text-[10px] font-mono text-emerald-400">Komunikasi Selesai</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center font-mono space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase block">Pesan Asli Berhasil Dipulihkan:</span>
                  <span className="text-sm font-semibold text-emerald-300">{rawPlaintext}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans text-justify">
                  Penerima yang sah melakukan ekstraksi bit steganografi untuk memperoleh ciphertext, kemudian memasukkan kunci kriptografi rahasia untuk membaca dokumen aslinya.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setPipelineStep(1)}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Mulai dari Tahap 1</span>
          </button>

          <button
            onClick={() => setPipelineStep((prev) => (prev < 4 ? prev + 1 : 1))}
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all shadow-sm"
          >
            <span>{pipelineStep < 4 ? `Lanjut ke Tahap ${pipelineStep + 1}` : 'Ulangi Seluruh Alur'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
