'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  FileCode,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const MnemonikIntegrity: React.FC = () => {
  const [isTampered, setIsTampered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  const toggleTamper = (targetState: boolean) => {
    if (targetState) {
      setIsGlitching(true);
      setTimeout(() => {
        setIsTampered(true);
        setIsGlitching(false);
      }, 400);
    } else {
      setIsTampered(false);
      setIsGlitching(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik 02 • Integritas (Integrity)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500">Status Keaslian Data:</span>
          {isTampered ? (
            <span className="text-rose-400 font-semibold flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" /> Data Telah Dimodifikasi Pihak Luar
            </span>
          ) : (
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Data Asli dan Terverifikasi
            </span>
          )}
        </div>
      </div>

      {/* Mock Browser Container showing Web Page */}
      <motion.div
        animate={isGlitching ? { x: [-12, 12, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-xl overflow-hidden border transition-all duration-300 mb-5 ${
          isTampered
            ? 'border-rose-500/40 bg-black/90 shadow-[0_0_40px_rgba(244,63,94,0.12)]'
            : 'border-white/10 bg-black/70 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Browser Top Navigation Bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/80 border-b border-white/[0.06] text-xs">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/50 border border-white/[0.06] text-[11px] font-mono text-zinc-400 flex-1 truncate">
            <Lock className="h-3 w-3 text-zinc-500 shrink-0" />
            <span className="text-zinc-300">https://akademik.univ.ac.id</span>
            <span className="text-zinc-500">/pengumuman-kelulusan</span>
          </div>

          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">Peramban Web</span>
        </div>

        {/* Website Content (Normal vs Tampered View) */}
        <div className="p-4 sm:p-6 min-h-[200px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!isTampered ? (
              /* State 1: Website Normal */
              <motion.div
                key="normal-web"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="space-y-4"
              >
                {/* Web Site Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">
                        Portal Pengumuman Kelulusan Resmi
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        Pusat Informasi Akademik Mahasiswa
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Resmi • Sesuai Berkas Asli
                  </span>
                </div>

                {/* Announcement Body */}
                <div className="p-3.5 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-300">
                      Pengumuman Status Yudisium Kelulusan
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">STATUS: SAH</span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans text-justify">
                    Berdasarkan Surat Keputusan Rektorat, mahasiswa atas nama Ahmad Fauzi (NIM 220501)
                    dinyatakan lulus dengan predikat pujian dengan perolehan Indeks Prestasi Kumulatif 3.94.
                  </p>
                </div>

                {/* Checksum Verification Bar */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> Nilai Sidik Jari Digital Cocok
                  </span>
                  <span>Tidak Ditemukan Perubahan Data</span>
                </div>
              </motion.div>
            ) : (
              /* State 2: Website Tampered / Defaced */
              <motion.div
                key="tampered-web"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-4"
              >
                {/* Hacked Web Header */}
                <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-rose-400 tracking-wider uppercase font-mono">
                        Peringatan: Tampilan Laman Berubah
                      </h4>
                      <p className="text-[10px] text-rose-300/80 font-mono">
                        Informasi Pada Laman Web Telah Dimanipulasi Pihak Lain
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 rounded font-bold animate-pulse">
                    DATA PALSU
                  </span>
                </div>

                {/* Tampered Announcement Body */}
                <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-400">
                      Data Nilai Diubah Tanpa Izin
                    </span>
                    <span className="text-[10px] font-mono text-rose-300 uppercase">
                      STATUS: TIDAK RESMI
                    </span>
                  </div>
                  <p className="text-xs text-rose-200 leading-relaxed font-sans text-justify">
                    Status kelulusan mahasiswa atas nama Ahmad Fauzi (NIM 220501) diubah secara sepihak
                    menjadi tidak lulus serta dikenakan sanksi pembatalan skripsi. Informasi ini tidak
                    sesuai dengan berkas pimpinan yang sah.
                  </p>
                </div>

                {/* Broken Checksum Bar */}
                <div className="flex items-center justify-between text-[10px] font-mono text-rose-400/90 pt-1">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-rose-400" /> Nilai Sidik Jari Digital Tidak Cocok
                    dengan Berkas Induk
                  </span>
                  <span>Integritas Terbukti Rusak</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Two Control Buttons Required by User */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {/* Tombol 1: Keadaan Normal */}
        <button
          onClick={() => toggleTamper(false)}
          className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
            !isTampered
              ? 'bg-white/[0.06] border-emerald-500/40 text-white shadow-[0_0_20px_rgba(16,185,129,0.08)]'
              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block mb-0.5">
              1. Tampilan Web Normal (Integritas Terjaga)
            </span>
            <p className="text-[11px] text-zinc-400 leading-snug text-justify">
              Data halaman web asli dan sesuai dengan catatan pimpinan resmi. Tidak terdapat modifikasi
              apa pun pada isi pengumuman.
            </p>
          </div>
        </button>

        {/* Tombol 2: Keadaan Integritas Terganggu */}
        <button
          onClick={() => toggleTamper(true)}
          className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
            isTampered
              ? 'bg-white/[0.06] border-rose-500/40 text-white shadow-[0_0_20px_rgba(244,63,94,0.08)]'
              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block mb-0.5">
              2. Simulasikan Integritas Terganggu
            </span>
            <p className="text-[11px] text-zinc-400 leading-snug text-justify">
              Pihak luar menyusup dan mengganti isi tulisan pada laman web sehingga pesan yang ditampilkan
              berubah drastis menjadi informasi palsu.
            </p>
          </div>
        </button>
      </div>

      {/* Explanatory Conclusion */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300 flex items-start gap-2.5">
        <FileCode className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-justify">
          {isTampered ? (
            <span>
              <strong className="text-rose-400">Bahaya Perubahan Data:</strong> Serangan terhadap integritas
              tidak perlu mengambil data rahasia. Cukup dengan mengubah sebagian kecil informasi, penyerang
              dapat menciptakan kepanikan umum, merusak nama baik, serta menimbulkan keputusan yang keliru.
            </span>
          ) : (
            <span>
              <strong className="text-emerald-400">Jaminan Kebenaran Informasi:</strong> Integritas memastikan
              setiap data yang dibaca oleh mahasiswa dapat dipertanggungjawabkan keasliannya karena sistem
              mampu mendeteksi secara pasti jika ada pihak yang mencoba mengubahnya.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
