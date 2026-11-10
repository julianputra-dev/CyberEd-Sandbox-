'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  CodeXml,
  Globe,
  Layers,
  Lock,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  HelpCircle,
  FileText,
  Zap,
  Cookie,
  Server,
  RefreshCw,
  Flame,
  Activity,
  SlidersHorizontal,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TooltipText } from '@/components/materi/TooltipText';
import { MnemonikGembokSqli } from '@/components/materi/mnemonik/MnemonikGembokSqli';
import { VisualisatorXssViewer } from '@/components/materi/VisualisatorXssViewer';
import { OwaspTop10Explorer } from '@/components/materi/OwaspTop10Explorer';
import { PipelineSanitasiKueri } from '@/components/materi/PipelineSanitasiKueri';
import { VisualisatorDdosViewer } from '@/components/materi/VisualisatorDdosViewer';
import { VisualisatorManipulasiSesi } from '@/components/materi/VisualisatorManipulasiSesi';
import { ModulCtaCard } from '@/components/materi/ModulCtaCard';

const MODULE_ID = 'modul-6';

export default function Modul6ContentPage() {
  const [mounted, setMounted] = useState(false);
  const { completedTheoryHashes, markTheoryComplete } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCompleted =
    mounted && completedTheoryHashes.some((h) => decodeId(h) === MODULE_ID);

  const handleMarkComplete = () => {
    markTheoryComplete(MODULE_ID);
    if (typeof window !== 'undefined') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ffffff', '#f59e0b', '#3b82f6'],
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050506] text-[#ededed] font-sans pb-28">
      {/* 1. Header & Article Top Bar */}
      <header className="sticky top-14 z-30 w-full border-b border-white/[0.06] bg-[#050506]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 h-12 flex items-center justify-between">
          <Link
            href="/materi"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Katalog Materi</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline">
              MODUL 06 • ESTIMASI 30 MENIT
            </span>
            {isCompleted ? (
              <Badge variant="emerald" dot>
                Teori Selesai
              </Badge>
            ) : (
              <Badge variant="outline">Sedang Dipelajari</Badge>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Article Container (Reading Ergonomics: max-w-3xl) */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Article Meta Header */}
        <div className="mb-10 pb-8 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Keamanan Perangkat Lunak
            </span>
            <span className="text-xs text-zinc-500 font-mono">• Modul 6 dari 7</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-white leading-[1.2] mb-4">
            Keamanan Aplikasi & Web (OWASP Top 10)
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans text-justify">
            Modul ini membahas analisis keamanan sistem pada lapisan aplikasi: memahami mengapa firewall tidak berdaya ketika pintu masuk web menerima data sembarangan, membedah hakikat serangan SQL Injection yang mengecoh database akibat gagalnya sistem membedakan data dan perintah, menganalisis ancaman Cross-Site Scripting (XSS) yang membajak peramban pengguna, mengurai serangan banjir Distributed Denial of Service (DDoS) yang melumpuhkan ketersediaan layanan, membongkar manipulasi sesi (Session Hijacking dan Session Fixation), serta mempelajari prinsip pertahanan berlapis di sisi server.
          </p>
        </div>

        {/* ========================================================
            SEKSI 1: FONDASI KEAMANAN APLIKASI & OWASP TOP 10
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              01
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Pertama: Mengapa Aplikasi Web Menjadi Pintu Masuk Utama Peretas?
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Dalam membangun sistem informasi, ada sebuah ilusi keamanan yang sering menipu pengelola baru: mereka merasa aman karena telah memasang firewall canggih di jaringan. Padahal, firewall jaringan hanya bertindak seperti satpam di gerbang pagar luar. Pintu gerbang utama gedung tetap harus dibuka lebar agar mahasiswa, dosen, dan masyarakat umum bisa masuk menggunakan layanan (misalnya portal akademik, perpustakaan daring, atau formulir pendaftaran).
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Pintu masuk resmi yang sengaja dibuka untuk publik inilah yang disebut aplikasi web. Karena pintu ini terbuka untuk siapa saja, penyerang tidak perlu membobol pagar jaringan. Mereka cukup datang seperti pengunjung biasa, lalu menyelipkan racun atau instruksi manipulasi ke dalam kolom formulir yang tersedia.
          </p>

          <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white text-xs">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Mengenal Standar OWASP Top 10</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify">
              Untuk membantu para analis keamanan memahami ancaman apa saja yang paling sering terjadi, organisasi internasional{' '}
              <TooltipText
                term="OWASP Top 10"
                explanation="Daftar 10 kategori risiko keamanan aplikasi web paling kritis di dunia yang diperbarui secara berkala oleh konsorsium keamanan siber global sebagai acuan evaluasi sistem."
              >
                OWASP (Open Web Application Security Project)
              </TooltipText>{' '}
              merilis daftar sepuluh kelemahan web paling berbahaya di dunia.
            </p>
          </div>

          {/* Komponen Visualisator 5 Ancaman OWASP */}
          <OwaspTop10Explorer />
        </section>

        {/* ========================================================
            SEKSI 2: ANATOMI SQL INJECTION
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              02
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Kedua: Hakikat SQL Injection (SQLi) — Gagal Membedakan Data dan Perintah
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-amber-400" />
              <span>Apa Sebenarnya SQL dan SQL Injection Itu?</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
              <strong>SQL (Structured Query Language)</strong> adalah bahasa komunikasi standar yang digunakan oleh aplikasi web untuk berbicara dengan basis data (database). Setiap kali mahasiswa mengetik nama akun untuk login atau mencari judul buku di perpustakaan, aplikasi web menerjemahkannya menjadi kalimat permintaan SQL ke database, misalnya: <em>&quot;Tolong carikan data mahasiswa yang namanya sama dengan yang diketikkan di layar&quot;</em>.
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
              <strong>SQL Injection (SQLi)</strong> adalah jenis serangan di mana penyerang menyisipkan karakter atau instruksi perintah SQL palsu ke dalam kotak isian formulir web. Akibatnya, mesin database mengira teks masukan dari tamu tersebut adalah perintah resmi dari sistem, lalu menjalankannya tanpa curiga.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] space-y-2">
            <h4 className="text-xs font-semibold text-white flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-amber-400" />
              <span>Mengapa Aplikasi Web Bisa Terkena SQL Injection?</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify">
              Akar masalahnya sangat mendasar: <strong>pembuat aplikasi web tidak membedakan mana teks masukan identitas biasa dan mana perintah yang memanipulasi database</strong>.
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed text-justify">
              Sebagai analogi nyata: bayangkan slip penarikan uang di loket bank. Kolom nama penarik seharusnya hanya diisi nama orang, misalnya <em>&quot;Budi&quot;</em>. Namun nasabah nakal menuliskan: <em>&quot;Budi (abaikan saldo di rekening, langsung cairkan uang satu milyar rupiah)&quot;</em>. Jika petugas teller bank tersebut polos dan tidak memiliki aturan pemisahan antara nama nasabah dan instruksi perbankan, teller akan membaca seluruh tulisan itu dan mencairkan uang tersebut. Inilah yang terjadi pada SQL Injection: aplikasi menggabungkan masukan pengguna secara mentah ke dalam kalimat perintah database.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Ketika penyerang mengetikkan tanda petik dan rumus logika seperti <code className="text-amber-400">&apos; OR 1=1 --</code> pada kotak login, tanda petik menutup batasan nama akun, dan rumus <code className="text-amber-400">1=1</code> dibaca sebagai syarat logika: <em>&quot;Apakah nama pengguna kosong ATAU apakah 1 sama dengan 1?&quot;</em>. Karena 1 selalu sama dengan 1, database menganggap syarat login terpenuhi dan membukakan pintu tanpa memeriksa kata sandi asli!
          </p>

          {/* Komponen Animasi Gembok SQLi */}
          <MnemonikGembokSqli />

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <span className="text-xs font-semibold text-white block">
              Dampak Fatal SQL Injection bagi Organisasi:
            </span>
            <ul className="space-y-1.5 text-xs text-zinc-400 text-justify">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Kebocoran Seluruh Data:</strong> Penyerang dapat memerintahkan database mencetak seluruh tabel data pribadi mahasiswa, nilai ujian, hingga rincian keuangan kampus.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Manipulasi Nilai Akademik:</strong> Penyerang menyisipkan instruksi pengubahan data untuk mengganti nilai mata kuliah dari tidak lulus menjadi nilai sempurna.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span><strong>Penghapusan Arsip Permanen:</strong> Penyerang dapat menyuntikkan perintah penghapusan tabel yang seketika melenyapkan seluruh arsip database organisasi.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ========================================================
            SEKSI 3: ANATOMI CROSS-SITE SCRIPTING (XSS)
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              03
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Ketiga: Hakikat Cross-Site Scripting (XSS) — Eksekusi Skrip pada Peramban Korban
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <CodeXml className="h-4 w-4 text-blue-400" />
              <span>Apa Sebenarnya Cross-Site Scripting (XSS) Itu?</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
              Jika SQL Injection menyasar database di server pusat, maka{' '}
              <TooltipText
                term="Cross-Site Scripting (XSS)"
                explanation="Serangan di mana penyerang menyisipkan kode skrip berbahaya ke dalam situs web yang sah, sehingga skrip tersebut otomatis dijalankan oleh peramban pengguna lain yang mengunjungi situs tersebut."
              >
                Cross-Site Scripting (XSS)
              </TooltipText>{' '}
              menyasar mahasiswa, dosen, atau pengunjung lain yang sedang membuka halaman web tersebut.
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
              Peramban web (seperti Chrome, Firefox, atau Safari) dirancang untuk membaca tampilan teks sekaligus mengeksekusi kode skrip yang dikirimkan oleh server web. Celah XSS terjadi ketika penyerang memasukkan potongan kode skrip berbahaya (biasanya JavaScript) ke dalam fitur web yang dapat dilihat orang lain (misalnya kolom komentar, forum diskusi, atau profil publik). Ketika pengguna lain membuka halaman tersebut, peramban mereka mengira skrip tersebut adalah bagian resmi dari website kampus dan langsung mengeksekusinya secara otomatis.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] space-y-2">
            <h4 className="text-xs font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <span>Mengapa XSS Sangat Berbahaya?</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify">
              XSS bukan sekadar memunculkan kotak pesan peringatan di layar. Begitu skrip penyerang berjalan di peramban korban, skrip tersebut dapat <strong>mencuri karcis sesi login (Cookie)</strong> milik korban. Dengan karcis login tersebut, penyerang bisa langsung membuka akun korban di komputernya sendiri tanpa perlu mengetahui kata sandi korban. Skrip juga bisa mengubah tampilan halaman web (defacement) atau merekam ketukan tombol keyboard korban (keylogger).
            </p>
          </div>

          {/* Komponen Visualisator Alur 3 Jenis XSS */}
          <VisualisatorXssViewer />
        </section>

        {/* ========================================================
            SEKSI 4: SERANGAN DDOS (MATERI UTAMA TERSTRUKTUR)
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              04
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Keempat: Ancaman Ketersediaan — Distributed Denial of Service (DDoS)
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Dalam pilar keamanan informasi (CIA Triad), tidak semua peretasan bertujuan mencuri data rahasia (<em>Confidentiality</em>) atau mengubah berkas nilai (<em>Integrity</em>). Serangan <strong>Distributed Denial of Service (DDoS)</strong> membidik pilar ketiga, yaitu <strong>Ketersediaan (Availability)</strong>. Tujuannya adalah membuat layanan macet dan tidak dapat diakses sama sekali oleh pengguna yang sah.
          </p>

          {/* Penjelasan Terstruktur Langsung: Mekanisme & Cara Kerja Botnet */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-white/[0.08] space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Cara Kerja Pasukan Botnet Melumpuhkan Server</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify">
              Serangan DDoS tidak diluncurkan dari satu komputer jinjing peretas, melainkan melibatkan puluhan ribu perangkat komputer, server sewaan, hingga perangkat IoT (kamera pengawas dan router rumah tangga) di seluruh penjuru dunia yang sebelumnya telah disusupi malware. Kumpulan perangkat yang diperbudak ini disebut <strong>Botnet (Komputer Zombie)</strong>.
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify">
              Melalui sebuah server pusat komando (<em>Command and Control / C2</em>), peretas memberikan satu perintah serentak: <em>&quot;Banjiri portal kampus target sekarang juga dengan jutaan paket palsu!&quot;</em>. Ketika jutaan permintaan tiba bersamaan di server kampus dalam rentang detik yang sama, kapasitas memori RAM, antrean koneksi, dan prosesor server seketika penuh (100%). Akibatnya, server kehabisan napas dan memuntahkan galat <strong>503 Service Unavailable</strong> kepada mahasiswa asli yang ingin mengurus KRS.
            </p>
          </div>

          {/* 3 Lapisan Utama Serangan DDoS */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-blue-400" />
              <span>Tiga Lapisan Serangan DDoS yang Wajib Dianalisis:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
                  Lapisan 1: Pipa Bandwidth
                </span>
                <h4 className="text-xs font-semibold text-white">Volume-based Attack (Banjir Kapasitas)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                  Menyerang dengan menembakkan data sampah berukuran raksasa (puluhan Gigabit hingga Terabit per detik) menggunakan protokol UDP Flood atau ICMP Flood. Pipa serat optik kampus seketika tersumbat total sehingga paket data mahasiswa asli tidak bisa lewat.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                  Lapisan 2: Antrean Protokol
                </span>
                <h4 className="text-xs font-semibold text-white">Protocol Attack (TCP SYN Flood)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                  Mengeksploitasi mekanisme jabat tangan komunikasi tiga arah (TCP 3-Way Handshake). Penyerang mengirim sinyal pembuka sambungan (SYN) bertubi-tubi namun sengaja tidak pernah merespons balik, membuat memori antrean koneksi server penuh sesak menunggu jawaban hingga macet.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
                  Lapisan 3: Fitur Web
                </span>
                <h4 className="text-xs font-semibold text-white">Application Layer (HTTP GET Flood)</h4>
                <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                  Serangan cerdas yang menyamar seperti lalu lintas penjelajah biasa. Penyerang berulang kali meminta fitur web yang paling menguras prosesor (seperti kueri pencarian basis data yang kompleks atau unduhan laporan PDF). Server pusat langsung kehabisan kapasitas komputasi CPU.
                </p>
              </div>
            </div>
          </div>

          {/* Dampak Nyata & Strategi Mitigasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-1.5">
              <span className="text-[10px] font-mono text-rose-400 font-semibold flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5" /> Dampak Langsung pada Organisasi
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Portal KRS terputus, layanan akademik berhenti, reputasi institusi menurun drastis, serta tim infrastruktur dipaksa bekerja di bawah tekanan tinggi untuk memulihkan koneksi darurat.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Prinsip Mitigasi Modern
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Menerapkan Cloud WAF (Web Application Firewall), jaringan CDN Anycast dengan pusat pembersihan trafik (<em>Scrubbing Centers</em>), serta pembatasan kuota frekuensi permintaan (<em>Rate Limiting</em>).
              </p>
            </div>
          </div>

          {/* Komponen Visualisator DDoS */}
          <VisualisatorDdosViewer />
        </section>

        {/* ========================================================
            SEKSI 5: MANIPULASI SESI (MATERI BARU)
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              05
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Kelima: Manipulasi Sesi — Session Hijacking vs Session Fixation
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Protokol dasar web (HTTP) bersifat tanpa ingatan (stateless). Server web tidak secara otomatis mengenali bahwa orang yang meminta halaman nilai semester adalah orang yang sama dengan yang tadi memasukkan kata sandi di halaman login.
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Untuk mengatasi hal tersebut, diciptakan mekanisme <strong>Sesi Web</strong>. Begitu Anda berhasil login, server memberikan sebuah nomor acak unik bernama <strong>Karcis Sesi (Session Token / Cookie)</strong> yang disimpan di peramban Anda. Setiap kali Anda berpindah halaman, peramban otomatis menunjukkan karcis ini ke server. Namun, mekanisme karcis ini memiliki dua celah manipulasi utama:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
                Ancaman 1
              </span>
              <h4 className="text-xs font-semibold text-white">Session Hijacking (Pembajakan Sesi)</h4>
              <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                Penyerang mencuri karcis sesi yang sedang aktif dipakai korban (misalnya melalui penyadapan di Wi-Fi publik tanpa enkripsi atau melalui celah XSS). Begitu nomor karcis dicuri, penyerang memasukkannya ke perambannya dan langsung bisa membuka akun korban tanpa login.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                Ancaman 2
              </span>
              <h4 className="text-xs font-semibold text-white">Session Fixation (Fiksasi Sesi Jebakan)</h4>
              <p className="text-xs text-zinc-400 leading-relaxed text-justify">
                Penyerang terlebih dahulu mengambil nomor karcis kosong dari server, lalu menjebak korban untuk login menggunakan nomor karcis tersebut melalui tautan link palsu. Jika server lalai dan tidak mengganti nomor karcis saat korban berhasil login, penyerang yang memegang nomor yang sama seketika ikut masuk ke akun korban.
              </p>
            </div>
          </div>

          {/* Komponen Visualisator Manipulasi Sesi */}
          <VisualisatorManipulasiSesi />
        </section>

        {/* ========================================================
            SEKSI 6: VALIDASI KLIEN VS SERVER
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              06
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Keenam: Ilusi Keamanan di Layar Pengguna (Pintu Depan vs Server Pusat)
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Banyak mahasiswa baru mengira bahwa jika formulir pendaftaran di layar peramban sudah diberi aturan (seperti kotak isian wajib diisi atau dibatasi hanya boleh mengetik angka), maka sistem sudah aman dari serangan siber.
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Pemeriksaan di layar peramban (sisi klien) diciptakan semata-mata untuk memandu pengguna yang baik agar tidak salah mengisi formulir (kenyamanan pengguna). Namun bagi peretas, peramban web hanyalah salah satu cara mengirim data. Penyerang dapat mengabaikan peramban sepenuhnya dan menembakkan data langsung ke server pusat melalui terminal perintah. Oleh sebab itu, <strong>pengamanan sejati wajib dipasang di pusat server</strong>.
          </p>

          {/* Komponen Pipeline Sanitasi Kueri */}
          <PipelineSanitasiKueri />
        </section>

        {/* ========================================================
            SEKSI 7: PRINSIP EMAS PERTAHANAN STANDAR INDUSTRI
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              07
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Ketujuh: Prinsip Perlindungan Mutlak Standar Industri
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Bagaimana organisasi profesional melindungi sistem mereka dari seluruh ancaman aplikasi web di atas? Praktisi keamanan informasi menerapkan empat prinsip pertahanan utama:
          </p>

          <div className="space-y-4">
            {/* Pertahanan 1: Prepared Statements */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-400" />
                  <span>1. Pemisahan Mutlak Data dan Perintah (Prepared Statements)</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Penangkal Mutlak SQLi
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Kunci melumpuhkan SQL Injection bukanlah dengan menghapus simbol tanda petik satu per satu. Cara terbaik adalah menggunakan teknik{' '}
                <TooltipText
                  term="Prepared Statement"
                  explanation="Metode pengamanan di mana struktur kalimat perintah database disusun dan dikunci terlebih dahulu, sehingga apa pun teks yang dimasukkan pengguna murni diperlakukan sebagai data pasif yang tidak akan pernah dijalankan sebagai instruksi."
                >
                  Prepared Statement
                </TooltipText>
                . Dengan metode ini, struktur perintah database dikunci terlebih dahulu. Ketika masukan tamu diserahkan kemudian, sistem memperlakukannya murni sebagai data pasif yang mustahil mengubah alur logika sistem.
              </p>
            </div>

            {/* Pertahanan 2: Sanitasi Teks */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-blue-400" />
                  <span>2. Penyaringan Karakter Khusus (Sanitasi HTML Output Encoding)</span>
                </h4>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  Penangkal Mutlak XSS
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Untuk menangkis XSS, setiap teks kiriman pengguna harus dibersihkan sebelum ditampilkan ke layar pengguna lain. Karakter pembuka kode (seperti kurung sudut siku) diubah bentuknya menjadi simbol tulisan mati biasa. Dengan demikian, peramban pengunjung hanya akan membacanya sebagai tulisan teks biasa tanpa pernah menjalankannya sebagai instruksi aktif.
              </p>
            </div>

            {/* Pertahanan 3: Pengamanan Sesi & HttpOnly */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                  <Lock className="h-4 w-4 text-amber-400" />
                  <span>3. Regenerasi Sesi & Atribut Cookie HttpOnly</span>
                </h4>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Penangkal Pembajakan Sesi
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Wajibkan server membuang nomor sesi lama dan menerbitkan nomor sesi baru secara acak setiap kali pengguna berhasil login (mencegah Session Fixation). Berikan pula tanda pelindung <strong>HttpOnly</strong> pada cookie sesi agar skrip peramban dilarang membaca karcis login, serta gunakan protokol <strong>HTTPS</strong> agar cookie tidak bisa disadap di jaringan Wi-Fi.
              </p>
            </div>

            {/* Pertahanan 4: Penyaring Lalu Lintas & Rate Limiting */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white flex items-center gap-2">
                  <Server className="h-4 w-4 text-purple-400" />
                  <span>4. Pembatasan Frekuensi Akses (Rate Limiting) & WAF</span>
                </h4>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  Penangkal Serangan Banjir DDoS
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Terapkan pembatasan jumlah permintaan per menit untuk setiap alamat IP, pasang sistem penangkis otomatis (Web Application Firewall), dan manfaatkan jaringan distribusi konten (CDN) untuk menyerap dan memilah banjir lalu lintas sebelum mencapai server utama kampus.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEKSI 8: STUDI KASUS NYATA & CHECKPOINT PROGRES
            ======================================================== */}
        <section className="mb-14 pt-8 border-t border-white/[0.06] space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              08
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Studi Kasus Nyata di Lingkungan Kampus
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Kerugian akibat kelemahan aplikasi web sering kali terjadi pada fitur pencarian sederhana di lingkungan perguruan tinggi:
          </p>

          {/* Tepat 1 Studi Kasus Tunggal (Selaras dengan Modul 1 sampai 5) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-white/[0.08] space-y-3 text-xs text-zinc-300">
            <h4 className="font-semibold text-white text-sm">
              Kebocoran Riwayat Nilai & Data Pribadi Mahasiswa Akibat Kotak Pencarian yang Lalai:
            </h4>
            <p className="leading-relaxed text-justify">
              Sebuah universitas meluncurkan fitur pencarian dosen pembimbing skripsi pada portal akademik mahasiswa. Pengembang sistem yang terburu-buru menyatukan kata kunci pencarian nama dosen langsung ke dalam kalimat instruksi pencarian basis data tanpa pemisah. Seorang mahasiswa yang penasaran memasukkan karakter petik dan rumus logika sederhana pada kolom pencarian nama tersebut. Alih-alih menampilkan daftar dosen, layar seketika memuntahkan seluruh tabel arsip kampus, membeberkan ribuan Nomor Induk Mahasiswa (NIM), nomor telepon pribadi orang tua, hingga riwayat nilai mata kuliah yang belum dipublikasikan secara resmi. Insiden ini memaksa pihak universitas menutup total portal akademik selama tiga hari kerja untuk memperbarui sistem menggunakan mekanisme pemisahan data (Prepared Statement) dan memperketat izin akses basis data.
            </p>
          </div>

          {/* Checkpoint Progres Belajar */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">
                  Penyelesaian Teori Modul 6
                </span>
                <span className="text-[11px] text-zinc-400">
                  {isCompleted
                    ? 'Anda telah menyelesaikan materi teori ini. Progres tersimpan di peramban.'
                    : 'Tandai selesai untuk menyimpan lencana teori ke profil Anda.'}
                </span>
              </div>
            </div>

            {!isCompleted && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleMarkComplete}
                className="text-xs font-sans"
              >
                Tandai Selesai & Simpan Progres
              </Button>
            )}
          </div>
        </section>

        {/* ========================================================
            SEKSI 9: TOMBOL NAVIGASI AKHIR (CTA KE LABORATORIUM)
            ======================================================== */}
        <ModulCtaCard
          labRoute="/laboratorium/modul-6"
          labTitle="Laboratorium 06: Audit Celah Aplikasi Web & Penerapan Sanitasi"
          labDescription="Inspeksi transmisi payload SQLi pada form login tiruan, uji mitigasi sanitasi teks komentar XSS, dan perbaiki kode backend virtual menggunakan Parameterized Queries."
          modeBadge="Mode Praktikum Asesmen"
        />
      </main>
    </div>
  );
}
