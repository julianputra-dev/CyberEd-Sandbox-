import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: 'CyberEd Sandbox | Platform Pembelajaran Interaktif Keamanan Sistem Informasi',
  description:
    'Platform EdTech interaktif untuk mahasiswa S1 Teknik Informatika & Pendidikan Teknik Informatika. Dilengkapi visualisasi mnemonik, eksplorasi tanpa login, dan laboratorium simulasi keamanan siber.',
  keywords: [
    'Keamanan Sistem Informasi',
    'Cyber Security Education',
    'CyberEd Sandbox',
    'CIA Triad',
    'Kriptografi',
    'Firewall Simulation',
    'Malware Analysis',
    'PTI',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen bg-[#050506] text-[#ededed] antialiased flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
