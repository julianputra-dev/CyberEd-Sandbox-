'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  CheckCircle2,
  AlertOctagon,
  Loader2,
  WifiOff,
  Server,
  Lock,
} from 'lucide-react';

export const MnemonikAvailability: React.FC = () => {
  const [accessState, setAccessState] = useState<'success' | 'loading' | 'failed'>('success');

  const handleNormalAccess = () => {
    setAccessState('loading');
    setTimeout(() => {
      setAccessState('success');
    }, 400);
  };

  const handleFailedAccess = () => {
    setAccessState('loading');

    // Menampilkan animasi memuat berputar sebelum memunculkan status gagal koneksi
    setTimeout(() => {
      setAccessState('failed');
    }, 1800);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik 03 • Ketersediaan (Availability)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-zinc-500">Status Layanan Web:</span>
          {accessState === 'success' && (
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Tersedia (HTTP 200 OK)
            </span>
          )}
          {accessState === 'loading' && (
            <span className="text-amber-400 flex items-center gap-1 font-semibold">
              <Loader2 className="h-3 w-3 animate-spin" />
              Menghubungi Server Web...
            </span>
          )}
          {accessState === 'failed' && (
            <span className="text-rose-400 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Web Tidak Dapat Diakses
            </span>
          )}
        </div>
      </div>

      {/* Mock Browser Container */}
      <div
        className={`rounded-xl overflow-hidden border transition-all duration-300 mb-5 ${
          accessState === 'failed'
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
            {accessState === 'loading' ? (
              <Loader2 className="h-3 w-3 text-amber-400 animate-spin shrink-0" />
            ) : accessState === 'failed' ? (
              <WifiOff className="h-3 w-3 text-rose-400 shrink-0" />
            ) : (
              <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
            )}
            <span className="text-zinc-300">https://siakad.univ.ac.id</span>
            <span className="text-zinc-500">/pengisian-krs-semester</span>
          </div>

          <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">Peramban Web</span>
        </div>

        {/* Website Access Stage */}
        <div className="p-4 sm:p-6 min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {accessState === 'loading' && (
              /* State Loading: Animasi mutar-mutar tanpa henti */
              <motion.div
                key="loading-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-8 text-center space-y-3"
              >
                <div className="relative">
                  <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
                  <span className="absolute inset-0 rounded-full blur-md bg-amber-400/20" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Menunggu Tanggapan dari Server Tujuan...</h4>
                  <p className="text-[11px] text-zinc-400 font-mono mt-1">
                    Mencoba membuka laman siakad.univ.ac.id
                  </p>
                </div>
              </motion.div>
            )}

            {accessState === 'success' && (
              /* State 1: Sukses Memasuki Web Tanpa Masalah */
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* User Dashboard Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">
                        Portal Akademik Berhasil Terbuka
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        Waktu Respons: 18 milidetik • Koneksi Aman
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    HTTP 200 OK
                  </span>
                </div>

                {/* Dashboard Card Content */}
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium">
                      Status Akun: Mahasiswa Aktif
                    </span>
                    <span className="font-mono text-emerald-400 text-[11px]">PORTAL DIBUKA</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                    Semua menu perkuliahan dapat diakses langsung. Mahasiswa dapat memilih mata kuliah,
                    mencetak kartu ujian, serta melihat jadwal perkuliahan tanpa hambatan antrean.
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Layanan Siap Digunakan Pengguna
                  </span>
                  <span>Ketersediaan Sistem Terpenuhi</span>
                </div>
              </motion.div>
            )}

            {accessState === 'failed' && (
              /* State 2: Gagal Mengakses Web (Hanya Laman Web yang Gagal, Bukan Perangkat Pengguna) */
              <motion.div
                key="failed-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Browser Error Header */}
                <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <WifiOff className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-rose-400 font-mono uppercase">
                        Situs Ini Tidak Dapat Dijangkau
                      </h4>
                      <p className="text-[10px] text-rose-300/80 font-mono">
                        ERR_CONNECTION_TIMED_OUT • Kode Status 503
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 rounded font-bold">
                    SERVER TIDAK MENJAWAB
                  </span>
                </div>

                {/* Error Description Box */}
                <div className="p-3.5 rounded-lg bg-rose-950/30 border border-rose-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
                    <AlertOctagon className="h-4 w-4 shrink-0" />
                    <span>Laman Web Menolak Sambungan Karena Terlalu Lama Merespons</span>
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed font-sans text-justify">
                    Server web tujuan kebanjiran permintaan lalu lintas data yang berlebihan sehingga
                    mengabaikan koneksi baru. Akibatnya peramban web pada komputer pengguna membatalkan
                    proses pemuatan halaman karena melewati batas waktu tunggu yang ditentukan.
                  </p>
                </div>

                {/* Sisi Klien Status: Tidak ada beban CPU lokal yang disinggung */}
                <div className="flex items-center justify-between text-[10px] font-mono text-rose-400/80 pt-1">
                  <span>Prinsip Ketersediaan (Availability) Terganggu</span>
                  <span>Kondisi: Waktu Sambungan Habis (Timeout)</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Two Control Buttons Required by User */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {/* Tombol 1: Akses Web Normal Tanpa Masalah */}
        <button
          onClick={handleNormalAccess}
          className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
            accessState === 'success'
              ? 'bg-white/[0.06] border-emerald-500/40 text-white shadow-[0_0_20px_rgba(16,185,129,0.08)]'
              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block mb-0.5">
              1. Buka Web Normal (Tersedia Penuh)
            </span>
            <p className="text-[11px] text-zinc-400 leading-snug text-justify">
              Koneksi terhubung langsung tanpa hambatan. Seluruh menu dan formulir akademik dapat dibuka
              kapan pun mahasiswa memerlukannya.
            </p>
          </div>
        </button>

        {/* Tombol 2: Tidak Bisa Mengakses Web (Animasi Mutar-Mutar & Down) */}
        <button
          onClick={handleFailedAccess}
          className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
            accessState === 'failed' || accessState === 'loading'
              ? 'bg-white/[0.06] border-rose-500/40 text-white shadow-[0_0_20px_rgba(244,63,94,0.08)]'
              : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20'
          }`}
        >
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
            <AlertOctagon className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block mb-0.5">
              2. Buka Web Saat Mengalami Gangguan
            </span>
            <p className="text-[11px] text-zinc-400 leading-snug text-justify">
              Peramban memuat terus-menerus hingga batas waktu habis karena server web tidak kunjung
              memberikan jawaban.
            </p>
          </div>
        </button>
      </div>

      {/* Explanatory Conclusion */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300 flex items-start gap-2.5">
        <Server className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-justify">
          {accessState === 'failed' ? (
            <span>
              <strong className="text-rose-400">Dampak Nyata Gangguan Ketersediaan:</strong> Meskipun data
              nilai tidak dicuri dan tidak diubah, lumpuhnya situs web pada masa penting seperti pengisian rencana
              studi membuat mahasiswa tidak dapat mendaftar kuliah tepat waktu dan menghentikan pelayanan kampus.
            </span>
          ) : (
            <span>
              <strong className="text-emerald-400">Menjaga Ketersediaan Sistem:</strong> Ketersediaan dipertahankan
              melalui penggunaan server cadangan, pembagian beban jalur data, serta proteksi penyaring lalu lintas
              sehingga situs web tetap dapat dibuka oleh pengguna yang sah dalam kondisi apa pun.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
