'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  KeyRound,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Clock,
  Copy,
  AlertTriangle,
  UserCheck,
  UserX,
} from 'lucide-react';

export const MnemonikMfa: React.FC = () => {
  // Mode login:
  // 'idle' = Belum ada sesi login (HP dalam keadaan siaga/standby)
  // 'user_login' = Pengguna sah sedang login (Password terisi, OTP muncul di HP, verifikasi aktif)
  // 'attacker_login' = Peretas mencoba masuk (Password bocor, OTP masuk ke HP korban, tapi tombol verifikasi TIDAK DIGUNAKAN)
  const [loginMode, setLoginMode] = useState<'idle' | 'user_login' | 'attacker_login'>('idle');

  // Status Verifikasi OTP pada login yang sah
  const [otpInput, setOtpInput] = useState<string>('');
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);

  // Nilai OTP Dinamis & Timer
  const [currentOtp, setCurrentOtp] = useState<string>('842915');
  const [otpTimer, setOtpTimer] = useState<number>(30);

  // Timer berjalan hanya saat ada sesi login yang aktif
  useEffect(() => {
    if (loginMode === 'idle') return;

    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
          setCurrentOtp(newCode);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loginMode]);

  // Handler Pengguna Sah Memulai Login
  const handleUserStartLogin = () => {
    setLoginMode('user_login');
    setIsOtpVerified(false);
    setOtpInput('');
    setOtpTimer(30);
  };

  // Handler Simulasi Peretas Memasuki Akun
  const handleAttackerStartLogin = () => {
    setLoginMode('attacker_login');
    setIsOtpVerified(false);
    setOtpInput('');
    setOtpTimer(30);
  };

  // Handler Verifikasi OTP oleh Pengguna Sah
  const handleVerifyOtp = () => {
    if (otpInput === currentOtp) {
      setIsOtpVerified(true);
    } else {
      setIsOtpVerified(false);
      alert('Kode OTP yang Anda masukkan salah!');
    }
  };

  const handleReset = () => {
    setLoginMode('idle');
    setIsOtpVerified(false);
    setOtpInput('');
  };

  const isPasswordEntered = loginMode === 'user_login' || loginMode === 'attacker_login';
  const isFullyUnlocked = loginMode === 'user_login' && isOtpVerified;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Mnemonik 02 • Mekanisme Brankas MFA
          </span>
        </div>
        <span className="text-xs text-zinc-400 font-mono">
          Faktor 1 (Password) + Faktor 2 (Kode OTP Ponsel)
        </span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify mb-5">
        Multi-Factor Authentication (MFA) memastikan bahwa kode verifikasi hanya akan dikirimkan ke ponsel
        saat proses login dimulai. Jika ada pihak asing yang mengetahui kata sandi Anda dan mencoba masuk,
        mereka akan tertahan total karena Anda tidak berencana login dan tidak akan memverifikasi permintaan tersebut.
      </p>

      {/* Grid Utama: Brankas Keamanan (Kiri) & Layar Smartphone (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Kolom Kiri: Visual Brankas Akun (7 Kolom) */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-black/60 border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-white">Status Akses Akun Pengguna</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-semibold ${
                  isFullyUnlocked
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : loginMode === 'attacker_login'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : isPasswordEntered
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {isFullyUnlocked
                  ? 'Akses Terbuka Penuh (100%)'
                  : loginMode === 'attacker_login'
                  ? 'Peretas Ditolak (Tertahan di Faktor 2)'
                  : isPasswordEntered
                  ? 'Menunggu Verifikasi OTP (50%)'
                  : 'Sistem Terkunci Siaga (0%)'}
              </span>
            </div>

            {/* Ilustrasi Brankas Baja */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex flex-col items-center justify-center min-h-[140px] text-center relative overflow-hidden">
              <motion.div
                animate={{
                  scale: isFullyUnlocked ? [1, 1.05, 1] : 1,
                  rotate: isFullyUnlocked ? 0 : isPasswordEntered ? 45 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-2 shadow-lg ${
                  isFullyUnlocked
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : loginMode === 'attacker_login'
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                    : isPasswordEntered
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : 'bg-zinc-900 border-white/10 text-zinc-500'
                }`}
              >
                {isFullyUnlocked ? (
                  <Unlock className="h-7 w-7" />
                ) : (
                  <Lock className="h-7 w-7" />
                )}
              </motion.div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-white block">
                  {isFullyUnlocked
                    ? 'Login Berhasil: Selamat Datang Pengguna Sah'
                    : loginMode === 'attacker_login'
                    ? 'Serangan Digagalkan: Akses Peretas Terblokir'
                    : isPasswordEntered
                    ? 'Password Benar: Menunggu Kode OTP dari Ponsel'
                    : 'Brankas Terkunci: Siaga Menunggu Percobaan Login'}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 block">
                  {isFullyUnlocked
                    ? 'Kedua faktor keamanan terverifikasi secara sah.'
                    : loginMode === 'attacker_login'
                    ? 'Peretas tahu password, tetapi tertahan karena tidak ada verifikasi OTP.'
                    : isPasswordEntered
                    ? 'Silakan masukkan kode OTP yang baru saja masuk ke layar ponsel.'
                    : 'Pilih skenario simulasi di bawah untuk memulai.'}
                </span>
              </div>
            </div>
          </div>

          {/* Indikator Status 2 Faktor */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Faktor 1 */}
            <div
              className={`p-2.5 rounded-lg border space-y-1 ${
                isPasswordEntered
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-white/[0.02] border-white/10 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[11px]">Faktor 1 (Password)</span>
                {isPasswordEntered ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <KeyRound className="h-3.5 w-3.5 text-zinc-500" />
                )}
              </div>
              <span className="text-[10px] font-mono text-zinc-400 block">
                {isPasswordEntered ? 'Password Valid Terisi' : 'Belum Diisi'}
              </span>
            </div>

            {/* Faktor 2 */}
            <div
              className={`p-2.5 rounded-lg border space-y-1 ${
                isOtpVerified
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : loginMode === 'attacker_login'
                  ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                  : 'bg-white/[0.02] border-white/10 text-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[11px]">Faktor 2 (Ponsel OTP)</span>
                {isOtpVerified ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                ) : loginMode === 'attacker_login' ? (
                  <XCircle className="h-3.5 w-3.5 text-rose-400" />
                ) : (
                  <Smartphone className="h-3.5 w-3.5 text-zinc-500" />
                )}
              </div>
              <span className="text-[10px] font-mono text-zinc-400 block">
                {isOtpVerified
                  ? 'Terverifikasi Sah'
                  : loginMode === 'attacker_login'
                  ? 'Tidak Diverifikasi (Ditolak)'
                  : 'Menunggu Permintaan'}
              </span>
            </div>
          </div>

          {/* Tombol Pilihan Skenario Eksperimen */}
          <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleUserStartLogin}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                loginMode === 'user_login'
                  ? 'bg-white/10 text-white border border-white/20'
                  : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm'
              }`}
            >
              1. Pengguna Sah: Mulai Login
            </button>

            <button
              onClick={handleAttackerStartLogin}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                loginMode === 'attacker_login'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20'
              }`}
            >
              2. Simulasi Serangan: Peretas Mencoba Masuk
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Simulator Layar Smartphone Pengguna Sah (5 Kolom) */}
        <div className="lg:col-span-5 p-4 rounded-xl bg-black/50 border border-white/[0.08] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-xs font-semibold text-white">Layar HP Pengguna Sah</span>
              </div>
              {loginMode !== 'idle' && (
                <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                  <Clock className="h-3 w-3 text-amber-400" />
                  <span>{otpTimer}s</span>
                </div>
              )}
            </div>

            {/* Tampilan Layar HP: Siaga vs Kode OTP Muncul */}
            {loginMode === 'idle' ? (
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2 text-center py-6">
                <Smartphone className="h-6 w-6 text-zinc-600 mx-auto" />
                <span className="text-xs font-semibold text-zinc-400 block">
                  Layar Ponsel dalam Status Siaga
                </span>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                  Kode OTP belum dimunculkan. Kode verifikasi hanya akan dibuat saat ada seseorang yang berencana login.
                </p>
              </div>
            ) : loginMode === 'user_login' ? (
              /* Skenario Pengguna Sah: OTP Muncul Normal */
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/10 space-y-2 text-center">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                  <span>Permintaan Login Sah</span>
                  <span>Google Authenticator</span>
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-widest bg-black/60 py-2 rounded-lg border border-white/5">
                  {currentOtp.slice(0, 3)} {currentOtp.slice(3)}
                </div>
                <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-1000"
                    style={{ width: `${(otpTimer / 30) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              /* Skenario Peretas: Notifikasi Peringatan Bahaya Masuk ke HP */
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-rose-400 uppercase font-semibold">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Peringatan Keamanan: Ada Upaya Login Asing!</span>
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-rose-300 tracking-widest bg-black/60 py-2 rounded-lg border border-rose-500/20">
                  {currentOtp.slice(0, 3)} {currentOtp.slice(3)}
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed font-sans text-justify pt-1">
                  Ponsel Anda menerima kode OTP ini karena peretas menebak password Anda. Karena Anda tidak berencana login, <strong>jangan gunakan tombol verifikasi!</strong>
                </p>
              </div>
            )}

            {/* Input & Kontrol Verifikasi */}
            {loginMode === 'user_login' && (
              <div className="mt-3 space-y-2">
                <label className="text-[10px] font-mono uppercase text-zinc-400 block">
                  Salin & Masukkan OTP ke Layar:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Ketik 6 digit OTP..."
                    className="w-full bg-zinc-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white text-center focus:outline-none focus:border-white/30"
                  />
                  <button
                    onClick={() => setOtpInput(currentOtp)}
                    title="Salin Cepat dari Layar HP"
                    className="py-1.5 px-2.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 text-xs shrink-0"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Area Tombol Verifikasi: Digunakan saat Pengguna Sah, TIDAK DIGUNAKAN saat Serangan */}
          <div className="space-y-2 pt-2 border-t border-white/[0.06]">
            {loginMode === 'user_login' ? (
              <button
                onClick={handleVerifyOtp}
                disabled={isOtpVerified || otpInput.length < 6}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  isOtpVerified
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : otpInput.length === 6
                    ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-sm'
                    : 'bg-white/10 text-zinc-500 cursor-not-allowed'
                }`}
              >
                {isOtpVerified ? 'Faktor 2 Berhasil Diverifikasi!' : '2. Verifikasi Kode OTP Saya'}
              </button>
            ) : loginMode === 'attacker_login' ? (
              /* Tombol Verifikasi Sesuai Instruksi User: TIDAK DIGUNAKAN */
              <div className="p-3 rounded-lg bg-zinc-950 border border-white/5 text-center space-y-1">
                <span className="text-[11px] font-mono font-semibold text-rose-400 block">
                  Tombol Verifikasi Tidak Digunakan
                </span>
                <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">
                  Pengguna yang sah tidak berencana login, sehingga menolak/mengabaikan permintaan ini. Peretas tidak dapat melanjutkan dan gagal menembus akun.
                </p>
              </div>
            ) : (
              <div className="py-2 px-3 rounded-lg bg-white/[0.02] border border-white/5 text-center text-xs font-mono text-zinc-600">
                Pilih skenario login terlebih dahulu
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reset Simulation Button */}
      {loginMode !== 'idle' && (
        <div className="flex justify-end pt-3 mt-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Reset Simulasi Brankas MFA</span>
          </button>
        </div>
      )}
    </div>
  );
};
