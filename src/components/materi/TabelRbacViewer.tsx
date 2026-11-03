'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Shield,
  Check,
  X,
  AlertCircle,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { TooltipText } from '@/components/materi/TooltipText';

interface PermissionMatrix {
  role: string;
  badgeColor: string;
  canViewOwn: boolean;
  canEditGrades: boolean;
  canApproveKrs: boolean;
  canDropDatabase: boolean;
}

export const TabelRbacViewer: React.FC = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);

  const matrix: PermissionMatrix[] = [
    {
      role: 'Mahasiswa',
      badgeColor: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
      canViewOwn: true,
      canEditGrades: false,
      canApproveKrs: false,
      canDropDatabase: false,
    },
    {
      role: 'Dosen Wali / Pengampu',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      canViewOwn: true,
      canEditGrades: true,
      canApproveKrs: true,
      canDropDatabase: false,
    },
    {
      role: 'Staf Administrasi (BAAK)',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      canViewOwn: true,
      canEditGrades: false,
      canApproveKrs: true,
      canDropDatabase: false,
    },
    {
      role: 'Administrator Sistem (TI)',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
      canViewOwn: true,
      canEditGrades: false,
      canApproveKrs: false,
      canDropDatabase: true,
    },
  ];

  const current = matrix[selectedRoleIndex];

  return (
    <div className="space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-zinc-300" />
          <h3 className="text-sm sm:text-base font-semibold text-white">
            Matriks Kontrol Akses Berbasis Peran (RBAC) & Prinsip Least Privilege
          </h3>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">Pola Hak Akses Kampus</span>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
        Dalam arsitektur perangkat lunak yang aman, hak akses tidak diberikan secara acak kepada individu,
        melainkan dipetakan ke dalam kelompok peran (<TooltipText term="RBAC" explanation="Role-Based Access Control: Metode pengaturan izin akses sistem berdasarkan jabatan atau fungsi kerja pengguna, bukan per individu.">RBAC</TooltipText>). Setiap peran hanya diberikan hak akses seminimal mungkin yang diperlukan untuk menuntaskan pekerjaannya, sesuai prinsip <TooltipText term="Least Privilege" explanation="Prinsip Hak Akses Terkecil: Konsep keamanan yang mengharuskan setiap pengguna hanya memiliki hak akses minimal mutlak yang dibutuhkan untuk menjalankan tugasnya.">Least Privilege</TooltipText>.
      </p>

      {/* Tabel Matriks Izin Akses */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-black/50">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02] text-zinc-400 font-mono text-[11px]">
              <th className="p-3">Peran Pengguna (Role)</th>
              <th className="p-3 text-center">Lihat Transkrip Sendiri</th>
              <th className="p-3 text-center">Entri & Edit Nilai</th>
              <th className="p-3 text-center">Persetujuan KRS</th>
              <th className="p-3 text-center">Kelola Basis Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {matrix.map((row, idx) => (
              <tr
                key={row.role}
                onClick={() => setSelectedRoleIndex(idx)}
                className={`cursor-pointer transition-colors ${
                  selectedRoleIndex === idx
                    ? 'bg-white/[0.08]'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                <td className="p-3">
                  <span
                    className={`inline-block font-mono text-[11px] px-2.5 py-0.5 rounded-full border ${row.badgeColor}`}
                  >
                    {row.role}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {row.canViewOwn ? (
                    <Check className="h-4 w-4 text-emerald-400 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-zinc-600 mx-auto" />
                  )}
                </td>
                <td className="p-3 text-center">
                  {row.canEditGrades ? (
                    <Check className="h-4 w-4 text-emerald-400 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-zinc-600 mx-auto" />
                  )}
                </td>
                <td className="p-3 text-center">
                  {row.canApproveKrs ? (
                    <Check className="h-4 w-4 text-emerald-400 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-zinc-600 mx-auto" />
                  )}
                </td>
                <td className="p-3 text-center">
                  {row.canDropDatabase ? (
                    <Check className="h-4 w-4 text-emerald-400 mx-auto" />
                  ) : (
                    <X className="h-4 w-4 text-zinc-600 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Panel Analisis Peran Terpilih */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white">
            Analisis Prinsip Hak Akses Terkecil: {current.role}
          </span>
          <span className="text-[10px] font-mono text-zinc-400">Klik baris tabel untuk ganti peran</span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
          {selectedRoleIndex === 0 &&
            'Mahasiswa hanya berhak membaca data transkrip milik pribadinya. Sistem dengan tegas melarang mahasiswa menginput nilai atau mengubah database untuk mencegah kecurangan akademik.'}
          {selectedRoleIndex === 1 &&
            'Dosen berhak memasukkan nilai dan menyetujui KRS bimbingan, namun tidak memiliki wewenang untuk merombak infrastruktur server database karena berada di luar tanggung jawab pengajaran.'}
          {selectedRoleIndex === 2 &&
            'Staf BAAK bertugas memvalidasi berkas administratif mahasiswa, sehingga berhak memproses KRS, tetapi tidak diperkenankan mengubah nilai murni yang diberikan oleh dosen.'}
          {selectedRoleIndex === 3 &&
            'Administrator memiliki kontrol infrastruktur teknis, namun sesuai prinsip pemisahan tugas (Separation of Duties), admin tidak berhak merekayasa nilai akademik mahasiswa secara sepihak.'}
        </p>
      </div>
    </div>
  );
};

