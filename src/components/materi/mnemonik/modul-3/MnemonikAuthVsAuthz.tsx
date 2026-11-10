'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  DoorClosed,
  DoorOpen,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  User,
  Building2,
  Server,
  FileSpreadsheet,
} from 'lucide-react';

interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  avatarBg: string;
  allowedRooms: number[]; // ID ruangan yang diizinkan
}

export const MnemonikAuthVsAuthz: React.FC = () => {
  // Profil Karakter yang dapat dipilih mahasiswa
  const characters: CharacterProfile[] = [
    {
      id: 'budi',
      name: 'Budi Santoso',
      role: 'Staf Administrasi Akademik',
      department: 'Fakultas Teknik',
      avatarBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      allowedRooms: [1, 2], // Boleh: Lobi, Ruang Akademik. Ditolak: Server
    },
    {
      id: 'siti',
      name: 'Siti Rahma',
      role: 'Mahasiswa S1 PTI',
      department: 'Jurusan Teknik Informatika',
      avatarBg: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
      allowedRooms: [1], // Hanya boleh: Lobi Informasi
    },
    {
      id: 'rian',
      name: 'Rian Prasetyo',
      role: 'Administrator Sistem Jaringan',
      department: 'Pusat Komputer & Data',
      avatarBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      allowedRooms: [1, 2, 3], // Boleh semua ruangan
    },
  ];

  const [selectedCharId, setSelectedCharId] = useState<string>('budi');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const activeChar = characters.find((c) => c.id === selectedCharId)!;

  const rooms = [
    {
      id: 1,
      name: 'Ruang 1: Lobi & Papan Pengumuman',
      desc: 'Area publik untuk seluruh civitas akademika.',
      icon: Building2,
      minRole: 'Terbuka untuk Umum & Mahasiswa',
    },
    {
      id: 2,
      name: 'Ruang 2: Administrasi & Entri Nilai',
      desc: 'Area pengolahan dokumen KRS dan transkrip nilai mahasiswa.',
      icon: FileSpreadsheet,
      minRole: 'Khusus Staf Administrasi & Dosen',
    },
    {
      id: 3,
      name: 'Ruang 3: Data Center & Server Basis Data',
      desc: 'Infrastruktur fisik server utama dan penyimpanan basis data kampus.',
      icon: Server,
      minRole: 'Khusus Super Admin Jaringan',
    },
  ];

  const handleLogin = (correct: boolean) => {
    if (correct) {
      setIsAuthenticated(true);
      setAuthError(false);
      setSelectedRoomId(null);
    } else {
      setIsAuthenticated(false);
      setAuthError(true);
      setSelectedRoomId(null);
    }
  };

  const handleReset = () => {
    setIsAuthenticated(false);
    setAuthError(false);
    setSelectedRoomId(null);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik 01 • Gedung Kampus Virtual
          </span>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Autentikasi (Siapa Anda?) vs Otorisasi (Izin Akses Anda?)
        </span>
      </div>

      {/* Pilihan Karakter Eksperimen */}
      <div className="mb-5 space-y-2">
        <label className="text-[11px] font-mono text-zinc-400 block uppercase tracking-wider">
          Pilih Karakter Pengguna:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {characters.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCharId(c.id);
                handleReset();
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedCharId === c.id
                  ? 'bg-white/[0.08] border-white/30 shadow-sm'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${c.avatarBg}`}
                >
                  <User className="h-4 w-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold text-white block truncate">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 block truncate font-mono">
                    {c.role}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TAHAP 1: GERBANG AUTENTIKASI (SIAPA ANDA?) */}
      <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] mb-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-zinc-300" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">
              Tahap 1: Gerbang Depan (Uji Autentikasi)
            </h4>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            Fokus: Membuktikan Kebenaran Identitas
          </span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
          Sebelum memeriksa ruangan mana yang boleh dimasuki, sistem wajib memastikan terlebih dahulu
          apakah orang ini benar-benar <strong className="text-white">{activeChar.name}</strong> dengan
          memeriksa kartu identitas atau kredensial kata sandinya.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-lg bg-zinc-950/80 border border-white/5">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isAuthenticated
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : authError
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-white/5 text-zinc-500 border border-white/10'
              }`}
            >
              {isAuthenticated ? (
                <Unlock className="h-4 w-4" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">
                {isAuthenticated
                  ? 'Terautentikasi (Identitas Valid)'
                  : authError
                  ? 'Gagal Autentikasi (Kredensial Ditolak)'
                  : 'Gerbang Terkunci (Menunggu Kredensial)'}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {isAuthenticated
                  ? `Sistem mengenali identitas: ${activeChar.name}`
                  : authError
                  ? 'Kata sandi salah. Orang ini tidak dikenal oleh sistem.'
                  : 'Silakan lakukan verifikasi kartu identitas.'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => handleLogin(true)}
                  className="w-full sm:w-auto py-1.5 px-3 rounded-lg bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-all shadow-sm"
                >
                  Masukkan Kredensial yang Benar
                </button>
                <button
                  onClick={() => handleLogin(false)}
                  className="w-full sm:w-auto py-1.5 px-2.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium text-xs hover:bg-rose-500/20 transition-all"
                >
                  Uji Sandi Palsu
                </button>
              </>
            ) : (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Kunci Ulang Gerbang</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TAHAP 2: PINTU-PINTU RUANGAN (UJI OTORISASI - APA YANG BOLEH DIAKSES?) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-zinc-300" />
            <h4 className="text-xs sm:text-sm font-semibold text-white">
              Tahap 2: Pintu Ruangan Gedung (Uji Otorisasi)
            </h4>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            Fokus: Memeriksa Izin Berdasarkan Peran
          </span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
          Setelah berhasil melewati gerbang autentikasi, {activeChar.name} ingin memasuki ruangan di bawah ini.
          Klik salah satu pintu ruangan untuk menguji apakah perannya ({activeChar.role}) memiliki hak akses:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {rooms.map((room) => {
            const IconComp = room.icon;
            const isAllowed = activeChar.allowedRooms.includes(room.id);
            const isInspecting = selectedRoomId === room.id;

            return (
              <div
                key={room.id}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                  isInspecting
                    ? isAllowed && isAuthenticated
                      ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                      : 'bg-rose-950/20 border-rose-500/40 shadow-sm'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300">
                      <IconComp className="h-4 w-4" />
                    </div>
                    {isInspecting && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          !isAuthenticated
                            ? 'bg-zinc-800 text-zinc-400'
                            : isAllowed
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {!isAuthenticated
                          ? 'Belum Login'
                          : isAllowed
                          ? 'Terotorisasi (200 OK)'
                          : 'Ditolak (403 Forbidden)'}
                      </span>
                    )}
                  </div>

                  <h5 className="text-xs font-semibold text-white leading-snug">
                    {room.name}
                  </h5>

                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {room.desc}
                  </p>

                  <div className="pt-1">
                    <span className="text-[10px] font-mono text-zinc-500 block">
                      Aturan Akses: {room.minRole}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <button
                    onClick={() => setSelectedRoomId(room.id)}
                    className="w-full py-1.5 px-2 rounded-lg text-xs font-medium bg-white/[0.06] hover:bg-white/10 text-zinc-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Coba Masuki Pintu Ini</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kotak Kesimpulan Hasil Uji Otorisasi */}
        {selectedRoomId !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border mt-3 ${
              !isAuthenticated
                ? 'bg-zinc-900 border-white/10'
                : activeChar.allowedRooms.includes(selectedRoomId)
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-rose-500/10 border-rose-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {!isAuthenticated ? (
                  <XCircle className="h-5 w-5 text-zinc-400" />
                ) : activeChar.allowedRooms.includes(selectedRoomId) ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <ShieldAlert className="h-5 w-5 text-rose-400" />
                )}
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-white block">
                  {!isAuthenticated
                    ? 'Autentikasi Diperlukan!'
                    : activeChar.allowedRooms.includes(selectedRoomId)
                    ? 'Akses Diberikan (Authorization Granted)'
                    : 'Akses Ditolak (403 Authorization Denied)'}
                </span>
                <p className="text-zinc-300 leading-relaxed font-sans text-justify">
                  {!isAuthenticated
                    ? `${activeChar.name} belum membuktikan identitasnya di gerbang depan (Tahap 1). Seseorang tidak dapat diotorisasi sebelum berhasil diautentikasi.`
                    : activeChar.allowedRooms.includes(selectedRoomId)
                    ? `Meskipun pintu terkunci bagi publik, sistem memeriksa tabel otorisasi peran (${activeChar.role}) dan mengizinkan ${activeChar.name} masuk karena sesuai dengan tanggung jawab pekerjaannya.`
                    : `Identitas ${activeChar.name} memang sah dan tervalidasi (Autentikasi Berhasil). Namun, perannya sebagai "${activeChar.role}" tidak memiliki izin otorisasi untuk mengakses fasilitas ini. Sistem keamanan menolak akses demi mencegah kebocoran data.`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

