'use client';

import React, { useState } from 'react';
import { Gauge, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const RiskMatrixDemo: React.FC = () => {
  const [threatLevel, setThreatLevel] = useState<number>(3); // 1-5
  const [vulnLevel, setVulnLevel] = useState<number>(3); // 1-5
  const [assetValue, setAssetValue] = useState<number>(4); // 1-5
  const [showRubric, setShowRubric] = useState<boolean>(false);
  const [activeRubricTab, setActiveRubricTab] = useState<'ancaman' | 'kerentanan' | 'aset'>('ancaman');

  const riskScore = threatLevel * vulnLevel * assetValue; // 1 to 125
  const maxScore = 125;
  const percentage = Math.round((riskScore / maxScore) * 100);

  const getRiskStatus = () => {
    if (percentage >= 65) {
      return {
        label: 'Risiko Kritis',
        color: 'text-rose-400',
        bg: 'bg-rose-500/[0.08] border-rose-500/30',
        bar: 'bg-rose-500',
        desc: 'Potensi kerugian sangat besar. Sistem membutuhkan tindakan pengamanan darurat sesegera mungkin guna mencegah terjadinya kerugian nyata.',
      };
    }
    if (percentage >= 35) {
      return {
        label: 'Risiko Sedang',
        color: 'text-amber-400',
        bg: 'bg-amber-500/[0.08] border-amber-500/30',
        bar: 'bg-amber-500',
        desc: 'Terdapat celah yang perlu diawasi secara berkala. Institusi disarankan menyusun jadwal perbaikan konfigurasi dan pembaruan sistem.',
      };
    }
    return {
      label: 'Risiko Terkendali',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/[0.08] border-emerald-500/30',
      bar: 'bg-emerald-500',
      desc: 'Pengamanan bekerja dengan baik. Kemungkinan terjadinya insiden berada dalam batas toleransi yang aman bagi operasional institusi.',
    };
  };

  const status = getRiskStatus();

  // Data Rubrik Pengukuran 1 sampai 5 Bahasa Alami
  const rubricData = {
    ancaman: [
      {
        level: 1,
        title: 'Sangat Jarang Terjadi',
        detail: 'Hampir tidak ada pihak luar yang berniat menyerang sistem karena nilai keuntungan yang didapatkan sangat kecil.',
      },
      {
        level: 2,
        title: 'Jarang Terjadi',
        detail: 'Percobaan serangan hanya pernah dilaporkan satu atau dua kali dalam kurun waktu beberapa tahun terakhir.',
      },
      {
        level: 3,
        title: 'Mungkin Terjadi',
        detail: 'Terdapat motivasi tertentu dari pengguna luar atau dalam, dan panduan untuk melakukan gangguan dapat ditemukan secara bebas.',
      },
      {
        level: 4,
        title: 'Sering Terjadi',
        detail: 'Sistem sering menerima percobaan pemindaian celah keamanan secara rutin dari internet setiap minggu.',
      },
      {
        level: 5,
        title: 'Hampir Pasti Terjadi',
        detail: 'Serangan otomatis dari jaringan internet datang tanpa henti setiap hari mencoba menebak kata sandi atau mencari jalur masuk terbuka.',
      },
    ],
    kerentanan: [
      {
        level: 1,
        title: 'Sangat Rendah',
        detail: 'Perangkat lunak selalu diperbarui tepat waktu, verifikasi masuk dua langkah telah aktif, dan hak akses dibatasi dengan sangat ketat.',
      },
      {
        level: 2,
        title: 'Rendah',
        detail: 'Hanya terdapat kelemahan kecil yang memerlukan akses fisik langsung ke komputer untuk dapat disalahgunakan.',
      },
      {
        level: 3,
        title: 'Sedang',
        detail: 'Pembaruan keamanan sistem terlambat beberapa bulan dan konfigurasi perangkat masih menggunakan pengaturan standar awal pabrik.',
      },
      {
        level: 4,
        title: 'Tinggi',
        detail: 'Sistem operasi atau aplikasi sudah tidak lagi didukung oleh pembuatnya dan celah keamanannya sudah diketahui oleh khalayak ramai.',
      },
      {
        level: 5,
        title: 'Kritis',
        detail: 'Pintu masuk basis data atau panel pengelola terbuka bebas ke internet umum tanpa memerlukan kata sandi yang memadai.',
      },
    ],
    aset: [
      {
        level: 1,
        title: 'Dapat Diabaikan',
        detail: 'Informasi pengumuman umum di papan buletin atau laman brosur promosi yang jika rusak dapat dibuat kembali dalam beberapa menit.',
      },
      {
        level: 2,
        title: 'Rendah',
        detail: 'Catatan kegiatan harian atau arsip dokumentasi lama yang tidak mengganggu kegiatan utama perkuliahan jika mengalami kerusakan.',
      },
      {
        level: 3,
        title: 'Sedang',
        detail: 'Server tempat mahasiswa mengumpulkan tugas praktikum mingguan yang jika terganggu akan merepotkan namun data utama tetap selamat.',
      },
      {
        level: 4,
        title: 'Tinggi',
        detail: 'Basis data transkrip nilai akademik dan riwayat pembayaran kuliah yang jika rusak akan menghentikan proses wisuda serta merusak reputasi kampus.',
      },
      {
        level: 5,
        title: 'Kritis dan Vital',
        detail: 'Pusat data induk seluruh data kependudukan civitas akademika dan catatan keuangan institusi yang kebocorannya membawa konsekuensi hukum pidana serta kerugian finansial besar.',
      },
    ],
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/[0.08] backdrop-blur-md p-5 sm:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] my-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold text-zinc-300 bg-white/[0.06] border border-white/[0.1] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Simulator Matriks Risiko
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">
          Rumus: Skor = Ancaman × Kerentanan × Nilai Aset
        </span>
      </div>

      {/* 3 Interactive Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-5">
        {/* Slider 1: Ancaman */}
        <div className="space-y-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-300 font-medium">Tingkat Ancaman</span>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/[0.06] text-white border border-white/10">
              Tingkat {threatLevel}/5
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={threatLevel}
            onChange={(e) => setThreatLevel(Number(e.target.value))}
            className="w-full accent-white cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />
          <div className="text-[11px] text-zinc-400 leading-snug">
            {rubricData.ancaman[threatLevel - 1].title}
          </div>
        </div>

        {/* Slider 2: Kerentanan */}
        <div className="space-y-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-300 font-medium">Tingkat Kerentanan</span>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/[0.06] text-white border border-white/10">
              Tingkat {vulnLevel}/5
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={vulnLevel}
            onChange={(e) => setVulnLevel(Number(e.target.value))}
            className="w-full accent-white cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />
          <div className="text-[11px] text-zinc-400 leading-snug">
            {rubricData.kerentanan[vulnLevel - 1].title}
          </div>
        </div>

        {/* Slider 3: Nilai Aset */}
        <div className="space-y-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-300 font-medium">Nilai Kepentingan Aset</span>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/[0.06] text-white border border-white/10">
              Tingkat {assetValue}/5
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={assetValue}
            onChange={(e) => setAssetValue(Number(e.target.value))}
            className="w-full accent-white cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />
          <div className="text-[11px] text-zinc-400 leading-snug">
            {rubricData.aset[assetValue - 1].title}
          </div>
        </div>
      </div>

      {/* Calculated Risk Outcome Box */}
      <div className={`p-4 rounded-xl border ${status.bg} transition-colors duration-300 mb-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Gauge className={`h-4 w-4 ${status.color}`} />
            <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
          </div>
          <span className="font-mono text-xs text-white">
            Skor Perhitungan: <strong className="text-sm font-bold">{riskScore}</strong> / {maxScore} ({percentage}%)
          </span>
        </div>

        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full ${status.bar} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-[11px] text-zinc-300 font-sans leading-relaxed text-justify">{status.desc}</p>
      </div>

      {/* Interactive Rubric Toggle (How to measure 1 to 5) */}
      <div className="border-t border-white/[0.06] pt-3">
        <button
          onClick={() => setShowRubric(!showRubric)}
          className="w-full flex items-center justify-between py-2 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <Info className="h-3.5 w-3.5 text-zinc-400" />
            Panduan Penentuan Nilai Skala 1 Sampai 5
          </span>
          {showRubric ? (
            <ChevronUp className="h-4 w-4 text-zinc-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          )}
        </button>

        {showRubric && (
          <div className="mt-3 p-4 rounded-xl bg-black/50 border border-white/[0.06] space-y-4">
            {/* Tabs for Ancaman, Kerentanan, Aset */}
            <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-2">
              <button
                onClick={() => setActiveRubricTab('ancaman')}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeRubricTab === 'ancaman'
                    ? 'bg-white text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                1. Tingkat Ancaman
              </button>
              <button
                onClick={() => setActiveRubricTab('kerentanan')}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeRubricTab === 'kerentanan'
                    ? 'bg-white text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                2. Tingkat Kerentanan
              </button>
              <button
                onClick={() => setActiveRubricTab('aset')}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${
                  activeRubricTab === 'aset'
                    ? 'bg-white text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                3. Nilai Kepentingan Aset
              </button>
            </div>

            {/* Rubric Table / Item List */}
            <div className="space-y-2">
              {rubricData[activeRubricTab].map((item) => (
                <div
                  key={item.level}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/[0.08] text-white shrink-0 self-start">
                    Tingkat {item.level}
                  </span>
                  <div className="flex-1">
                    <strong className="text-xs text-white block mb-0.5">{item.title}</strong>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans text-justify">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
