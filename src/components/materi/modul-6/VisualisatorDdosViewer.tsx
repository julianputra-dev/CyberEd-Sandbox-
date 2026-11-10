'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Users,
  Bot,
  AlertOctagon,
  Play,
  RotateCcw,
  ArrowRight,
  Globe,
  Activity,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Wifi,
  WifiOff,
} from 'lucide-react';

type TrafficLevel = 'normal' | 'busy' | 'ddos';

export const VisualisatorDdosViewer: React.FC = () => {
  const [trafficLevel, setTrafficLevel] = useState<TrafficLevel>('normal');
  const [mitigationActive, setMitigationActive] = useState<boolean>(false);
  const [isSimulatingBurst, setIsSimulatingBurst] = useState<boolean>(false);
  const [burstCounter, setBurstCounter] = useState<number>(0);

  // Dynamic parameters based on traffic and mitigation
  const isDdos = trafficLevel === 'ddos';
  const isBusy = trafficLevel === 'busy';
  const isNormal = trafficLevel === 'normal';

  const isServerDown = isDdos && !mitigationActive;
  const isServerStrained = isBusy && !mitigationActive;

  // CPU Load
  const cpuLoad = isNormal ? 15 : isBusy ? (mitigationActive ? 35 : 68) : mitigationActive ? 38 : 100;

  // Queue slots
  const queueUsed = isNormal ? '150 / 5.000' : isBusy ? (mitigationActive ? '1.200 / 5.000' : '3.800 / 5.000') : mitigationActive ? '850 / 5.000' : '5.000+ / 5.000 (PENUH)';

  // Response latency
  const latency = isNormal ? '28 ms' : isBusy ? (mitigationActive ? '45 ms' : '280 ms') : mitigationActive ? '55 ms' : 'TIME OUT (Tidak Ada Respon)';

  // Incoming rate
  const rateLabel = isNormal ? '100 req/detik' : isBusy ? '5.000 req/detik' : '50.000 req/detik';

  // Handle trigger burst button
  const handleTriggerBurst = () => {
    setIsSimulatingBurst(true);
    setBurstCounter((prev) => prev + 1);
    setTimeout(() => {
      setIsSimulatingBurst(false);
    }, 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div>
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Laboratorium Interaktif Ketersediaan Jaringan
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5 flex items-center gap-2">
            <span>Simulator Banjir Paket Data DDoS vs Mitigasi Cloud WAF</span>
          </h3>
        </div>

        {/* Toggle Mitigasi Cloud WAF */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400">Penyaring Gerbang Tepi:</span>
          <button
            onClick={() => setMitigationActive(!mitigationActive)}
            className={`text-xs px-3 py-1.5 rounded-xl border font-mono transition-all flex items-center gap-1.5 ${
              mitigationActive
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{mitigationActive ? 'Cloud WAF & Rate Limit: AKTIF' : 'Mitigasi WAF: NONAKTIF'}</span>
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Atur tingkat intensitas lalu lintas data di bawah ini untuk melihat perbandingan nyata bagaimana server merespons lalu lintas mahasiswa biasa dibandingkan dengan serangan pasukan komputer <em>botnet</em>:
      </p>

      {/* Pemicu Tingkat Intensitas Lalu Lintas (3 Level) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
        <button
          onClick={() => setTrafficLevel('normal')}
          className={`p-3 rounded-xl border text-left transition-all ${
            isNormal
              ? 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40 shadow-sm'
              : 'bg-zinc-950/70 border-white/[0.06] text-zinc-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold">1. Pengunjung Normal</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              100 req/dtk
            </span>
          </div>
          <span className="text-[10px] block text-zinc-400">
            Mahasiswa sah mengakses jadwal kuliah dan materi secara tertib.
          </span>
        </button>

        <button
          onClick={() => setTrafficLevel('busy')}
          className={`p-3 rounded-xl border text-left transition-all ${
            isBusy
              ? 'bg-amber-500/15 text-amber-200 border-amber-500/40 shadow-sm'
              : 'bg-zinc-950/70 border-white/[0.06] text-zinc-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold">2. Lonjakan Sibuk (KRS)</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
              5.000 req/dtk
            </span>
          </div>
          <span className="text-[10px] block text-zinc-400">
            Ribuan mahasiswa serempak berebut mata kuliah di menit pertama.
          </span>
        </button>

        <button
          onClick={() => setTrafficLevel('ddos')}
          className={`p-3 rounded-xl border text-left transition-all ${
            isDdos
              ? 'bg-rose-500/20 text-rose-200 border-rose-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
              : 'bg-zinc-950/70 border-white/[0.06] text-zinc-400 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-rose-400" />
              <span>3. Serangan DDoS Botnet</span>
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
              50.000 req/dtk
            </span>
          </div>
          <span className="text-[10px] block text-zinc-400">
            Puluhan ribu komputer zombie membanjiri server dengan paket palsu.
          </span>
        </button>
      </div>

      {/* PANGGUNG VISUALISASI ALIRAN PAKET DATA (PERBANDINGAN NYATA) */}
      <div className="p-4 rounded-2xl bg-black/80 border border-white/[0.08] space-y-4 mb-4">
        {/* Top Indicator Bar */}
        <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-zinc-300">Pipa Jalur Transmisi Lalu Lintas Jaringan</span>
          </div>
          <span className="text-zinc-400">
            Laju Masuk: <strong className="text-white">{rateLabel}</strong>
          </span>
        </div>

        {/* Diagram Aliran: Sumber -> Gerbang WAF -> Server Backend */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Kolom 1: Sumber Trafik (Span 4) */}
          <div
            className={`md:col-span-4 p-3.5 rounded-xl border transition-all space-y-2 ${
              isDdos
                ? 'bg-rose-950/30 border-rose-500/50'
                : isBusy
                ? 'bg-amber-950/20 border-amber-500/30'
                : 'bg-emerald-950/20 border-emerald-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                {isDdos ? (
                  <>
                    <Bot className="h-4 w-4 text-rose-400" />
                    <span>Pasukan Komputer Botnet</span>
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4 text-emerald-400" />
                    <span>Klien Pengguna Sah</span>
                  </>
                )}
              </span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isDdos
                    ? 'bg-rose-500/20 text-rose-300'
                    : isBusy
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {isDdos ? '50.000 Zombie' : isBusy ? '3.000 Mahasiswa' : '100 Mahasiswa'}
              </span>
            </div>

            {/* Visualisasi Partikel Paket Data */}
            <div className="p-2 rounded bg-black/60 border border-white/[0.04] space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>Aliran Paket Keluar:</span>
                <span className={isDdos ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                  {isDdos ? 'Banjir Massal' : 'Teratur'}
                </span>
              </div>
              <div className="h-5 flex items-center gap-1 overflow-hidden px-1">
                {Array.from({ length: isDdos ? 24 : isBusy ? 14 : 7 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ x: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: isDdos ? 0.3 : 1, delay: i * 0.05 }}
                    className={`h-2.5 rounded-full ${
                      isDdos
                        ? 'w-2 bg-rose-500'
                        : isBusy
                        ? 'w-2.5 bg-amber-400'
                        : 'w-3 bg-emerald-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 block">
              {isDdos
                ? 'Paket SYN/HTTP palsu ditembakkan secara beruntun'
                : 'Permintaan berkas kuliah normal'}
            </span>
          </div>

          {/* Kolom 2: Gerbang Tepi WAF / Scrubbing (Span 3) */}
          <div
            className={`md:col-span-3 p-3.5 rounded-xl border text-center transition-all space-y-2 ${
              mitigationActive
                ? 'bg-blue-950/40 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                : 'bg-zinc-950 border-white/[0.06] opacity-60'
            }`}
          >
            <ShieldCheck
              className={`h-5 w-5 mx-auto ${mitigationActive ? 'text-blue-400' : 'text-zinc-600'}`}
            />
            <div>
              <span className="text-xs font-semibold text-white block">Gerbang Cloud WAF</span>
              <span className="text-[10px] font-mono text-zinc-400">
                {mitigationActive ? 'Penyaring Tepi Aktif' : 'Tanpa Penyaring (Los)'}
              </span>
            </div>

            <div className="p-1 rounded bg-black/60 font-mono text-[10px]">
              {mitigationActive ? (
                isDdos ? (
                  <span className="text-blue-300 font-bold">49.800 DROP / DETIK</span>
                ) : (
                  <span className="text-emerald-400">Lalu Lintas Lolos Aman</span>
                )
              ) : (
                <span className="text-zinc-500">Seluruh Paket Menerobos</span>
              )}
            </div>
          </div>

          {/* Kolom 3: Server Utama Portal Kampus (Span 5) */}
          <div
            className={`md:col-span-5 p-3.5 rounded-xl border transition-all space-y-2.5 ${
              isServerDown
                ? 'bg-rose-950/40 border-rose-500/70 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                : isServerStrained
                ? 'bg-amber-950/30 border-amber-500/50'
                : 'bg-zinc-950 border-white/[0.06]'
            }`}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06] text-xs font-mono">
              <span className="flex items-center gap-1.5 text-zinc-200">
                <Server className="h-4 w-4 text-blue-400" />
                <span>Server Kampus</span>
              </span>
              <span
                className={`font-bold ${
                  isServerDown
                    ? 'text-rose-400 animate-pulse'
                    : isServerStrained
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {isServerDown
                  ? '503 SERVICE DOWN'
                  : isServerStrained
                  ? 'TERBEBANI BERAT'
                  : 'STATUS: 200 OK'}
              </span>
            </div>

            {/* Indikator Beban Kerja CPU & Memori */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-zinc-400">Beban CPU & RAM:</span>
                <span className={cpuLoad >= 90 ? 'text-rose-400 font-bold' : 'text-zinc-300'}>
                  {cpuLoad}% Terpakai
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  className={`h-full ${
                    cpuLoad >= 90
                      ? 'bg-rose-500'
                      : cpuLoad >= 60
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                  animate={{ width: `${cpuLoad}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Metrik Antrean & Nasib Mahasiswa */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="p-2 rounded bg-black/60 border border-white/[0.04]">
                <span className="text-zinc-500 block">Antrean Request</span>
                <span className={isServerDown ? 'text-rose-400 font-bold' : 'text-zinc-200'}>
                  {queueUsed}
                </span>
              </div>
              <div className="p-2 rounded bg-black/60 border border-white/[0.04]">
                <span className="text-zinc-500 block">Nasib Mahasiswa</span>
                <span
                  className={
                    isServerDown ? 'text-rose-400 font-bold' : 'text-emerald-400 font-semibold'
                  }
                >
                  {isServerDown ? 'Gagal Terhubung' : 'Lancar Mengakses'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pemicu Tombol Lonjakan Uji & Tombol Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/[0.06]">
          <button
            onClick={handleTriggerBurst}
            disabled={isSimulatingBurst}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>{isSimulatingBurst ? 'Mengirim Semburan Paket...' : 'Uji Semburan Paket Sekarang'}</span>
          </button>

          <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
            <span>Latensi Layanan:</span>
            <span
              className={`font-bold ${
                isServerDown ? 'text-rose-400' : isServerStrained ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {latency}
            </span>
          </div>
        </div>
      </div>

      {/* RANGKUMAN PENJELASAN ANALISIS (PERSISTEN & AKADEMIS) */}
      <div
        className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
          isServerDown
            ? 'bg-rose-950/20 border-rose-500/30 text-rose-200'
            : mitigationActive && isDdos
            ? 'bg-blue-950/20 border-blue-500/30 text-blue-200'
            : 'bg-zinc-950 border-white/[0.06] text-zinc-300'
        }`}
      >
        <div className="flex items-center gap-2 font-semibold text-white text-xs">
          <Activity className="h-4 w-4 text-amber-400" />
          <span>Hasil Observasi Keamanan Ketersediaan Sistem:</span>
        </div>

        {isNormal && (
          <p className="leading-relaxed text-justify text-zinc-300 text-[11px]">
            <strong>Kondisi Normal:</strong> Server beroperasi secara optimal pada beban CPU rendah (~15%). Jalur antrean memiliki ruang yang sangat luas sehingga setiap permintaan halaman web dijawab dalam waktu 28 milidetik.
          </p>
        )}

        {isBusy && !mitigationActive && (
          <p className="leading-relaxed text-justify text-amber-200 text-[11px]">
            <strong>Kondisi Beban Puncak (KRS):</strong> Lonjakan mahasiswa sah menyebabkan CPU naik ke ~68% dan latensi melambat menjadi 280 milidetik. Server masih sanggup melayani, tetapi pengguna mulai merasakan keterlambatan pemuatan halaman.
          </p>
        )}

        {isBusy && mitigationActive && (
          <p className="leading-relaxed text-justify text-blue-200 text-[11px]">
            <strong>Kondisi Beban Puncak dengan Caching WAF:</strong> Berkat CDN dan WAF di gerbang depan, berkas statis (gambar, stylesheet, script) disajikan dari server tepi (edge caching), menjaga beban server kampus tetap ringan di ~35%.
          </p>
        )}

        {isServerDown && (
          <div className="space-y-1.5 leading-relaxed text-justify text-[11px] text-rose-200">
            <p>
              <strong>BENCANA DDOS: SERVER LUMPUH TOTAL!</strong> Sebanyak 50.000 paket palsu per detik menghantam server tanpa penyaring. Pipa koneksi penuh, antrean memori meluap (Buffer Exhaustion), dan prosesor terkunci pada 100%.
            </p>
            <p className="text-zinc-400">
              Perhatikan bahwa <strong>tidak ada data yang dicuri dan tidak ada sandi yang dibobol</strong>. Namun, mahasiswa dan dosen asli sama sekali tidak bisa membuka portal nilai (Ketersediaan/Availability hancur total).
            </p>
          </div>
        )}

        {isDdos && mitigationActive && (
          <div className="space-y-1.5 leading-relaxed text-justify text-[11px] text-blue-200">
            <p>
              <strong>SERANGAN DDOS BERHASIL DITANGKAL OLEH CLOUD WAF:</strong> Sebanyak 49.800 paket sampah per detik disaring dan dibuang (dieliminasi) di gerbang tepi jaringan sebelum sempat mendekati server kampus.
            </p>
            <p className="text-zinc-400">
              Server utama kampus hanya menerima paket asli mahasiswa, menjaga CPU tetap tenang di ~38% dan portal kampus tetap dapat diakses dengan waktu respon 55 milidetik!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
