export interface GlossaryEntry {
  term: string;
  category: string;
  definition: string;
  analogy: string;
}

export const GLOSSARY_TERMS: Record<string, GlossaryEntry> = {
  'cia triad': {
    term: 'CIA Triad',
    category: 'Prinsip Dasar',
    definition:
      'Model panduan standar keamanan informasi yang terdiri dari Confidentiality (Kerahasiaan), Integrity (Integritas), dan Availability (Ketersediaan).',
    analogy:
      'Ibarat buku harian berharga: hanya kamu yang boleh baca (C), isinya tidak boleh dirobek/diubah orang lain (I), dan buku itu harus selalu bisa kamu ambil saat dibutuhkan (A).',
  },
  confidentiality: {
    term: 'Confidentiality',
    category: 'Prinsip Dasar',
    definition:
      'Jaminan bahwa data hanya dapat diakses, dibaca, dan dimengerti oleh pihak yang memiliki hak wewenang sah.',
    analogy: 'Amplop surat bermaterai dan bersegel lilin yang tidak boleh dibuka kurir pengantar.',
  },
  integrity: {
    term: 'Integrity',
    category: 'Prinsip Dasar',
    definition:
      'Jaminan bahwa informasi tetap akurat, konsisten, dan tidak dimanipulasi oleh pihak tak berwenang selama transit maupun penyimpanan.',
    analogy: 'Stempel tanda tangan asli pada ijazah yang memastikan nilai tidak diganti sepihak.',
  },
  availability: {
    term: 'Availability',
    category: 'Prinsip Dasar',
    definition:
      'Jaminan bahwa sistem, jaringan, dan aplikasi selalu siap beroperasi dan dapat diakses oleh pengguna saat dibutuhkan.',
    analogy: 'Pintu gerbang kampus yang selalu terbuka bagi mahasiswa pada jam perkuliahan normal.',
  },
  asset: {
    term: 'Asset',
    category: 'Manajemen Risiko',
    definition:
      'Segala sesuatu bernilai tinggi bagi organisasi yang harus dilindungi (data, server, reputasi, kode sumber).',
    analogy: 'Barang berharga seperti emas, laptop kerja, atau sertifikat rumah.',
  },
  threat: {
    term: 'Threat (Ancaman)',
    category: 'Manajemen Risiko',
    definition:
      'Potensi peristiwa eksternal yang dapat mengeksploitasi kelemahan sistem dan menimbulkan kerugian finansial atau operasional.',
    analogy: 'Hujan badai, pencuri yang mengintai perumahan, atau gempa bumi.',
  },
  vulnerability: {
    term: 'Vulnerability (Kerentanan)',
    category: 'Manajemen Risiko',
    definition:
      'Kelemahan atau celah cacat di dalam desain, konfigurasi, atau implementasi sistem yang dapat ditembus.',
    analogy: 'Pintu rumah yang engselnya rusak atau lupa dikunci saat bepergian.',
  },
  risk: {
    term: 'Risk (Risiko)',
    category: 'Manajemen Risiko',
    definition:
      'Peluang terjadinya dampak negatif yang dihitung dari perkalian probabilitas ancaman dengan tingkat keparahan dampak (Risk = Threat × Vulnerability).',
    analogy: 'Peluang rumah kemalingan karena engsel pintu rusak di lingkungan rawan pencurian.',
  },
  steganography: {
    term: 'Steganografi',
    category: 'Kriptografi',
    definition:
      'Teknik menyembunyikan eksistensi atau keberadaan data rahasia di dalam media pengangkut lain tanpa menimbulkan kecurigaan.',
    analogy: 'Menulis pesan dengan tinta transparan lemon di balik kartu pos bergambar biasa.',
  },
  iam: {
    term: 'IAM (Identity and Access Management)',
    category: 'Akses',
    definition:
      'Kerangka kerja kebijakan dan teknologi yang memastikan orang yang tepat memiliki akses yang sesuai pada sumber daya sistem.',
    analogy: 'Sistem kartu identitas pintar (kartu akses) gedung kantor multi-lantai.',
  },
  rbac: {
    term: 'RBAC (Role-Based Access Control)',
    category: 'Akses',
    definition:
      'Mekanisme pembatasan akses sistem berdasarkan peran kerja pengguna (contoh: Dosen, Mahasiswa, Administrator).',
    analogy: 'Kunci master hanya untuk satpam, sementara mahasiswa hanya memegang kunci loker pribadi.',
  },
  firewall: {
    term: 'Firewall',
    category: 'Jaringan',
    definition:
      'Perangkat keamanan jaringan yang memonitor dan menyaring lalu lintas data masuk dan keluar berdasarkan aturan keamanan yang telah ditetapkan.',
    analogy: 'Satpam di gerbang perumahan yang memeriksa identitas tamu sebelum mengizinkan kendaraan masuk.',
  },
  phishing: {
    term: 'Phishing',
    category: 'Malware & Rekayasa Sosial',
    definition:
      'Bentuk rekayasa sosial di mana pelaku menyamar sebagai entitas tepercaya melalui pesan atau email palsu untuk mencuri data kredensial.',
    analogy: 'Umpan pancing palsu yang menipu ikan agar memakan kail berduri.',
  },
  'sql injection': {
    term: 'SQL Injection (SQLi)',
    category: 'Keamanan Web',
    definition:
      'Celah keamanan pada lapisan database yang memungkinkan penyerang menyisipkan perintah SQL berbahaya melalui input aplikasi.',
    analogy: 'Menyelipkan instruksi palsu di formulir izin masuk agar penjaga membebaskan seluruh tahanan.',
  },
  'digital forensics': {
    term: 'Digital Forensics',
    category: 'Forensik & Respons',
    definition:
      'Cabang ilmu forensik yang memulihkan, menginvestigasi, dan menganalisis materi bukti digital pada perangkat elektronik untuk pembuktian insiden.',
    analogy: 'Penyelidikan sidik jari dan rekaman CCTV oleh detektif polisi di tempat kejadian perkara (TKP).',
  },
};

