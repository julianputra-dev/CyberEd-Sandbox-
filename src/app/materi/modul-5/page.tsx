'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ShieldAlert, Bug, Terminal, Network, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TooltipText } from '@/components/materi/TooltipText';
import { TaksonomiMalwareViewer } from '@/components/materi/modul-5/TaksonomiMalwareViewer';
import { MnemonikReverseShellRat } from '@/components/materi/mnemonik/modul-5/MnemonikReverseShellRat';
import { TriaseProsesIocViewer } from '@/components/materi/modul-5/TriaseProsesIocViewer';
import { ModulCtaCard } from '@/components/materi/ModulCtaCard';

const MODULE_ID = 'modul-5';

export default function Modul5ContentPage() {
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
        colors: ['#ffffff', '#f43f5e', '#a855f7'],
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
              MODUL 05 • ESTIMASI 25 MENIT
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
              Analisis Ancaman
            </span>
            <span className="text-xs text-zinc-500 font-mono">• Modul 5 dari 7</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-white leading-[1.2] mb-4">
            Ancaman Siber & Analisis Malware
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans text-justify">
            Modul ini membedah lanskap ancaman siber secara komprehensif: taksonomi lima varian utama malware (Virus, Worm, Trojan, Ransomware, dan Spyware) beserta simulasi cara kerjanya, taktik rekayasa sosial dan manipulasi psikologis pada serangan phishing, mekanisme penembusan Reverse Shell oleh Trojan RAT yang mengecoh kebijakan lalu lintas keluar firewall, investigasi forensik proses memori berbasis Indicator of Compromise (IoC) untuk mengungkap penyamaran proses palsu, serta metodologi empat tahap penanganan insiden sistemik berstandar industri.
          </p>
        </div>

        {/* ========================================================
            SEKSI 1: TAKSONOMI MALWARE & KERAGAMAN VARIAN
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              01
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Pertama: Taksonomi Malware & Perbedaan Perilaku
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Salah satu kesalahpahaman paling umum di kalangan mahasiswa adalah menyebut semua program jahat sebagai &quot;virus&quot;. Dalam terminologi keamanan informasi profesional, payung besarnya disebut{' '}
            <TooltipText
              term="Malware"
              explanation="Malicious Software: Setiap perangkat lunak atau kode yang dirancang secara sengaja untuk merusak sistem komputer, mencuri data rahasia, atau memperoleh akses tidak sah."
            >
              Malware
            </TooltipText>{' '}
            (Malicious Software). Di bawah payung ini, malware diklasifikasikan ke dalam lima kategori utama berdasarkan cara replikasi, ketergantungan terhadap berkas inang, dan dampak kerusakannya:
          </p>

          <div className="space-y-3.5 my-4">
            {/* 1. Virus */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">
                  1. Virus Komputer — Parasit Berkas Bertarget
                </h4>
                <span className="text-[10px] font-mono text-amber-400">Butuh Inang & Klik Manusia</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                Virus tidak dapat menyebar sendiri. Virus menyisipkan kodenya ke dalam berkas executable (.exe) atau dokumen makro (.docm) yang sah. Ketika pengguna mengeksekusi berkas tersebut, kode virus dieksekusi terlebih dahulu dan mencari berkas lain di hard disk untuk ditulari.
              </p>
            </div>

            {/* 2. Worm */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">
                  2. Worm (Cacing Jaringan) — Penyebar Otonom Tanpa Intervensi
                </h4>
                <span className="text-[10px] font-mono text-rose-400">Mandiri (Tanpa Inang)</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                Berbeda dengan virus,{' '}
                <TooltipText
                  term="Worm"
                  explanation="Varian malware mandiri yang mampu menggandakan dirinya dan menyebar secara mandiri melintasi jaringan komputer dengan mengeksploitasi celah keamanan tanpa memerlukan tindakan pengguna."
                >
                  Worm
                </TooltipText>{' '}
                adalah program mandiri yang tidak membutuhkan berkas inang dan tidak memerlukan klik pengguna. Worm memindai jaringan lokal secara otomatis, mengeksploitasi celah sistem operasi yang belum ditambal (seperti celah SMB EternalBlue), dan menginfeksi ratusan PC laboratorium dalam hitungan detik.
              </p>
            </div>

            {/* 3. Trojan Horse & RAT */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">
                  3. Trojan Horse & Remote Access Trojan (RAT) — Penyamar Pintu Belakang
                </h4>
                <span className="text-[10px] font-mono text-purple-400">Menyamar Sebagai Program Sah</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                <TooltipText
                  term="Trojan Horse"
                  explanation="Perangkat lunak berbahaya yang menyamar sebagai aplikasi bermanfaat atau dokumen resmi untuk menipu korban agar menginstalnya, padahal diam-diam mengeksekusi muatan peretasan."
                >
                  Trojan
                </TooltipText>{' '}
                menyamar sebagai aplikasi yang tampak bermanfaat (misalnya installer game, utilitas aktivator perangkat lunak, atau dokumen tugas kuliah). Varian paling berbahaya adalah{' '}
                <TooltipText
                  term="RAT"
                  explanation="Remote Access Trojan: Jenis trojan yang memberikan penyerang kendali administratif penuh jarak jauh (remote control) atas perangkat korban secara diam-diam."
                >
                  Remote Access Trojan (RAT)
                </TooltipText>
                , yang membuka pintu belakang komunikasi sehingga peretas dapat mengendalikan komputer korban dari internet.
              </p>
            </div>

            {/* 4. Ransomware */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">
                  4. Ransomware — Penyandera Berkas Kriptografis
                </h4>
                <span className="text-[10px] font-mono text-red-400">Pemerasan Keuangan</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                <TooltipText
                  term="Ransomware"
                  explanation="Malware yang mengenkripsi berkas data berharga korban menggunakan kunci kriptografi kuat, lalu menuntut uang tebusan (biasanya mata uang kripto) untuk mendapatkan kunci pemulihan."
                >
                  Ransomware
                </TooltipText>{' '}
                mengunci seluruh dokumen penting (skripsi, laporan keuangan, tabel nilai) menggunakan algoritma enkripsi asimetris dan simetris kombinasi. Berkas asli dihancurkan, dan korban dipaksa membayar tebusan mata uang kripto untuk mendapatkan kunci dekripsi.
              </p>
            </div>

            {/* 5. Spyware & Keylogger (Diselaraskan dengan Menu Eksplorasi) */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">
                  5. Spyware & Keylogger — Mata-Mata Penyadapan Kredensial Siluman
                </h4>
                <span className="text-[10px] font-mono text-blue-400">Pencurian Data Rahasia</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                <TooltipText
                  term="Spyware"
                  explanation="Perangkat lunak mata-mata yang beroperasi secara sembunyi-sembunyi di sistem untuk memantau aktivitas pengguna, merekam ketukan papan tik, serta mencuri kredensial login tanpa merusak sistem berkas."
                >
                  Spyware
                </TooltipText>{' '}
                dan Keylogger bekerja sesenyap mungkin tanpa memunculkan tanda visual apa pun. Program ini tidak merusak dokumen atau mengunci sistem, melainkan merekam setiap karakter yang diketikkan pengguna saat login ke portal perbankan atau sistem akademik, menyadap masukan mikrofon, serta mengirimkan salinan data tersebut ke server peretas.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Eksplorasi perbandingan lengkap dan amati simulasi animasi interaktif cara kerja masing-masing varian malware di bawah ini:
          </p>

          {/* Komponen: Taksonomi Malware Viewer dengan Simulasi Interaktif 5 Varian */}
          <TaksonomiMalwareViewer />
        </section>

        {/* ========================================================
            SEKSI 2: REKAYASA SOSIAL & ANATOMI PHISHING
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              02
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Kedua: Rekayasa Sosial (Social Engineering) & Anatomi Phishing
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Sebagian besar mahasiswa beranggapan bahwa infeksi malware bermula dari peretas yang membobol firewall dengan baris kode rumit. Kenyataannya, lebih dari 85% insiden keamanan bermula dari{' '}
            <TooltipText
              term="Social Engineering"
              explanation="Taktik manipulasi psikologis manusia untuk memancing korban membocorkan informasi rahasia atau mengeksekusi berkas berbahaya tanpa disadari."
            >
              Rekayasa Sosial
            </TooltipText>
            . Manusia adalah mata rantai paling rentan dalam sistem pertahanan digital institusi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <h4 className="text-xs font-semibold text-white">1. Manipulasi Psikologis Urgensi & Ketakutan</h4>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Penyerang sengaja merancang pesan yang memicu kepanikan atau rasa terdesak, misalnya: &quot;Akun SIAKAD Anda akan dinonaktifkan dalam 2 jam jika tidak memverifikasi data di tautan ini&quot;. Dalam kondisi panik, korban cenderung mengabaikan logika kehati-hatian dan langsung mengeklik lampiran berbahaya.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <h4 className="text-xs font-semibold text-white">2. Spear Phishing Bertarget Kampus</h4>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Berbeda dari phishing massal acak,{' '}
                <TooltipText
                  term="Spear Phishing"
                  explanation="Serangan penipuan email yang dirancang khusus untuk menargetkan individu, organisasi, atau institusi tertentu dengan menyertakan detail kontekstual yang sangat meyakinkan."
                >
                  Spear Phishing
                </TooltipText>{' '}
                menggunakan nama resmi pimpinan kampus, kop surat fakultas, atau istilah perkuliahan lokal yang membuat pesan tampak 100% kredibel bagi mahasiswa atau staf tata usaha.
              </p>
            </div>
          </div>

          {/* Kotak Trik Penyamaran Ekstensi Berkas Ganda */}
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] space-y-2">
            <h4 className="text-xs font-semibold text-white">Trik Ekstensi Ganda Tersembunyi (Hidden File Extension)</h4>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify">
              Sistem operasi Windows secara bawaan menyembunyikan ekstensi berkas yang sudah dikenal. Penyerang memanfaatkan celah ini dengan menamai berkas malware sebagai <code className="text-rose-300 bg-black/40 px-1 py-0.5 rounded">Jadwal_Ujian.pdf.exe</code> dan mengubah ikon berkasnya menjadi ikon Adobe PDF. Di layar komputer korban, berkas tersebut hanya terlihat sebagai <strong className="text-white">Jadwal_Ujian.pdf</strong>, sehingga korban merasa aman untuk mengekliknya dua kali.
            </p>
          </div>
        </section>

        {/* ========================================================
            SEKSI 3: MEKANISME TROJAN RAT & ALUR REVERSE SHELL
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              03
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Ketiga: Mekanisme Trojan RAT & Alur Penembusan Reverse Shell
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Pertanyaan paling kritis yang sering membingungkan mahasiswa adalah: jika firewall kampus menerapkan aturan pembatasan lalu lintas masuk (Inbound Block), bagaimana peretas yang duduk di luar negeri bisa mengendalikan terminal laptop korban yang berada di dalam jaringan LAN kampus?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <h4 className="text-xs font-semibold text-zinc-400">Metode Konvensional: Bind Shell (Gagal Diblokir)</h4>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Malware membuka port penerima di laptop korban dan menunggu peretas menghubungi dari internet luar. Metode ini selalu gagal karena firewall gateway memblokir setiap koneksi asing yang mencoba masuk ke jaringan privat (Inbound DROP).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-purple-500/30 space-y-2">
              <h4 className="text-xs font-semibold text-purple-300">Metode Modern RAT: Reverse Shell (Lolos Mulus)</h4>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                <TooltipText
                  term="Reverse Shell"
                  explanation="Sesi koneksi interaktif di mana perangkat korban di dalam jaringan yang berinisiatif menghubungi server pengendali (C2) peretas di luar, membalikkan arah koneksi untuk menembus aturan firewall masuk."
                >
                  Reverse Shell
                </TooltipText>{' '}
                membalikkan arah inisiatif koneksi. Trojan di dalam komputer korban yang menelepon keluar (Outbound) ke server Command & Control (C2) penyerang melalui Port 443 (HTTPS). Karena firewall memperbolehkan pengguna berselancar ke web luar, terowongan komunikasi langsung terbentuk!
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Simulasikan setiap tahapan penembusan Reverse Shell dan amati bagaimana terminal kendali peretas terbangun secara interaktif:
          </p>

          {/* Komponen: Mnemonik Reverse Shell RAT dengan Penjelasan Detail Lengkap */}
          <MnemonikReverseShellRat />
        </section>

        {/* ========================================================
            SEKSI 4: INDIKATOR KOMPROMI (IoC) & TRIASE PROSES MEMORI
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              04
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Keempat: Indikator Kompromi (IoC) & Triase Proses Memori
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Ketika sebuah sistem diduga telah terinfeksi, analis keamanan siber (Security Analyst) melakukan investigasi forensik dengan mencari{' '}
            <TooltipText
              term="IoC"
              explanation="Indicator of Compromise: Artefak bukti digital forensik yang ditemukan pada sistem atau jaringan yang menunjukkan bahwa komputer telah mengalami intrusi atau infeksi malware."
            >
              Indicator of Compromise (IoC)
            </TooltipText>
            . Tiga bentuk IoC yang paling penting meliputi:
          </p>

          <ul className="text-xs text-zinc-300 space-y-2 pl-4 list-disc my-3 font-sans">
            <li>
              <strong className="text-white">Sidik Jari Kriptografi Berkas (File Hash):</strong> Nilai hash unik (SHA-256 atau MD5) dari biner berkas yang dapat dicocokkan dengan basis data ancaman global (seperti VirusTotal).
            </li>
            <li>
              <strong className="text-white">Alamat Jaringan C2 (Network IoC):</strong> Alamat IP publik atau nama domain yang dihubungi oleh proses malware untuk menerima instruksi peretasan.
            </li>
            <li>
              <strong className="text-white">Kunci Persistensi Sistem (Host Persistence):</strong> Entri registri Windows (seperti <code className="text-zinc-200">HKCU\Software\Microsoft\Windows\CurrentVersion\Run</code>) yang memastikan malware tetap aktif otomatis setiap kali komputer dinyalakan kembali.
            </li>
          </ul>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2 my-4">
            <h4 className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Teknik Penyamaran Proses (Process Masquerading)</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify">
              Pembuat malware jarang menamai programnya dengan nama mencurigakan seperti <code className="text-zinc-200">trojan.exe</code>. Mereka memilih nama yang meniru proses resmi Windows, seperti <code className="text-zinc-200">svch0st.exe</code> (huruf O diganti angka nol) atau meletakkan berkas di folder sementara (<code className="text-zinc-200">AppData\Temp</code>) bukannya di folder resmi sistem (<code className="text-zinc-200">System32</code>).
            </p>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Latih ketajaman investigasi Anda dengan membandingkan proses resmi vs proses berbahaya pada simulasi Process Explorer di bawah ini:
          </p>

          {/* Komponen: Triase Proses IoC Viewer */}
          <TriaseProsesIocViewer />
        </section>

        {/* ========================================================
            SEKSI 5: SIKLUS HIDUP PENANGANAN INSIDEN MALWARE
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              05
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Kelima: Siklus Hidup Respons Penanganan Insiden Malware
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Ketika sebuah komputer laboratorium kampus terbukti menyebarkan Trojan atau terinfeksi Ransomware, tindakan panik seperti langsung mematikan komputer dapat merusak bukti digital di memori RAM. Standar industri internasional (NIST SP 800-61) menetapkan 4 langkah terstruktur:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-blue-400">1. Deteksi & Identifikasi (Detection)</h4>
                <span className="text-[10px] font-mono text-zinc-400">Tahap 1</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Mengenali anomali IoC, mencatat nomor PID proses mencurigakan, memeriksa alamat IP tujuan pada soket jaringan aktif, serta mencatat sidik jari hash SHA-256 berkas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-rose-400">2. Isolasi Jaringan (Containment)</h4>
                <span className="text-[10px] font-mono text-zinc-400">Tahap 2</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Segera putus kabel LAN fisik atau matikan antarmuka Wi-Fi host yang terinfeksi. Tujuannya adalah memutus koneksi kendali peretas (C2) dan mencegah malware menyebar secara lateral ke komputer lain di subnet kampus.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-amber-400">3. Pembersihan & Eradikasi (Eradication)</h4>
                <span className="text-[10px] font-mono text-zinc-400">Tahap 3</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Hentikan paksa proses jahat di memori menggunakan perintah terminasi (<code className="text-zinc-200">taskkill /PID &lt;id&gt; /F</code>), hapus berkas fisik muatan malware dari hard disk, dan bersihkan kunci otomatis di Registry sistem.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-emerald-400">4. Pemulihan & Evaluasi (Recovery)</h4>
                <span className="text-[10px] font-mono text-zinc-400">Tahap 4</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Periksa integritas sistem berkas, perbarui tanda tangan antivirus, tambal celah keamanan sistem operasi yang dieksploitasi, dan kembalikan data penting dari salinan cadangan (backup) yang aman.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEKSI 6: STUDI KASUS NYATA & CHECKPOINT PROGRES
            ======================================================== */}
        <section className="mb-14 pt-8 border-t border-white/[0.06] space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              06
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Studi Kasus Nyata di Lingkungan Kampus
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Kerugian akibat serangan malware di lingkungan akademik sering kali bersumber dari kelalaian terhadap dokumen lampiran email:
          </p>

          {/* Tepat 1 Studi Kasus Tunggal (Selaras dengan Modul 1, 2, 3, dan 4) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-white/[0.08] space-y-3 text-xs text-zinc-300">
            <h4 className="font-semibold text-white text-sm">
              Insiden Penyusupan Trojan RAT Berkedok Pengumuman Beasiswa Resmi:
            </h4>
            <p className="leading-relaxed text-justify">
              Staf administrasi fakultas menerima email yang mengaku dikirimkan oleh Biro Kemahasiswaan mengenai verifikasi penerima beasiswa prestasi. Email tersebut melampirkan berkas terkompresi berekstensi ganda <code className="text-zinc-200">Daftar_Penerima_Beasiswa.pdf.exe</code>. Begitu berkas diklik, Trojan RAT langsung berjalan di latar belakang tanpa memunculkan jendela apa pun. Trojan tersebut membangun koneksi Reverse Shell ke server peretas di luar negeri melalui Port 443 yang tidak dicurigai firewall kampus. Selama dua pekan, peretas mengaktifkan mikrofon komputer ruang rapat fakultas, menyalin draf soal ujian akhir semester yang belum dipublikasikan, serta mencuri berkas identitas mahasiswa sebelum tim keamanan siber mendeteksi anomali transmisi data keluar berkecepatan konstan.
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
                  Penyelesaian Teori Modul 5
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
            SEKSI 7: TOMBOL NAVIGASI AKHIR (CTA KE LABORATORIUM)
            ======================================================== */}
        <ModulCtaCard
          labRoute="/laboratorium/modul-5"
          labTitle="Laboratorium 05: Deteksi & Penanganan Infeksi Remote Access Trojan (RAT)"
          labDescription="Investigasi anomali proses memori svchost palsu, lakukan isolasi jaringan host, terminasi proses berbahaya, dan bersihkan artefak file malware hingga sistem pulih."
          modeBadge="Mode Praktikum Asesmen"
        />
      </main>
    </div>
  );
}
