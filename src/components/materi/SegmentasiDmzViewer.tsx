'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ShieldCheck,
  ShieldAlert,
  Server,
  Database,
  ArrowRight,
  AlertTriangle,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Flame,
} from 'lucide-react';
import { TooltipText } from '@/components/materi/TooltipText';

export const SegmentasiDmzViewer: React.FC = () => {
  // Skenario:
  // 'normal' = Trafik Mahasiswa Sah
  // 'hacked_dmz' = Web Server di DMZ Diretas, Namun Terkurung oleh Firewall Internal
  // 'flat_network' = Bahaya Jaringan Datar (Tanpa DMZ, Database Ikut Jebol)
  const [scenario, setScenario] = useState<'normal' | 'hacked_dmz' | 'flat_network'>('normal');

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik 03 • Visualisasi Arsitektur Zona DMZ
          </span>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Isolasi Ancaman & Pencegahan Lateral Movement
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Zona DMZ (*Demilitarized Zone*) adalah zona penyangga di antara internet publik dan jaringan internal inti.
        Tujuan utamanya adalah memastikan bahwa jika server publik (seperti Web Server SIAKAD) berhasil diretas,
        penyerang tetap terkurung di zona tersebut dan tidak dapat melompat ke server basis data nilai yang berada di jaringan internal.
      </p>

      {/* Selector Skenario Simulasi */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-white/[0.08] mb-5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setScenario('normal')}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            scenario === 'normal'
              ? 'bg-white text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          1. Akses Pengguna Sah (Normal)
        </button>
        <button
          onClick={() => setScenario('hacked_dmz')}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            scenario === 'hacked_dmz'
              ? 'bg-emerald-500 text-zinc-950 font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          2. Web di DMZ Diretas (Terisolasi Aman)
        </button>
        <button
          onClick={() => setScenario('flat_network')}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            scenario === 'flat_network'
              ? 'bg-rose-500 text-white font-semibold shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          3. Bencana Tanpa DMZ (Jaringan Datar)
        </button>
      </div>

      {/* Kanvas Interaktif Topologi Jaringan 3 Zona */}
      <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/[0.08] mb-5 space-y-4">
        {scenario !== 'flat_network' ? (
          /* TOPOLOGI BERTINGKAT DENGAN ZONA DMZ (ARSITEKTUR STANDAR AMAN) */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-center">
            {/* Zona 1: Internet Luar */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Zona 1: Luar</span>
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 mx-auto">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-white block">Internet Publik</span>
              <span className="text-[10px] font-mono text-zinc-500 block">
                {scenario === 'normal' ? 'Mahasiswa dari Rumah' : 'Peretas Menyerang'}
              </span>
            </div>

            {/* Gerbang 1: Firewall Eksternal */}
            <div className="p-3 rounded-lg bg-zinc-950 border border-white/10 text-center space-y-1">
              <ShieldCheck className="h-5 w-5 text-emerald-400 mx-auto" />
              <span className="text-[10px] font-mono font-semibold text-white block">Firewall 1 (Luar)</span>
              <span className="text-[9px] font-mono text-emerald-400 block">Hanya Port 80/443</span>
            </div>

            {/* Zona 2: DMZ (Web Server) */}
            <div
              className={`p-3.5 rounded-xl border text-center space-y-2 transition-all ${
                scenario === 'hacked_dmz'
                  ? 'bg-rose-950/20 border-rose-500/50 shadow-lg'
                  : 'bg-amber-950/20 border-amber-500/30'
              }`}
            >
              <span
                className={`text-[10px] font-mono uppercase block font-semibold ${
                  scenario === 'hacked_dmz' ? 'text-rose-400' : 'text-amber-400'
                }`}
              >
                Zona 2: DMZ Penyangga
              </span>
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center mx-auto ${
                  scenario === 'hacked_dmz'
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                }`}
              >
                <Server className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-white block">Web Server SIAKAD</span>
              <span
                className={`text-[10px] font-mono block ${
                  scenario === 'hacked_dmz' ? 'text-rose-300 font-bold' : 'text-amber-300'
                }`}
              >
                {scenario === 'hacked_dmz' ? 'TERKOMPROMI / DIRETAS' : 'Melayani Publik (Port 443)'}
              </span>
            </div>

            {/* Gerbang 2: Firewall Internal (BENTENG UTAMA DMZ) */}
            <div
              className={`p-3 rounded-lg border text-center space-y-1 transition-all ${
                scenario === 'hacked_dmz'
                  ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg'
                  : 'bg-zinc-950 border-white/10'
              }`}
            >
              <ShieldCheck
                className={`h-5 w-5 mx-auto ${
                  scenario === 'hacked_dmz' ? 'text-emerald-400 animate-bounce' : 'text-zinc-400'
                }`}
              />
              <span className="text-[10px] font-mono font-semibold text-white block">Firewall 2 (Dalam)</span>
              <span
                className={`text-[9px] font-mono block ${
                  scenario === 'hacked_dmz' ? 'text-emerald-300 font-bold' : 'text-zinc-400'
                }`}
              >
                {scenario === 'hacked_dmz' ? 'BLOKIR SERANGAN!' : 'Filter SQL Query Sah'}
              </span>
            </div>

            {/* Zona 3: Jaringan Internal (Database Nilai) */}
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">
                Zona 3: Jaringan Internal
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mx-auto">
                <Database className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-white block">Database Nilai Kampus</span>
              <span className="text-[10px] font-mono text-emerald-300 block font-bold">
                100% AMAN TERLINDUNGI
              </span>
            </div>
          </div>
        ) : (
          /* SKENARIO JARINGAN DATAR TANPA DMZ (BAHAYA!) */
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
              <AlertTriangle className="h-4 w-4" />
              <span>Arsitektur Rentan: Seluruh Server Diletakkan di Satu Subnet Datar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-lg bg-black/60 border border-rose-500/30 space-y-1">
                <Server className="h-6 w-6 text-rose-400 mx-auto" />
                <span className="text-xs font-semibold text-white block">Web Server Terbobol</span>
                <span className="text-[10px] font-mono text-rose-300 block">
                  Peretas menguasai web server kampus
                </span>
              </div>

              <div className="p-3 rounded-lg bg-black/60 border border-rose-500/30 space-y-1">
                <Database className="h-6 w-6 text-rose-400 mx-auto animate-pulse" />
                <span className="text-xs font-semibold text-white block">Database Ikut Terbobol!</span>
                <span className="text-[10px] font-mono text-rose-300 block">
                  Tanpa Firewall Internal, peretas langsung mencuri data nilai
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Kotak Analisis Mekanisme Pembelajaran */}
        <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/5 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            {scenario === 'flat_network' ? (
              <XCircle className="h-4 w-4 text-rose-400" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            )}
            <span>
              {scenario === 'normal' && 'Penjelasan Skenario 1: Alur Kerja Dua Firewall Standar'}
              {scenario === 'hacked_dmz' && 'Penjelasan Skenario 2: Mengapa Zona DMZ Menyelamatkan Kampus'}
              {scenario === 'flat_network' && 'Penjelasan Skenario 3: Bencana Keamanan Jaringan Datar'}
            </span>
          </div>

          <p className="text-zinc-300 leading-relaxed font-sans text-justify text-[11px]">
            {scenario === 'normal' &&
              'Pengguna dari internet hanya diizinkan berkomunikasi dengan Web Server di DMZ melalui Port 443. Web Server kemudian bertindak sebagai perantara yang sah untuk mengambil data nilai dari database internal melalui aturan Firewall Kedua yang sangat ketat.'}
            {scenario === 'hacked_dmz' &&
              'Ketika peretas berhasil mengeksploitasi kelemahan pada aplikasi Web SIAKAD, peretas hanya menguasai server di zona DMZ. Saat peretas mencoba melompat (lateral movement) untuk mencuri database nilai, Firewall Internal menolak koneksi asing tersebut. Data nilai mahasiswa tetap aman dan tidak bocor!'}
            {scenario === 'flat_network' &&
              'Pada jaringan datar (flat network), tidak ada batas pengaman antara server publik dan server database. Ketika web server berhasil diretas, peretas dapat langsung menjelajahi seluruh jaringan lokal dan mengunduh seluruh basis data nilai tanpa terdeteksi!'}
          </p>
        </div>
      </div>
    </div>
  );
};
