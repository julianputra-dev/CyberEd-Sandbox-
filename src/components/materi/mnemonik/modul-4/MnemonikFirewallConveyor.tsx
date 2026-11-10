'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Server,
  Trash2,
  Globe,
  ArrowRight,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  RefreshCw,
  Search,
  Terminal,
  Database,
  Lock,
} from 'lucide-react';

interface PacketItem {
  id: string;
  sourceLabel: string;
  sourceIp: string;
  destPort: number;
  service: string;
  type: 'legit_web' | 'ssh_attack' | 'db_exploit' | 'ping_flood';
  badgeColor: string;
  explanation: string;
}

export const MnemonikFirewallConveyor: React.FC = () => {
  // Aturan Firewall ACL yang dapat diubah mahasiswa
  const [allowWeb443, setAllowWeb443] = useState<boolean>(true);
  const [allowSsh22, setAllowSsh22] = useState<boolean>(false);
  const [allowDb3306, setAllowDb3306] = useState<boolean>(false);

  // Status Alur Inspeksi Paket:
  // 0 = Idle / Siap Kirim
  // 1 = Paket Tiba di Gerbang Firewall (Inspeksi Header)
  // 2 = Keputusan Diambil (Diloloskan ke Server ATAU Dibuang ke Tempat Sampah)
  const [inspectStage, setInspectStage] = useState<0 | 1 | 2>(0);
  const [selectedPacket, setSelectedPacket] = useState<PacketItem | null>(null);

  const packets: PacketItem[] = [
    {
      id: 'pkt-web',
      sourceLabel: 'Mahasiswa di Rumah',
      sourceIp: '180.252.110.12',
      destPort: 443,
      service: 'Web SIAKAD (HTTPS)',
      type: 'legit_web',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      explanation: 'Trafik web terenkripsi yang sah untuk pengisian KRS dan melihat jadwal perkuliahan.',
    },
    {
      id: 'pkt-ssh',
      sourceLabel: 'Peretas Luar Negeri',
      sourceIp: '103.145.22.99',
      destPort: 22,
      service: 'Remote Terminal (SSH)',
      type: 'ssh_attack',
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      explanation: 'Upaya pemindaian dan tebak sandi paksa (brute force) ke terminal server kampus.',
    },
    {
      id: 'pkt-db',
      sourceLabel: 'Bot Pencari Celah Basis Data',
      sourceIp: '45.134.20.15',
      destPort: 3306,
      service: 'Basis Data Nilai (MySQL)',
      type: 'db_exploit',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      explanation: 'Upaya koneksi langsung ke server database tanpa melalui web portal aplikasi.',
    },
  ];

  // Evaluasi Aturan Firewall
  const evaluatePacket = (pkt: PacketItem): boolean => {
    if (pkt.destPort === 443) return allowWeb443;
    if (pkt.destPort === 22) return allowSsh22;
    if (pkt.destPort === 3306) return allowDb3306;
    return false; // Default Deny
  };

  const handleStartInspection = (pkt: PacketItem) => {
    setSelectedPacket(pkt);
    setInspectStage(1);

    // Animasi bergerak ke hasil evaluasi setelah 800ms
    setTimeout(() => {
      setInspectStage(2);
    }, 900);
  };

  const handleReset = () => {
    setInspectStage(0);
    setSelectedPacket(null);
  };

  const isAccepted = selectedPacket ? evaluatePacket(selectedPacket) : false;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik 01 • Mekanisme Penyaringan Paket Firewall
          </span>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Prinsip: Header Matching & Aturan Default Deny
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Firewall bekerja sebagai pos pemeriksaan yang membaca label setiap paket data (Alamat IP Pengirim dan
        Nomor Port Tujuan). Paket dicocokkan dengan Buku Aturan Keamanan (ACL). Jika diizinkan (ACCEPT), paket
        diteruskan ke server. Jika dilarang (DROP), paket langsung dibuang ke keranjang sampah tanpa membebani server target.
      </p>

      {/* 1. Panel Aturan Keamanan Firewall (ACL Table) */}
      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] mb-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-zinc-300" />
            <h4 className="text-xs font-semibold text-white">
              Tabel Aturan Firewall Aktif (Access Control List):
            </h4>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            Kebijakan Default: SEMUA DITOLAK KECUALI DIIZINKAN
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          {/* Rule 1: Port 443 */}
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 flex items-center justify-between">
            <div>
              <span className="font-mono font-semibold text-white text-[11px] block">Port 443 (HTTPS)</span>
              <span className="text-[10px] text-zinc-400">Layanan Web SIAKAD</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ACCEPT
            </span>
          </div>

          {/* Rule 2: Port 22 */}
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 flex items-center justify-between">
            <div>
              <span className="font-mono font-semibold text-white text-[11px] block">Port 22 (SSH)</span>
              <span className="text-[10px] text-zinc-400">Remote Terminal</span>
            </div>
            <button
              onClick={() => {
                setAllowSsh22(!allowSsh22);
                if (inspectStage !== 0) handleReset();
              }}
              title="Klik untuk mengubah aturan"
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-all ${
                allowSsh22
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
              }`}
            >
              {allowSsh22 ? 'ACCEPT (Rawan!)' : 'DROP (Aman)'}
            </button>
          </div>

          {/* Rule 3: Port 3306 */}
          <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/5 flex items-center justify-between">
            <div>
              <span className="font-mono font-semibold text-white text-[11px] block">Port 3306 (MySQL)</span>
              <span className="text-[10px] text-zinc-400">Basis Data Nilai</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              DROP (Terkunci)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Visualisasi Pipeline 3 Tahap Pemeriksaan Paket */}
      <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-white/[0.08] mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* Kolom 1: Pengirim Paket (Internet) */}
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.06] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">1. Asal Paket (Internet)</span>
                <Globe className="h-4 w-4 text-zinc-400" />
              </div>

              {selectedPacket ? (
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/10 space-y-1.5 font-mono text-[11px]">
                  <span className="text-zinc-400 block text-[10px] uppercase">Pengirim:</span>
                  <div className="text-white font-semibold">{selectedPacket.sourceLabel}</div>
                  <div className="text-zinc-400 text-[10px]">IP: {selectedPacket.sourceIp}</div>
                  <div className="text-amber-300 text-[10px] pt-1 border-t border-white/5">
                    Target Port: {selectedPacket.destPort} ({selectedPacket.service})
                  </div>
                </div>
              ) : (
                <div className="h-24 flex items-center justify-center text-center text-[11px] font-mono text-zinc-600 border border-dashed border-white/10 rounded-lg">
                  Pilih salah satu paket pengujian di bawah
                </div>
              )}
            </div>

            <span className="text-[10px] font-mono text-zinc-500 text-center block">
              Paket membawa label alamat IP & nomor port
            </span>
          </div>

          {/* Kolom 2: Ruang Pemeriksaan Sensor Firewall */}
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.08] flex flex-col justify-between space-y-3 relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-200">2. Pos Inspeksi Firewall</span>
                <Search className={`h-4 w-4 ${inspectStage === 1 ? 'text-amber-400 animate-spin' : 'text-zinc-500'}`} />
              </div>

              <div className="h-24 p-2.5 rounded-lg bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center">
                {inspectStage === 0 && (
                  <span className="text-[11px] font-mono text-zinc-600">Menunggu paket tiba...</span>
                )}
                {inspectStage === 1 && (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-1">
                    <span className="text-[11px] font-mono text-amber-300 font-semibold block animate-pulse">
                      MEMINDAI HEADER PAKET...
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 block">
                      Memeriksa Port {selectedPacket?.destPort} di Tabel ACL
                    </span>
                  </motion.div>
                )}
                {inspectStage === 2 && (
                  <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="space-y-1">
                    <span
                      className={`text-xs font-mono font-bold block ${
                        isAccepted ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isAccepted ? 'KEPUTUSAN: [ACCEPT / LOLOS]' : 'KEPUTUSAN: [DROP / BLOKIR]'}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 block">
                      {isAccepted ? 'Aturan ACL mengizinkan akses' : 'Aturan ACL menolak paket ini'}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            <span className="text-[10px] font-mono text-zinc-500 text-center block">
              Sensor mencocokkan port target dengan aturan ACL
            </span>
          </div>

          {/* Kolom 3: Tujuan Akhir (Server vs Keranjang Sampah) */}
          <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.06] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">3. Dampak ke Server Kampus</span>
                {inspectStage === 2 && isAccepted ? (
                  <Server className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Trash2 className="h-4 w-4 text-zinc-500" />
                )}
              </div>

              <div className="h-24 p-2.5 rounded-lg bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center">
                {inspectStage < 2 ? (
                  <span className="text-[11px] font-mono text-zinc-600">Menunggu keputusan firewall</span>
                ) : isAccepted ? (
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-emerald-400 block">
                      Paket Diterima Server!
                    </span>
                    <span className="text-[10px] text-zinc-300 leading-snug block">
                      Server kampus memproses permintaan dan mengirim respons 200 OK.
                    </span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-rose-400 block">
                      Paket Dibuang (Dropped)!
                    </span>
                    <span className="text-[10px] text-zinc-400 leading-snug block">
                      Paket berbahaya dieliminasi di gerbang. Server kampus tetap aman 100%!
                    </span>
                  </div>
                )}
              </div>
            </div>

            <span className="text-[10px] font-mono text-zinc-500 text-center block">
              Server terlindungi dari paket yang tidak berizin
            </span>
          </div>
        </div>
      </div>

      {/* 3. Tombol Pilihan Paket Pengujian */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-zinc-400 block">
            Pilih Paket Data untuk Diuji Melalui Firewall:
          </span>
          {inspectStage !== 0 && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset Uji Paket</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {packets.map((pkt) => (
            <button
              key={pkt.id}
              onClick={() => handleStartInspection(pkt)}
              disabled={inspectStage === 1}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                selectedPacket?.id === pkt.id
                  ? 'bg-white/[0.08] border-white/30 shadow-sm'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white block">{pkt.sourceLabel}</span>
                  <span className="text-[9px] font-mono text-zinc-400">Port {pkt.destPort}</span>
                </div>
                <span className="text-[11px] text-zinc-400 block leading-relaxed">
                  {pkt.explanation}
                </span>
              </div>

              <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span>Kirim Paket Ini</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
