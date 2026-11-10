'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TooltipText } from '@/components/materi/TooltipText';
import { MnemonikConfidentiality } from '@/components/materi/mnemonik/modul-1/MnemonikConfidentiality';
import { MnemonikIntegrity } from '@/components/materi/mnemonik/modul-1/MnemonikIntegrity';
import { MnemonikAvailability } from '@/components/materi/mnemonik/modul-1/MnemonikAvailability';
import { RiskMatrixDemo } from '@/components/materi/RiskMatrixDemo';
import { ModulCtaCard } from '@/components/materi/ModulCtaCard';

const MODULE_ID = 'modul-1';

export default function Modul1ContentPage() {
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
              MODUL 01 • ESTIMASI 20 MENIT
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
              Fondasi Keamanan Siber
            </span>
            <span className="text-xs text-zinc-500 font-mono">• Modul 1 dari 7</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-white leading-[1.2] mb-4">
            Pengantar Keamanan Informasi & Manajemen Risiko
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans text-justify">
            Pembahasan komprehensif mengenai prinsip dasar pertahanan sistem melalui Segitiga CIA Triad,
            pemahaman mendalam terhadap aset, ancaman, dan kerentanan, serta metode penentuan tingkat risiko secara terukur.
          </p>
        </div>

        {/* ========================================================
            SEKSI 1: ANATOMI LENGKAP SEGITIGA CIA TRIAD
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              01
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Fundamental: Segitiga CIA Triad
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Setiap arsitektur pertahanan sistem informasi di seluruh dunia dirancang berdasarkan satu kerangka kerja
            utama yang dikenal dengan nama{' '}
            <TooltipText
              term="CIA Triad"
              explanation="Tiga pilar dasar keamanan siber yang terdiri dari Kerahasiaan, Integritas, dan Ketersediaan. Seluruh aturan dan teknologi pertahanan dibangun untuk menjaga keseimbangan ketiga hal tersebut."
            >
              CIA Triad
            </TooltipText>
            . Istilah ini bukan merupakan nama badan intelijen, melainkan singkatan dari tiga pilar esensial yaitu{' '}
            <TooltipText
              term="Confidentiality (Kerahasiaan)"
              explanation="Prinsip yang memastikan bahwa data penting hanya dapat diakses atau dibaca oleh pihak yang memiliki hak resmi."
            >
              Kerahasiaan (Confidentiality)
            </TooltipText>
            ,{' '}
            <TooltipText
              term="Integrity (Integritas)"
              explanation="Prinsip yang menjamin bahwa data tetap asli dan tidak diubah secara diam-diam oleh pihak yang tidak bertanggung jawab."
            >
              Integritas (Integrity)
            </TooltipText>
            , dan{' '}
            <TooltipText
              term="Availability (Ketersediaan)"
              explanation="Prinsip yang memastikan sistem dan data selalu siap digunakan kapan pun pengguna yang berhak memerlukannya."
            >
              Ketersediaan (Availability)
            </TooltipText>
            . Ketiga pilar ini saling melengkapi, sehingga jika salah satu pilar diabaikan, maka keseluruhan sistem pertahanan akan kehilangan tujuannya.
          </p>

          {/* Sub-Pilar 1: Confidentiality */}
          <div className="pt-2 space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 inline-block" />
              1. Kerahasiaan: Memastikan Informasi Hanya Terbuka Bagi yang Berhak
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
              Kerahasiaan berfokus pada pencegahan kebocoran informasi kepada entitas yang tidak berwenang. Di lingkungan
              pendidikan, data profil jurusan dan jadwal kuliah umum merupakan informasi terbuka bagi publik, namun catatan nilai
              mahasiswa, slip pembayaran kuliah, dan data pribadi dosen merupakan informasi rahasia yang wajib dilindungi.
              Ancaman terhadap kerahasiaan terjadi ketika pihak luar menyadap saluran komunikasi di jaringan, menyalin berkas
              basis data secara tidak sah, atau mengintip layar komputer orang lain.
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
              Penerapan kerahasiaan dilakukan dengan menyandikan pesan menggunakan algoritma enkripsi. Data yang melintasi
              jaringan internet dilindungi menggunakan protokol keamanan web, sedangkan data yang tersimpan di dalam komputer server
              dikunci sehingga tidak dapat dibaca meskipun media penyimpanannya diambil secara fisik. Melalui simulasi di bawah ini,
              Anda dapat membandingkan proses pengiriman data yang tersandi dengan data yang dikirimkan secara terbuka:
            </p>
            <MnemonikConfidentiality />
          </div>

          {/* Sub-Pilar 2: Integrity */}
          <div className="pt-4 space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 inline-block" />
              2. Integritas: Menjaga Ketepatan dan Keaslian Seluruh Catatan Data
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
              Menjaga kerahasiaan data tidak akan berarti apabila data tersebut dapat dimanipulasi tanpa terdeteksi. Prinsip
              integritas memberikan kepastian bahwa isi sebuah berkas atau informasi tidak pernah mengalami perubahan yang tidak sah,
              baik karena sabotase pihak luar maupun karena kesalahan transmisi perangkat keras. Sebagai contoh nyata, jika sistem
              informasi akademik berhasil disusupi dan nilai kelulusan mahasiswa diubah secara ilegal, maka keabsahan seluruh ijazah
              yang diterbitkan institusi akan dipertanyakan.
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
              Secara teknis, integritas dibuktikan melalui penerapan fungsi matematis yang menghasilkan kode sidik jari digital unik
              untuk setiap berkas. Apabila ada satu huruf atau satu angka saja yang dimodifikasi oleh penyusup, maka nilai sidik jari
              tersebut akan berubah total, sehingga sistem penerima dapat langsung menolak data tersebut sebagai data yang telah rusak.
              Simulasi di bawah memperlihatkan bagaimana kerusakan integritas dapat mengubah isi pengumuman resmi menjadi informasi palsu:
            </p>
            <MnemonikIntegrity />
          </div>

          {/* Sub-Pilar 3: Availability */}
          <div className="pt-4 space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 inline-block" />
              3. Ketersediaan: Menjamin Layanan Selalu Dapat Diakses Saat Dibutuhkan
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
              Sistem komputer yang paling tidak dapat dibobol adalah komputer yang dimatikan dan disimpan di ruang kedap. Akan tetapi,
              komputer tersebut tidak memiliki nilai guna karena tidak menyediakan layanan apa pun. Prinsip ketersediaan menuntut agar
              aplikasi, basis data, dan jaringan komunikasi selalu beroperasi normal dan siap melayani pengguna yang sah tanpa jeda yang
              merugikan aktivitas kerja.
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
              Bentuk gangguan ketersediaan yang paling sering dijumpai adalah pembanjiran server web dengan jutaan permintaan palsu
              secara serempak dari berbagai penjuru internet. Akibatnya, server kehabisan daya tampung dan menolak sambungan baru,
              sehingga mahasiswa yang ingin mengisi rencana studi atau melihat jadwal ujian akan mendapati layar peramban mereka
              mengalami kegagalan sambungan. Perhatikan perbedaan proses pemuatan laman web pada kondisi normal dan saat terjadi gangguan
              ketersediaan berikut:
            </p>
            <MnemonikAvailability />
          </div>
        </section>

        {/* ========================================================
            SEKSI 2: PENJELASAN MENYELURUH ELEMEN MANAJEMEN RISIKO
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              02
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Manajemen Risiko: Pemahaman Aset, Ancaman, dan Kerentanan
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Organisasi tidak memiliki dana dan waktu yang tak terbatas untuk mengamankan seluruh perangkat dengan pengamanan maksimal.
            Oleh karena itu, diperlukan manajemen risiko untuk memetakan bagian mana yang paling mendesak untuk dilindungi. Dalam ilmu
            keamanan informasi, risiko tidak muncul begitu saja, melainkan terbentuk dari perpaduan tiga elemen fundamental yang wajib
            dipahami secara mendalam berikut ini:
          </p>

          {/* Kartu Penjelasan Lengkap Elemen 1: ASET */}
          <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/[0.08] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white inline-block" />
                Elemen Pertama: Aset (Asset)
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">Fokus Evaluasi: Nilai Kepentingan</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
              Aset adalah segala sesuatu yang dimiliki oleh institusi atau organisasi yang memiliki nilai kebermanfaatan, nilai
              ekonomis, atau nilai legalitas, sehingga menimbulkan dampak kerugian nyata apabila mengalami kerusakan, kebocoran, atau
              kehilangan. Di lingkungan pendidikan dan kampus, aset dapat diklasifikasikan ke dalam tiga jenis utama:
            </p>
            <ul className="text-xs text-zinc-300 space-y-2 pl-4 list-disc font-sans text-justify">
              <li>
                <strong className="text-white">Aset Fisik:</strong> Meliputi seluruh perangkat keras nyata seperti komputer server di
                ruang pusat data, perangkat pembagi jaringan, komputer laboratorium mahasiswa, serta media penyimpanan cadangan.
              </li>
              <li>
                <strong className="text-white">Aset Logis atau Digital:</strong> Meliputi basis data nilai akademik mahasiswa, data
                kependudukan civitas akademika, naskah soal ujian, catatan keuangan SPP, serta kode program aplikasi milik kampus.
              </li>
              <li>
                <strong className="text-white">Aset Tak Berwujud:</strong> Meliputi citra baik universitas, akreditasi program studi di
                mata pemerintah, serta kepercayaan publik yang jika rusak membutuhkan waktu bertahun-tahun untuk dipulihkan kembali.
              </li>
            </ul>
          </div>

          {/* Kartu Penjelasan Lengkap Elemen 2: ANCAMAN */}
          <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/[0.08] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white inline-block" />
                Elemen Kedua: Ancaman (Threat)
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">Fokus Evaluasi: Kemungkinan Muncul</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
              Ancaman adalah setiap pihak luar, kondisi lingkungan, atau tindakan yang memiliki potensi untuk mengeksploitasi kelemahan
              sistem guna merusak atau mencuri aset yang ada. Ancaman dinilai berdasarkan seberapa besar kemungkinan peristiwa tersebut
              dapat terjadi dalam jangka waktu operasional sistem. Faktor-faktor ancaman meliputi:
            </p>
            <ul className="text-xs text-zinc-300 space-y-2 pl-4 list-disc font-sans text-justify">
              <li>
                <strong className="text-white">Aktor Penyerang Luar:</strong> Pihak yang memiliki niat merugikan, mulai dari penyerang
                yang hanya mencari kepuasan pribadi, pelaku pemerasan digital yang mengunci data untuk meminta tebusan uang, hingga
                kelompok terorganisasi yang ingin mencuri data riset universitas.
              </li>
              <li>
                <strong className="text-white">Ancaman dari Dalam:</strong> Pegawai, staf, atau mahasiswa yang sudah memiliki izin akses
                resmi namun menyalahgunakan hak tersebut demi keuntungan pribadi atau rasa dendam.
              </li>
              <li>
                <strong className="text-white">Bencana dan Gangguan Fisik:</strong> Kondisi lingkungan di luar kendali seperti lonjakan arus
                listrik yang membakar perangkat keras, suhu ruang server yang terlalu panas, atau bencana banjir dan gempa bumi.
              </li>
            </ul>
          </div>

          {/* Kartu Penjelasan Lengkap Elemen 3: KERENTANAN */}
          <div className="p-5 rounded-2xl bg-zinc-900/30 border border-white/[0.08] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white inline-block" />
                Elemen Ketiga: Kerentanan (Vulnerability)
              </h3>
              <span className="text-[11px] font-mono text-zinc-400">Fokus Evaluasi: Celah di Dalam Sistem</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
              Kerentanan adalah kelemahan, kekurangan rancangan, atau cacat prosedur yang berada di dalam sistem pertahanan itu sendiri.
              Kerentanan tidak menimbulkan kerusakan secara langsung apabila tidak ada ancaman yang menyentuhnya, namun akan menjadi
              jalur masuk utama yang menghancurkan sistem saat ditemukan oleh pihak luar. Bentuk kerentanan di antaranya:
            </p>
            <ul className="text-xs text-zinc-300 space-y-2 pl-4 list-disc font-sans text-justify">
              <li>
                <strong className="text-white">Celah Perangkat Lunak:</strong> Aplikasi yang sudah tidak mendapatkan pembaruan keamanan,
                kesalahan penulisan kode program yang memungkinkan penyusupan perintah basis data, atau sistem operasi yang sudah usang.
              </li>
              <li>
                <strong className="text-white">Kelemahan Konfigurasi:</strong> Penggunaan kata sandi bawaan pabrik yang belum pernah diganti,
                pembagian hak akses yang terlalu longgar, atau membiarkan pintu koneksi terbuka bebas ke jaringan internet umum tanpa proteksi.
              </li>
              <li>
                <strong className="text-white">Faktor Kelalaian Manusia:</strong> Ketidaktahuan pengguna yang mudah percaya pada pesan
                palsu, kebiasaan menuliskan kata sandi di tempat terbuka, atau tidak mengunci layar komputer saat meninggalkan meja kerja.
              </li>
            </ul>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Interaksi antara ketiga elemen di atas dirumuskan ke dalam perhitungan matematis baku untuk menentukan besaran risiko yang
            dihadapi suatu institusi:
          </p>

          <div className="py-2.5 px-4 bg-white/[0.03] rounded-xl border border-white/[0.08] text-center font-mono text-xs text-white">
            Besaran Risiko = Tingkat Ancaman × Tingkat Kerentanan × Nilai Kepentingan Aset
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Rumus ini membuktikan bahwa risiko dapat ditekan dengan menurunkan salah satu variabelnya. Jika institusi memiliki data nilai
            yang sangat berharga dan ancaman di internet sangat banyak, pihak pengelola kampus tetap dapat menurunkan skor risiko ke level
            aman dengan cara menambal celah keamanan sistem sehingga tingkat kerentanannya mendekati angka terkecil. Silakan gunakan
            kalkulator interaktif berikut untuk memahami bagaimana perubahan setiap elemen memengaruhi status risiko akhir:
          </p>

          {/* Simulator & Rubrik Pengukuran 1 sampai 5 */}
          <RiskMatrixDemo />
        </section>

        {/* ========================================================
            SEKSI 3: RELEVANSI PTI & STUDI KASUS KAMPUS
            ======================================================== */}
        <section className="mb-14 pt-8 border-t border-white/[0.06] space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              03
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Studi Kasus Nyata di Lingkungan Kampus dan Sekolah
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Sebagai mahasiswa Pendidikan Teknik Informatika dan Teknik Informatika, Anda dipersiapkan untuk menjadi pengelola sistem
            informasi di institusi pendidikan maupun industri teknologi. Pemahaman manajemen risiko bukan sekadar teori hafalan,
            melainkan pedoman pengambilan keputusan sehari-hari. Perhatikan skenario nyata berikut:
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-white/[0.08] space-y-3 text-xs text-zinc-300">
            <h4 className="font-semibold text-white text-sm">Skenario Penyelenggaraan Ujian Akhir Berbasis Komputer:</h4>
            <p className="leading-relaxed text-justify">
              Sebuah sekolah menyelenggarakan ujian semester menggunakan server lokal yang terhubung ke jaringan tanpa kabel umum di ruang
              kelas. Apabila jaringan tersebut tidak dipisahkan antara saluran pengawas dan saluran peserta, siswa dapat memanfaatkan
              perangkat lunak pemantau paket untuk menangkap berkas kunci jawaban yang sedang dikirimkan (pelanggaran prinsip Kerahasiaan).
              Apabila formulir pengumpulan nilai tidak dilengkapi verifikasi keaslian berkas, siswa dapat merekayasa skor nilai yang masuk
              ke pangkalan data (pelanggaran prinsip Integritas). Dan apabila server ujian tidak mampu menampung koneksi serentak dari
              seluruh siswa sehingga mati mendadak, maka seluruh agenda evaluasi belajar terpaksa ditunda (pelanggaran prinsip
              Ketersediaan).
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
                  Penyelesaian Teori Modul 1
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
          labRoute="/laboratorium/modul-1"
          labTitle="Laboratorium 01: Pemodelan Ancaman & Matriks Risiko"
          labDescription="Uji pemahaman Anda secara langsung di laboratorium simulasi interaktif. Tempatkan kontrol keamanan pada aset kampus hingga skor risiko turun ke level Aman."
          modeBadge="Mode Praktikum Asesmen"
        />
      </main>
    </div>
  );
}
