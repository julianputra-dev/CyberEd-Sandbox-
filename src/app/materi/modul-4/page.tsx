'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TooltipText } from '@/components/materi/TooltipText';
import { MnemonikPortAnalog } from '@/components/materi/mnemonik/modul-4/MnemonikPortAnalog';
import { TabelPortProtocol } from '@/components/materi/TabelPortProtocol';
import { GenerasiFirewallViewer } from '@/components/materi/GenerasiFirewallViewer';
import { MnemonikFirewallConveyor } from '@/components/materi/mnemonik/modul-4/MnemonikFirewallConveyor';
import { SegmentasiDmzViewer } from '@/components/materi/SegmentasiDmzViewer';
import { ModulCtaCard } from '@/components/materi/ModulCtaCard';

const MODULE_ID = 'modul-4';

export default function Modul4ContentPage() {
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
        colors: ['#ffffff', '#3b82f6', '#10b981'],
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
              MODUL 04 • ESTIMASI 20 MENIT
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
              Infrastruktur Jaringan
            </span>
            <span className="text-xs text-zinc-500 font-mono">• Modul 4 dari 7</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-white leading-[1.2] mb-4">
            Arsitektur & Keamanan Jaringan Komputer
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans text-justify">
            Menelusuri jalan raya komunikasi digital: alamat IP sebagai penanda lokasi fisik dan logis, nomor port sebagai gerbang masuk layanan aplikasi, firewall sebagai penyortir paket berlapis, serta segmentasi zona DMZ untuk melumpuhkan pergerakan lateral penyusup.
          </p>
        </div>

        {/* ========================================================
            SEKSI 1: ANATOMI JARINGAN, ALAMAT IP, DAN MODEL LAYER
            ======================================================== */}
        <section className="mb-14 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              01
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Pertama: Anatomi Komunikasi Jaringan & Alamat IP
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Sebuah jaringan komputer pada hakikatnya adalah sistem perpipaan data yang menghubungkan jutaan perangkat di seluruh dunia. Untuk memahami bagaimana pertahanan siber dibangun di atas sistem ini, mahasiswa perlu memahami tiga elemen fundamental transmisi data:
          </p>

          <div className="space-y-3.5 my-4">
            {/* 1. Alamat IP */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">
                  1. Alamat IP (Internet Protocol Address) — Alamat Gedung Fisik
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">Lapisan Jaringan (Layer 3)</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                <TooltipText
                  term="IP Address"
                  explanation="Nomor identitas numerik unik yang diberikan kepada setiap perangkat yang terhubung ke jaringan berbasis Internet Protocol untuk tujuan pengalamatan dan perutean."
                >
                  Alamat IP
                </TooltipText>{' '}
                berperan sebagai identitas lokasi global. Setiap komputer yang terhubung ke jaringan memiliki alamat IP agar data dapat dikirim dan diterima tanpa salah alamat. Dalam arsitektur kampus, terdapat dua kategori IP:
              </p>
              <ul className="text-xs text-zinc-300 space-y-1 pl-4 list-disc pt-1">
                <li>
                  <strong className="text-white">IP Publik (Public IP):</strong> Alamat resmi yang dapat dijangkau langsung dari internet global (contoh: server web portal SIAKAD kampus).
                </li>
                <li>
                  <strong className="text-white">IP Privat (Private IP - RFC 1918):</strong> Rentang alamat khusus lokal (seperti 192.168.x.x, 10.x.x.x, atau 172.16.x.x) yang digunakan di dalam gedung laboratorium dan asrama mahasiswa, terlindung di balik mekanisme{' '}
                  <TooltipText
                    term="NAT"
                    explanation="Network Address Translation: Teknik penulisan ulang alamat IP pengirim sehingga ratusan komputer di jaringan lokal dapat berbagi satu alamat IP publik bersama ketika mengakses internet."
                  >
                    NAT
                  </TooltipText>.
                </li>
              </ul>
            </div>

            {/* 2. Nomor Port */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">
                  2. Nomor Port Layanan — Nomor Pintu Masuk Kamar Spesifik
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">Lapisan Transport (Layer 4)</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                Jika sebuah server hanya memiliki satu alamat IP, bagaimana komputer tersebut bisa menjalankan situs web, menerima email, dan melayani koneksi database secara simultan? Jawabannya adalah melalui{' '}
                <TooltipText
                  term="Port"
                  explanation="Titik akhir logis komunikasi pada sistem operasi dengan rentang angka 0 hingga 65.535 yang menetapkan jenis aplikasi atau layanan penerima data."
                >
                  Nomor Port
                </TooltipText>
                . Setiap aplikasi mendengarkan (listening) pada nomor pintu tertentu. Sebagai contoh, Port 443 dikhususkan untuk situs web HTTPS terenkripsi, sedangkan Port 22 dikhususkan untuk terminal kendali jarak jauh (SSH).
              </p>
            </div>

            {/* 3. Paket Data */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-white">
                  3. Paket Data (Packet) — Amplop Surat Kurir Resmi
                </h4>
                <span className="text-[10px] font-mono text-zinc-400">Unit Transmisi Informasi</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                Ketika Anda mengunduh materi kuliah berukuran puluhan megabita, berkas tersebut dipecah menjadi ribuan{' '}
                <TooltipText
                  term="Packet"
                  explanation="Potongan kecil data terformat yang dikirimkan melalui jaringan komputer, memuat informasi alamat pengirim, alamat tujuan, serta muatan data asli (payload)."
                >
                  Paket Data
                </TooltipText>
                . Masing-masing paket dilengkapi kepala (*header*) yang memuat informasi pengirim (Source IP & Port), tujuan (Destination IP & Port), nomor urut paket, serta kode pemeriksaan integritas (*checksum*).
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Uji pemahaman Anda mengenai nomor-nomor pintu layanan server melalui simulasi analogi pintu di bawah ini:
          </p>

          {/* Animasi Mnemonik: Pintu Port Analog */}
          <MnemonikPortAnalog />
        </section>

        {/* ========================================================
            SEKSI 2: PROTOKOL TRANSPORT (TCP VS UDP) & REGISTRI PORT
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              02
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Kedua: Protokol Transport (TCP vs UDP) & Registri Port
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Pada lapisan transport (Layer 4), terdapat dua protokol utama yang mendikte bagaimana paket data dikirimkan melintasi jaringan:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <h4 className="text-xs font-semibold text-white">TCP (Transmission Control Protocol)</h4>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Bersifat *connection-oriented*. Sebelum data apa pun ditransmisikan, komputer klien dan server harus menyepakati koneksi melalui mekanisme jabat tangan tiga langkah (3-Way Handshake: SYN, SYN-ACK, ACK). Jika ada satu paket yang hilang di perjalanan, TCP secara otomatis meminta paket tersebut dikirim ulang hingga data lengkap 100%. Digunakan untuk aplikasi penting seperti Web HTTPS, SSH, dan database.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <h4 className="text-xs font-semibold text-white">UDP (User Datagram Protocol)</h4>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Bersifat *connectionless* (tanpa jabat tangan). Data ditembakkan langsung ke alamat tujuan tanpa memeriksa apakah penerima siap atau apakah paket tiba dengan selamat (*fire and forget*). Keunggulannya adalah kecepatan tinggi dan latensi rendah tanpa beban pemeriksaan ulang. Digunakan untuk siaran langsung (live streaming), panggilan suara VoIP, game online, serta resolusi nama DNS.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Amati bagaimana TCP menyepakati koneksi aman dan pelajari klasifikasi port sensitif melalui komponen interaktif di bawah ini:
          </p>

          {/* Komponen: Tabel Protokol & Port Interaktif */}
          <TabelPortProtocol />
        </section>

        {/* ========================================================
            SEKSI 3: FIREWALL, ACL, DAN 3 GENERASI FIREWALL
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              03
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Ketiga: Firewall, Aturan ACL, & Tiga Generasi Pertahanan
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            <TooltipText
              term="Firewall"
              explanation="Sistem keamanan perangkat keras atau lunak yang memantau dan menyaring lalu lintas jaringan masuk dan keluar berdasarkan aturan keamanan yang telah ditetapkan."
            >
              Firewall
            </TooltipText>{' '}
            adalah benteng garda terdepan yang memisahkan jaringan internal terpercaya dari internet publik yang penuh ancaman. Setiap firewall bekerja dengan mengacu pada sekumpulan aturan yang disebut{' '}
            <TooltipText
              term="ACL"
              explanation="Access Control List: Daftar aturan berurutan yang memuat kriteria penyaringan paket data, menentukan apakah suatu paket harus diizinkan lewat (ACCEPT) atau ditolak (DROP/REJECT)."
            >
              Access Control List (ACL)
            </TooltipText>.
          </p>

          <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/[0.08] space-y-2">
            <h4 className="text-xs font-semibold text-white">Prinsip Keamanan: Default-Deny (Kunci Semua Pintu)</h4>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify">
              Dalam arsitektur keamanan standar industri, konfigurasi firewall yang baik selalu menganut prinsip <strong className="text-white">Default-Deny</strong>: seluruh lalu lintas dari luar diblokir secara otomatis, kecuali ada aturan tertulis eksplisit yang mengizinkannya (ACCEPT). Sebaliknya, prinsip kebalikannya (*Default-Allow*) adalah penyebab utama kebocoran server karena membiarkan semua port terbuka secara bebas.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Teknologi firewall telah berevolusi dari penyaring header sederhana hingga pemeriksa muatan data aplikasi (Deep Packet Inspection):
          </p>

          {/* Komponen: 3 Generasi Firewall Viewer */}
          <GenerasiFirewallViewer />

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Untuk melihat secara nyata bagaimana aturan ACL menyortir paket data yang meluncur dari internet publik, jalankan simulasi sabuk konveyor di bawah ini:
          </p>

          {/* Mnemonik Sabuk Konveyor Firewall */}
          <MnemonikFirewallConveyor />
        </section>

        {/* ========================================================
            SEKSI 4: SEGMENTASI JARINGAN, VLAN, DAN ZONA DMZ
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              04
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Keempat: Segmentasi Jaringan, VLAN, & Zona DMZ
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Salah satu kesalahan arsitektur paling berbahaya yang kerap ditemui di universitas adalah penggunaan jaringan datar (*Flat Network*). Pada jaringan datar, seluruh komputer laboratorium, laptop mahasiswa di kantin, printer kantor, dan server rektorat diletakkan dalam satu subnet yang sama tanpa pembatas logis.
          </p>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <h4 className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              <span>Bahaya Pergerakan Lateral (Lateral Movement / Pivoting)</span>
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed text-justify">
              Jika seorang mahasiswa tanpa sengaja menyambungkan laptop yang terinfeksi ransomware ke Wi-Fi kampus pada jaringan datar, malware tersebut dapat memindai seluruh subnet lokal dalam hitungan detik. Cacing jaringan (network worms) dapat melompat dari laptop mahasiswa langsung ke server basis data nilai tanpa terhalang firewall sama sekali.
            </p>
          </div>

          <div className="space-y-3.5 my-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <h4 className="text-xs font-semibold text-white">1. Segmentasi Logis dengan VLAN (Virtual LAN)</h4>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                <TooltipText
                  term="VLAN"
                  explanation="Virtual Local Area Network: Metode pemisahan logis lalu lintas jaringan pada perangkat switch fisik yang sama menjadi beberapa domain siaran (broadcast domain) yang terisolasi."
                >
                  VLAN
                </TooltipText>{' '}
                memungkinkan administrator jaringan memecah satu jaringan fisik menjadi banyak zona virtual mandiri. Komputer pada VLAN Mahasiswa (VLAN 10) tidak dapat berkomunikasi secara langsung dengan komputer pada VLAN Keuangan (VLAN 20) maupun VLAN Server (VLAN 30) tanpa melalui rute pemeriksaan firewall perantara.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
              <h4 className="text-xs font-semibold text-white">2. Arsitektur Tiga Zona DMZ (Demilitarized Zone)</h4>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                <TooltipText
                  term="DMZ"
                  explanation="Demilitarized Zone: Subnet jaringan fisik atau logis yang memisahkan jaringan lokal internal dari internet publik yang tidak aman, berfungsi sebagai zona penyangga untuk server yang menghadap publik."
                >
                  Zona DMZ
                </TooltipText>{' '}
                adalah zona netral penyangga. Server yang wajib diakses oleh publik (seperti Web Server SIAKAD dan Mail Server) ditempatkan di dalam DMZ di antara dua firewall:
              </p>
              <ul className="text-xs text-zinc-300 space-y-1 pl-4 list-disc pt-1">
                <li>
                  <strong className="text-white">Firewall Eksternal (Luar):</strong> Mengizinkan masyarakat umum dan mahasiswa dari rumah mengakses port web (80/443) di DMZ.
                </li>
                <li>
                  <strong className="text-white">Firewall Internal (Dalam):</strong> Membatasi akses ketat dari server DMZ ke jaringan internal kampus. Server web di DMZ hanya diizinkan meminta data nilai ke server database melalui port khusus dengan autentikasi terverifikasi.
                </li>
              </ul>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Simulasikan skenario serangan peretasan web dan bandingkan hasilnya antara arsitektur bertingkat DMZ dengan jaringan datar:
          </p>

          {/* Visualisasi Arsitektur Zona DMZ */}
          <SegmentasiDmzViewer />
        </section>

        {/* ========================================================
            SEKSI 5: VEKTOR SERANGAN JARINGAN & MITIGASINYA
            ======================================================== */}
        <section className="mb-14 space-y-6 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-zinc-300 font-semibold">
              05
            </span>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
              Pilar Kelima: Anatomi Vektor Serangan Jaringan Umum & Mitigasinya
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
            Agar mahasiswa dapat merancang pertahanan jaringan yang tangguh, penting untuk memahami pola serangan yang sering dilancarkan penyerang di dunia nyata:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
            {/* Serangan 1: Port Scanning */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-rose-300">1. Port Scanning & Reconnaissance</h4>
                <span className="text-[10px] font-mono text-zinc-400">Tahap Pengintaian</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Penyerang menggunakan perkakas otomatis (seperti Nmap) untuk mengetuk seluruh 65.535 port server guna mencari layanan yang terbuka tanpa perlindungan (misalnya port Remote Desktop atau port database uji coba yang lupa dimatikan).
              </p>
              <div className="p-2 rounded bg-black/40 border border-white/[0.04] text-[11px] text-zinc-300">
                <strong className="text-emerald-400">Strategi Mitigasi: </strong>
                Terapkan aturan DROP pada firewall untuk port yang tidak terpakai, sembunyikan banner versi aplikasi (*banner masking*), dan gunakan teknik *Port Knocking* untuk akses administratif.
              </div>
            </div>

            {/* Serangan 2: SYN Flood DDoS */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-rose-300">2. TCP SYN Flood (DDoS Layer 4)</h4>
                <span className="text-[10px] font-mono text-zinc-400">Kelebihan Beban Sesi</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Penyerang mengirim jutaan paket permintaan SYN palsu ke server kampus tanpa pernah mengirimkan paket balasan akhir (ACK). Server kehabisan memori RAM karena menahan jutaan antrean sesi setengah terbuka (*half-open connections*), menyebabkan pengguna sah tidak bisa login.
              </p>
              <div className="p-2 rounded bg-black/40 border border-white/[0.04] text-[11px] text-zinc-300">
                <strong className="text-emerald-400">Strategi Mitigasi: </strong>
                Aktifkan fitur <strong className="text-white">SYN Cookies</strong> pada kernel sistem operasi dan pasang perlindungan pembatasan laju (*rate limiting*) pada firewall gateway.
              </div>
            </div>

            {/* Serangan 3: ARP Spoofing */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-rose-300">3. ARP Spoofing & MitM di Jaringan Lokal</h4>
                <span className="text-[10px] font-mono text-zinc-400">Lapisan Data Link (Layer 2)</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Di dalam jaringan LAN laboratorium, penyerang mengirim paket ARP palsu ke router dan switch, mengklaim bahwa alamat MAC komputernya adalah gateway resmi. Seluruh lalu lintas data mahasiswa lain terbelokkan ke laptop penyerang sebelum diteruskan ke internet (*Man-in-the-Middle*).
              </p>
              <div className="p-2 rounded bg-black/40 border border-white/[0.04] text-[11px] text-zinc-300">
                <strong className="text-emerald-400">Strategi Mitigasi: </strong>
                Konfigurasikan <strong className="text-white">Dynamic ARP Inspection (DAI)</strong> dan DHCP Snooping pada switch kampus, serta wajibkan enkripsi HTTPS/TLS menyeluruh pada setiap aplikasi web.
              </div>
            </div>

            {/* Serangan 4: DNS Spoofing */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-rose-300">4. DNS Poisoning & Domain Hijacking</h4>
                <span className="text-[10px] font-mono text-zinc-400">Lapisan Aplikasi (Layer 7)</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                Penyerang meracuni memori cache server DNS lokal dengan respon palsu. Ketika mahasiswa mengetik alamat resmi web kampus, peramban mereka justru diarahkan ke server phishing tiruan yang mencuri kata sandi akun perkuliahan.
              </p>
              <div className="p-2 rounded bg-black/40 border border-white/[0.04] text-[11px] text-zinc-300">
                <strong className="text-emerald-400">Strategi Mitigasi: </strong>
                Terapkan protokol <strong className="text-white">DNSSEC (DNS Security Extensions)</strong> dengan tanda tangan kriptografi digital pada seluruh catatan domain institusi.
              </div>
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
            Pentingnya pemisahan port dan segmentasi zona pertahanan terbukti dalam pencegahan insiden siber nyata di universitas:
          </p>

          {/* Tepat 1 Studi Kasus (Selaras dengan Modul 1, 2, dan 3) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-white/[0.08] space-y-3 text-xs text-zinc-300">
            <h4 className="font-semibold text-white text-sm">
              Insiden Kebocoran Basis Data Akibat Port Database Terbuka ke Publik:
            </h4>
            <p className="leading-relaxed text-justify">
              Sebuah perguruan tinggi negeri mengalami insiden kebocoran basis data nilai dan informasi pribadi mahasiswa. Investigasi forensik menemukan bahwa administrator database membuka Port 3306 (MySQL) ke alamat IP publik (<code className="text-zinc-200">0.0.0.0/0</code>) untuk memudahkan pekerjaan jarak jauh dari rumah tanpa melalui VPN kampus. Dalam waktu 4 jam, bot pemindai internasional mendeteksi port terbuka tersebut dan melancarkan serangan brute force berbasis daftar kata sandi bocor hingga berhasil login dan menyalin seluruh basis data nilai. Insiden ini membuktikan bahwa server basis data tidak boleh terekspos langsung ke internet publik dan wajib diisolasi di jaringan internal privat di balik firewall ganda.
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
                  Penyelesaian Teori Modul 4
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
          labRoute="/laboratorium/modul-4"
          labTitle="Laboratorium 04: Konfigurasi Aturan Firewall Topologi Node (React Flow)"
          labDescription="Rancang dan uji aturan Access Control List (ACL) pada topologi interaktif. Blokir aliran paket serangan merah ke Port 22 sembari meloloskan lalu lintas web sah ke Port 443."
          modeBadge="Mode Praktikum Asesmen"
        />
      </main>
    </div>
  );
}
