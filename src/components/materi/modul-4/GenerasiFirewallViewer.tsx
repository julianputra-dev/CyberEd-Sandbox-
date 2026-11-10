'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Layers,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Database,
  Globe,
  Lock,
} from 'lucide-react';

interface GenerationData {
  id: 'gen1' | 'gen2' | 'gen3';
  generationNumber: string;
  title: string;
  subTitle: string;
  layer: string;
  inspectionDepth: string;
  speed: string;
  securityLevel: string;
  howItWorks: string;
  attackScenario: {
    attackName: string;
    attackDescription: string;
    firewallDecision: 'PASS' | 'BLOCK';
    reason: string;
  };
  strengths: string[];
  weaknesses: string[];
}

const GENERATIONS: GenerationData[] = [
  {
    id: 'gen1',
    generationNumber: 'Generasi 1',
    title: 'Stateless Packet Filtering',
    subTitle: 'Penyaring Paket Sederhana (Header Only)',
    layer: 'Layer 3 (Network) & Layer 4 (Transport)',
    inspectionDepth: 'Hanya membaca header paket (IP Pengirim/Tujuan, Port Tujuan, Tipe Protokol).',
    speed: 'Sangat Cepat (Overhead Rendah)',
    securityLevel: 'Dasar (Rentan Penipuan Sesi)',
    howItWorks:
      'Setiap paket diperiksa secara independen satu per satu seperti kartu pos. Firewall tidak mengingat apakah paket ini adalah balasan dari percakapan yang sah atau paket serangan yang diselundupkan secara mendadak.',
    attackScenario: {
      attackName: 'Serangan Paket Balasan Palsu (ACK Spoofing)',
      attackDescription:
        'Penyerang mengirim paket dengan penanda ACK aktif ke port internal acak tanpa pernah ada permintaan awal dari klien.',
      firewallDecision: 'PASS',
      reason:
        'Kelemahan Fatal: Stateless firewall mengira ini adalah paket balasan yang sah karena tidak memiliki memori riwayat sesi.',
    },
    strengths: [
      'Proses pemrosesan berkecepatan tinggi tanpa membebani memori sistem',
      'Cocok untuk gerbang batas luar jaringan dengan volume data raksasa',
      'Konfigurasi aturan Access Control List (ACL) yang lugas dan terstandarisasi',
    ],
    weaknesses: [
      'Tidak dapat mengingat status sesi koneksi (tidak tahu apakah percakapan sudah dimulai sebelumnya)',
      'Rentan terhadap pemalsuan alamat IP (IP Spoofing) dan serangan fragmentasi',
      'Tidak mampu memeriksa isi muatan data (payload) di balik port yang dibuka',
    ],
  },
  {
    id: 'gen2',
    generationNumber: 'Generasi 2',
    title: 'Stateful Inspection Firewall',
    subTitle: 'Pemeriksaan Kontekstual Berbasis State Table',
    layer: 'Layer 4 (Transport) dengan Pelacakan Sesi',
    inspectionDepth: 'Mencatat siklus hidup koneksi (SYN, ESTABLISHED, FIN) dalam tabel sesi aktif.',
    speed: 'Cepat & Efisien',
    securityLevel: 'Kuat (Standar Industri Enterprise)',
    howItWorks:
      'Memiliki tabel status (State Table) cerdas di dalam memori. Ketika pengguna internal membuka situs web, firewall mencatat nomor port dinamis yang dibuka. Ketika server web luar mengirimkan balasan, firewall memeriksa tabel: jika tercatat sebagai respon yang diminta, paket diizinkan masuk. Paket liar dari luar tanpa catatan permintaan langsung dibuang.',
    attackScenario: {
      attackName: 'Penyusupan Paket Liar Tanpa Izin (Port Probe)',
      attackDescription:
        'Peretas mencoba menembus port 49821 dengan paket ACK palsu seolah-olah data kiriman balik.',
      firewallDecision: 'BLOCK',
      reason:
        'Sukses Dibendung: Firewall memeriksa State Table dan menemukan tidak ada riwayat permintaan untuk paket tersebut, lalu langsung menolaknya.',
    },
    strengths: [
      'Membuka dan menutup port ephemeral secara dinamis hanya saat dibutuhkan',
      'Mencegah paket ACK dan balasan palsu yang tidak diminta',
      'Memberikan keamanan yang jauh lebih kokoh dibandingkan packet filter murni',
    ],
    weaknesses: [
      'Tabel status dapat menjadi sasaran serangan Denial of Service (State Table Exhaustion / SYN Flood)',
      'Tetap tidak membaca isi data aplikasi (tidak mendeteksi SQL Injection di dalam lalu lintas Port 80/443)',
    ],
  },
  {
    id: 'gen3',
    generationNumber: 'Generasi 3',
    title: 'Next-Generation Firewall (NGFW) & WAF',
    subTitle: 'Deep Packet Inspection (DPI) & Proteksi Aplikasi',
    layer: 'Layer 7 (Application Layer)',
    inspectionDepth: 'Membongkar isi muatan data (payload), identitas aplikasi, serta konten berkas.',
    speed: 'Sedang (Memerlukan Pemrosesan Komputasi CPU/ASIC)',
    securityLevel: 'Maksimal (Proteksi Berlapis)',
    howItWorks:
      'Tidak hanya memeriksa pintu gerbang (port) dan status koneksi, tetapi juga membuka muatan isi kargo paket data. NGFW dan Web Application Firewall (WAF) dapat mendeteksi apakah permintaan HTTPS di port 443 adalah penelusuran halaman biasa atau injeksi skrip berbahaya (SQL Injection / Cross-Site Scripting). Dilengkapi fitur antivirus gateway dan pencegah intrusi (IPS).',
    attackScenario: {
      attackName: 'Serangan SQL Injection Lewat Port Web Legal (Port 443)',
      attackDescription:
        "Peretas mengirim query jahat: ' OR '1'='1 -- ke form login SIAKAD melalui protokol HTTPS resmi.",
      firewallDecision: 'BLOCK',
      reason:
        'Sukses Dibendung: NGFW/WAF membaca payload aplikasi, mendeteksi pola SQL Injection berbahaya, dan memutus koneksi seketika meskipun port 443 dibuka.',
    },
    strengths: [
      'Deep Packet Inspection (DPI) hingga tingkat baris kode muatan aplikasi',
      'Integrasi Intrusion Prevention System (IPS) dan deteksi malware otomatis',
      'Mengenali aplikasi sebenarnya (contoh: mendeteksi BitTorrent meskipun berjalan di Port 80)',
    ],
    weaknesses: [
      'Membutuhkan daya komputasi tinggi (CPU/ASIC berkecepatan tinggi)',
      'Memerlukan terminasi dekripsi SSL/TLS untuk memeriksa paket terenkripsi',
    ],
  },
];

export const GenerasiFirewallViewer: React.FC = () => {
  const [selectedGen, setSelectedGen] = useState<'gen1' | 'gen2' | 'gen3'>('gen2');

  const currentGen = GENERATIONS.find((g) => g.id === selectedGen)!;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div>
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Evolusi Pertahanan Jaringan
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5">
            Tiga Generasi Firewall: Dari Header Hingga Muatan Aplikasi (DPI)
          </h3>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Layer 3/4 → State Table → Layer 7 (DPI)
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Seiring berkembangnya teknik penyerangan siber, teknologi firewall telah berevolusi melalui tiga lompatan arsitektural. Klik masing-masing generasi di bawah ini untuk melihat kedalaman analisis paket dan ketahanannya terhadap eksploitasi:
      </p>

      {/* Selector 3 Generasi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
        {GENERATIONS.map((gen) => {
          const isSelected = selectedGen === gen.id;
          return (
            <button
              key={gen.id}
              onClick={() => setSelectedGen(gen.id)}
              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-white/[0.08] border-white/40 shadow-sm'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-mono text-[10px] font-bold uppercase ${
                    isSelected ? 'text-white' : 'text-zinc-400'
                  }`}
                >
                  {gen.generationNumber}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  {gen.id === 'gen1' ? 'Stateless' : gen.id === 'gen2' ? 'Stateful' : 'Next-Gen'}
                </span>
              </div>
              <h4 className="text-xs font-semibold text-white truncate">{gen.title}</h4>
              <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{gen.layer}</p>
            </button>
          );
        })}
      </div>

      {/* Konten Detail Generasi Terpilih */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGen.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          {/* Ringkasan Parameter Teknis */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-black/50 border border-white/[0.06]">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Layer Inspeksi</span>
              <span className="text-xs font-semibold text-white block truncate">{currentGen.layer}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Kedalaman Analisis</span>
              <span className="text-xs font-semibold text-blue-400 block truncate">
                {currentGen.id === 'gen1' ? 'Header L3/L4' : currentGen.id === 'gen2' ? 'Header + State' : 'Full Payload L7'}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Kecepatan Filter</span>
              <span className="text-xs font-semibold text-emerald-400 block truncate">{currentGen.speed}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase block">Tingkat Keamanan</span>
              <span
                className={`text-xs font-semibold block truncate ${
                  currentGen.id === 'gen1'
                    ? 'text-amber-400'
                    : currentGen.id === 'gen2'
                    ? 'text-emerald-400'
                    : 'text-purple-400'
                }`}
              >
                {currentGen.securityLevel}
              </span>
            </div>
          </div>

          {/* Penjelasan Cara Kerja */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h5 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-zinc-400" />
              <span>Mekanisme Kerja Arsitektur:</span>
            </h5>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify font-sans">
              {currentGen.howItWorks}
            </p>
          </div>

          {/* Uji Skenario Serangan Siber Nyata */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                Uji Ketahanan Serangan Siber Nyata:
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                  currentGen.attackScenario.firewallDecision === 'BLOCK'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {currentGen.attackScenario.firewallDecision === 'BLOCK' ? '✓ DIBLOKIR AMAN' : '⚠ LOLOS (JEBOL)'}
              </span>
            </div>

            <div className="space-y-1">
              <h6 className="text-xs font-semibold text-white">
                {currentGen.attackScenario.attackName}
              </h6>
              <p className="text-[11px] text-zinc-300 leading-relaxed text-justify">
                {currentGen.attackScenario.attackDescription}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/[0.06] text-[11px] text-zinc-300">
              <strong className="text-white">Analisis Keputusan Firewall: </strong>
              {currentGen.attackScenario.reason}
            </div>
          </div>

          {/* Kelebihan vs Kekurangan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-950/10 border border-emerald-500/20 space-y-2">
              <h6 className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Kelebihan Utama</span>
              </h6>
              <ul className="space-y-1 text-[11px] text-zinc-300">
                {currentGen.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/10 border border-rose-500/20 space-y-2">
              <h6 className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5" />
                <span>Kelemahan & Limitasi</span>
              </h6>
              <ul className="space-y-1 text-[11px] text-zinc-300">
                {currentGen.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

