'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  Database,
  Layers,
  Settings,
  User,
  FileText,
  Eye,
  EyeOff,
  Bot,
  Lock,
  Unlock,
  AlertTriangle,
  Play,
  RotateCcw,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface ThreatScenario {
  id: string;
  rank: string;
  name: string;
  tagline: string;
  analogy: string;
  threatConcept: string;
  riskImpact: string;
  defenseConcept: string;
}

const THREAT_SCENARIOS: ThreatScenario[] = [
  {
    id: 'broken-access',
    rank: 'A01',
    name: 'Broken Access Control',
    tagline: 'Melompati Batas Hak Akses Milik Orang Lain',
    analogy: 'Seperti kamar hotel yang bisa dibuka oleh tamu lain hanya dengan menempelkan stiker nomor kamar berbeda di kuncinya.',
    threatConcept:
      'Sistem berhasil memastikan siapa Anda (Autentikasi lolos), tetapi lupa memeriksa apakah Anda memang berhak melihat berkas yang diminta. Akibatnya, mahasiswa biasa bisa mengintip berkas nilai milik teman lain hanya dengan mengganti nomor ID pada tautan alamat.',
    riskImpact:
      'Privasi pengguna hancur. Data pribadi, dokumen rahasia, atau rekam medis bisa dicuri secara massal oleh siapa pun yang memiliki akun biasa.',
    defenseConcept:
      'Setiap kali ada permintaan berkas, petugas sistem wajib mencocokkan identitas pemohon dengan pemilik asli berkas (Verifikasi Otorisasi Ketat).',
  },
  {
    id: 'crypto-failures',
    rank: 'A02',
    name: 'Cryptographic Failures',
    tagline: 'Data Rahasia Mengalir Tanpa Sandi Pelindung',
    analogy: 'Mengirim surat rahasia berharga menggunakan kartu pos terbuka yang bisa dibaca oleh setiap kurir pos di sepanjang perjalanan.',
    threatConcept:
      'Sistem menyimpan kata sandi pengguna dalam bentuk tulisan biasa (teks mentah) atau mengirimkan data sensitif melalui jalur komunikasi biasa tanpa diacak (tanpa enkripsi TLS/HTTPS). Siapa pun yang menyadap kabel jaringan kampus bisa membaca kata sandi tersebut secara langsung.',
    riskImpact:
      'Bocornya data sensitif secara instan saat terjadi penyadapan jaringan publik (seperti Wi-Fi gratis) atau saat basis data dicadangkan ke media luar.',
    defenseConcept:
      'Wajibkan pengacakan sandi (Enkripsi Kuat) pada seluruh jalur transmisi data serta simpan kata sandi menggunakan fungsi pengacak satu arah yang tidak bisa dibalik.',
  },
  {
    id: 'injection',
    rank: 'A03',
    name: 'Injection (Penyusupan Perintah)',
    tagline: 'Sistem Terkecoh Menjalankan Masukan Tamu Sebagai Perintah',
    analogy: 'Pelayan restoran yang disodori catatan pesanan: "Nasi Goreng, lalu tolong bakar restorannya!". Pelayan yang ceroboh membacakan seluruh kalimat itu ke koki tanpa menyaringnya.',
    threatConcept:
      'Sistem tidak mampu membedakan mana "data yang dicari" dan mana "perintah untuk menjalankan tugas". Ketika pengguna nakal menyelipkan kata-kata instruksi di kolom pencarian, sistem mengira itu adalah perintah resmi dari pengelola dan langsung menjalankannya.',
    riskImpact:
      'Penyerang dapat memerintahkan basis data untuk memuntahkan seluruh arsip rahasia, mengubah nilai ujian, atau menghapus seluruh isi data kampus.',
    defenseConcept:
      'Terapkan pemisahan mutlak: perlakukan seluruh masukan tamu murni sebagai teks pasif yang tidak akan pernah bisa menjadi instruksi perintah sistem.',
  },
  {
    id: 'insecure-design',
    rank: 'A04',
    name: 'Insecure Design',
    tagline: 'Kelemahan Logika Sejak Tahap Rancang Bangun',
    analogy: 'Membangun gedung arsip rahasia bertembok baja tebal, tetapi sang arsitek lupa merancang batas percobaan kunci pada brankas utama.',
    threatConcept:
      'Bukan karena ada salah ketik program, melainkan alur logika bisnis aplikasinya memang tidak memikirkan skenario kejahatan. Contohnya membuat fitur verifikasi kode PIN 4 angka tetapi tidak membatasi berapa kali pengguna boleh salah mencoba.',
    riskImpact:
      'Robot penyerang otomatis dapat menebak kode verifikasi ribuan kali dalam beberapa detik hingga berhasil menguras akun korban tanpa perlawanan.',
    defenseConcept:
      'Terapkan pemodelan ancaman sejak awal: pasang batasan percobaan (Rate Limiting) dan mekanisme penundaan waktu otomatis jika terjadi kegagalan berulang.',
  },
  {
    id: 'security-misconfig',
    rank: 'A05',
    name: 'Security Misconfiguration',
    tagline: 'Menggunakan Pengaturan Bawaan Pabrik yang Longgar',
    analogy: 'Membeli pintu pengaman super canggih berstandar militer, tetapi membiarkan sandi buka darurat tetap memakai nomor bawaan pabrik: 1-2-3-4.',
    threatConcept:
      'Perangkat lunak server sering kali datang dengan akun bawaan pabrik (seperti username admin dan password admin), atau fitur papan diagnostik rahasia yang lupa dimatikan saat sistem mulai dipakai melayani masyarakat umum.',
    riskImpact:
      'Peretas tidak membutuhkan trik rumit untuk masuk. Mereka cukup mencoba kombinasi kata sandi umum bawaan perangkat untuk langsung menguasai seluruh hak akses.',
    defenseConcept:
      'Lakukan penguncian sistem (Hardening): ganti seluruh kata sandi standar sebelum sistem diluncurkan dan matikan semua pintu samping diagnostik.',
  },
];

export const OwaspTop10Explorer: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('broken-access');

  // State simulasi animasi per ancaman
  // A01: Broken Access
  const [requestedId, setRequestedId] = useState<'101' | '102'>('101');
  // A02: Crypto Failure
  const [isEncrypted, setIsEncrypted] = useState(false);
  // A03: Injection
  const [injectionInput, setInjectionInput] = useState<'normal' | 'injected'>('normal');
  // A04: Insecure Design (Brute Force Attempts)
  const [attemptCount, setAttemptCount] = useState(0);
  const [hasRateLimit, setHasRateLimit] = useState(false);
  // A05: Misconfiguration
  const [passwordMode, setPasswordMode] = useState<'default' | 'custom'>('default');
  const [doorUnlocked, setDoorUnlocked] = useState(false);

  const scenario = THREAT_SCENARIOS.find((s) => s.id === activeId)!;

  const handleSimulateBruteForce = () => {
    if (hasRateLimit && attemptCount >= 3) return;
    setAttemptCount((prev) => prev + 1);
  };

  const handleResetBruteForce = () => {
    setAttemptCount(0);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div>
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Analisis Konseptual Keamanan Sistem
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5 flex items-center gap-2">
            <span>Visualisasi 5 Ancaman Aplikasi Web Paling Kritis (OWASP Top 10)</span>
          </h3>
        </div>
        <span className="text-xs text-zinc-400 font-mono">Fokus Analisis Ancaman (Bukan Pemrograman)</span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Dalam analisis keamanan sistem informasi, mahasiswa tidak diposisikan sebagai pembuat kode program, melainkan sebagai analis yang memahami bagaimana suatu celah dapat terjadi, apa dampak risikonya terhadap organisasi, dan bagaimana mekanisme pertahanannya. Klik salah satu kategori ancaman di bawah ini untuk melihat simulasi visual cara kerjanya:
      </p>

      {/* 5 Tab Ancaman Horizontal */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
        {THREAT_SCENARIOS.map((item) => {
          const isSelected = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white text-zinc-950 font-semibold shadow-sm border-white'
                  : 'bg-zinc-950/60 border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/10'
              }`}
            >
              <div>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded block w-fit mb-1 ${
                    isSelected ? 'bg-zinc-800 text-zinc-200' : 'bg-white/[0.05] text-zinc-400'
                  }`}
                >
                  {item.rank}
                </span>
                <span className="text-xs font-semibold block leading-tight truncate">{item.name}</span>
              </div>
              <span className={`text-[10px] mt-2 block ${isSelected ? 'text-zinc-700' : 'text-zinc-500'}`}>
                Lihat Simulasi
              </span>
            </button>
          );
        })}
      </div>

      {/* Kontainer Detail & Animasi Ancaman Terpilih */}
      <div className="space-y-4">
        {/* Banner Penjelasan Konsep Ringkas */}
        <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {scenario.rank}
            </span>
            <h4 className="text-sm sm:text-base font-semibold text-white">{scenario.name}</h4>
            <span className="text-xs text-zinc-400 hidden sm:inline">• {scenario.tagline}</span>
          </div>

          <div className="p-3 rounded-lg bg-black/60 border border-white/[0.04] text-xs space-y-1">
            <div className="text-amber-300 font-medium">Analogi Pemahaman Sederhana:</div>
            <p className="text-zinc-300 leading-relaxed italic">{scenario.analogy}</p>
          </div>
        </div>

        {/* ========================================================
            AREA ANIMASI KONSEPTUAL DINAMIS UNTUK SETIAP ANCAMAN
            ======================================================== */}
        <div className="p-5 rounded-2xl bg-black/80 border border-white/[0.08] relative overflow-hidden">
          {/* 1. ANIMASI A01: BROKEN ACCESS CONTROL */}
          {activeId === 'broken-access' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-zinc-300" /> Profil Pengguna Aktif: <strong>Mahasiswa A (ID: 101)</strong>
                </span>
                <span className="text-amber-400">Eksperimen Ubah Nomor Tiket</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-2">
                {/* Sisi Kiri: Tindakan Pengguna */}
                <div className="space-y-3">
                  <span className="text-xs text-zinc-400 block">Pilih Berkas yang Diminta dari Server:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRequestedId('101')}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-mono transition-all ${
                        requestedId === '101'
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-300 font-semibold'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Minta Berkas ID 101 (Milik Sendiri)
                    </button>
                    <button
                      onClick={() => setRequestedId('102')}
                      className={`flex-1 p-2.5 rounded-xl border text-xs font-mono transition-all ${
                        requestedId === '102'
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 font-semibold'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      Minta Berkas ID 102 (Milik Orang Lain)
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    Perhatikan: Mahasiswa A yang sah hanya memiliki hak atas berkas ID 101. Ketika ia iseng mengubah angka di sistem menjadi 102, apakah sistem memeriksa hak kepemilikannya?
                  </p>
                </div>

                {/* Sisi Kanan: Lemari Berkas Digital Kampus */}
                <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.08] space-y-3">
                  <span className="text-[11px] font-mono text-zinc-400 block border-b border-white/[0.04] pb-1">
                    Respon Server Lemari Berkas:
                  </span>

                  <AnimatePresence mode="wait">
                    {requestedId === '101' ? (
                      <motion.div
                        key="valid-access"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1.5"
                      >
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-4 w-4" /> Akses Berkas Wajar (Milik Sendiri)
                        </div>
                        <p className="text-zinc-300 text-[11px]">
                          <strong>Isi Dokumen:</strong> Transkrip Nilai Mahasiswa A (IPK: 3.85). Pengguna membuka data miliknya sendiri.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="broken-access"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/50 text-xs space-y-1.5"
                      >
                        <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                          <AlertTriangle className="h-4 w-4" /> BAHAYA: Berkas Orang Lain Terbuka!
                        </div>
                        <p className="text-zinc-200 text-[11px]">
                          <strong>Isi Dokumen:</strong> Transkrip Nilai Mahasiswa B (IPK: 3.20, Alamat Rumah: Jl. Mawar No. 12).
                        </p>
                        <p className="text-[10px] text-rose-300 font-mono">
                          Kesalahan Sistem: Server langsung mengambil dokumen nomor 102 tanpa memeriksa apakah Mahasiswa A berhak membacanya!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* 2. ANIMASI A02: CRYPTOGRAPHIC FAILURES */}
          {activeId === 'crypto-failures' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
                <span className="text-zinc-400">Jalur Transmisi Data: Laptop Mahasiswa ➔ Server Kampus</span>
                <button
                  onClick={() => setIsEncrypted(!isEncrypted)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-all ${
                    isEncrypted
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-300 font-semibold'
                  }`}
                >
                  {isEncrypted ? 'Enkripsi Aktif (HTTPS/TLS)' : 'Tanpa Enkripsi (HTTP Teks Mentah)'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center py-2 text-center">
                {/* Titik Kirim */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-zinc-500 block mb-1">Laptop Pengirim</span>
                  <div className="text-xs font-semibold text-white">Kata Sandi Diketik:</div>
                  <div className="text-xs font-mono text-amber-300 mt-1 bg-black/60 p-1.5 rounded">
                    Rahasia123!
                  </div>
                </div>

                {/* Penyadapan di Tengah Jalan (Man-in-the-Middle) */}
                <div className={`p-3 rounded-xl border transition-all ${
                  isEncrypted ? 'bg-zinc-950 border-white/[0.06]' : 'bg-rose-950/40 border-rose-500/50'
                }`}>
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    {isEncrypted ? <EyeOff className="h-4 w-4 text-emerald-400" /> : <Eye className="h-4 w-4 text-rose-400" />}
                    <span className="text-[10px] font-mono font-semibold text-zinc-300">
                      Penyadap di Jaringan Wi-Fi
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-400 mb-1">Apa yang Dilihat Penyadang:</div>
                  <div className={`text-xs font-mono p-1.5 rounded break-all ${
                    isEncrypted ? 'text-emerald-400 bg-black/60' : 'text-rose-300 font-bold bg-rose-950/60'
                  }`}>
                    {isEncrypted ? 'd7a8f9#$9!2x01b@?89a...' : 'Rahasia123! (Terbaca Utuh)'}
                  </div>
                </div>

                {/* Penerima */}
                <div className="p-3 rounded-xl bg-zinc-950 border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-zinc-500 block mb-1">Server Kampus</span>
                  <div className="text-xs font-semibold text-white">Status Penerimaan:</div>
                  <div className={`text-xs font-mono mt-1 p-1.5 rounded ${
                    isEncrypted ? 'text-emerald-400 bg-emerald-950/20' : 'text-amber-400 bg-amber-950/20'
                  }`}>
                    {isEncrypted ? 'Diterima & Didekripsi Aman' : 'Diterima Tanpa Proteksi'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. ANIMASI A03: INJECTION */}
          {activeId === 'injection' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
                <span className="text-zinc-400">Pencampuran Perintah: Loket Layanan Sistem</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setInjectionInput('normal')}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-mono ${
                      injectionInput === 'normal'
                        ? 'bg-blue-500/20 border-blue-500/40 text-blue-300 font-semibold'
                        : 'bg-zinc-900 border-white/10 text-zinc-400'
                    }`}
                  >
                    Masukan Tamu Normal
                  </button>
                  <button
                    onClick={() => setInjectionInput('injected')}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-mono ${
                      injectionInput === 'injected'
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 font-semibold'
                        : 'bg-zinc-900 border-white/10 text-zinc-400'
                    }`}
                  >
                    Masukan Berisi Perintah Tersembunyi
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.06] space-y-2">
                  <span className="text-[11px] font-mono text-zinc-400 block">Teks yang Dikirim Tamu:</span>
                  <div className="p-2 rounded bg-black font-mono text-xs text-amber-300">
                    {injectionInput === 'normal' ? (
                      'Budi Santoso'
                    ) : (
                      <span>
                        Budi <strong className="text-rose-400 underline">+ TAMPILKAN SELURUH DATA RAHASIA</strong>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    {injectionInput === 'normal'
                      ? 'Tamu hanya mencari data seseorang bernama Budi Santoso.'
                      : 'Tamu nakal menambahkan instruksi baru di akhir nama yang diketiknya.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.06] space-y-2">
                  <span className="text-[11px] font-mono text-zinc-400 block">Bagaimana Petugas Basis Data Memprosesnya:</span>
                  {injectionInput === 'normal' ? (
                    <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                      <div className="font-semibold">Mencari Data Nama: Budi Santoso</div>
                      <p className="text-[11px] text-zinc-400">Petugas hanya mencari kecocokan nama, sistem berjalan wajar.</p>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300 space-y-1">
                      <div className="font-semibold flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4" /> Petugas Kebingungan & Menjalankan Instruksi!
                      </div>
                      <p className="text-[11px] text-zinc-300 leading-relaxed">
                        Karena sistem tidak memisahkan perintah dan teks data, petugas mengira kalimat &quot;TAMPILKAN SELURUH DATA&quot; adalah perintah resmi. Seluruh isi arsip bocor ke layar!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. ANIMASI A04: INSECURE DESIGN */}
          {activeId === 'insecure-design' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
                <span className="text-zinc-400">Simulasi Percobaan Tebakan Kode PIN 4-Angka</span>
                <label className="flex items-center gap-1.5 text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasRateLimit}
                    onChange={(e) => {
                      setHasRateLimit(e.target.checked);
                      handleResetBruteForce();
                    }}
                    className="rounded bg-black border-white/20 text-white"
                  />
                  <span>Pasang Batasan Percobaan (Rate Limit)</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Robot Penyerang Menebak:</span>
                    <span className="font-mono text-xs text-amber-400 font-semibold">
                      Jumlah Tebakan: {attemptCount} Kali
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSimulateBruteForce}
                      disabled={hasRateLimit && attemptCount >= 3}
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
                    >
                      <Bot className="h-3.5 w-3.5" />
                      <span>Kirim Tebakan PIN Otomatis</span>
                    </button>
                    <button
                      onClick={handleResetBruteForce}
                      className="px-2.5 py-2 rounded-xl border border-white/10 text-xs text-zinc-400 hover:text-white"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-relaxed">
                    {hasRateLimit
                      ? 'Desain Aman: Sistem membatasi maksimal 3 kesalahan sebelum pintu terkunci otomatis.'
                      : 'Desain Cacat: Penyerang bebas mencoba jutaan kombinasi tanpa pernah dihentikan sistem.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.06] text-center space-y-2">
                  <span className="text-[11px] font-mono text-zinc-400 block">Status Brankas Verifikasi:</span>
                  {hasRateLimit && attemptCount >= 3 ? (
                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs space-y-1">
                      <div className="font-semibold flex items-center justify-center gap-1.5">
                        <ShieldCheck className="h-4 w-4" /> Brankas Dikunci Otomatis (Aman)
                      </div>
                      <p className="text-[11px] text-zinc-300">
                        Terdeteksi 3 kesalahan berturut-turut. Pintu dibekukan selama 15 menit. Serangan robot gagal total!
                      </p>
                    </div>
                  ) : (
                    <div className={`p-3 rounded-lg border text-xs space-y-1 ${
                      attemptCount > 3 ? 'bg-rose-950/30 border-rose-500/40 text-rose-300' : 'bg-black/50 border-white/10 text-zinc-300'
                    }`}>
                      <div className="font-semibold">
                        {attemptCount > 3 ? 'BAHAYA: Tebakan Dibiarkan Terus Menerus!' : 'Menunggu Tebakan...'}
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {attemptCount > 3
                          ? 'Sistem membiarkan penyerang menebak tanpa batas waktu. Tinggal menunggu waktu hingga PIN berhasil ditembus!'
                          : 'Coba klik tombol tebakan beberapa kali untuk menguji reaksi sistem.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 5. ANIMASI A05: SECURITY MISCONFIGURATION */}
          {activeId === 'security-misconfig' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
                <span className="text-zinc-400">Pintu Masuk Ruang Server: Pemeriksaan Kunci</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPasswordMode('default');
                      setDoorUnlocked(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-mono ${
                      passwordMode === 'default'
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 font-semibold'
                        : 'bg-zinc-900 border-white/10 text-zinc-400'
                    }`}
                  >
                    Kunci Bawaan Pabrik (admin/admin)
                  </button>
                  <button
                    onClick={() => {
                      setPasswordMode('custom');
                      setDoorUnlocked(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-mono ${
                      passwordMode === 'custom'
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold'
                        : 'bg-zinc-900 border-white/10 text-zinc-400'
                    }`}
                  >
                    Kunci Telah Diubah Kuat
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center py-2">
                <div className="space-y-3">
                  <span className="text-xs text-zinc-400 block">Tindakan Penyerang:</span>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Penyerang mencoba memasukkan kata sandi standar yang diketahui semua orang di internet:{' '}
                    <code className="text-amber-400 bg-black/60 px-1.5 py-0.5 rounded font-mono">admin / admin</code>.
                  </p>
                  <button
                    onClick={() => setDoorUnlocked(passwordMode === 'default')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all flex items-center gap-1.5"
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    <span>Coba Putar Kunci Standar</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.06] text-center space-y-2">
                  <span className="text-[11px] font-mono text-zinc-400 block">Hasil Percobaan:</span>
                  {doorUnlocked ? (
                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs space-y-1">
                      <div className="font-semibold flex items-center justify-center gap-1.5">
                        <Unlock className="h-4 w-4" /> PINTU SERVER TERBUKA LEBAR!
                      </div>
                      <p className="text-[11px] text-zinc-200">
                        Karena pengelola malas mengubah kata sandi awal bawaan perangkat, penyerang langsung menguasai seluruh server tanpa perlu meretas!
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs space-y-1">
                      <div className="font-semibold flex items-center justify-center gap-1.5">
                        <Lock className="h-4 w-4" /> Pintu Terkunci Rapat
                      </div>
                      <p className="text-[11px] text-zinc-300">
                        {passwordMode === 'custom'
                          ? 'Kunci bawaan pabrik sudah diganti. Tebakan peretas gagal total!'
                          : 'Klik tombol putar kunci untuk melihat apakah kunci standar bisa membuka pintu.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dampak & Mekanisme Pertahanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-xs space-y-1.5">
            <h5 className="font-semibold text-white flex items-center gap-1.5 text-xs">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
              <span>Dampak Kerugian pada Organisasi</span>
            </h5>
            <p className="text-zinc-400 leading-relaxed text-justify text-[11px] sm:text-xs">
              {scenario.riskImpact}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-white/[0.06] text-xs space-y-1.5">
            <h5 className="font-semibold text-white flex items-center gap-1.5 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Prinsip Perlindungan (Analisis KSI)</span>
            </h5>
            <p className="text-zinc-400 leading-relaxed text-justify text-[11px] sm:text-xs">
              {scenario.defenseConcept}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
