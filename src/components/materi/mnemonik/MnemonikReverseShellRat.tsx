'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop,
  ShieldAlert,
  ShieldCheck,
  Server,
  Terminal,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  FileWarning,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface StepDetail {
  stepNumber: number;
  title: string;
  shortStatus: string;
  whatHappens: string;
  firewallBehavior: string;
  takeaway: string;
}

const STEP_DETAILS: StepDetail[] = [
  {
    stepNumber: 0,
    title: 'Kondisi Awal Jaringan Kampus',
    shortStatus: 'Jaringan Normal & Belum Ada Infeksi',
    whatHappens:
      'Laptop mahasiswa terhubung ke jaringan LAN kampus (IP 192.168.10.45) di balik Firewall Gateway. Di luar internet publik, server Command & Control (C2) milik peretas sedang siaga mendengarkan koneksi.',
    firewallBehavior:
      'Firewall menerapkan kebijakan standar: menutup seluruh koneksi masuk asing yang tidak diminta dari internet (Inbound Deny), namun mengizinkan komputer internal mengakses situs web di luar (Outbound Allow).',
    takeaway:
      'Jika peretas mencoba menghubungi langsung laptop mahasiswa dari internet luar, firewall akan memblokirnya seketika. Oleh karena itu, peretas memerlukan teknik tipuan terbalik (Reverse Shell).',
  },
  {
    stepNumber: 1,
    title: 'Tahap 1: Eksekusi Berkas Jebakan Phishing',
    shortStatus: 'Korban Mengeklik Berkas .pdf.exe',
    whatHappens:
      'Mahasiswa membuka email penipuan bertema pengumuman beasiswa dan mengeklik berkas lampiran "Pengumuman_Beasiswa.pdf.exe". Di layar korban, dokumen PDF tampak terbuka, namun di latar belakang muatan biner Trojan RAT mulai aktif berjalan di memori.',
    firewallBehavior:
      'Firewall gateway belum bereaksi karena eksekusi berkas terjadi secara lokal di dalam laptop korban tanpa melibatkan transmisi paket jaringan luar.',
    takeaway:
      'Pertahanan firewall terkuat sekalipun tidak berguna jika pengguna di dalam jaringan berhasil dimanipulasi secara psikologis untuk mengeksekusi program jahat secara mandiri.',
  },
  {
    stepNumber: 2,
    title: 'Tahap 2: Trojan Menghubungi Server Peretas (Panggilan Keluar)',
    shortStatus: 'Trojan Melakukan Panggilan Outbound Port 443',
    whatHappens:
      'Alih-alih membuka port dan menunggu peretas masuk (yang pasti akan diblokir firewall), Trojan di dalam laptop korban justru berinisiatif menghubungi keluar ke alamat IP server C2 peretas (198.51.100.88) menggunakan Port 443.',
    firewallBehavior:
      'Paket data meluncur dari dalam jaringan internal menuju gerbang firewall. Paket ini berlabel paket keluar (Outbound) dengan tujuan Port 443 yang umumnya digunakan untuk protokol penjelajahan web aman (HTTPS).',
    takeaway:
      'Kunci dari teknik Reverse Shell adalah membalik inisiator sambungan. Komputer korban yang bertindak sebagai pemanggil keluar, bukan peretas yang mengetuk dari luar.',
  },
  {
    stepNumber: 3,
    title: 'Tahap 3: Paket Diloloskan oleh Firewall Gateway',
    shortStatus: 'Firewall Mengira Trafik Web Biasa (Lolos Sensor)',
    whatHappens:
      'Firewall memeriksa kepala paket data. Karena paket berasal dari dalam kampus menuju internet luar melalui port web standar (Port 443), aturan firewall meloloskan paket tersebut tanpa kecurigaan.',
    firewallBehavior:
      'Firewall mencatat ini sebagai sesi penjelajahan web biasa dan membuka gerbang keluar (Outbound ALLOW), sehingga paket tiba dengan selamat di server C2 peretas di internet publik.',
    takeaway:
      'Kebanyakan firewall organisasi dikonfigurasi sangat ketat untuk lalu lintas masuk, tetapi sangat longgar untuk lalu lintas keluar ke port 80 dan 443. Celah kebijakan inilah yang dieksploitasi oleh Trojan RAT.',
  },
  {
    stepNumber: 4,
    title: 'Tahap 4: Terowongan Dua Arah Terbuka Penuh (Kendali Jarak Jauh)',
    shortStatus: 'Peretas Memperoleh Akses Terminal Interaktif',
    whatHappens:
      'Sambungan dua arah (full-duplex) berhasil terjalin. Peretas di internet luar kini memiliki kendali terminal jarak jauh atas laptop mahasiswa. Peretas dapat menjalankan perintah sistem, mencuri dokumen, menyalakan mikrofon, dan menggunakan komputer korban sebagai batu loncatan.',
    firewallBehavior:
      'Firewall menganggap seluruh pertukaran data dua arah ini sebagai bagian dari sesi komunikasi yang sah (Established State), sehingga lalu lintas kendali peretas tidak pernah diblokir.',
    takeaway:
      'Inilah mengapa Trojan RAT sangat berbahaya: peretas tidak perlu menjebol firewall, melainkan memanfaatkan komputer korban itu sendiri untuk membukakan pintu keluar.',
  },
];

export const MnemonikReverseShellRat: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  const currentStep = STEP_DETAILS[step];

  const handleNext = () => {
    setStep((prev) => (prev < 4 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div>
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik Interaktif • Anatomi Reverse Shell
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5">
            Mengapa Firewall Tidak Memblokir Serangan Trojan RAT?
          </h3>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Inbound Block vs Outbound Bypass
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Banyak mahasiswa heran: jika firewall memblokir semua koneksi masuk asing (Inbound Deny), bagaimana peretas bisa mengendalikan laptop korban dari jarak jauh? Jawabannya adalah teknik <strong className="text-white">Reverse Shell</strong>. Klik tombol navigasi langkah di bawah untuk mempelajari alur penipuan arah koneksi:
      </p>

      {/* Kontrol Navigasi Langkah Interaktif */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-black/60 border border-white/[0.08] mb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-400">
            Fase {step} dari 4:
          </span>
          <span className="text-xs font-semibold text-white">
            {currentStep.title}
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {step > 0 && (
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>{step === 4 ? 'Ulangi Dari Awal' : 'Langkah Berikutnya'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Diagram Visualisasi Topologi 3 Node */}
      <div className="p-4 sm:p-6 rounded-xl bg-black/70 border border-white/[0.08] mb-5 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative z-10">
          {/* Node 1: Laptop Mahasiswa (Korban) */}
          <div
            className={`p-4 rounded-xl border text-center transition-all ${
              step >= 1
                ? 'bg-rose-950/20 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
                : 'bg-white/[0.02] border-white/[0.06]'
            }`}
          >
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
              Host Korban (LAN Kampus)
            </span>
            <div
              className={`w-12 h-12 rounded-xl border mx-auto flex items-center justify-center transition-all ${
                step >= 1
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-zinc-900 border-white/10 text-zinc-300'
              }`}
            >
              <Laptop className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold text-white block mt-2">
              Laptop Mahasiswa
            </span>
            <span className="text-[10px] font-mono text-zinc-400 block">
              IP: 192.168.10.45
            </span>

            {/* Status Payload */}
            <div className="mt-2.5 pt-2 border-t border-white/[0.06]">
              {step === 0 && (
                <span className="text-[10px] text-zinc-500 font-mono block">
                  Kondisi Bersih (Normal)
                </span>
              )}
              {step === 1 && (
                <span className="text-[10px] text-rose-400 font-mono font-semibold flex items-center justify-center gap-1">
                  <FileWarning className="h-3 w-3" /> Berkas Phishing Dibuka!
                </span>
              )}
              {step >= 2 && (
                <span className="text-[10px] text-rose-300 font-mono block">
                  Trojan Aktif di Memori (PID 4920)
                </span>
              )}
            </div>
          </div>

          {/* Node 2: Firewall Gateway Kampus */}
          <div
            className={`p-4 rounded-xl border text-center transition-all ${
              step >= 3
                ? 'bg-emerald-950/20 border-emerald-500/40'
                : 'bg-white/[0.02] border-white/[0.06]'
            }`}
          >
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
              Gerbang Pengawas
            </span>
            <div
              className={`w-12 h-12 rounded-xl border mx-auto flex items-center justify-center transition-all ${
                step >= 3
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-zinc-900 border-white/10 text-zinc-300'
              }`}
            >
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold text-white block mt-2">
              Firewall Kampus
            </span>
            <span className="text-[10px] font-mono text-zinc-400 block">
              Kebijakan: Outbound 443 ALLOW
            </span>

            {/* Status Firewall */}
            <div className="mt-2.5 pt-2 border-t border-white/[0.06]">
              {step < 3 ? (
                <span className="text-[10px] text-zinc-500 font-mono block">
                  Memantau Lalu Lintas
                </span>
              ) : (
                <span className="text-[10px] text-emerald-400 font-mono font-semibold block">
                  ✓ Meloloskan Paket Keluar
                </span>
              )}
            </div>
          </div>

          {/* Node 3: Server Command & Control Peretas */}
          <div
            className={`p-4 rounded-xl border text-center transition-all ${
              step >= 4
                ? 'bg-purple-950/20 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                : 'bg-white/[0.02] border-white/[0.06]'
            }`}
          >
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
              Internet Publik (Luar)
            </span>
            <div
              className={`w-12 h-12 rounded-xl border mx-auto flex items-center justify-center transition-all ${
                step >= 4
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-400'
                  : 'bg-zinc-900 border-white/10 text-zinc-300'
              }`}
            >
              <Server className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold text-white block mt-2">
              Server C2 Peretas
            </span>
            <span className="text-[10px] font-mono text-zinc-400 block">
              IP: 198.51.100.88:443
            </span>

            {/* Status Peretas */}
            <div className="mt-2.5 pt-2 border-t border-white/[0.06]">
              {step < 4 ? (
                <span className="text-[10px] text-zinc-500 font-mono block">
                  Mendengarkan Sesi (Port 443)
                </span>
              ) : (
                <span className="text-[10px] text-purple-400 font-mono font-semibold flex items-center justify-center gap-1">
                  <Terminal className="h-3 w-3" /> Shell Terhubung Penuh!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Indikator Status Transmisi Jaringan */}
        <div className="mt-4 p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-zinc-400">Arah Transmisi:</span>
            {step === 0 && <span className="text-zinc-500 font-mono">Belum ada transmisi data</span>}
            {step === 1 && (
              <span className="text-amber-400 font-mono">
                Berkas lokal dieksekusi di komputer korban
              </span>
            )}
            {step === 2 && (
              <span className="text-blue-400 font-mono">
                Laptop Korban → Firewall (Panggilan Keluar Outbound Port 443)
              </span>
            )}
            {step === 3 && (
              <span className="text-emerald-400 font-mono">
                Firewall meloloskan paket ke Server C2 (Dianggap web biasa)
              </span>
            )}
            {step === 4 && (
              <span className="text-purple-400 font-mono font-semibold">
                Koneksi Dua Arah Aktif: Peretas mengendalikan terminal laptop korban
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            Trik: Memanfaatkan Port HTTPS Resmi
          </span>
        </div>
      </div>

      {/* KARTU PENJELASAN LANGKAH DETAIL (MENGHILANGKAN KEBINGUNGAN MAHASISWA) */}
      <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3 mb-5">
        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
          <Info className="h-4 w-4 text-blue-400" />
          <h4 className="text-xs sm:text-sm font-semibold text-white">
            Penjelasan Detail: {currentStep.title}
          </h4>
        </div>

        <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-sans text-justify">
          <div>
            <strong className="text-white block mb-0.5">1. Apa yang Terjadi pada Tahap Ini:</strong>
            <p>{currentStep.whatHappens}</p>
          </div>

          <div>
            <strong className="text-emerald-400 block mb-0.5">2. Respon dan Reaksi Firewall:</strong>
            <p>{currentStep.firewallBehavior}</p>
          </div>

          <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] text-[11px] text-zinc-300">
            <strong className="text-amber-400 block mb-0.5">Poin Kunci untuk Mahasiswa:</strong>
            <p>{currentStep.takeaway}</p>
          </div>
        </div>
      </div>

      {/* Terminal Interaktif Command & Control (Muncul pada Langkah 4) */}
      <AnimatePresence>
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl bg-black border border-purple-500/30 overflow-hidden font-mono text-xs mb-4"
          >
            <div className="px-3.5 py-2 bg-zinc-900 border-b border-white/10 flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-1.5 text-[11px] text-purple-400">
                <Terminal className="h-3.5 w-3.5" />
                Terminal Peretas (Reverse Shell Aktif Melalui Port 443)
              </span>
              <span className="text-[10px] text-zinc-500">Sesi PID: 4920</span>
            </div>

            <div className="p-4 space-y-2 text-zinc-300">
              <p className="text-zinc-500">
                [+] Sambungan diterima dari 192.168.10.45:49812 (Jaringan LAN Kampus)
              </p>
              <p className="text-zinc-500">[+] Sesi terminal interaktif berhasil dibuka.</p>
              
              <div className="space-y-1 pt-1">
                <p className="text-white">
                  <span className="text-purple-400">C:\Users\Mahasiswa&gt;</span> whoami
                </p>
                <p className="text-emerald-400 pl-2">kampus-pc\mahasiswa_pti</p>
              </div>

              <div className="space-y-1 pt-1">
                <p className="text-white">
                  <span className="text-purple-400">C:\Users\Mahasiswa&gt;</span> dir &quot;C:\Dokumen_Akademik&quot;
                </p>
                <p className="text-zinc-400 pl-2">
                  Draft_Skripsi_Final.docx | Transkrip_Nilai.pdf | Kunci_Jawaban_UAS.xlsx
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <p className="text-white">
                  <span className="text-purple-400">C:\Users\Mahasiswa&gt;</span> download &quot;Kunci_Jawaban_UAS.xlsx&quot;
                </p>
                <p className="text-amber-400 pl-2">[!] Mengunduh berkas ke server C2... Selesai 100%.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ringkasan Filosofis Akhir (Bebas Asterisk) */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300 space-y-1">
        <strong className="text-white block">Kesimpulan Konseptual:</strong>
        <p className="leading-relaxed text-justify">
          Firewall tradisional sangat ketat memblokir koneksi masuk (Inbound), namun sangat longgar terhadap koneksi keluar (Outbound). Trojan RAT memanfaatkan celah kebijakan ini dengan cara membuat komputer korban yang berinisiatif menghubungi server peretas di luar, menyamarkan perintah peretasan sebagai lalu lintas penjelajahan web biasa.
        </p>
      </div>
    </div>
  );
};
