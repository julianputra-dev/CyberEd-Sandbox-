'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Search,
  ShieldCheck,
  ShieldAlert,
  Server,
  Terminal,
  Folder,
  Hash,
  Eye,
  Crosshair,
} from 'lucide-react';

interface ProcessRow {
  pid: number;
  name: string;
  isMalicious: boolean;
  path: string;
  user: string;
  cpu: string;
  ram: string;
  networkSocket: string;
  hash: string;
}

const PROCESS_LIST: ProcessRow[] = [
  {
    pid: 840,
    name: 'svchost.exe',
    isMalicious: false,
    path: 'C:\\Windows\\System32\\svchost.exe',
    user: 'NT AUTHORITY\\SYSTEM',
    cpu: '0.2%',
    ram: '14.2 MB',
    networkSocket: 'Listening (Local RPC / UDP 137)',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    pid: 1120,
    name: 'explorer.exe',
    isMalicious: false,
    path: 'C:\\Windows\\explorer.exe',
    user: 'kampus-pc\\mahasiswa_pti',
    cpu: '1.4%',
    ram: '84.6 MB',
    networkSocket: 'None (Local GUI Shell)',
    hash: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
  },
  {
    pid: 4920,
    name: 'svch0st.exe',
    isMalicious: true,
    path: 'C:\\Users\\Mahasiswa\\AppData\\Local\\Temp\\svch0st.exe',
    user: 'kampus-pc\\mahasiswa_pti',
    cpu: '14.8%',
    ram: '38.5 MB',
    networkSocket: 'ESTABLISHED -> 198.51.100.88:443 (C2 Server)',
    hash: '7d5f812e9b3a4c10f8234857b61a99ef32746bcde09148723948abcf32910fed',
  },
];

export const TriaseProsesIocViewer: React.FC = () => {
  const [selectedPid, setSelectedPid] = useState<number>(4920);
  const [activeAnomalyTab, setActiveAnomalyTab] = useState<'name' | 'path' | 'socket' | 'user'>('name');

  const selectedProcess = PROCESS_LIST.find((p) => p.pid === selectedPid)!;

  const anomalyDetails = {
    name: {
      title: 'Anomali 1: Process Masquerading (Typo Nama File)',
      explanation:
        'Penyerang menamai file berbahaya dengan svch0st.exe (menggunakan angka nol "0", bukan huruf "o"). Di layar Task Manager biasa yang padat, mata manusia sering terkecoh menganggapnya sebagai proses sistem Windows asli.',
      forensicTip:
        'Selalu periksa ketepatan ejaan setiap karakter biner. Jangan hanya mengandalkan ingatan visual sekilas.',
    },
    path: {
      title: 'Anomali 2: Jalur Direktori Tidak Wajar (Abnormal Path)',
      explanation:
        'Seluruh proses resmi svchost.exe milik sistem operasi Windows WAJIB berjalan dari direktori C:\\Windows\\System32\\. Jika proses bernama svchost ditemukan berjalan dari folder sementara C:\\Users\\AppData\\Local\\Temp\\ atau C:\\ProgramData\\, itu adalah 100% berkas malware.',
      forensicTip:
        'Periksa atribut Image Path menggunakan utilitas forensik Sysinternals Process Explorer.',
    },
    socket: {
      title: 'Anomali 3: Sambungan Soket Jaringan Eksternal (C2 Socket)',
      explanation:
        'Proses Windows sah tidak membangun koneksi persisten ke alamat IP publik asing acak. svch0st palsu ini memiliki koneksi aktif (ESTABLISHED) ke 198.51.100.88:443 yang merupakan alamat server Command & Control penyerang.',
      forensicTip:
        'Gunakan perintah baris terminal netstat -ano atau perkakas TCPView untuk melihat nomor PID pemilik sambungan internet.',
    },
    user: {
      title: 'Anomali 4: Konteks Hak Akses Pengguna (Security Context)',
      explanation:
        'Proses svchost sistemik sejati berjalan di bawah akun sistem inti (NT AUTHORITY\\SYSTEM atau LOCAL SERVICE). Trojan penyamar ini berjalan di bawah akun pengguna lokal (kampus-pc\\mahasiswa_pti), karena dieksekusi melalui klik korban.',
      forensicTip:
        'Korelasikan antara hak pengguna (User Account) dengan jenis layanan yang sedang berjalan.',
    },
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div>
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Simulasi Triase Forensik Memori
          </span>
          <h3 className="text-sm sm:text-base font-semibold text-white mt-1.5">
            Mendeteksi Indikator Kompromi (IoC) & Penyamaran Proses
          </h3>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Task Manager vs Process Explorer
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Dalam analisis malware tingkat lanjut, analis keamanan tidak hanya mengandalkan nama aplikasi, melainkan membedah indikator kompromi (Indicator of Compromise / IoC) pada proses memori. Klik baris proses di bawah untuk menginspeksi rincian forensiknya:
      </p>

      {/* Tabel Proses Memori Interaktif */}
      <div className="rounded-xl border border-white/[0.08] overflow-hidden mb-5 bg-black/60 font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.04] border-b border-white/[0.08] text-[11px] text-zinc-400">
                <th className="py-2.5 px-3">PID</th>
                <th className="py-2.5 px-3">Nama Proses</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Pengguna (User)</th>
                <th className="py-2.5 px-3">CPU</th>
                <th className="py-2.5 px-3">Status Analisis</th>
              </tr>
            </thead>
            <tbody>
              {PROCESS_LIST.map((proc) => {
                const isSelected = selectedPid === proc.pid;
                return (
                  <tr
                    key={proc.pid}
                    onClick={() => setSelectedPid(proc.pid)}
                    className={`cursor-pointer transition-colors border-b border-white/[0.04] ${
                      isSelected
                        ? proc.isMalicious
                          ? 'bg-rose-950/30 text-rose-200'
                          : 'bg-white/10 text-white'
                        : 'hover:bg-white/[0.02] text-zinc-300'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-semibold">{proc.pid}</td>
                    <td className="py-2.5 px-3 flex items-center gap-1.5 font-bold">
                      {proc.name}
                      {proc.isMalicious && (
                        <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1 rounded border border-rose-500/30">
                          ANOMALI
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-zinc-400 text-[11px] hidden sm:table-cell">
                      {proc.user}
                    </td>
                    <td className="py-2.5 px-3">{proc.cpu}</td>
                    <td className="py-2.5 px-3">
                      {proc.isMalicious ? (
                        <span className="text-rose-400 flex items-center gap-1 text-[11px]">
                          <ShieldAlert className="h-3.5 w-3.5" /> Berbahaya (RAT)
                        </span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                          <ShieldCheck className="h-3.5 w-3.5" /> Proses Sah
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Panel Rincian Forensik Proses Terpilih */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-semibold text-white">
              Data Forensik: {selectedProcess.name} (PID: {selectedProcess.pid})
            </h4>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                selectedProcess.isMalicious
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {selectedProcess.isMalicious ? 'Indicator of Compromise (IoC) Terdeteksi' : 'Proses Sah Windows'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">
            RAM: {selectedProcess.ram}
          </span>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Lokasi Berkas di Disk:</span>
            <span
              className={
                selectedProcess.isMalicious ? 'text-rose-300 font-bold' : 'text-zinc-300'
              }
            >
              {selectedProcess.path}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Soket Jaringan Aktif:</span>
            <span
              className={
                selectedProcess.isMalicious ? 'text-amber-300 font-bold' : 'text-zinc-300'
              }
            >
              {selectedProcess.networkSocket}
            </span>
          </div>

          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">Sidik Jari Hash SHA-256:</span>
            <span className="text-zinc-400 text-[11px] break-all">{selectedProcess.hash}</span>
          </div>
        </div>
      </div>

      {/* 4 Titik Investigasi Anomali IoC */}
      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
            <Crosshair className="h-4 w-4 text-rose-400" />
            <span>4 Pilar Triase untuk Membongkar Penyamaran Malware:</span>
          </h4>
          <span className="text-[10px] font-mono text-zinc-400">Pilih titik untuk analisa</span>
        </div>

        {/* Tab Titik Anomali */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'name', label: '1. Ejaan Typo' },
            { id: 'path', label: '2. Folder Asing' },
            { id: 'socket', label: '3. Koneksi C2' },
            { id: 'user', label: '4. Hak Pengguna' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAnomalyTab(tab.id as any)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                activeAnomalyTab === tab.id
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-200 font-semibold'
                  : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Penjelasan Anomali (Bebas Asterisk) */}
        <div className="p-3.5 rounded-lg bg-zinc-950 border border-white/[0.06] space-y-2">
          <h5 className="text-xs font-semibold text-white">
            {anomalyDetails[activeAnomalyTab].title}
          </h5>
          <p className="text-xs text-zinc-300 leading-relaxed text-justify font-sans">
            {anomalyDetails[activeAnomalyTab].explanation}
          </p>
          <div className="pt-2 border-t border-white/[0.06] text-[11px] text-zinc-400">
            <strong className="text-emerald-400 font-mono">Tips Investigasi Forensik: </strong>
            {anomalyDetails[activeAnomalyTab].forensicTip}
          </div>
        </div>
      </div>
    </div>
  );
};
