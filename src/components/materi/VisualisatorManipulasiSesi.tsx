'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cookie,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  User,
  Users,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ArrowRight,
  Lock,
  Unlock,
  RefreshCw,
  History,
  Terminal,
  ChevronRight,
} from 'lucide-react';

interface SessionStep {
  stepNumber: number;
  title: string;
  badge: string;
  detail: string;
  activeEntity: 'victim' | 'server' | 'attacker';
  logSummary: string;
}

export const VisualisatorManipulasiSesi: React.FC = () => {
  const [attackType, setAttackType] = useState<'hijacking' | 'fixation'>('hijacking');
  const [defenseActive, setDefenseActive] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const getSteps = (): SessionStep[] => {
    if (attackType === 'hijacking') {
      return [
        {
          stepNumber: 1,
          title: 'Tahap 1: Mahasiswa Sah Melakukan Autentikasi',
          badge: 'Login Normal',
          detail:
            'Mahasiswa login dengan akun resmi ke portal kampus. Server memverifikasi kredensial dan menerbitkan Karcis Sesi aktif (#KAMPUS_4102) yang disimpan di peramban mahasiswa.',
          activeEntity: 'victim',
          logSummary: 'Karcis sesi diterbitkan untuk korban: #KAMPUS_4102',
        },
        {
          stepNumber: 2,
          title: defenseActive
            ? 'Tahap 2: Upaya Pencurian Digagalkan Atribut HttpOnly'
            : 'Tahap 2: Peretas Menyalin Karcis Sesi Aktif',
          badge: defenseActive ? 'Pencegahan Berhasil' : 'Pencurian Cookie',
          detail: defenseActive
            ? 'Perlindungan Aktif: Kuki sesi dipasangi bendera HttpOnly dan Secure. Skrip peramban dilarang keras membaca nilai kuki, dan lalu lintas dienkripsi TLS. Percobaan pencurian peretas gagal total!'
            : 'Tanpa Perlindungan: Mahasiswa mengakses Wi-Fi publik tanpa enkripsi atau membuka halaman yang memiliki celah XSS. Peretas berhasil membaca dan menyalin nilai kuki sesi #KAMPUS_4102!',
          activeEntity: 'attacker',
          logSummary: defenseActive
            ? 'Akses kuki via skrip diblokir oleh peramban'
            : 'Peretas berhasil menggandakan kuki #KAMPUS_4102',
        },
        {
          stepNumber: 3,
          title: defenseActive
            ? 'Tahap 3: Peretas Tidak Memiliki Akses Sesi'
            : 'Tahap 3: Peretas Menyuntikkan Kuki ke Perambannya Sendiri',
          badge: defenseActive ? 'Akses Ditolak' : 'Penyusupan Sesi',
          detail: defenseActive
            ? 'Karena tidak memegang karcis sesi yang valid, peretas hanya diarahkan ke halaman login biasa dan tidak memiliki hak akses apa pun.'
            : 'Peretas membuka portal kampus dari komputernya sendiri, membuka konsol pengembang, lalu menempelkan kuki #KAMPUS_4102 ke perambannya, lalu memuat ulang halaman.',
          activeEntity: 'attacker',
          logSummary: defenseActive
            ? 'Sesi peretas kosong, permintaan ditolak'
            : 'Kuki curian berhasil dipasang pada peramban peretas',
        },
        {
          stepNumber: 4,
          title: defenseActive
            ? 'Tahap 4: Akun Korban Tetap Aman Terlindungi'
            : 'Tahap 4: Pembajakan Akun Berhasil Tanpa Perlu Sandi!',
          badge: defenseActive ? 'Sistem Aman' : 'Akun Dibajak',
          detail: defenseActive
            ? 'Hasil Analisis: Berkat penerapan HttpOnly, enkripsi HTTPS menyeluruh, dan batas waktu sesi singkat (session timeout), identitas mahasiswa tetap aman meskipun berada di jaringan publik.'
            : 'Hasil Analisis: Server kampus hanya mengecek keabsahan nomor kuki tanpa memverifikasi perubahan sidik jari perangkat peretas. Peretas langsung masuk ke akun mahasiswa secara penuh tanpa pernah tahu kata sandinya!',
          activeEntity: defenseActive ? 'victim' : 'attacker',
          logSummary: defenseActive
            ? 'Autentikasi terjaga, manipulasi sesi gagal'
            : 'BAHAYA: Akun mahasiswa berhasil diambil alih sepenuhnya!',
        },
      ];
    } else {
      // Session Fixation
      return [
        {
          stepNumber: 1,
          title: 'Tahap 1: Peretas Mengambil ID Sesi Kosong dari Server',
          badge: 'Penyiapan Jerat',
          detail:
            'Peretas sengaja membuka portal kampus sebelum korban masuk. Server menerbitkan nomor sesi kosong (#JEBAKAN_77). Peretas tidak login, melainkan mencatat nomor ini untuk dijadikan perangkap.',
          activeEntity: 'attacker',
          logSummary: 'Peretas mengantongi nomor sesi perangkap: #JEBAKAN_77',
        },
        {
          stepNumber: 2,
          title: 'Tahap 2: Peretas Menjebak Korban Menggunakan Tautan Khusus',
          badge: 'Penyebaran Jebakan',
          detail:
            'Peretas mengirim tautan ke mahasiswa: portal.ac.id/login?session_id=JEBAKAN_77. Mahasiswa yang tidak curiga mengeklik tautan tersebut dan membuka formulir login.',
          activeEntity: 'victim',
          logSummary: 'Korban membuka portal dengan membawa parameter #JEBAKAN_77',
        },
        {
          stepNumber: 3,
          title: defenseActive
            ? 'Tahap 3: Pertahanan Server: Regenerasi ID Sesi Baru Saat Login'
            : 'Tahap 3: Kelalaian Server: Menggunakan ID Sesi Lama yang Sudah Dikenal',
          badge: defenseActive ? 'Regenerasi Sukses' : 'Kegagalan Server',
          detail: defenseActive
            ? 'Perlindungan Aktif: Saat korban memasukkan username dan password yang benar, SERVER BIJAK MENGHANCURKAN nomor lama (#JEBAKAN_77) dan menerbitkan ID BARU (#BARU_9941) yang hanya diketahui oleh peramban korban!'
            : 'Tanpa Perlindungan: Saat korban berhasil login, server ceroboh tetap mempertahankan nomor sesi lama (#JEBAKAN_77) dan mengaitkan akun mahasiswa tersebut ke nomor perangkap tersebut!',
          activeEntity: 'server',
          logSummary: defenseActive
            ? 'Server menerbitkan nomor sesi acak baru: #BARU_9941'
            : 'Server lalai: Nomor #JEBAKAN_77 diikat ke identitas korban',
        },
        {
          stepNumber: 4,
          title: defenseActive
            ? 'Tahap 4: Jebakan Peretas Hangus, Mahasiswa Aman'
            : 'Tahap 4: Peretas Otomatis Mendapatkan Hak Akses Korban!',
          badge: defenseActive ? 'Perangkap Gagal' : 'Akun Diambil Alih',
          detail: defenseActive
            ? 'Hasil Analisis: Karena nomor sesi lama telah dimusnahkan oleh server pada Tahap 3, nomor #JEBAKAN_77 yang dipegang peretas kini kedaluwarsa. Peretas kehilangan kendali sama sekali.'
            : 'Hasil Analisis: Karena server tidak meremajakan nomor sesi saat login, peretas yang sejak awal memegang nomor #JEBAKAN_77 seketika otomatis memegang akun korban! Peretas langsung login bersamaan.',
          activeEntity: defenseActive ? 'victim' : 'attacker',
          logSummary: defenseActive
            ? 'Nomor jerat tidak berlaku, akses peretas ditolak'
            : 'FATAL: Peretas memegang nomor sesi yang kini sudah diautentikasi!',
        },
      ];
    }
  };

  const steps = getSteps();

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleAutoPlay = () => {
    setIsAutoPlaying(true);
    setCurrentStep(1);

    setTimeout(() => {
      setCurrentStep(2);
    }, 1200);

    setTimeout(() => {
      setCurrentStep(3);
    }, 2400);

    setTimeout(() => {
      setCurrentStep(4);
      setIsAutoPlaying(false);
    }, 3600);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div>
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Analisis Keamanan Identitas Web
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5 flex items-center gap-2">
            <span>Simulasi Kronologis Manipulasi Sesi (Hijacking & Fixation)</span>
          </h3>
        </div>

        {/* Toggle Pertahanan */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400">Proteksi Sesi:</span>
          <button
            onClick={() => {
              setDefenseActive(!defenseActive);
              handleReset();
            }}
            className={`text-xs px-3 py-1.5 rounded-xl border font-mono transition-all flex items-center gap-1.5 ${
              defenseActive
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>
              {defenseActive
                ? attackType === 'hijacking'
                  ? 'HttpOnly & HTTPS: AKTIF'
                  : 'Regenerasi ID Sesi: AKTIF'
                : 'Proteksi: NONAKTIF'}
            </span>
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Protokol web (HTTP) bersifat tanpa ingatan (<em>stateless</em>). Untuk mengingat identitas Anda setelah login, server memberikan tanda pengenal berupa <strong>Karcis Sesi (Session Cookie)</strong>. Pelajari dua cara peretas mencuri hak akses dan amati perbedaannya pada simulasi interaktif di bawah:
      </p>

      {/* Pilihan Jenis Serangan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
        <button
          onClick={() => {
            setAttackType('hijacking');
            handleReset();
          }}
          className={`p-3 rounded-xl border text-left transition-all ${
            attackType === 'hijacking'
              ? 'bg-white text-zinc-950 font-semibold shadow-md border-white'
              : 'bg-zinc-950/70 border-white/[0.06] text-zinc-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold">1. Session Hijacking (Pencurian Karcis Aktif)</span>
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                attackType === 'hijacking' ? 'bg-zinc-800 text-zinc-200' : 'bg-white/[0.05] text-zinc-400'
              }`}
            >
              Pencurian Cookie
            </span>
          </div>
          <span
            className={`text-[10px] block leading-tight ${
              attackType === 'hijacking' ? 'text-zinc-700' : 'text-zinc-500'
            }`}
          >
            Penyerang mencuri karcis sesi yang sedang aktif dipakai korban saat berselancar.
          </span>
        </button>

        <button
          onClick={() => {
            setAttackType('fixation');
            handleReset();
          }}
          className={`p-3 rounded-xl border text-left transition-all ${
            attackType === 'fixation'
              ? 'bg-white text-zinc-950 font-semibold shadow-md border-white'
              : 'bg-zinc-950/70 border-white/[0.06] text-zinc-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold">2. Session Fixation (Penanaman ID Perangkap)</span>
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                attackType === 'fixation' ? 'bg-zinc-800 text-zinc-200' : 'bg-white/[0.05] text-zinc-400'
              }`}
            >
              Jebakan Sebelum Login
            </span>
          </div>
          <span
            className={`text-[10px] block leading-tight ${
              attackType === 'fixation' ? 'text-zinc-700' : 'text-zinc-500'
            }`}
          >
            Penyerang menyiapkan nomor ID sesi terlebih dahulu, lalu menjebak korban login dengannya.
          </span>
        </button>
      </div>

      {/* Panggung Alur Simulasi */}
      <div className="p-4 rounded-2xl bg-black/80 border border-white/[0.08] space-y-4 mb-4">
        {/* Status Langkah */}
        <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
          <span className="text-zinc-400">
            Skenario: {attackType === 'hijacking' ? 'Session Hijacking' : 'Session Fixation'}
          </span>
          <span className="text-amber-400 font-semibold">
            {currentStep === 0 && 'Tekan Tindakan untuk Memulai'}
            {currentStep > 0 && `Tahap ${currentStep} dari 4 Aktif`}
          </span>
        </div>

        {/* Visualisasi 3 Entitas: Korban, Jalur Komunikasi, dan Peretas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center py-2">
          {/* Korban Mahasiswa */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.06] space-y-1.5">
            <User className="h-5 w-5 mx-auto text-blue-400" />
            <span className="text-xs font-semibold text-white block">Mahasiswa Sah</span>
            <div className="p-1.5 rounded bg-black/60 font-mono text-[10px] text-zinc-300">
              {currentStep >= 1 ? (
                attackType === 'fixation' ? (
                  currentStep >= 3 && defenseActive ? (
                    <span className="text-emerald-400 font-semibold">ID Sesi Baru: #BARU_9941</span>
                  ) : (
                    <span className="text-amber-300">ID Sesi: #JEBAKAN_77</span>
                  )
                ) : (
                  <span className="text-blue-300">ID Sesi: #KAMPUS_4102</span>
                )
              ) : (
                <span className="text-zinc-600">Belum Ada Sesi</span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500 block">
              {currentStep >= 1 ? 'Memegang Karcis Masuk' : 'Belum Membuka Portal'}
            </span>
          </div>

          {/* Jalur Transmisi & Server */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.06] space-y-1.5">
            <Cookie className="h-5 w-5 mx-auto text-amber-400" />
            <span className="text-xs font-semibold text-white block">Server & Aturan Sesi</span>
            <div className="p-1.5 rounded bg-black/60 font-mono text-[10px]">
              {defenseActive ? (
                <span className="text-emerald-400 font-semibold">Proteksi Aktif</span>
              ) : (
                <span className="text-rose-400 font-semibold">Tanpa Proteksi</span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500 block">
              {attackType === 'hijacking'
                ? defenseActive
                  ? 'Kuki bertanda HttpOnly'
                  : 'Kuki terbuka dapat disadap'
                : defenseActive
                ? 'Regenerasi ID saat login'
                : 'Server mempertahankan ID lama'}
            </span>
          </div>

          {/* Peretas */}
          <div
            className={`p-3.5 rounded-xl border transition-all space-y-1.5 ${
              currentStep === 4 && !defenseActive
                ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                : 'bg-zinc-950 border-white/[0.06]'
            }`}
          >
            <ShieldAlert
              className={`h-5 w-5 mx-auto ${
                currentStep === 4 && !defenseActive ? 'text-rose-400' : 'text-zinc-500'
              }`}
            />
            <span className="text-xs font-semibold text-white block">Peretas Eksternal</span>
            <div className="p-1.5 rounded bg-black/60 font-mono text-[10px]">
              {currentStep === 4 ? (
                !defenseActive ? (
                  <span className="text-rose-400 font-bold">AKUN DIBAJAK!</span>
                ) : (
                  <span className="text-emerald-400 font-semibold">SERANGAN GAGAL</span>
                )
              ) : (
                <span className="text-zinc-500">Mengintai</span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500 block">
              {currentStep === 4 && !defenseActive
                ? 'Peretas masuk sebagai mahasiswa'
                : 'Menunggu celah transmisi'}
            </span>
          </div>
        </div>

        {/* Tombol Kontrol Tahapan */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleNextStep}
              disabled={isAutoPlaying || currentStep >= 4}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
              <span>
                {currentStep === 0
                  ? 'Mulai Tahap 1'
                  : currentStep < 4
                  ? `Lanjut ke Tahap ${currentStep + 1}`
                  : 'Seluruh Tahap Selesai'}
              </span>
            </button>

            <button
              onClick={handleAutoPlay}
              disabled={isAutoPlaying || currentStep === 4}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all flex items-center gap-1.5 disabled:opacity-40"
            >
              <Play className="h-3 w-3 fill-current" />
              <span>{isAutoPlaying ? 'Menjalankan...' : 'Jalankan Otomatis'}</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all flex items-center gap-1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Sesi</span>
          </button>
        </div>
      </div>

      {/* TIMELINE VERTIKAL PERSISTEN / KUMULATIF */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <History className="h-4 w-4 text-zinc-400" />
            <span>Kronologi Alur Manipulasi Sesi (Terekam Berurutan):</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            {currentStep === 0 ? '0 dari 4 tahap terekam' : `${currentStep} dari 4 tahap aktif`}
          </span>
        </div>

        {currentStep === 0 ? (
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.04] text-center text-xs text-zinc-500">
            Tekan tombol <strong>&quot;Mulai Tahap 1&quot;</strong> atau <strong>&quot;Jalankan Otomatis&quot;</strong> di atas untuk melihat bagaimana setiap tahapan manipulasi sesi tercatat secara lengkap tanpa ada teks yang terpotong.
          </div>
        ) : (
          <div className="relative pl-6 space-y-4 border-l-2 border-zinc-800 ml-3">
            {steps.slice(0, currentStep).map((step, idx) => {
              const isLast = idx === currentStep - 1;
              const isFinalVulnerable = isLast && currentStep === 4 && !defenseActive;
              const isFinalSafe = isLast && currentStep === 4 && defenseActive;

              return (
                <div key={step.stepNumber} className="relative group">
                  {/* Lingkaran Titik Kronologis */}
                  <div
                    className={`absolute -left-[31px] top-1 h-5 w-5 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold ${
                      isFinalVulnerable
                        ? 'bg-rose-950 border-rose-500 text-rose-300'
                        : isFinalSafe
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : isLast
                        ? 'bg-blue-950 border-blue-500 text-blue-300'
                        : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                    }`}
                  >
                    {step.stepNumber}
                  </div>

                  {/* Kartu Penjelasan Kumulatif */}
                  <div
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                      isFinalVulnerable
                        ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                        : isFinalSafe
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : isLast
                        ? 'bg-zinc-900/80 border-blue-500/30 text-zinc-200 shadow-sm'
                        : 'bg-zinc-950/70 border-white/[0.05] text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white text-xs">{step.title}</span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                          isFinalVulnerable
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/20 font-bold'
                            : isFinalSafe
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 font-bold'
                            : 'bg-white/[0.05] text-zinc-400 border-white/10'
                        }`}
                      >
                        {step.badge}
                      </span>
                    </div>

                    <p className="leading-relaxed text-justify text-zinc-300 text-[11px]">{step.detail}</p>

                    <div className="pt-1 flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
                      <Terminal className="h-3 w-3 text-zinc-500" />
                      <span>Log: {step.logSummary}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Prinsip Pencegahan Praktis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-white/[0.06]">
        <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-xs space-y-1.5">
          <h4 className="font-semibold text-white flex items-center gap-1.5 text-xs">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Pencegahan Session Hijacking</span>
          </h4>
          <ul className="space-y-1 text-zinc-400 text-[11px] leading-relaxed text-justify">
            <li>• Pasang atribut <strong>HttpOnly</strong> pada cookie agar skrip peramban dilarang membaca karcis sesi.</li>
            <li>• Wajibkan seluruh lalu lintas web menggunakan <strong>HTTPS (TLS)</strong> agar cookie tidak disadap di Wi-Fi.</li>
            <li>• Terapkan batas waktu kedaluwarsa sesi otomatis (Session Timeout) saat pengguna tidak aktif.</li>
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.06] text-xs space-y-1.5">
          <h4 className="font-semibold text-white flex items-center gap-1.5 text-xs">
            <RefreshCw className="h-4 w-4 text-blue-400" />
            <span>Pencegahan Session Fixation</span>
          </h4>
          <ul className="space-y-1 text-zinc-400 text-[11px] leading-relaxed text-justify">
            <li>• <strong>Wajib Regenerasi ID Sesi:</strong> Hancurkan ID sesi lama dan terbitkan ID sesi baru yang acak setiap kali pengguna berhasil login.</li>
            <li>• Jangan pernah menerima ID sesi yang dikirimkan melalui parameter URL publik (seperti ?session_id=...).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
