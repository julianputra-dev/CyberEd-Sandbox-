export type LabMode = 'PRAKTIKUM' | 'VISUALISASI TEKNIS';

export interface ModuleItem {
  id: string;
  order: number;
  title: string;
  tagline: string;
  description: string;
  category: string;
  labMode: LabMode;
  labTitle: string;
  labSummary: string;
  estimatedTime: string;
  badgeName: string;
  badgeIcon: string;
  accentColor: string;
  keyConcepts: string[];
}

export const MODULES_DATA: ModuleItem[] = [
  {
    id: 'modul-1',
    order: 1,
    title: 'Pengantar Keamanan Informasi & Manajemen Risiko',
    tagline: 'Pilar CIA Triad dan pemodelan mitigasi risiko aset digital kampus',
    description:
      'Memahami fondasi utama pertahanan sistem digital melalui prinsip Confidentiality, Integrity, dan Availability. Pelajari cara mengidentifikasi Aset, Ancaman, dan Kerentanan untuk menghitung matriks risiko nyata.',
    category: 'Fondasi Keamanan',
    labMode: 'PRAKTIKUM',
    labTitle: 'Pemodelan Ancaman & Matriks Risiko Kampus',
    labSummary:
      'Simulasi penempatan kontrol mitigasi keamanan pada Server Akademik, Database Nilai, dan Wi-Fi Publik untuk menurunkan skor risiko ke level Aman.',
    estimatedTime: '15 Menit',
    badgeName: 'Risk Sentinel',
    badgeIcon: 'ShieldCheck',
    accentColor: 'from-blue-500/20 to-indigo-500/20',
    keyConcepts: ['CIA Triad', 'Confidentiality', 'Integrity', 'Availability', 'Aset & Risiko'],
  },
  {
    id: 'modul-2',
    order: 2,
    title: 'Kriptografi & Steganografi (Penyembunyian Data)',
    tagline: 'Enkripsi sandi simetris/asimetris dan penyisipan bit rahasia LSB',
    description:
      'Membedakan seni menyembunyikan makna pesan (Kriptografi) dengan menyembunyikan keberadaan pesan (Steganografi). Eksplorasi Block Cipher dan manipulasi bit warna piksel gambar.',
    category: 'Kerahasiaan Data',
    labMode: 'VISUALISASI TEKNIS',
    labTitle: 'Bedah Pipeline Enkripsi & Steganografi LSB',
    labSummary:
      'Visualisasi pergeseran bit biner XOR Block Cipher dan zoom-in mikroskopis ke deretan bit warna RGB piksel gambar untuk mengamati injeksi Least Significant Bit.',
    estimatedTime: '20 Menit',
    badgeName: 'Cipher Master',
    badgeIcon: 'KeyRound',
    accentColor: 'from-cyan-500/20 to-teal-500/20',
    keyConcepts: ['Plaintext & Ciphertext', 'Symmetric & Asymmetric Key', 'Hashing', 'LSB Bit Injection'],
  },
  {
    id: 'modul-3',
    order: 3,
    title: 'Manajemen Identitas & Kontrol Akses (IAM)',
    tagline: 'Autentikasi, otorisasi RBAC, prinsip Least Privilege, dan MFA',
    description:
      'Mengapa password saja tidak cukup? Pahami perbedaan pembuktian identitas (Autentikasi) dan pemberian wewenang (Otorisasi) melalui matriks Role-Based Access Control dan Multi-Factor Authentication.',
    category: 'Akses & Identitas',
    labMode: 'PRAKTIKUM',
    labTitle: 'Audit & Perbaikan Kebocoran Hak Akses (Privilege Escalation)',
    labSummary:
      'Audit matriks hak akses RBAC sistem informasi rumah sakit, deteksi eskalasi izin berlebih pada akun magang, dan aktifkan proteksi MFA pada akun administrator.',
    estimatedTime: '15 Menit',
    badgeName: 'IAM Guardian',
    badgeIcon: 'Fingerprint',
    accentColor: 'from-violet-500/20 to-purple-500/20',
    keyConcepts: ['Autentikasi vs Otorisasi', 'RBAC Matrix', 'Least Privilege', 'Multi-Factor Auth'],
  },
  {
    id: 'modul-4',
    order: 4,
    title: 'Arsitektur & Keamanan Jaringan',
    tagline: 'Inspeksi paket, aturan filtering firewall, dan segmentasi zona DMZ',
    description:
      'Menelusuri jalan raya komunikasi digital: IP Address sebagai alamat gedung, Port sebagai nomor pintu, dan Firewall sebagai garda penjaga lalu lintas paket yang menyortir paket aman dan berbahaya.',
    category: 'Infrastruktur Jaringan',
    labMode: 'PRAKTIKUM',
    labTitle: 'Konfigurasi Aturan Firewall Topologi Node (React Flow)',
    labSummary:
      'Rancang aturan ACL Firewall (DROP/ACCEPT, IP Sumber, Port Target) pada topologi interaktif untuk memblokir serangan siber sembari meloloskan lalu lintas web sah.',
    estimatedTime: '20 Menit',
    badgeName: 'Bastion Defender',
    badgeIcon: 'Network',
    accentColor: 'from-indigo-500/20 to-blue-500/20',
    keyConcepts: ['IP & Port Protocol', 'Firewall ACL Rules', 'Packet Inspection', 'DMZ Segmentation'],
  },
  {
    id: 'modul-5',
    order: 5,
    title: 'Ancaman Siber & Analisis Malware',
    tagline: 'Rekayasa sosial, cangkang trojan, serta deteksi IoC dan penanganan insiden',
    description:
      'Membongkar taktik manipulasi psikologis (Phishing) dan cara kerja malware mematikan seperti Trojan RAT dan Ransomware. Kenali jejak Indicator of Compromise di memori dan koneksi jaringan.',
    category: 'Analisis Ancaman',
    labMode: 'PRAKTIKUM',
    labTitle: 'Deteksi & Penanganan Infeksi Remote Access Trojan (RAT)',
    labSummary:
      'Investigasi anomali proses memori svchost palsu, lakukan isolasi jaringan host, terminasi proses berbahaya, dan bersihkan artefak file malware hingga sistem pulih.',
    estimatedTime: '25 Menit',
    badgeName: 'Malware Hunter',
    badgeIcon: 'BugPlay',
    accentColor: 'from-rose-500/20 to-orange-500/20',
    keyConcepts: ['Social Engineering', 'Trojan / RAT', 'Memory Process Triage', 'Indicator of Compromise'],
  },
  {
    id: 'modul-6',
    order: 6,
    title: 'Keamanan Aplikasi & Web (OWASP Top 10)',
    tagline: 'Injeksi SQL, manipulasi XSS, serangan DDoS, serta pembajakan sesi',
    description:
      'Membedah celah keamanan aplikasi web: manipulasi logika SQL Injection, injeksi skrip XSS, banjir lalu lintas DDoS, serta teknik pembajakan dan fiksasi sesi pengguna.',
    category: 'Keamanan Perangkat Lunak',
    labMode: 'PRAKTIKUM',
    labTitle: 'Audit Celah Aplikasi Web & Penerapan Sanitasi',
    labSummary:
      'Inspeksi transmisi payload SQLi pada form login tiruan, uji mitigasi sanitasi teks komentar XSS, dan perbaiki kode backend virtual menggunakan Parameterized Queries.',
    estimatedTime: '30 Menit',
    badgeName: 'AppSec Engineer',
    badgeIcon: 'CodeXml',
    accentColor: 'from-amber-500/20 to-yellow-500/20',
    keyConcepts: ['OWASP Top 10', 'SQL Injection', 'Cross-Site Scripting (XSS)', 'DDoS Attacks', 'Session Manipulation'],
  },
  {
    id: 'modul-7',
    order: 7,
    title: 'Respons Insiden & Forensik Digital Dasar',
    tagline: 'Urutan volatilitas bukti digital dan rekonstruksi kronologi time-travel SIEM',
    description:
      'Tahapan terstruktur menghadapi krisis siber dari Deteksi, Containment, hingga Eradication. Pelajari hierarki Order of Volatility dan cara membaca stempel waktu log SIEM untuk rekonstruksi insiden.',
    category: 'Investigasi & Forensik',
    labMode: 'VISUALISASI TEKNIS',
    labTitle: 'Time-Travel Forensic Debugger (Rekonstruksi SIEM)',
    labSummary:
      'Eksplorasi timeline scrubber 5 titik snapshot waktu untuk mengamati perubahan RAM, proses sistem, topologi jaringan, dan log peristiwa SIEM secara sinkron saat insiden terjadi.',
    estimatedTime: '25 Menit',
    badgeName: 'Forensic Investigator',
    badgeIcon: 'SearchCode',
    accentColor: 'from-emerald-500/20 to-teal-500/20',
    keyConcepts: ['Incident Response Cycle', 'Order of Volatility', 'SIEM Event Log', 'Time-Travel Triage'],
  },
];
