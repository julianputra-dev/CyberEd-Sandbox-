'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DoorClosed,
  DoorOpen,
  Lock,
  Unlock,
  Building,
  Globe,
  Terminal,
  Database,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Search,
} from 'lucide-react';

interface PortDoor {
  port: number;
  protocol: string;
  service: string;
  status: 'OPEN' | 'FILTERED' | 'CLOSED';
  description: string;
  icon: React.ElementType;
}

export const MnemonikPortAnalog: React.FC = () => {
  const [visitorRole, setVisitorRole] = useState<'student' | 'scanner'>('student');
  const [inspectedPort, setInspectedPort] = useState<number | null>(null);

  const doors: PortDoor[] = [
    {
      port: 80,
      protocol: 'HTTP',
      service: 'Web Layanan Kampus',
      status: 'OPEN',
      description: 'Pintu utama layanan web. Terbuka bebas untuk seluruh mahasiswa dan publik.',
      icon: Globe,
    },
    {
      port: 443,
      protocol: 'HTTPS',
      service: 'Web Terenkripsi (SIAKAD)',
      status: 'OPEN',
      description: 'Pintu web aman bersertifikat SSL/TLS. Terbuka untuk akses informasi akademik.',
      icon: Globe,
    },
    {
      port: 22,
      protocol: 'SSH',
      service: 'Remote Terminal Server',
      status: 'FILTERED',
      description: 'Pintu kontrol jarak jauh khusus administrator. Dilindungi firewall dari publik.',
      icon: Terminal,
    },
    {
      port: 3306,
      protocol: 'MySQL',
      service: 'Basis Data Nilai Pusat',
      status: 'CLOSED',
      description: 'Pintu basis data internal. Terkunci total dan dilarang diakses dari internet luar.',
      icon: Database,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik 02 • Analogi Gedung IP & Nomor Pintu Port
          </span>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          IP = Alamat Gedung • Port = Nomor Pintu Masuk
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Sebuah server komputer diibaratkan seperti gedung bertingkat dengan alamat jalan tetap (Alamat IP).
        Di dalam satu gedung yang sama, terdapat hingga 65.535 nomor pintu masuk (Port). Setiap nomor pintu
        didedikasikan untuk layanan yang spesifik. Prinsip keamanan jaringan adalah memastikan hanya pintu
        layanan publik yang terbuka, sementara pintu sensitif digembok rapat dari internet luar.
      </p>

      {/* Info Alamat Server Kampus */}
      <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.06] mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Building className="h-4 w-4 text-zinc-400" />
          <span className="text-zinc-300 font-mono">
            Alamat Gedung IP:{' '}
            <strong className="text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
              152.118.24.10 (Server Kampus)
            </strong>
          </span>
        </div>

        {/* Pilihan Peran Pengunjung */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-white/10">
          <button
            onClick={() => {
              setVisitorRole('student');
              setInspectedPort(null);
            }}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
              visitorRole === 'student'
                ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Mahasiswa Biasa
          </button>
          <button
            onClick={() => {
              setVisitorRole('scanner');
              setInspectedPort(null);
            }}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
              visitorRole === 'scanner'
                ? 'bg-rose-500 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Pemindai Port (Scanner)
          </button>
        </div>
      </div>

      {/* Grid 4 Pintu Port Layanan Server */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {doors.map((d) => {
          const IconComp = d.icon;
          const isInspected = inspectedPort === d.port;

          // Perilaku saat diketuk
          const isAllowedForVisitor =
            visitorRole === 'student' ? d.status === 'OPEN' : true;

          return (
            <div
              key={d.port}
              onClick={() => setInspectedPort(d.port)}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 cursor-pointer transition-all ${
                isInspected
                  ? d.status === 'OPEN'
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                    : d.status === 'FILTERED'
                    ? 'bg-amber-950/20 border-amber-500/40 shadow-sm'
                    : 'bg-rose-950/20 border-rose-500/40 shadow-sm'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/5">
                    <IconComp className="h-3 w-3" />
                    <span>Port {d.port}</span>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-semibold ${
                      d.status === 'OPEN'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : d.status === 'FILTERED'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>

                <h5 className="text-xs font-semibold text-white leading-snug">
                  {d.service} ({d.protocol})
                </h5>

                <p className="text-[11px] text-zinc-400 leading-relaxed mt-1 text-justify">
                  {d.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                <span className="text-zinc-500">
                  {d.status === 'OPEN' ? 'Pintu Terbuka' : 'Pintu Terkunci'}
                </span>
                <span className="text-zinc-400 underline decoration-dotted">Ketuk Pintu</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kotak Analisis Respon Pintu */}
      {inspectedPort !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white">
              Hasil Respon Pemeriksaan Pintu Port {inspectedPort}:
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              Peran: {visitorRole === 'student' ? 'Mahasiswa Kampus' : 'Pemindai Port'}
            </span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
            {inspectedPort === 80 || inspectedPort === 443 ? (
              <>
                <strong className="text-emerald-400">Port {inspectedPort} Berstatus OPEN (200 OK):</strong> Pintu ini sengaja dibuka oleh administrator kampus untuk melayani trafik web publik. Seluruh pengunjung baik mahasiswa maupun pemindai diperbolehkan masuk untuk melihat antarmuka portal SIAKAD.
              </>
            ) : inspectedPort === 22 ? (
              <>
                <strong className="text-amber-400">Port 22 Berstatus FILTERED (Firewall Active):</strong> Pintu remote SSH ini ditahan oleh aturan Firewall. Paket data dari IP publik luar kampus diabaikan (*DROP*) tanpa jawaban, sehingga pemindai tidak tahu apakah port ini aktif atau tidak.
              </>
            ) : (
              <>
                <strong className="text-rose-400">Port 3306 Berstatus CLOSED / BLOCKED:</strong> Basis data internal tidak boleh diekspos ke jaringan publik. Akses hanya diizinkan melalui jaringan lokal internal (*Loopback / Private Subnet*).
              </>
            )}
          </p>
        </motion.div>
      )}
    </div>
  );
};

