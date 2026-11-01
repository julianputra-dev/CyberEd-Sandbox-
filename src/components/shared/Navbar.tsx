'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgressStore, decodeId } from '@/store/useProgressStore';
import { MODULES_DATA } from '@/data/modulesData';
import { ProgressManager } from './ProgressManager';
import { Button } from '@/components/ui/Button';
import {
  Shield,
  BookOpen,
  FlaskConical,
  HardDrive,
  Menu,
  X,
  Terminal,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { completedTheoryHashes, completedLabHashes } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedTheoryCount = mounted
    ? MODULES_DATA.filter((m) =>
        completedTheoryHashes.some((h) => decodeId(h) === m.id)
      ).length
    : 0;

  const totalModules = MODULES_DATA.length;

  const navLinks = [
    { href: '/', label: 'Beranda', icon: Terminal },
    { href: '/materi', label: 'Materi Teori', icon: BookOpen },
    { href: '/laboratorium', label: 'Laboratorium', icon: FlaskConical },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#050506]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-2.5 transition-opacity">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.1] text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] group-hover:border-white/25 transition-colors">
              <Shield className="h-3.5 w-3.5 text-zinc-200" strokeWidth={1.75} />
            </div>
            <div className="flex items-center gap-1.5 font-sans">
              <span className="text-sm font-semibold tracking-tight text-white">
                CyberEd
              </span>
              <span className="text-[11px] font-mono tracking-tight text-zinc-400 border border-white/[0.08] bg-white/[0.02] px-1.5 py-0.2 rounded">
                sandbox
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] px-1.5 py-1 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-tight transition-all duration-200 font-sans ${
                    isActive
                      ? 'bg-white/[0.08] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] border border-white/[0.08]'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Live Progress Pill */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shrink-0" />
              <span className="text-zinc-400 text-[11px] font-sans">Progres:</span>
              <span className="font-mono text-xs font-medium text-zinc-200">
                {completedTheoryCount}/{totalModules}
              </span>
            </div>

            {/* Quick Backup/Restore trigger */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsDataModalOpen(true)}
              className="hidden sm:inline-flex text-xs h-7 px-2.5 rounded-lg"
              title="Pengelolaan Cadangan Data Lokal"
            >
              <HardDrive className="h-3.5 w-3.5 text-zinc-300" strokeWidth={1.75} />
              <span>Data Lokal</span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex md:hidden items-center justify-center rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.05] hover:text-white"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="border-b border-white/[0.08] bg-[#050506]/95 px-4 py-4 md:hidden backdrop-blur-2xl">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm font-medium tracking-tight font-sans transition-colors ${
                      isActive
                        ? 'bg-white/[0.08] text-white border border-white/[0.08]'
                        : 'text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-white/[0.06] mt-2 flex items-center justify-between font-sans">
                <span className="text-xs text-zinc-400">Progres Modul:</span>
                <span className="text-xs font-mono font-medium text-emerald-400">
                  {completedTheoryCount}/{totalModules} Modul Selesai
                </span>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDataModalOpen(true);
                }}
                className="w-full mt-2 justify-center"
              >
                <HardDrive className="h-3.5 w-3.5 text-zinc-300 mr-2" strokeWidth={1.75} />
                <span>Cadangan & Pemulihan JSON</span>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Modal Dialog for Data Backup & Restore */}
      {isDataModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/[0.1] bg-[#0a0a0d] shadow-2xl overflow-hidden glass-panel">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-zinc-300" strokeWidth={1.75} />
                <h3 className="text-sm font-semibold tracking-tight text-white font-sans">
                  Pengelolaan Data Progres Belajar
                </h3>
              </div>
              <button
                onClick={() => setIsDataModalOpen(false)}
                className="text-zinc-400 hover:text-white rounded-lg p-1 hover:bg-white/[0.05] transition-colors"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <ProgressManager inline />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-4 bg-white/[0.01] border-t border-white/[0.06]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDataModalOpen(false)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
