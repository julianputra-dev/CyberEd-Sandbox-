'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Play,
  RotateCcw,
  Target,
  HelpCircle,
  Database,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserCheck,
  UserX,
} from 'lucide-react';

export const MnemonikGembokSqli: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<'normal_valid' | 'normal_invalid' | 'sqli_tautology' | 'sqli_admin_bypass'>('sqli_tautology');
  const [usePreparedStatement, setUsePreparedStatement] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationStep, setEvaluationStep] = useState<number>(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'rejected'>('idle');

  const presets = {
    normal_valid: {
      label: 'Login Mahasiswa Sah',
      badge: 'Pengguna Asli',
      username: 'budi_santoso',
      password: 'password123',
      intent: 'Mahasiswa memasukkan username dan kata sandi asli miliknya.',
      whyExplanation: {
        vulnerableMode: {
          title: 'Mengapa Pengguna Ini Bisa Masuk Secara Sah?',
          reason:
            'Nama akun budi_santoso dan kata sandi yang diketik benar-benar cocok dengan arsip data di kampus. Penjaga database memeriksa kedua informasi tersebut, menemukan kesamaan data, dan membukakan pintu akses secara normal.',
          lesson:
            'Pada kondisi wajar, sistem memverifikasi bahwa pemegang akun memang mengetahui kunci rahasia yang tepat.',
        },
        secureMode: {
          title: 'Login Sah Tetap Diterima di Sistem Aman',
          reason:
            'Sistem yang aman tetap memperlakukan data sah dengan sempurna: nama budi_santoso dicari di arsip, kata sandinya cocok, sehingga pintu gerbang terbuka secara wajar.',
          lesson:
            'Penerapan pengamanan sistem tidak mengganggu kenyamanan pengguna yang berhak.',
        },
      },
    },
    normal_invalid: {
      label: 'Login Salah (Kata Sandi Keliru)',
      badge: 'Akses Ditolak',
      username: 'budi_santoso',
      password: 'passwordsalah',
      intent: 'Pengguna salah mengingat kata sandi atau orang asing mencoba menebak.',
      whyExplanation: {
        vulnerableMode: {
          title: 'Mengapa Akses Ditolak oleh Penjaga Database?',
          reason:
            'Meskipun nama budi_santoso terdaftar di kampus, kata sandi yang dimasukkan salah. Penjaga database menjalankan tugas dasarnya: jika kunci tidak pas, pintu tetap dikunci rapat demi melindungi akun mahasiswa.',
          lesson:
            'Sistem bekerja normal menolak siapa pun yang tidak bisa membuktikan kepemilikan kata sandi.',
        },
        secureMode: {
          title: 'Akses Ditolak Sesuai Aturan Keamanan',
          reason:
            'Kata sandi keliru ditolak dengan aman baik pada sistem biasa maupun sistem yang diperkuat.',
          lesson:
            'Kerahasiaan akun tetap terjaga dari tebakan sembarangan.',
        },
      },
    },
    sqli_tautology: {
      label: "Trik Logika: ' OR 1=1 --",
      badge: 'Serangan SQLi',
      username: "' OR 1=1 --",
      password: '(Dikosongkan)',
      intent: 'Menyusupkan pernyataan matematika yang selalu bernilai benar untuk mengecoh penjaga.',
      whyExplanation: {
        vulnerableMode: {
          title: 'Mengapa Gembok Tertipu dan Pintu Terbuka Tanpa Kata Sandi?',
          reason:
            'Pembuat web melakukan kesalahan fatal: sistem TIDAK MEMBEDAKAN mana nama orang dan mana kalimat perintah! Ketika disodori pertanyaan "Apakah 1 sama dengan 1?", penjaga database yang polos menjawab "Ya, itu PASTI BENAR!". Karena ada kata sambung ATAU (OR), penjaga menganggap syarat masuk terpenuhi dan langsung membuka pintu gerbang meskipun kolom kata sandi kosong!',
          lesson:
            'Akar masalah SQLi: Sistem mencampurkan masukan data dari tamu dengan kalimat perintah sistem, sehingga instruksi tamu langsung dituruti oleh database.',
        },
        secureMode: {
          title: 'Bagaimana Sistem Aman Menggagalkan Tipuan Ini?',
          reason:
            'Dengan mode pengamanan aktif (Prepared Statement), sistem memperlakukan masukan pengguna MURNI SEBAGAI TEKS NAMA ORANG, bukan sebagai rumus matematika. Penjaga database mencari: "Apakah ada mahasiswa yang bernama persis \' OR 1=1 --?". Karena tidak ada nama aneh seperti itu di kampus, tipuan gagal total dan gembok tetap terkunci rapat!',
          lesson:
            'Solusi SQLi: Jangan biarkan karakter tanda petik mengubah logika perintah. Kunci masukan tamu murni sebagai data pasif.',
        },
      },
    },
    sqli_admin_bypass: {
      label: "Bypass Akun Admin: admin' --",
      badge: 'Serangan Akun',
      username: "admin' --",
      password: '(Dikosongkan)',
      intent: 'Memaksa sistem langsung memilih akun pengelola tertinggi dan memotong verifikasi sandi.',
      whyExplanation: {
        vulnerableMode: {
          title: 'Mengapa Penyerang Bisa Langsung Masuk Sebagai Administrator?',
          reason:
            'Tanda petik tunggal mengakhiri nama admin, dan simbol strip ganda (--) memerintahkan database membuang seluruh kalimat setelahnya. Penjaga database hanya membaca perintah: "Ambil akun bernama admin", lalu mengabaikan pertanyaan kata sandi di belakangnya. Penyerang langsung masuk menguasai wewenang administrator tanpa tahu kata sandi aslinya!',
          lesson:
            'Penyerang memanipulasi alur logika pemeriksaan sehingga syarat verifikasi kata sandi sengaja dihapus oleh interpreter basis data.',
        },
        secureMode: {
          title: 'Bypass Admin Berhasil Digagalkan!',
          reason:
            'Sistem aman tidak membiarkan tanda petik memotong pemeriksaan. Sistem mencari pengguna yang bernama "admin\' --" secara utuh dan tetap mewajibkan kecocokan kata sandi. Serangan bypass gagal!',
          lesson:
            'Sistem yang aman tidak pernah melewatkan pemeriksaan kata sandi apa pun karakter yang disisipkan penyerang.',
        },
      },
    },
  };

  const current = presets[selectedPreset];
  const dynamicExplanation = usePreparedStatement
    ? current.whyExplanation.secureMode
    : current.whyExplanation.vulnerableMode;

  const handleRunSimulation = () => {
    setIsEvaluating(true);
    setEvaluationStep(1);
    setStatus('idle');

    setTimeout(() => {
      setEvaluationStep(2);
    }, 1100);

    setTimeout(() => {
      setEvaluationStep(3);
    }, 2200);

    setTimeout(() => {
      setEvaluationStep(4);
      setIsEvaluating(false);

      if (usePreparedStatement) {
        if (selectedPreset === 'normal_valid') {
          setStatus('success');
        } else {
          setStatus('rejected');
        }
      } else {
        if (
          selectedPreset === 'normal_valid' ||
          selectedPreset === 'sqli_tautology' ||
          selectedPreset === 'sqli_admin_bypass'
        ) {
          setStatus('success');
        } else {
          setStatus('rejected');
        }
      }
    }, 3500);
  };

  const handleReset = () => {
    setIsEvaluating(false);
    setEvaluationStep(0);
    setStatus('idle');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div>
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Animasi Mnemonik • Konsep Sederhana SQLi
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5 flex items-center gap-2">
            <span>Karakter Gembok Penjaga Basis Data: Bagaimana Sistem Bisa Terkelabui?</span>
          </h3>
        </div>

        {/* Toggle Mode Pertahanan */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400">Pertahanan Sistem:</span>
          <button
            onClick={() => {
              setUsePreparedStatement(!usePreparedStatement);
              handleReset();
            }}
            className={`text-xs px-3 py-1.5 rounded-xl border font-mono transition-all flex items-center gap-1.5 ${
              usePreparedStatement
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{usePreparedStatement ? 'Mode Aman (Pemisahan Data)' : 'Mode Rentan (Bercampur)'}</span>
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Mengapa aplikasi web bisa terkena SQL Injection? Penyebab utamanya sangat manusiawi: <strong>pembuat web tidak membedakan mana input data identitas dan mana perintah yang memanipulasi database</strong>. Seluruh teks masukan pengguna langsung digabungkan begitu saja ke dalam kalimat perintah sistem. Akibatnya, ketika penyerang memasukkan teka-teki logika seperti <code className="text-amber-400">&apos; OR 1=1 --</code>, penjaga database mengira itu adalah aturan resmi yang sah! Uji coba empat skenario di bawah ini:
      </p>

      {/* 4 Pilihan Skenario Interaktif */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {(Object.keys(presets) as Array<keyof typeof presets>).map((key) => {
          const isSelected = selectedPreset === key;
          const item = presets[key];
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedPreset(key);
                handleReset();
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-white text-zinc-950 font-semibold shadow-md border-white'
                  : 'bg-zinc-950/70 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-white/15'
              }`}
            >
              <span className="text-xs block font-semibold truncate">{item.label}</span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded inline-block mt-1.5 ${
                  isSelected
                    ? 'bg-zinc-800 text-zinc-200'
                    : item.badge.includes('SQLi')
                    ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                    : 'bg-white/[0.04] text-zinc-400'
                }`}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panggung Simulasi Utama: Form Masukan Tamu vs Karakter Gembok Penjaga */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch mb-5">
        {/* Kolom Kiri: Papan Dialog Masukan Tamu (Span 6) */}
        <div className="lg:col-span-6 p-4 rounded-2xl bg-zinc-950/90 border border-white/[0.06] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.06] text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-zinc-300" /> Formulir Masukan Pengguna (Pintu Gerbang)
              </span>
              <span className="text-[10px] text-zinc-500">Pintu Masuk Kampus</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                  Kolom Masukan Nama Akun:
                </label>
                <div className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-xs flex items-center justify-between">
                  <span
                    className={
                      current.username.includes("'")
                        ? 'text-amber-400 font-semibold'
                        : 'text-white'
                    }
                  >
                    {current.username}
                  </span>
                  {current.username.includes("'") && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      Trik Kutip Injeksi
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                  Kolom Masukan Kata Sandi:
                </label>
                <div className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-zinc-400 flex items-center justify-between">
                  <span>
                    {current.password.includes('(') ? (
                      <span className="text-zinc-600 italic">Dilewati / Tanpa Kata Sandi</span>
                    ) : (
                      '••••••••••••'
                    )}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-mono">
                    {current.password.includes('(') ? 'Dipotong Trik' : 'Tersandi'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dialog Pemahaman Konseptual */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.06] text-xs space-y-2">
            <span className="text-zinc-400 font-mono text-[11px] flex items-center gap-1">
              <Target className="h-3.5 w-3.5 text-amber-400" /> Niat Pengguna:
            </span>
            <p className="text-zinc-300 leading-relaxed text-justify text-[11px] sm:text-xs">
              {current.intent}
            </p>
            <div className="text-[10px] font-mono pt-1 text-zinc-500 border-t border-white/[0.04]">
              {usePreparedStatement
                ? 'Status Pertahanan: Masukan diperlakukan murni sebagai teks nama orang (Aman).'
                : 'Status Pertahanan: Masukan langsung digabung ke kalimat perintah sistem (Rentan).' }
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Karakter Gembok Penjaga yang Halus & Ekspresif (Span 6) */}
        <div className="lg:col-span-6 p-4 rounded-2xl bg-zinc-950/90 border border-white/[0.06] flex flex-col justify-between space-y-3 relative overflow-hidden">
          {/* Header Status Penjaga */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-xs font-mono">
            <span className="text-zinc-400">Reaksi Penjaga Database:</span>
            <span
              className={`font-semibold ${
                status === 'success'
                  ? 'text-emerald-400'
                  : status === 'rejected'
                  ? 'text-rose-400'
                  : 'text-zinc-400'
              }`}
            >
              {status === 'idle' && (isEvaluating ? 'Memeriksa Kunci...' : 'Pintu Tertutup')}
              {status === 'success' && 'GERBANG TERBUKA!'}
              {status === 'rejected' && 'GERBANG TETAP TERKUNCI!'}
            </span>
          </div>

          {/* Area Karakter Gembok Animasi yang Lebih Organik & Bersahabat */}
          <div className="py-2 flex flex-col items-center justify-center relative">
            {/* Gelembung Pikiran Gembok yang Halus */}
            <AnimatePresence>
              {isEvaluating && evaluationStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="absolute -top-4 z-20 max-w-[270px] p-2.5 rounded-2xl bg-white text-zinc-950 shadow-2xl border border-zinc-200 text-center"
                >
                  <p className="text-[11px] font-sans font-medium leading-snug">
                    {usePreparedStatement
                      ? selectedPreset === 'normal_valid'
                        ? 'Nama dan kata sandi cocok di buku arsip kampus. Pintu dibuka!'
                        : 'Tanda petik ini hanya teks nama biasa. Tidak ada akun bernama aneh seperti ini, akses ditolak!'
                      : selectedPreset === 'sqli_tautology'
                      ? 'Lho? 1 sama dengan 1 kan memang selalu benar! Karena ada kata ATAU, seluruh syarat terpenuhi! Masuklah!'
                      : selectedPreset === 'sqli_admin_bypass'
                      ? 'Tanda petik dan strip ganda ini memotong pemeriksaan sandi! Saya langsung mengambil akun admin. Masuklah!'
                      : selectedPreset === 'normal_valid'
                      ? 'Nama budi_santoso dan kata sandi cocok. Pintu dibuka secara sah!'
                      : 'Kata sandi tidak cocok dengan buku arsip. Pintu tetap dikunci!'}
                  </p>
                  <div className="w-2.5 h-2.5 bg-white transform rotate-45 mx-auto -mb-3 mt-1 border-r border-b border-zinc-200" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Maskot Gembok Modern (Lebih Bersahabat & Halus) */}
            <div className="relative my-3">
              <motion.div
                animate={
                  status === 'success'
                    ? { y: [0, -10, 0], scale: [1, 1.05, 1] }
                    : status === 'rejected'
                    ? { x: [-5, 5, -5, 5, 0] }
                    : isEvaluating
                    ? { rotate: [-1.5, 1.5, -1.5, 1.5, 0] }
                    : { y: [0, -2, 0] }
                }
                transition={{
                  repeat: isEvaluating || status === 'idle' ? Infinity : 0,
                  duration: isEvaluating ? 0.8 : 3,
                  ease: 'easeInOut',
                }}
                className={`w-28 h-28 rounded-3xl flex flex-col items-center justify-center relative border transition-all duration-500 shadow-xl ${
                  status === 'success'
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_35px_rgba(16,185,129,0.35)] text-emerald-400'
                    : status === 'rejected'
                    ? 'bg-rose-950/40 border-rose-500 shadow-[0_0_35px_rgba(239,68,68,0.35)] text-rose-400'
                    : isEvaluating
                    ? 'bg-amber-950/30 border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.25)] text-amber-300'
                    : 'bg-zinc-900 border-white/10 text-zinc-400 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Kait Gembok Melengkung Halus */}
                <motion.div
                  animate={
                    status === 'success'
                      ? { y: -16, rotate: -25, x: 4 }
                      : { y: 0, rotate: 0, x: 0 }
                  }
                  transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                  className="absolute -top-6 w-14 h-12 rounded-t-full border-[5px] border-current border-b-0"
                />

                {/* Mata Gembok Ekspresif */}
                <div className="flex items-center gap-3.5 mb-2 z-10">
                  <motion.div
                    animate={
                      isEvaluating
                        ? { scaleY: [1, 0.2, 1], x: [-1.5, 1.5, -1.5] }
                        : status === 'success'
                        ? { scaleY: 0.3 }
                        : { scaleY: [1, 1, 0.1, 1] }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: isEvaluating ? 0.6 : 4,
                      times: isEvaluating ? undefined : [0, 0.9, 0.95, 1],
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-current"
                  />
                  <motion.div
                    animate={
                      isEvaluating
                        ? { scaleY: [1, 0.2, 1], x: [-1.5, 1.5, -1.5] }
                        : status === 'success'
                        ? { scaleY: 0.3 }
                        : { scaleY: [1, 1, 0.1, 1] }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: isEvaluating ? 0.6 : 4,
                      times: isEvaluating ? undefined : [0, 0.9, 0.95, 1],
                    }}
                    className="w-2.5 h-2.5 rounded-full bg-current"
                  />
                </div>

                {/* Ikon Kunci di Tubuh Gembok */}
                <div className="z-10">
                  {status === 'success' ? (
                    <Unlock className="h-6 w-6" />
                  ) : (
                    <Lock className="h-6 w-6" />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Indikator Status Langkah Pemeriksaan */}
            <div className="w-full p-2.5 rounded-xl bg-black/70 border border-white/[0.06] text-[11px] font-mono text-center space-y-1">
              {evaluationStep === 0 && (
                <span className="text-zinc-500">Tekan tombol di bawah untuk menguji reaksi gembok</span>
              )}
              {evaluationStep === 1 && (
                <span className="text-amber-300">Langkah 1: Penjaga membaca masukan teks pengguna...</span>
              )}
              {evaluationStep === 2 && (
                <span className="text-amber-300">Langkah 2: Penjaga menafsirkan arti masukan tersebut...</span>
              )}
              {evaluationStep === 3 && (
                <span className="text-amber-300">Langkah 3: Menghitung keputusan (Benar atau Salah)...</span>
              )}
              {evaluationStep === 4 && (
                <span
                  className={status === 'success' ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}
                >
                  {status === 'success'
                    ? selectedPreset === 'sqli_admin_bypass' && !usePreparedStatement
                      ? 'Hasil Akhir: Pengecekan Sandi Dipotong! Masuk Sebagai Admin.'
                      : selectedPreset === 'sqli_tautology' && !usePreparedStatement
                      ? 'Hasil Akhir: Logika 1=1 Selalu Benar! Pintu Terbuka.'
                      : 'Hasil Akhir: Kredensial Sah Cocok! Pintu Terbuka.'
                    : 'Hasil Akhir: Kredensial Ditolak! Pintu Tetap Terkunci.'}
                </span>
              )}
            </div>
          </div>

          {/* Tombol Kontrol Aksi */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <button
              onClick={handleRunSimulation}
              disabled={isEvaluating}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isEvaluating ? 'Sedang Memeriksa...' : 'Uji Reaksi Gembok'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all flex items-center gap-1"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          KOLOM PENJELASAN DINAMIS SESUAI SKENARIO YANG DIPILIH
          (Menjelaskan kenapa bisa login, kenapa ditolak, kenapa tertipu)
          ======================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedPreset}-${usePreparedStatement}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs space-y-2 text-zinc-300"
        >
          <div className="flex items-center gap-2 font-semibold text-white">
            <KeyRound className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="text-sm">{dynamicExplanation.title}</span>
          </div>

          <p className="leading-relaxed text-justify text-zinc-300 text-xs sm:text-sm">
            {dynamicExplanation.reason}
          </p>

          <div className="pt-2 border-t border-white/[0.06] flex items-start gap-2 text-[11px] text-zinc-400">
            <strong className="text-amber-300 shrink-0">Poin Analisis KSI:</strong>
            <span>{dynamicExplanation.lesson}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
