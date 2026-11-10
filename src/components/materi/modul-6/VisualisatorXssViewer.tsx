'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CodeXml,
  ShieldCheck,
  ShieldAlert,
  Play,
  RotateCcw,
  Cookie,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  ArrowRight,
  History,
  Terminal,
  ChevronRight,
  FileCode2,
} from 'lucide-react';

interface XssStep {
  stepNumber: number;
  title: string;
  badge: string;
  detail: string;
  activeNodes: ('attacker' | 'server' | 'victim')[];
  packetLabel: string;
}

export const VisualisatorXssViewer: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<'stored' | 'reflected' | 'dom'>('stored');
  const [hasSanitization, setHasSanitization] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const variants: Record<
    'stored' | 'reflected' | 'dom',
    {
      name: string;
      badge: string;
      badgeColor: string;
      summary: string;
      steps: XssStep[];
    }
  > = {
    stored: {
      name: 'Stored XSS (Menetap di Database)',
      badge: 'Paling Berbahaya',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      summary:
        'Skrip jahat disuntikkan dan disimpan secara permanen di database server (misalnya kolom komentar atau profil). Setiap mahasiswa lain yang membuka halaman tersebut otomatis terdampak tanpa perlu mengeklik tautan apa pun.',
      steps: [
        {
          stepNumber: 1,
          title: 'Tahap 1: Penyerang Mengirim Payload Skrip ke Forum',
          badge: 'Injeksi Masukan',
          detail:
            'Penyerang memasukkan potongan kode JavaScript berbahaya (<script>stealCookie()</script>) ke kolom komentar formulir web kampus, lalu menekan tombol kirim.',
          activeNodes: ['attacker'],
          packetLabel: 'Payload dikirim ke server',
        },
        {
          stepNumber: 2,
          title: 'Tahap 2: Server Menyimpan Skrip Jahat ke Basis Data',
          badge: 'Penyimpanan Permanen',
          detail:
            'Karena server tidak melakukan pembersihan masukan, kode JavaScript tersebut disimpan mentah-mentah ke dalam tabel database bersama pesan-pesan lainnya.',
          activeNodes: ['server'],
          packetLabel: 'Skrip tersimpan permanen di DB',
        },
        {
          stepNumber: 3,
          title: 'Tahap 3: Mahasiswa Korban Membuka Halaman Forum',
          badge: 'Pemuatan Halaman',
          detail:
            'Mahasiswa sah masuk ke forum kampus untuk membaca materi kuliah. Server mengambil seluruh komentar dari database, termasuk skrip jahat penyerang, dan mengirimkannya ke peramban mahasiswa.',
          activeNodes: ['victim', 'server'],
          packetLabel: 'Server mengirim HTML + skrip ke korban',
        },
        {
          stepNumber: 4,
          title: hasSanitization
            ? 'Tahap 4: Sanitasi Aktif: Peramban Korban Menampilkan Teks Aman'
            : 'Tahap 4: Celah Terbuka: Peramban Korban Mengeksekusi Skrip Pencuri Sesi!',
          badge: hasSanitization ? 'Aman (Teks Pasif)' : 'Eksploitasi Berhasil',
          detail: hasSanitization
            ? 'Perlindungan Sanitasi Aktif: Karakter khusus seperti < dan > diubah menjadi entitas HTML (&lt; dan &gt;). Peramban korban menampilkan komentar sebagai teks biasa tanpa menjalankannya. Mahasiswa tetap aman!'
            : 'Peramban korban tidak dapat membedakan mana kode resmi kampus dan mana kode titipan peretas. Peramban langsung mengeksekusi skrip tersebut, mencuri karcis sesi (session cookie) mahasiswa, dan mengirimkannya diam-diam ke server penyerang!',
          activeNodes: hasSanitization ? ['victim'] : ['victim', 'attacker'],
          packetLabel: hasSanitization ? 'Teks dinetralkan' : 'Karcis sesi bocor ke penyerang!',
        },
      ],
    },
    reflected: {
      name: 'Reflected XSS (Pantulan Melalui Tautan URL)',
      badge: 'Berbasis Tautan Jebakan',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      summary:
        'Skrip jahat tidak disimpan di database, melainkan disematkan pada parameter URL pencarian. Penyerang menyebarkan tautan tersebut melalui pesan pancingan agar diklik oleh korban.',
      steps: [
        {
          stepNumber: 1,
          title: 'Tahap 1: Penyerang Menyusun Tautan Jebakan',
          badge: 'Pembuatan Tautan',
          detail:
            'Penyerang membuat alamat web tiruan dengan menyisipkan skrip pada parameter pencarian, contohnya: portal.ac.id/cari?keyword=<script>alert(document.cookie)</script>.',
          activeNodes: ['attacker'],
          packetLabel: 'Tautan berbahaya disiapkan',
        },
        {
          stepNumber: 2,
          title: 'Tahap 2: Korban Terkecoh Mengeklik Tautan',
          badge: 'Permintaan Web',
          detail:
            'Penyerang mengirim tautan lewat pesan obrolan. Ketika mahasiswa korban mengekliknya, peramban korban mengirim permintaan GET berisi skrip tersebut ke server kampus.',
          activeNodes: ['victim', 'server'],
          packetLabel: 'Permintaan URL dikirim ke server',
        },
        {
          stepNumber: 3,
          title: 'Tahap 3: Server Memantulkan Masukan Tanpa Penyaringan',
          badge: 'Pantulan Respons',
          detail:
            'Server kampus menerima kata kunci pencarian dan langsung menampilkannya kembali pada respons halaman: Hasil pencarian untuk: [kata_kunci]. Skrip ikut terpantul kembali ke korban.',
          activeNodes: ['server', 'victim'],
          packetLabel: 'Server memantulkan skrip mentah',
        },
        {
          stepNumber: 4,
          title: hasSanitization
            ? 'Tahap 4: Sanitasi Aktif: Hasil Pencarian Ditampilkan Aman'
            : 'Tahap 4: Celah Terbuka: Skrip Pantulan Langsung Berjalan di Layar Korban!',
          badge: hasSanitization ? 'Aman (Teks Bersih)' : 'Eksploitasi Berhasil',
          detail: hasSanitization
            ? 'Dengan sanitasi entitas aktif, teks pencarian dienkode dengan benar. Peramban korban hanya membaca tulisan hasil pencarian tanpa mengeksekusi instruksi JavaScript.'
            : 'Peramban korban membaca respons pantulan dari server dan langsung menjalankan JavaScript berbahaya tersebut. Muncul dialog palsu atau data sesi korban langsung dialihkan ke pihak luar!',
          activeNodes: ['victim'],
          packetLabel: hasSanitization ? 'Respons dinetralkan' : 'Skrip langsung berjalan di peramban',
        },
      ],
    },
    dom: {
      name: 'DOM-based XSS (Sisi Klien Murni)',
      badge: 'Sisi Peramban Saja',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      summary:
        'Celah terjadi murni di lingkungan dokumen peramban korban (Document Object Model). Server backend sama sekali tidak menerima muatan berbahaya; manipulasi terjadi karena skrip lokal peramban menulis data URL ke layar secara ceroboh.',
      steps: [
        {
          stepNumber: 1,
          title: 'Tahap 1: Penyerang Menyusun Tautan dengan Fragmen Hash',
          badge: 'Fragmen Klien',
          detail:
            'Penyerang menyematkan skrip setelah tanda pagar pada alamat web, contohnya: portal.ac.id/profil#<img src=x onerror=steal()>. Karakter setelah tanda # tidak pernah dikirim ke server jaringan.',
          activeNodes: ['attacker'],
          packetLabel: 'Fragmen hash disiapkan',
        },
        {
          stepNumber: 2,
          title: 'Tahap 2: Korban Membuka Alamat Web Tersebut',
          badge: 'Pemuatan Lokal',
          detail:
            'Korban membuka alamat web. Server kampus hanya mengirimkan berkas HTML dan JavaScript dasar. Server sama sekali tidak melihat skrip jahat yang berada di belakang tanda #.',
          activeNodes: ['victim'],
          packetLabel: 'Server dilewati sepenuhnya',
        },
        {
          stepNumber: 3,
          title: 'Tahap 3: Skrip JavaScript Lokal Membaca Fragmen Hash',
          badge: 'Pembacaan DOM',
          detail:
            'Kode JavaScript yang terpasang di halaman web korban membaca nilai location.hash secara langsung dari peramban tanpa melakukan validasi.',
          activeNodes: ['victim'],
          packetLabel: 'JavaScript lokal membaca window.location',
        },
        {
          stepNumber: 4,
          title: hasSanitization
            ? 'Tahap 4: Penulisan Aman: Menggunakan textContent'
            : 'Tahap 4: Celah Terbuka: Menggunakan innerHTML yang Mengeksekusi Skrip!',
          badge: hasSanitization ? 'Aman (DOM Bersih)' : 'Eksploitasi Berhasil',
          detail: hasSanitization
            ? 'Praktik Aman: Pengembang menulis data ke DOM menggunakan textContent atau pembersih DOMPurify. Karakter berbahaya dianggap teks polos dan tidak berjalan.'
            : 'Praktik Rentan: Kode peramban menggunakan innerHTML untuk menuliskan masukan hash langsung ke dokumen. Peramban merender kode HTML jahat tersebut seketika!',
          activeNodes: ['victim'],
          packetLabel: hasSanitization ? 'DOM aman terlindungi' : 'Skrip dieksekusi langsung di memori browser',
        },
      ],
    },
  };

  const current = variants[selectedVariant];

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

  const activeNodesCurrent = currentStep > 0 ? current.steps[currentStep - 1].activeNodes : [];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div>
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Alur Data & Mekanisme Serangan
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5 flex items-center gap-2">
            <span>Simulasi Alur Kronologis 3 Jenis Cross-Site Scripting (XSS)</span>
          </h3>
        </div>

        {/* Toggle Pertahanan Sanitasi */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400">Penyaring HTML:</span>
          <button
            onClick={() => {
              setHasSanitization(!hasSanitization);
              handleReset();
            }}
            className={`text-xs px-3 py-1.5 rounded-xl border font-mono transition-all flex items-center gap-1.5 ${
              hasSanitization
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{hasSanitization ? 'Sanitasi Entitas: AKTIF' : 'Sanitasi: NONAKTIF'}</span>
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        <strong>Cross-Site Scripting (XSS)</strong> terjadi ketika aplikasi web menerima masukan berupa kode skrip (seperti JavaScript) lalu merendernya kembali ke layar peramban korban tanpa disaring. Pilih salah satu jenis XSS di bawah ini dan ikuti urutan langkah kronologisnya:
      </p>

      {/* Pilihan 3 Jenis XSS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
        {(Object.keys(variants) as Array<keyof typeof variants>).map((key) => {
          const isSelected = selectedVariant === key;
          const item = variants[key];
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedVariant(key);
                handleReset();
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-white text-zinc-950 font-semibold shadow-md border-white'
                  : 'bg-zinc-950/70 border-white/[0.06] text-zinc-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold">{item.name}</span>
              </div>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded inline-block mt-0.5 ${
                  isSelected ? 'bg-zinc-800 text-zinc-200' : item.badgeColor
                }`}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panggung Diagram Alur Interaktif */}
      <div className="p-4 rounded-2xl bg-black/80 border border-white/[0.08] space-y-4 mb-4">
        {/* Header Alur & Status Tahapan */}
        <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
          <span className="text-zinc-400 font-medium">Alur Komunikasi: {current.name}</span>
          <span className="text-amber-400 font-semibold">
            {currentStep === 0 && 'Tekan Tindakan untuk Memulai'}
            {currentStep > 0 && `Tahap ${currentStep} dari 4 Aktif`}
          </span>
        </div>

        {/* 3 Simpul Utama: Penyerang, Server & Database, dan Korban */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center py-2">
          {/* Simpul 1: Komputer Penyerang */}
          <div
            className={`p-3.5 rounded-xl border transition-all space-y-1.5 ${
              activeNodesCurrent.includes('attacker')
                ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                : 'bg-zinc-950 border-white/[0.06]'
            }`}
          >
            <ShieldAlert className="h-5 w-5 mx-auto text-rose-400" />
            <span className="text-xs font-semibold text-white block">Komputer Penyerang</span>
            <div className="p-1 rounded bg-black/60 font-mono text-[10px] text-zinc-300">
              {currentStep === 1
                ? 'Mengunggah Skrip Jahat'
                : currentStep === 4 && !hasSanitization && selectedVariant === 'stored'
                ? 'Menerima Karcis Sesi Korban!'
                : 'Siaga Mengintai'}
            </div>
            <span className="text-[10px] text-zinc-500 block">Sumber Injeksi Payload</span>
          </div>

          {/* Simpul 2: Server Web & Database */}
          <div
            className={`p-3.5 rounded-xl border transition-all space-y-1.5 ${
              selectedVariant === 'dom'
                ? 'opacity-40 bg-zinc-950 border-white/[0.04]'
                : activeNodesCurrent.includes('server')
                ? 'bg-blue-950/40 border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.25)]'
                : 'bg-zinc-950 border-white/[0.06]'
            }`}
          >
            <Server className="h-5 w-5 mx-auto text-blue-400" />
            <span className="text-xs font-semibold text-white block">
              {selectedVariant === 'dom' ? 'Server Web (Dilewati)' : 'Server & Database Kampus'}
            </span>
            <div className="p-1 rounded bg-black/60 font-mono text-[10px] text-zinc-300">
              {selectedVariant === 'dom'
                ? 'Tidak Terlibat (Lokal Saja)'
                : currentStep === 2
                ? 'Menyimpan ke Tabel'
                : currentStep === 3
                ? 'Mentransmisikan Halaman'
                : 'Siaga Melayani'}
            </div>
            <span className="text-[10px] text-zinc-500 block">Penyimpan & Distribusi Respons</span>
          </div>

          {/* Simpul 3: Komputer Mahasiswa Korban */}
          <div
            className={`p-3.5 rounded-xl border transition-all space-y-1.5 ${
              activeNodesCurrent.includes('victim')
                ? currentStep === 4
                  ? hasSanitization
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                  : 'bg-zinc-900/60 border-zinc-500/40'
                : 'bg-zinc-950 border-white/[0.06]'
            }`}
          >
            <Laptop className="h-5 w-5 mx-auto text-emerald-400" />
            <span className="text-xs font-semibold text-white block">Peramban Mahasiswa Korban</span>
            <div className="p-1 rounded bg-black/60 font-mono text-[10px] text-zinc-300">
              {currentStep === 4 ? (
                hasSanitization ? (
                  <span className="text-emerald-400 font-semibold">Teks Aman (Tidak Berjalan)</span>
                ) : (
                  <span className="text-rose-400 font-semibold">Skrip Otomatis Dieksekusi!</span>
                )
              ) : currentStep === 3 ? (
                'Memuat Data Halaman'
              ) : (
                'Berselancar Normal'
              )}
            </div>
            <span className="text-[10px] text-zinc-500 block">Target Manipulasi Dokumen</span>
          </div>
        </div>

        {/* Tombol Kontrol Aksi Simulasi */}
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
            <span>Reset Alur</span>
          </button>
        </div>
      </div>

      {/* TIMELINE VERTIKAL PERSISTEN / KUMULATIF */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <History className="h-4 w-4 text-zinc-400" />
            <span>Kronologi Alur Serangan (Terekam Terus-Menerus):</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            {currentStep === 0 ? '0 dari 4 tahap terekam' : `${currentStep} dari 4 tahap aktif`}
          </span>
        </div>

        {currentStep === 0 ? (
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-white/[0.04] text-center text-xs text-zinc-500">
            Tekan tombol <strong>&quot;Mulai Tahap 1&quot;</strong> atau <strong>&quot;Jalankan Otomatis&quot;</strong> di atas untuk mengamati catatan kronologis setiap tahapan secara berurutan.
          </div>
        ) : (
          <div className="relative pl-6 space-y-4 border-l-2 border-zinc-800 ml-3">
            {current.steps.slice(0, currentStep).map((step, idx) => {
              const isLast = idx === currentStep - 1;
              const isFinalVulnerable = isLast && currentStep === 4 && !hasSanitization;
              const isFinalSafe = isLast && currentStep === 4 && hasSanitization;

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
                        ? 'bg-amber-950 border-amber-500 text-amber-300'
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
                        ? 'bg-zinc-900/80 border-amber-500/30 text-zinc-200 shadow-sm'
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
                      <span>Status: {step.packetLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
