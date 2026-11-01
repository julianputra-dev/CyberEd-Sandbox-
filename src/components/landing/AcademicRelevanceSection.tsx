'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  GraduationCap,
  ShieldCheck,
  School,
  FileKey,
  Code2,
  Lightbulb,
} from 'lucide-react';

export const AcademicRelevanceSection: React.FC = () => {
  const relevancePoints = [
    {
      icon: School,
      title: 'Tanggung Jawab Pengelolaan Infrastruktur Sekolah & Kampus',
      badge: 'Peran Guru & Teknisi IT',
      badgeColor: 'default' as const,
      description:
        'Lulusan Pendidikan Teknik Informatika sering kali dipercaya memimpin laboratorium komputer sekolah, mengelola jaringan internet edukasi, dan mengawasi portal ujian berbasis komputer (CBT). Pemahaman segmentasi firewall dan manajemen risiko melindungi sekolah dari kebocoran soal dan serangan ransomware.',
    },
    {
      icon: FileKey,
      title: 'Kepatuhan Regulasi Perlindungan Data Pribadi (UU PDP)',
      badge: 'Etika & Privasi Data',
      badgeColor: 'default' as const,
      description:
        'Sistem informasi akademik menyimpan data sensitif: Nomor Induk Kependudukan (NIK), rekam jejak nilai, dan riwayat keluarga siswa. Mahasiswa dibekali kesadaran bahwa prinsip CIA Triad bukan sekadar teori ujian, melainkan fondasi hukum dan etika moral rekayasa sistem.',
    },
    {
      icon: Code2,
      title: 'Paradigma Pengembangan Secure by Design',
      badge: 'Rekayasa Perangkat Lunak',
      badgeColor: 'default' as const,
      description:
        'Keamanan bukan lagi fitur tempelan yang ditambahkan setelah aplikasi selesai dibangun. Mahasiswa dilatih mengadopsi validasi input yang ketat, penggunaan prepared statement, dan prinsip Least Privilege sejak baris pertama kode ditulis.',
    },
    {
      icon: Lightbulb,
      title: 'Kecakapan Didaktik: Mentransfer Konsep Abstrak ke Siswa',
      badge: 'Kompetensi PTI',
      badgeColor: 'default' as const,
      description:
        'Sebagai calon pendidik teknologi, mahasiswa PTI dituntut mampu menjelaskan materi rumit seperti enkripsi asimetris dan steganografi LSB kepada calon murid sekolah menengah (SMK/SMA) melalui analogi nyata dan visualisasi mnemonik yang mudah dipahami.',
    },
  ];

  return (
    <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06] bg-[#050506] font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-7 sm:mb-8 gap-4">
          <div className="max-w-2xl">
            <Badge variant="default" dot className="mb-2">
              Konteks Kurikulum & Relevansi Akademik
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
              Mengapa Keamanan Siber Sangat Krusial bagi Mahasiswa PTI & TI?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Di era transformasi digital pendidikan, insinyur informatika dan calon pendidik teknologi adalah garda terdepan integritas informasi masyarakat.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-300">
              <GraduationCap className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-mono">
                Capaian Pembelajaran
              </div>
              <div className="text-xs font-semibold text-white tracking-tight">
                Standar Kurikulum Nasional TIK
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
          {relevancePoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card
                key={index}
                glowEffect
                glowColor="neutral"
                className="flex flex-col justify-between"
              >
                <CardHeader className="p-4 sm:p-5 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={point.badgeColor} dot>
                      {point.badge}
                    </Badge>
                    <div className="p-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-zinc-300">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </div>
                  </div>
                  <CardTitle className="text-sm sm:text-base text-white font-medium">
                    {point.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-400 leading-relaxed mt-1.5 font-sans">
                    {point.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 pt-0">
                  <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 border-t border-white/[0.04] pt-2">
                    <ShieldCheck className="h-3 w-3 text-zinc-500" strokeWidth={1.75} />
                    <span>KOMPETENSI LULUSAN BIDANG TIK</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
