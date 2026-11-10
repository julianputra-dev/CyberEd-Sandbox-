'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Zap,
  RotateCcw,
  Check,
  Radio,
  Server,
  Globe,
  Database,
  Terminal,
  Mail,
} from 'lucide-react';

interface PortItem {
  port: number;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  service: string;
  category: 'web' | 'remote' | 'database' | 'infra';
  risk: 'Tinggi' | 'Sedang' | 'Kritis';
  description: string;
  recommendation: string;
}

const PORT_DATABASE: PortItem[] = [
  {
    port: 80,
    protocol: 'TCP',
    service: 'HTTP (Hypertext Transfer Protocol)',
    category: 'web',
    risk: 'Sedang',
    description: 'Lalu lintas web tanpa enkripsi teks biasa (plaintext). Rentan disadap di jaringan publik.',
    recommendation: 'Wajib dialihkan (redirect) otomatis ke HTTPS Port 443.',
  },
  {
    port: 443,
    protocol: 'TCP',
    service: 'HTTPS (HTTP Secure / TLS)',
    category: 'web',
    risk: 'Sedang',
    description: 'Lalu lintas web terenkripsi SSL/TLS. Standar keamanan komunikasi web modern.',
    recommendation: 'Boleh dibuka ke publik dengan sertifikat TLS valid & proteksi WAF.',
  },
  {
    port: 22,
    protocol: 'TCP',
    service: 'SSH (Secure Shell) & SFTP',
    category: 'remote',
    risk: 'Tinggi',
    description: 'Jalur kendali terminal jarak jauh dengan hak administrator (root). Target utama brute-force.',
    recommendation: 'Jangan ekspos langsung ke publik. Gunakan VPN kampus atau ubah port bawaan.',
  },
  {
    port: 3389,
    protocol: 'TCP/UDP',
    service: 'RDP (Remote Desktop Protocol Windows)',
    category: 'remote',
    risk: 'Kritis',
    description: 'Akses desktop grafis server Windows. Sering dieksploitasi ransomware jika terbuka ke publik.',
    recommendation: 'Wajib ditutup dari internet publik. Akses hanya melalui VPN atau Bastion Host.',
  },
  {
    port: 53,
    protocol: 'UDP',
    service: 'DNS (Domain Name System)',
    category: 'infra',
    risk: 'Sedang',
    description: 'Penerjemah nama domain ke alamat IP. Menggunakan UDP demi kecepatan resolusi nama.',
    recommendation: 'Batasi DNS recursion ke jaringan lokal untuk mencegah serangan DNS Amplification.',
  },
  {
    port: 3306,
    protocol: 'TCP',
    service: 'MySQL / MariaDB Database',
    category: 'database',
    risk: 'Kritis',
    description: 'Pintu utama basis data relasional. Menyimpan tabel nilai, akun mahasiswa, dan data kredensial.',
    recommendation: 'Tutup 100% dari internet publik. Hanya boleh diakses oleh Web Server di jaringan internal.',
  },
  {
    port: 5432,
    protocol: 'TCP',
    service: 'PostgreSQL Database',
    category: 'database',
    risk: 'Kritis',
    description: 'Pintu basis data relasional tingkat lanjut untuk aplikasi skala besar.',
    recommendation: 'Tempatkan di zona internal terisolasi di belakang firewall kedua (Internal Firewall).',
  },
  {
    port: 25,
    protocol: 'TCP',
    service: 'SMTP (Simple Mail Transfer Protocol)',
    category: 'infra',
    risk: 'Sedang',
    description: 'Protokol pengiriman surat elektronik antar server pos internet.',
    recommendation: 'Gunakan autentikasi ketat (SPF, DKIM, DMARC) untuk mencegah server dijadikan open-relay spam.',
  },
];

export const TabelPortProtocol: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'ports'>('matrix');
  const [portCategory, setPortCategory] = useState<'all' | 'web' | 'remote' | 'database' | 'infra'>('all');
  const [handshakeStep, setHandshakeStep] = useState<number>(0);

  const filteredPorts = PORT_DATABASE.filter((p) => {
    if (portCategory === 'all') return true;
    return p.category === portCategory;
  });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Tab Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06]">
        <div>
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Eksplorasi Interaktif Layer 4
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5">
            Protokol Transport (TCP vs UDP) & Registri Port Jaringan
          </h3>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/[0.08] self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'matrix'
                ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            TCP vs UDP Handshake
          </button>
          <button
            onClick={() => setActiveTab('ports')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'ports'
                ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Daftar Port & Risiko
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'matrix' ? (
          /* TAB 1: PERBANDINGAN TCP VS UDP DENGAN SIMULASI 3-WAY HANDSHAKE */
          <motion.div
            key="matrix"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Kartu Komparasi 2 Kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kolom TCP */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-blue-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                    <h4 className="text-sm font-semibold text-white">TCP (Transmission Control Protocol)</h4>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Connection-Oriented
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                  Menjamin seluruh data terkirim utuh tanpa cacat dengan urutan paket yang benar melalui proses jabat tangan (*handshake*) dan pengiriman ulang (*retransmission*) jika paket hilang di perjalanan.
                </p>
                <div className="space-y-1 text-[11px] font-mono text-zinc-400 border-t border-white/[0.06] pt-2">
                  <div className="flex justify-between">
                    <span>Keandalan (Reliability):</span>
                    <span className="text-emerald-400 font-semibold">Tinggi (Bergaransi)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kecepatan & Overhead:</span>
                    <span className="text-amber-400">Lebih Lambat (Header 20-60 Byte)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contoh Kasus:</span>
                    <span className="text-white">Web HTTPS, SSH, MySQL, Email</span>
                  </div>
                </div>
              </div>

              {/* Kolom UDP */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <h4 className="text-sm font-semibold text-white">UDP (User Datagram Protocol)</h4>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Connectionless
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed text-justify">
                  Mengirimkan data secepat mungkin tanpa membuka koneksi terlebih dahulu (*fire and forget*). Tidak memeriksa apakah paket tiba atau hilang, memprioritaskan latensi rendah tanpa penundaan.
                </p>
                <div className="space-y-1 text-[11px] font-mono text-zinc-400 border-t border-white/[0.06] pt-2">
                  <div className="flex justify-between">
                    <span>Keandalan (Reliability):</span>
                    <span className="text-rose-400 font-semibold">Rendah (Tanpa Garansi)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kecepatan & Overhead:</span>
                    <span className="text-emerald-400">Sangat Cepat (Header 8 Byte)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contoh Kasus:</span>
                    <span className="text-white">Live Streaming, Game Online, DNS, VoIP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulasi Interaktif: Alur 3-Way Handshake TCP */}
            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    Simulasi Mekanisme TCP 3-Way Handshake
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    Bagaimana Klien Mahasiswa dan Server Kampus menyepakati koneksi aman sebelum data dikirim:
                  </p>
                </div>
                <button
                  onClick={() => setHandshakeStep((prev) => (prev + 1) % 4)}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>{handshakeStep === 3 ? 'Ulangi Handshake' : 'Langkah Berikutnya'}</span>
                </button>
              </div>

              {/* Diagram Visual Step */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Langkah 1: SYN */}
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    handshakeStep >= 1
                      ? 'bg-blue-950/20 border-blue-500/40 text-blue-200'
                      : 'bg-white/[0.02] border-white/[0.06] text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase">Langkah 1: SYN</span>
                    <span className="text-[10px] font-mono">Klien → Server</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Klien mengirim paket <strong className="text-white font-mono">SYN (Synchronize)</strong> dengan nomor urut acak untuk mengajak server membuka sambungan.
                  </p>
                </div>

                {/* Langkah 2: SYN-ACK */}
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    handshakeStep >= 2
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-white/[0.02] border-white/[0.06] text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase">Langkah 2: SYN-ACK</span>
                    <span className="text-[10px] font-mono">Server → Klien</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Server merespons dengan <strong className="text-white font-mono">SYN-ACK</strong>, menandakan server bersedia menerima koneksi dan menyinkronkan nomor sesi.
                  </p>
                </div>

                {/* Langkah 3: ACK */}
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    handshakeStep >= 3
                      ? 'bg-purple-950/20 border-purple-500/40 text-purple-200'
                      : 'bg-white/[0.02] border-white/[0.06] text-zinc-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase">Langkah 3: ACK</span>
                    <span className="text-[10px] font-mono">Klien → Server</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Klien mengirim konfirmasi terakhir <strong className="text-white font-mono">ACK (Acknowledge)</strong>. Koneksi berstatus ESTABLISHED dan data siap ditransmisikan.
                  </p>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-3 rounded-lg bg-zinc-950 border border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-300">
                  Status Sesi TCP:{' '}
                  {handshakeStep === 0 && <span className="text-zinc-500 font-mono">IDLE (Koneksi Belum Dimulai)</span>}
                  {handshakeStep === 1 && <span className="text-blue-400 font-mono">SYN_SENT (Menunggu Balasan Server)</span>}
                  {handshakeStep === 2 && <span className="text-emerald-400 font-mono">SYN_RECEIVED (Server Siap)</span>}
                  {handshakeStep === 3 && <span className="text-purple-400 font-mono font-bold">ESTABLISHED (Sambungan Aktif & Aman)</span>}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {handshakeStep === 3 ? 'Koneksi Selesai Divalidasi' : 'Klik tombol untuk melanjutkan alur'}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* TAB 2: DIREKTORI PORT POPULER DAN LEVEL RISIKO KEAMANAN */
          <motion.div
            key="ports"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Filter Kategori Port */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              <span className="text-xs text-zinc-400 font-medium mr-1">Filter Kategori:</span>
              {[
                { id: 'all', label: 'Semua Port' },
                { id: 'web', label: 'Layanan Web' },
                { id: 'remote', label: 'Akses Remote' },
                { id: 'database', label: 'Basis Data' },
                { id: 'infra', label: 'Infrastruktur' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPortCategory(cat.id as any)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    portCategory === cat.id
                      ? 'bg-white text-zinc-950 font-semibold border-white'
                      : 'bg-white/[0.02] border-white/[0.08] text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* List Kartu Port */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredPorts.map((item) => (
                <div
                  key={item.port}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white bg-zinc-800 px-2 py-0.5 rounded border border-white/10">
                        Port {item.port}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {item.protocol}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                        item.risk === 'Kritis'
                          ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                          : item.risk === 'Tinggi'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                      }`}
                    >
                      Risiko: {item.risk}
                    </span>
                  </div>

                  <h5 className="text-xs font-semibold text-zinc-200">{item.service}</h5>
                  <p className="text-[11px] text-zinc-400 leading-relaxed text-justify">{item.description}</p>

                  <div className="p-2 rounded-lg bg-black/40 border border-white/[0.04] text-[10px] text-zinc-300 flex items-start gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-zinc-200">Rekomendasi:</strong> {item.recommendation}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-zinc-500 font-mono text-center">
              Rentang Port: 0–1023 (Well-Known) • 1024–49151 (Registered) • 49152–65535 (Dynamic/Ephemeral)
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

