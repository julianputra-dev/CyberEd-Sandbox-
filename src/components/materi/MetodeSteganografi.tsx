'use client';

import React from 'react';
import { Layers, Binary, Cpu, FileCode2, AlignLeft } from 'lucide-react';

export const MetodeSteganografi: React.FC = () => {
  const methods = [
    {
      number: '01',
      title: 'Domain Spasial (Spatial Domain)',
      icon: Binary,
      example: 'Contoh: LSB (Piksel RGB)',
      description:
        'Menyisipkan data dengan mengubah langsung nilai bit warna pada piksel gambar (seperti mengganti bit paling kanan pada kanal warna RGB). Prosesnya sangat cepat dan kapasitas simpannya besar, namun rawan rusak jika foto dikompresi atau diunggah ke media sosial.',
    },
    {
      number: '02',
      title: 'Domain Transformasi (Transform Domain)',
      icon: Cpu,
      example: 'Contoh: DCT (JPEG) & DWT',
      description:
        'Gambar diubah ke domain frekuensi matematis sebelum pesan disisipkan ke dalam koefisien gelombangnya. Sangat tangguh dan tidak mudah rusak meskipun foto dikompresi, dipotong (crop), atau diubah warnanya, walau kapasitas simpan pesannya lebih sedikit.',
    },
    {
      number: '03',
      title: 'Injeksi Berkas & Metadata (File Injection)',
      icon: FileCode2,
      example: 'Contoh: EOF Padding & Tag EXIF',
      description:
        'Menyisipkan data di luar susunan piksel, misalnya menempelkan pesan di belakang penanda akhir berkas (End of File) atau mengisi bidang metadata kamera. Foto tetap terbuka normal karena aplikasi pembaca mengabaikan data tambahan tersebut.',
    },
    {
      number: '04',
      title: 'Steganografi Teks & Linguistik (Text Stego)',
      icon: AlignLeft,
      example: 'Contoh: Spasi & Zero-Width Char',
      description:
        'Menyembunyikan pesan di dalam dokumen tulisan tanpa mengubah arti kalimat yang dibaca manusia. Dilakukan dengan memanfaatkan spasi ganda di akhir baris, pemilihan sinonim kata, atau menyisipkan karakter Unicode tak kasat mata di antara huruf.',
    },
  ];

  return (
    <div className="space-y-4 my-6">
      <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
        <Layers className="h-4 w-4 text-zinc-300" />
        <h3 className="text-sm sm:text-base font-semibold text-white">
          Empat Metode Utama Steganografi Digital
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans text-justify">
        Dalam praktiknya, teknik penyembunyian steganografi digital terbagi ke dalam empat pendekatan utama berdasarkan lapisan media yang dimodifikasi:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {methods.map((m) => {
          const IconComp = m.icon;
          return (
            <div
              key={m.number}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between space-y-2.5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-zinc-400 bg-white/[0.06] px-2 py-0.5 rounded border border-white/10">
                      {m.number}
                    </span>
                    <IconComp className="h-3.5 w-3.5 text-zinc-300" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap bg-black/30 px-2 py-0.5 rounded border border-white/5">
                    {m.example}
                  </span>
                </div>

                <h4 className="text-xs font-semibold text-white leading-snug">
                  {m.title}
                </h4>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans text-justify">
                  {m.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
