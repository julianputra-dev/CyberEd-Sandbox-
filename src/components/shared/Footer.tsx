import React from 'react';
import Link from 'next/link';
import { Shield, Terminal, BookOpen, FlaskConical, Lock, Cpu, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#050506] text-zinc-400 py-8 px-4 sm:px-6 lg:px-8 mt-auto font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Platform Identity */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-200">
                <Shield className="h-3.5 w-3.5" strokeWidth={1.75} />
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">
                CyberEd <span className="text-zinc-500 font-mono text-xs">sandbox</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
              Platform pembelajaran interaktif Keamanan Sistem Informasi untuk mahasiswa Teknik Informatika dan Pendidikan Teknik Informatika. Pendekatan isolasi client-side tanpa risiko merusak sistem operasi asli.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Badge variant="default" dot>
                Zero-Server (SSG)
              </Badge>
              <Badge variant="outline">Tanpa Autentikasi Server</Badge>
              <Badge variant="outline">Target: Mahasiswa PTI & TI</Badge>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 font-mono">
              Eksplorasi
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-400"
                >
                  <Terminal className="h-3 w-3 text-zinc-500" strokeWidth={1.75} />
                  <span>Pusat Orientasi</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/materi"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-400"
                >
                  <BookOpen className="h-3 w-3 text-zinc-500" strokeWidth={1.75} />
                  <span>Katalog 7 Modul Teori</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/laboratorium"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-400"
                >
                  <FlaskConical className="h-3 w-3 text-zinc-500" strokeWidth={1.75} />
                  <span>Laboratorium Sandbox</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Principles */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 font-mono">
              Standar Desain
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-zinc-500" strokeWidth={1.75} />
                <span>Zero-Friction (Semua Terbuka)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-zinc-500" strokeWidth={1.75} />
                <span>Animasi Mnemonik 60 FPS</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="h-3 w-3 text-zinc-500" strokeWidth={1.75} />
                <span>Mode Asesmen & Visualisasi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-zinc-500">
          <p className="text-[11px]">
            © {new Date().getFullYear()} CyberEd Sandbox. Dibuat untuk Keperluan Pendidikan & Riset Akademik.
          </p>
          <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-600">
            <span>LocalStorage Persistence</span>
            <span>•</span>
            <span>Strict Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
