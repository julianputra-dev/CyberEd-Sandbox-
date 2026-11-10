'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TooltipText } from '@/components/materi/TooltipText';
import { MnemonikKriptografi } from '@/components/materi/mnemonik/modul-2/MnemonikKriptografi';
import { MnemonikSteganografi } from '@/components/materi/mnemonik/modul-2/MnemonikSteganografi';
import { MetodeSteganografi } from '@/components/materi/MetodeSteganografi';
import { PerbandinganKriptoStegano } from '@/components/materi/PerbandinganKriptoStegano';
import { ModulCtaCard } from '@/components/materi/ModulCtaCard';

const MODULE_ID = 'modul-2';

export default function Modul2ContentPage() {
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
        colors: ['#ffffff', '#10b981', '#6366f1'],
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
              MODUL 02 • ESTIMASI 25 MENIT
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
              Kerahasiaan Data
            </span>
            <span className="text-xs text-zinc-500 font-mono">• Modul 2 dari 7</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-white leading-[1.2] mb-4">
            Kriptografi & Steganografi (Penyembunyian Data)
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans text-justify">
            Mempelajari perbedaan mendasar antara seni mengacak makna pesan melalui komputasi matematis
            kriptografi dan seni mengaburkan jejak komunikasi menggunakan manipulasi bit media pada steganografi,
            serta penerapannya sebagai sistem pertahanan berlapis dalam keamanan siber modern.
          </p>
        </div>

        {/* ========================================================
            SEKSI 1: KRIPTOGRAFI (MENYEMBUNYIKAN MAKNA PESAN)
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              01
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Pertama: Kriptografi (Seni Mengacak Makna)
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Kriptografi berakar dari bahasa Yunani kuno, yaitu kryptos yang berarti tersembunyi dan graphein
            yang berarti tulisan. Dalam ranah ilmu komputer modern, kriptografi merupakan disiplin ilmu matematika
            dan komputasi yang berfokus pada pengamanan informasi dengan cara mengubah pesan asli yang dapat dipahami menjadi
            bentuk sandi acak yang tidak bermakna bagi pihak yang tidak berhak. Data asli yang belum disandikan
            disebut dengan istilah{' '}
            <TooltipText
              term="Plaintext"
              explanation="Pesan atau berkas dalam format teks asli yang masih jelas susunannya dan dapat dibaca langsung oleh siapa pun tanpa memerlukan kunci pembuka."
            >
              Plaintext
            </TooltipText>
            , sedangkan pesan hasil transformasi setelah dienkripsi disebut dengan istilah{' '}
            <TooltipText
              term="Ciphertext"
              explanation="Teks sandi acak hasil proses enkripsi yang maknanya telah terkunci sehingga terlihat seperti deretan karakter tidak beraturan."
            >
              Ciphertext
            </TooltipText>
            .
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Berdasarkan cara pengelolaan kuncinya, pilar utama kriptografi dibagi ke dalam dua paradigma mendasar:
          </p>

          {/* Penjelasan Utama: Kriptografi Simetris & Asimetris (Materi Pokok) */}
          <div className="space-y-4 my-4">
            {/* 1. Kriptografi Simetris */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/[0.06] pb-2.5">
                <h4 className="text-sm font-semibold text-white">
                  1. Kriptografi Kunci Simetris (Satu Kunci Bersama)
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">Algoritma: AES, DES, 3DES, ChaCha20</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                Kriptografi Simetris adalah metode enkripsi di mana pihak pengirim dan pihak penerima menggunakan satu kunci rahasia yang persis sama. Kunci yang digunakan untuk mengunci dokumen (enkripsi) adalah kunci yang sama persis yang dipakai untuk membuka kembali dokumen tersebut (dekripsi). Analogi sederhananya adalah sebuah kotak brankas fisik dengan satu gembok, di mana pengirim dan penerima harus sama-sama memegang salinan anak kunci fisik yang identik.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                  <span className="font-semibold text-emerald-400 text-[11px] block">Kelebihan Utama:</span>
                  <p className="text-zinc-400 text-[11px] leading-relaxed text-justify">
                    Kecepatan komputasi yang luar biasa tinggi dan konsumsi daya pemrosesan yang sangat rendah, sehingga menjadi standar industri untuk mengamankan data bervolume raksasa seperti berkas basis data dan enkripsi hard disk lokal.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                  <span className="font-semibold text-rose-400 text-[11px] block">Tantangan Kunci:</span>
                  <p className="text-zinc-400 text-[11px] leading-relaxed text-justify">
                    Masalah distribusi kunci (Key Distribution Problem), yaitu bagaimana cara mengirimkan kunci rahasia tersebut kepada pihak penerima melalui jaringan internet tanpa sempat dicegat atau disalin oleh pihak penyadap di tengah perjalanan.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Kriptografi Asimetris */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/[0.06] pb-2.5">
                <h4 className="text-sm font-semibold text-white">
                  2. Kriptografi Kunci Asimetris (Sepasang Kunci Publik & Privat)
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">Algoritma: RSA, ECC, Diffie-Hellman, ElGamal</span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                Kriptografi Asimetris diciptakan secara revolusioner untuk memecahkan kelemahan distribusi kunci pada sistem simetris. Pada metode ini, setiap entitas memiliki sepasang kunci yang saling berkaitan secara matematis, yaitu Kunci Publik (Public Key) dan Kunci Privat (Private Key). Kunci Publik dapat disebarkan secara bebas kepada siapa pun di internet untuk mengunci data, sedangkan Kunci Privat wajib disimpan sangat rahasia oleh pemiliknya karena hanya kunci privat inilah yang mampu membuka kembali data yang telah dikunci oleh pasangan kunci publiknya.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                  <span className="font-semibold text-emerald-400 text-[11px] block">Kelebihan Utama:</span>
                  <p className="text-zinc-400 text-[11px] leading-relaxed text-justify">
                    Menghilangkan risiko distribusi kunci, karena pihak pengirim dapat langsung mengunci pesan menggunakan kunci publik penerima tanpa pernah membutuhkan pertukaran kunci rahasia sebelumnya.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                  <span className="font-semibold text-amber-400 text-[11px] block">Karakteristik Komputasi:</span>
                  <p className="text-zinc-400 text-[11px] leading-relaxed text-justify">
                    Membutuhkan operasi perkalian bilangan prima besar sehingga proses komputasinya ratusan kali lebih lambat dibanding simetris. Oleh karena itu, di dunia nyata metode asimetris umumnya hanya dipakai untuk menyepakati kunci sesi di awal koneksi (seperti pada protokol HTTPS).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Sebagai pelengkap pilar kriptografi, terdapat pula fungsi matematis satu arah yang disebut{' '}
            <TooltipText
              term="Fungsi Hash"
              explanation="Algoritma matematis satu arah yang mengubah data masukan berukuran berapa pun menjadi deretan karakter dengan panjang tetap yang tidak dapat dibalikkan kembali ke bentuk semula."
            >
              Fungsi Hash (Hashing)
            </TooltipText>
            . Hashing tidak bertujuan menyembunyikan pesan agar dapat dibaca kembali, melainkan untuk menguji integritas dan keaslian berkas. Silakan amati alur mekanisme transmisi kriptografi dan fungsi hash melalui simulator interaktif di bawah ini:
          </p>

          {/* Animasi Mekanisme Kriptografi */}
          <MnemonikKriptografi />
        </section>

        {/* ========================================================
            SEKSI 2: STEGANOGRAFI (MENYEMBUNYIKAN KEBERADAAN PESAN)
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              02
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Kedua: Steganografi (Seni Mengaburkan Keberadaan)
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Kelemahan terbesar dari kriptografi adalah berkas sandi acak yang dihasilkannya terlihat sangat mencolok.
            Bagi seorang pengawas jaringan atau penyadap, berkas ciphertext yang tidak bermakna langsung menimbulkan kecurigaan bahwa sedang ada informasi bernilai tinggi yang dikirimkan. Di sinilah teknik{' '}
            <TooltipText
              term="Steganografi"
              explanation="Seni dan ilmu menyembunyikan keberadaan sebuah pesan rahasia di dalam berkas media penampung lain seperti gambar, suara, atau video, sehingga pihak luar sama sekali tidak mencurigai adanya komunikasi rahasia."
            >
              Steganografi
            </TooltipText>{' '}
            mengambil peran penting untuk menyembunyikan keberadaan fakta komunikasi itu sendiri.
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Berbeda dengan kriptografi yang memanipulasi makna informasi, steganografi menyisipkan pesan rahasia ke dalam media pembawa (seperti berkas gambar digital, rekaman audio, atau video) tanpa menimbulkan perubahan visual yang dapat disadari oleh indera manusia.
          </p>

          {/* Komponen Baru: 4 Metode Steganografi Digital Modern */}
          <MetodeSteganografi />

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify pt-2">
            Pada simulator di bawah ini, silakan jalankan simulasi inspeksi forensik steganografi. Perhatikan bagaimana sebuah foto pemandangan kampus yang tampak normal pada awalnya, saat dipindai struktur bitnya akan memperlihatkan anomali pada piksel-piksel tertentu, yang setelah dianalisis dan diterjemahkan akan membentuk kalimat pesan rahasia:
          </p>

          {/* Animasi Mekanisme Steganografi */}
          <MnemonikSteganografi />
        </section>

        {/* ========================================================
            SEKSI 3: PERBANDINGAN PARADIGMA & PERTAHANAN BERLAPIS
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              03
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Kombinasi Sempurna di Dunia Nyata: Pertahanan Berlapis
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Kriptografi dan steganografi bukanlah dua teknik yang harus dipertentangkan untuk dipilih salah satu, melainkan dua disiplin ilmu yang saling menutupi kelemahan masing-masing melalui strategi pertahanan berlapis (Defense-in-Depth).
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-white/[0.08] space-y-3 text-xs text-zinc-300">
            <h4 className="font-semibold text-white text-sm">
              Empat Tahap Kerja Kombinasi Kriptografi dan Steganografi:
            </h4>
            <div className="space-y-2.5 font-sans leading-relaxed text-justify">
              <p>
                <strong className="text-white">Tahap 1 (Fase Kriptografi - Penguncian Makna):</strong> Pesan asli tidak boleh langsung disisipkan ke dalam gambar dalam keadaan polos. Pesan terlebih dahulu dienkripsi menggunakan algoritma kriptografi yang kuat (misalnya AES-256) sehingga berubah menjadi ciphertext acak. Hal ini memastikan bahwa andaikata keberadaan berkas rahasia kelak terendus, isi pesan tetap tidak mungkin dapat dibaca.
              </p>
              <p>
                <strong className="text-white">Tahap 2 (Fase Steganografi - Pengaburan Jejak):</strong> Deretan bit ciphertext hasil enkripsi tersebut kemudian disisipkan ke dalam media pembawa (seperti berkas gambar PNG atau JPEG) menggunakan teknik steganografi. Berkas keluaran tampak seperti foto biasa yang bersih tanpa kejanggalan visual.
              </p>
              <p>
                <strong className="text-white">Tahap 3 (Fase Transmisi Saluran Publik):</strong> Berkas foto dikirimkan melalui saluran internet terbuka. Pengawas jaringan yang memantau lalu lintas data hanya melihat pertukaran berkas gambar lumrah dan meloloskannya tanpa kecurigaan sedikit pun.
              </p>
              <p>
                <strong className="text-white">Tahap 4 (Fase Ekstraksi & Dekripsi Sisi Penerima):</strong> Pihak penerima yang sah mengekstrak bit tersembunyi dari gambar untuk mendapatkan kembali ciphertext, lalu memasukkan kunci kriptografi rahasia untuk mendekripsi dan memulihkan teks dokumen asli secara utuh.
              </p>
            </div>
          </div>

          {/* Matriks Perbandingan & Simulator Animasi 4 Tahap */}
          <PerbandinganKriptoStegano />
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
            Sebagai mahasiswa Pendidikan Teknik Informatika dan Teknik Informatika, implementasi kombinasi kedua teknik ini diterapkan secara luas pada berbagai platform digital kampus, di antaranya:
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-white/[0.08] space-y-3 text-xs text-zinc-300">
            <h4 className="font-semibold text-white text-sm">Penerapan Tanda Air Digital pada Ijazah Elektronik:</h4>
            <p className="leading-relaxed text-justify">
              Ketika universitas menerbitkan ijazah digital berformat PDF atau sertifikat keikutsertaan praktikum daring, pihak kampus menyisipkan data nomor induk mahasiswa yang telah ditandatangani secara kriptografi langsung ke dalam bit gambar stempel atau logo universitas. Meskipun dokumen tersebut dipindai ulang atau diunggah ke internet, sistem verifikasi kampus tetap dapat membaca kembali bit tak kasat mata tersebut untuk memvalidasi keaslian dokumen dan mencegah manipulasi pemalsuan nilai.
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
                  Penyelesaian Teori Modul 2
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
          labRoute="/laboratorium/modul-2"
          labTitle="Laboratorium 02: Bedah Pipeline Enkripsi & Steganografi LSB"
          labDescription="Bedah alur kerja penggeseran bit XOR Block Cipher dan zoom-in mikroskopis ke deretan bit warna RGB piksel gambar untuk mengamati injeksi Least Significant Bit secara langsung."
          modeBadge="Mode Visualisasi Teknis"
        />
      </main>
    </div>
  );
}
