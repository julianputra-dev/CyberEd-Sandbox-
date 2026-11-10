'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TooltipText } from '@/components/materi/TooltipText';
import { MnemonikAuthVsAuthz } from '@/components/materi/mnemonik/modul-3/MnemonikAuthVsAuthz';
import { MnemonikMfa } from '@/components/materi/mnemonik/modul-3/MnemonikMfa';
import { TabelRbacViewer } from '@/components/materi/TabelRbacViewer';
import { ModulCtaCard } from '@/components/materi/ModulCtaCard';

const MODULE_ID = 'modul-3';

export default function Modul3ContentPage() {
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
        colors: ['#ffffff', '#10b981', '#a855f7'],
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
              MODUL 03 • ESTIMASI 25 MENIT
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
              Kontrol Akses & Identitas
            </span>
            <span className="text-xs text-zinc-500 font-mono">• Modul 3 dari 7</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-white leading-[1.2] mb-4">
            Manajemen Identitas dan Kontrol Akses (IAM)
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans text-justify">
            Membedah perbedaan fundamental antara pembuktian identitas (Autentikasi) dan pembatasan hak akses
            (Otorisasi), pengelolaan peran berbasis RBAC, serta penguatan benteng akun menggunakan autentikasi multi-faktor.
          </p>
        </div>

        {/* ========================================================
            SEKSI 1: AUTENTIKASI VS OTORISASI (AUTHN VS AUTHZ)
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              01
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Pertama: Autentikasi vs Otorisasi
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Dalam dunia keamanan sistem informasi, kerancuan terbesar yang sering dialami oleh mahasiswa
            adalah menyamakan istilah Autentikasi dan Otorisasi. Meskipun keduanya bekerja berdampingan di dalam payung{' '}
            <TooltipText
              term="IAM"
              explanation="Identity and Access Management: Kerangka kerja kebijakan dan teknologi untuk memastikan bahwa orang yang tepat memiliki akses yang sesuai ke sumber daya teknologi."
            >
              IAM
            </TooltipText>
            , keduanya menjawab dua pertanyaan yang sama sekali berbeda:
          </p>

          {/* Kartu Perbedaan Utama Autentikasi vs Otorisasi */}
          <div className="space-y-4 my-4">
            {/* 1. Autentikasi */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/[0.06] pb-2.5">
                <h4 className="text-sm font-semibold text-white">
                  1. Autentikasi (Authentication / AuthN) — &quot;Siapa Anda?&quot;
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">Tahap Verifikasi Identitas</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                Autentikasi adalah proses pembuktian keabsahan identitas seseorang sebelum diizinkan masuk ke dalam sistem.
                Sistem menanyakan bukti berupa <TooltipText term="Kredensial" explanation="Data rahasia yang digunakan sebagai bukti identitas pengguna, seperti kombinasi nama pengguna (username) dan kata sandi (password).">kredensial</TooltipText> (seperti nama pengguna dan kata sandi) untuk memastikan apakah orang tersebut memang benar-benar pihak yang dia klaim. Analogi sederhananya adalah pemeriksaan Kartu Tanda Penduduk (KTP) oleh satpam di gerbang depan gedung kampus.
              </p>
            </div>

            {/* 2. Otorisasi */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/[0.06] pb-2.5">
                <h4 className="text-sm font-semibold text-white">
                  2. Otorisasi (Authorization / AuthZ) — &quot;Apa yang Boleh Anda Akses?&quot;
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">Tahap Penentuan Hak Akses</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                Otorisasi berlangsung setelah seseorang berhasil diautentikasi. Pada tahap ini, sistem memeriksa daftar izin atau peran pengguna untuk menentukan data atau fasilitas mana saja yang boleh dibaca, diubah, atau dieksekusi. Analogi sederhananya adalah tiket seminar: meskipun Anda sudah lolos verifikasi KTP di gerbang depan, tiket reguler Anda tidak mengizinkan Anda masuk ke ruangan VIP pemateri.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Eksperimenkan perbedaan kedua pilar tersebut secara visual melalui simulasi gedung kampus virtual di bawah ini:
          </p>

          {/* Animasi Mnemonik 1: AuthN vs AuthZ */}
          <MnemonikAuthVsAuthz />
        </section>

        {/* ========================================================
            SEKSI 2: RBAC & LEAST PRIVILEGE
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              02
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Kedua: Role-Based Access Control & Least Privilege
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Dalam sistem berskala besar dengan ribuan pengguna seperti Sistem Informasi Akademik (SIAKAD), memberikan
            izin akses satu per satu ke setiap mahasiswa dan dosen akan menimbulkan kekacauan manajemen hak akses.
            Oleh sebab itu, industri keamanan menerapkan model Role-Based Access Control (RBAC).
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Fondasi utama dari RBAC adalah prinsip <TooltipText term="Least Privilege" explanation="Aturan keamanan di mana setiap entitas pengguna hanya diberikan wewenang sekecil mungkin yang mutlak diperlukan untuk menyelesaikan tugasnya, guna meminimalkan dampak jika akun tersebut diretas.">Prinsip Hak Akses Terkecil</TooltipText>.
            Pengguna tidak boleh memiliki akses ke fitur yang tidak berkaitan dengan fungsinya, guna mencegah terjadinya eskalasi hak akses (*Privilege Escalation*).
          </p>

          {/* Komponen Visualisasi Tabel Matriks RBAC */}
          <TabelRbacViewer />
        </section>

        {/* ========================================================
            SEKSI 3: MULTI-FACTOR AUTHENTICATION (MFA)
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              03
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Ketiga: Multi-Factor Authentication (MFA)
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Kata sandi tunggal tidak lagi memadai untuk membendung serangan siber modern seperti pencurian data kredensial
            atau serangan tebak sandi (<TooltipText term="Brute Force" explanation="Metode serangan di mana penyerang mencoba ribuan hingga jutaan kombinasi kata sandi secara otomatis sampai menemukan yang tepat.">Brute Force</TooltipText>).
            Multi-Factor Authentication (MFA) hadir sebagai solusi pertahanan berlapis dengan mewajibkan verifikasi dari minimal dua faktor pembuktian yang berbeda kategori:
          </p>

          {/* 3 Kategori Faktor Keamanan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                Faktor 1: Knowledge
              </span>
              <h5 className="text-xs font-semibold text-white">Sesuatu yang Diketahui</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">
                Informasi rahasia yang disimpan di ingatan pengguna, seperti Kata Sandi, PIN akun, atau pertanyaan keamanan pribadi.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                Faktor 2: Possession
              </span>
              <h5 className="text-xs font-semibold text-white">Sesuatu yang Dimiliki</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">
                Perangkat fisik yang dipegang pengguna secara nyata, seperti ponsel penerima kode OTP (TOTP), kunci fisik YubiKey, atau kartu pintar.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block">
                Faktor 3: Inherence
              </span>
              <h5 className="text-xs font-semibold text-white">Sesuatu yang Melekat</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">
                Ciri fisik biologis manusia (<TooltipText term="Biometrik" explanation="Metode identifikasi berdasarkan karakteristik biologis unik individu yang mustahil dipinjamkan, seperti sidik jari, pengenalan wajah, atau pemindaian retina mata.">Biometrik</TooltipText>), seperti pemindai sidik jari dan pengenalan wajah.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Simulasikan bagaimana mekanisme brankas dua gembok MFA menggagalkan upaya peretasan akun meskipun kata sandi Anda berhasil dicuri pihak luar:
          </p>

          {/* Animasi Mnemonik 2: Brankas MFA */}
          <MnemonikMfa />
        </section>

        {/* ========================================================
            SEKSI 4: STUDI KASUS NYATA & CHECKPOINT PROGRES
            ======================================================== */}
        <section className="mb-14 pt-8 border-t border-white/[0.06] space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              04
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Studi Kasus Nyata di Lingkungan Pendidikan
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Penerapan IAM yang rapuh di lingkungan kampus sering berujung pada insiden kebocoran data nilai atau manipulasi KRS:
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-white/[0.08] space-y-3 text-xs text-zinc-300">
            <h4 className="font-semibold text-white text-sm">Kasus Celah Otorisasi Broken Access Control pada SIAKAD:</h4>
            <p className="leading-relaxed text-justify">
              Sebuah portal akademik mahasiswa mengalami celah keamanan di mana mahasiswa yang sah telah berhasil diautentikasi ke akun pribadinya, namun ketika mahasiswa tersebut mengganti angka nomor induk mahasiswa pada tautan URL peramban, portal akademik tersebut justru menampilkan berkas transkrip nilai milik mahasiswa lain. Insiden ini terjadi akibat kegagalan sistem dalam memvalidasi otorisasi di sisi server (Broken Object Level Authorization), membuktikan bahwa suksesnya autentikasi sama sekali tidak menjamin keabsahan izin otorisasi.
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
                  Penyelesaian Teori Modul 3
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
            LANGKAH 5: TOMBOL NAVIGASI AKHIR (CTA KE LABORATORIUM)
            ======================================================== */}
        <ModulCtaCard
          labRoute="/laboratorium/modul-3"
          labTitle="Laboratorium 03: Audit & Perbaikan Kebocoran Hak Akses (Privilege Escalation)"
          labDescription="Audit matriks kontrol akses sistem informasi rumah sakit dan kampus. Temukan akun yang memiliki izin berlebihan di luar fungsinya, aktifkan MFA pada akun admin, dan terapkan prinsip Least Privilege."
          modeBadge="Mode Praktikum Asesmen"
        />
      </main>
    </div>
  );
}

