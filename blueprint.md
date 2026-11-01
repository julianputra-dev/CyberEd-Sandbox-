# MASTER BLUEPRINT & DOKUMEN SPESIFIKASI SISTEM (PRD)
**Nama Proyek:** CyberEd Sandbox — Platform Pembelajaran Interaktif Keamanan Sistem Informasi  
**Target Pengguna:** Mahasiswa S1 Teknik Informatika / Pendidikan Teknik Informatika  
**Arsitektur Eksekusi:** 100% Client-Side Static Web Application (Zero-Server, Tanpa Database, Tanpa Login)  
**Tujuan Dokumen:** Referensi tunggal (*Single Source of Truth*) untuk pengembangan berbasis AI (*Vibe Coding*) agar asisten AI memahami konteks, batasan, kurikulum, alur kerja, dan struktur kode secara presisi tanpa berhalusinasi.

---

## 1. VISI, TUJUAN, DAN FILOSOFI PEDAGOGI

### 1.1 Masalah Utama yang Diselesaikan
1. **Tingginya Tingkat Abstraksi:** Materi Keamanan Sistem Informasi sering disajikan secara pasif (teks panjang atau slide statis) sehingga sulit dibayangkan oleh mahasiswa.
2. **Risiko Kerusakan Sistem:** Praktik langsung menggunakan sampel *malware* atau skrip eksploitasi asli berisiko merusak sistem operasi mahasiswa dan membutuhkan infrastruktur server/VM yang mahal.
3. **Tekanan Psikologis Belajar:** Platform yang mengunci materi secara kaku dan penuh istilah teknis asing sering membuat mahasiswa tertekan dan cepat bosan.

### 1.2 Filosofi Solusi (Prinsip Desain Utama)
1. **Zero-Friction Onboarding (Akses Instan Tanpa Login):** Mahasiswa langsung belajar sejak detik pertama halaman dibuka. Tidak ada halaman registrasi/login dan tidak ada database eksternal.
2. **Eksplorasi Terbuka & Santai (Non-Linear Progression):** Seluruh 7 modul pembelajaran **terbuka sejak awal** (tanpa gembok prasyarat). Mahasiswa bebas mempelajari topik mana saja sesuai kebutuhan mata kuliah dengan suasana santai. Penyelesaian modul diberikan penghargaan berupa Lencana Penyelesaian (*Badge*) dan efek visual konfeti.
3. **Anti-PPT / Pembelajaran Berbasis Animasi Mnemonik:** Dilarang menyajikan teks panjang yang pasif (maksimal 2 paragraf pendek per tampilan). Setiap konsep abstrak wajib didampingi **Animasi Mnemonik** (alat bantu ingat interaktif) yang merespons klik/geseran pengguna.
4. **Penyederhanaan Istilah (Auto-Tooltip / Glosarium Dinamis):** Setiap istilah teknis di dalam teks otomatis diberi garis bawah putus-putus dan menampilkan *pop-up tooltip* berisi penjelasan analogi bahasa sehari-hari saat kursor diarahkan (*hover*).
5. **Satu Modul Satu Mode Laboratorium:** Ruang laboratorium memisahkan secara tegas antara **Mode Praktikum (Asesmen)** untuk materi prosedural dan **Mode Visualisasi Teknis** untuk materi yang proses aslinya dikerjakan oleh CPU/sistem.

---

## 2. SPESIFIKASI TEKNOLOGI (TECH STACK) & DESAIN UI/UX

### 2.1 Tumpukan Teknologi (Tech Stack)
* **Framework Utama:** Next.js (App Router) dengan konfigurasi `output: 'export'` (Static Site Generation/SSG).
* **Bahasa Pemrograman:** TypeScript (Strict Mode).
* **Styling & Komponen UI:** Tailwind CSS, Shadcn UI, dan komponen bergaya Aceternity UI.
* **Mesin Animasi:** Framer Motion (untuk transisi halaman, *micro-interactions*, dan animasi mnemonik 60 FPS).
* **Mesin Visualisasi Topologi & Node:** React Flow / XYFlow (untuk simulasi jaringan, pohon proses malware, dan alur data).
* **State Management & Persistensi Lokal:** Zustand dengan `persist` middleware yang terhubung ke `localStorage` browser.
* **Ikon & Efek Tambahan:** `lucide-react` (ikon vektor) dan `canvas-confetti` (efek perayaan penyelesaian).

### 2.2 Standar Desain Antarmuka (UI/UX Design System)
* **Tema Visual:** *Dark Mode by Default* (latar belakang utama `#09090b` / `zinc-950`, permukaan kartu `zinc-900/60` dengan *backdrop-blur* / *glassmorphism* halus).
* **Referensi Desain Internasional:**
  * *Navigasi & Halaman Beranda:* Mengadopsi gaya **Linear.app** dan **Vercel** (Bento Grid layout, garis tepi tipis `1px` dengan efek *glow* saat di-*hover*, tipografi tajam menggunakan font `Inter` atau `Geist`).
  * *Halaman Teori & Animasi Mnemonik:* Mengadopsi gaya **Stripe Docs** dan **Codecademy** (lebar teks dibatasi maksimal `65ch` agar mata tidak lelah, ruang kosong yang lega, fokus pada kanvas interaktif di tengah/bawah teks).
  * *Halaman Laboratorium:* Mengadopsi gaya **Hack The Box Academy** dan **TryHackMe** (tata letak *Split-Screen*: 30% panel kiri untuk instruksi/log/penjelasan, 70% panel kanan untuk kanvas interaktif React Flow atau simulator).
* **Indikator Warna Semantik:**
  * Aman / Berhasil / Tervalidasi: Hijau Emerald (`#10b981`)
  * Peringatan / Dalam Proses / Rentan: Kuning Amber (`#f59e0b`)
  * Bahaya / Terinfeksi / Diblokir: Merah Rose (`#ef4444`)
  * Terisolasi / Nonaktif: Abu-abu Slate (`#64748b`)

---

## 3. ARSITEKTUR RUTE & HALAMAN (NEXT.JS APP ROUTER)

Aplikasi memiliki 3 pilar rute utama:

### 3.1 `/` — Halaman Beranda (Landing Page & Pusat Orientasi)
1. **Hero Section:** Judul platform, deskripsi singkat yang ramah mahasiswa, latar belakang visual interaktif ringan, serta dua tombol CTA utama: *"Mulai Belajar Materi"* (`/materi`) dan *"Masuk ke Laboratorium"* (`/laboratorium`).
2. **Seksi Pengantar Keamanan Informasi:** Penjelasan ringkas dan menarik mengenai pentingnya keamanan sistem informasi di dunia modern bagi mahasiswa IT.
3. **Seksi Orientasi & Fitur Platform:** Penjelasan mengapa web ini dibuat (aman tanpa risiko rusak sistem, tanpa perlu login, dilengkapi *Auto-Tooltip*, *Animasi Mnemonik*, dan *Sandbox Lab*).
4. **Panel Manajemen Profil Lokal (Backup & Restore):**
   * Menampilkan ringkasan progres (contoh: *"3 dari 7 Modul Selesai"*).
   * Tombol **"Simpan Progres (Unduh Backup)"**: Mengunduh file `progres-ksi.json` dari `localStorage`.
   * Tombol **"Muat Progres (Impor Backup)"**: Mengunggah file `.json` untuk memulihkan progres jika mahasiswa pindah komputer.
   * Tombol **"Reset Progres"**: Menghapus data lokal dengan konfirmasi.
5. **Peta Modul (Bento Grid):** Menampilkan 7 kartu modul yang **semuanya terbuka** dan dapat langsung diklik, lengkap dengan indikator Lencana Penyelesaian jika sudah tamat.

### 3.2 `/materi` dan `/materi/[moduleId]` — Ruang Teori Mnemonik
* **`/materi`:** Katalog seluruh 7 modul teori dengan estimasi waktu baca dan status penyelesaian.
* **`/materi/[moduleId]`:** Halaman pembelajaran teori interaktif.
  * Navigasi sub-materi yang bebas diakses (tidak mengunci tombol "Selanjutnya").
  * Teks pendek (maksimal 2 paragraf per seksi) yang terintegrasi dengan komponen `<GlossaryTerm>` (*Auto-Tooltip*).
  * Komponen **Animasi Mnemonik** interaktif tepat di bawah/samping teks untuk menanamkan ingatan visual.
  * Tombol pintasan langsung menuju `/laboratorium/[moduleId]` di bagian akhir materi.

### 3.3 `/laboratorium` dan `/laboratorium/[moduleId]` — Ruang Praktik & Visualisasi
* **Pembatasan Perangkat (Viewport Device Lock):** Pada rute `/laboratorium/[moduleId]`, gunakan deteksi viewport (`< 1024px` / di bawah breakpoint `lg` Tailwind). Jika dibuka di layar HP, sembunyikan kanvas simulasi dan tampilkan pesan ramah: *"Laboratorium Simulasi membutuhkan ruang kerja yang luas. Silakan buka halaman ini menggunakan Laptop atau Komputer Desktop untuk pengalaman terbaik."*
* **Arsitektur Factory Switcher:** Halaman `/laboratorium/[moduleId]` membaca konfigurasi `LAB_MAPPINGS` dan secara otomatis merender salah satu dari dua mesin berikut (tidak pernah keduanya sekaligus dalam satu modul):
  1. **`PraktikumEngine` (Mode Asesmen):** Digunakan untuk menguji pemahaman prosedural mahasiswa. Langkah-langkah instruksi ditampilkan sebagai petunjuk singkat, sementara **penjelasan teknis detail disembunyikan**. Setelah mahasiswa melakukan aksi yang tepat pada kanvas/UI dan tervalidasi oleh *State Evaluator*, barulah panel *Accordion* terbuka menampilkan penjelasan mendalam mengapa langkah tersebut benar, lalu membuka langkah berikutnya.
  2. **`VisualisasiEngine` (Mode Visualisasi Teknis):** Digunakan untuk membedah cara kerja sistem di balik layar. Tidak ada teka-teki tersembunyi; seluruh penjelasan teknis langsung terbuka dan tersinkronisasi dengan kontrol animasi (*Play/Pause/Step Slider* atau input parameter langsung dari mahasiswa).

---

## 4. SPESIFIKASI DETAIL 7 MODUL (TEORI, MNEMONIK, & LABORATORIUM)

Berikut adalah pemetaan lengkap konten yang wajib diimplementasikan untuk ketujuh modul:

---

### MODUL 1: Pengantar Keamanan Sistem Informasi & Manajemen Risiko
* **Istilah Auto-Tooltip:** *CIA Triad*, *Confidentiality*, *Integrity*, *Availability*, *Asset*, *Threat*, *Vulnerability*, *Risk*.
* **Poin Materi Teori (`/materi/modul-1`):**
  1. **Prinsip CIA Triad:** Kerahasiaan (hanya yang berhak yang bisa baca), Integritas (data utuh tidak diubah di tengah jalan), Ketersediaan (sistem selalu siap diakses saat dibutuhkan).
  2. **Manajemen Risiko Dasar:** Membedakan Aset (barang berharga), Ancaman/Threat (bahaya dari luar), Kerentanan/Vulnerability (celah dari dalam sistem), dan Risiko (dampak pertemuan ancaman dengan kerentanan).
* **Animasi Mnemonik Teori:**
  1. *Confidentiality:* Surat transparan yang terlihat isinya berubah menjadi brankas baja terkunci saat tombol "Enkripsi" ditekan.
  2. *Integrity:* Tampilan web toko buku kampus dengan harga `"Rp 50.000"`. Saat tombol *"Simulasikan Serangan Man-in-the-Middle"* diklik, terjadi efek *glitch* dan harga berubah menjadi `"Rp 9.999.000 (DIRETAS!)"`.
  3. *Availability:* Tampilan web normal yang berubah redup dengan ikon *loading spinner* berputar tanpa henti disertai indikator bar CPU Server yang melonjak ke angka `100% (Overload/Down)`.
* **Laboratorium (`/laboratorium/modul-1`):**
  * **Mode:** `PRAKTIKUM`
  * **Skenario:** *Pemodelan Ancaman & Matriks Risiko Kampus*. Mahasiswa menyeret (*drag-and-drop*) komponen ancaman dan kontrol keamanan ke atas aset kampus (Server Akademik, Database Nilai, Wi-Fi Publik). Setelah menempatkan kontrol mitigasi yang tepat sehingga skor risiko turun ke level Hijau (Aman), penjelasan teknis mengenai strategi mitigasi risiko muncul di setiap langkah.

---

### MODUL 2: Kriptografi dan Steganografi (Teknik Penyembunyian Data)
* **Istilah Auto-Tooltip:** *Plaintext*, *Ciphertext*, *Symmetric Key*, *Public Key*, *Private Key*, *Hashing*, *Steganography*, *Least Significant Bit (LSB)*.
* **Poin Materi Teori (`/materi/modul-2`):**
  1. **Pilar 1 — Kriptografi (Menyembunyikan Makna Pesan):** Kriptografi Simetris (satu kunci yang sama untuk mengunci dan membuka), Kriptografi Asimetris (Kunci Publik sebagai gembok terbuka yang bisa dibagikan, Kunci Privat sebagai anak kunci rahasia pemilik), dan Hashing (sidik jari digital satu arah untuk cek keaslian data).
  2. **Pilar 2 — Steganografi (Menyembunyikan Keberadaan Pesan):** Menyisipkan pesan rahasia ke dalam file media normal (gambar/audio) menggunakan teknik *Least Significant Bit* (LSB) sehingga perubahan warna piksel tidak terlihat mata manusia.
  3. **Pilar 3 — Kombinasi Dunia Nyata:** Mengenkripsi pesan terlebih dahulu (Kriptografi), lalu menyembunyikannya ke dalam gambar (Steganografi) untuk perlindungan ganda.
* **Animasi Mnemonik Teori:**
  1. *Kriptografi:* Mesin penghancur kertas ajaib yang mengubah dokumen utuh menjadi pita-pita kode acak (*Ciphertext*), dan hanya bisa disatukan kembali jika mahasiswa memasukkan ikon "Kunci Fisik" yang cocok.
  2. *Steganografi:* Gambar pemandangan gunung normal dengan tuas slider *"Aktifkan Filter Mata Detektif"*. Saat digeser, gambar berganti secara visual menjadi deretan matriks biner hijau dengan pesan rahasia yang menyala di tengahnya.
* **Laboratorium (`/laboratorium/modul-2`):**
  * **Mode:** `VISUALISASI TEKNIS`
  * **Skenario:** *Bedah Pipeline Enkripsi & Steganografi LSB*. Antarmuka eksplorasi terbuka dengan 2 tahap berurutan:
    * *Tahap 1 (Block Cipher):* Mahasiswa mengetik kata pendek, lalu menekan tombol langkah untuk melihat animasi bit biner bergeser dan di-XOR dengan kunci menjadi *Ciphertext*.
    * *Tahap 2 (Injeksi Piksel LSB):* *Ciphertext* tadi disisipkan ke gambar. Layar melakukan *zoom-in* ekstrem ke grid piksel gambar, menampilkan deretan bit warna RGB (misal `11010010`) di mana bit paling kanan berkedip dan berganti nilai sesuai bit pesan tanpa mengubah tampilan warna kotak piksel secara kasat mata. Seluruh penjelasan teknis tersaji lengkap di panel samping.

---

### MODUL 3: Manajemen Identitas dan Akses (IAM)
* **Istilah Auto-Tooltip:** *Authentication*, *Authorization*, *IAM*, *RBAC (Role-Based Access Control)*, *Least Privilege*, *MFA (Multi-Factor Authentication)*, *JWT*.
* **Poin Materi Teori (`/materi/modul-3`):**
  1. **Autentikasi vs Otorisasi:** Autentikasi membuktikan *"Siapa Anda?"* (ibarat cek KTP di gerbang), sedangkan Otorisasi menentukan *"Apa yang boleh Anda lakukan/masuki?"* (ibarat cek tiket VIP di dalam gedung).
  2. **Role-Based Access Control (RBAC):** Pengaturan izin berdasarkan jabatan/peran (Dosen, Mahasiswa, Admin) dengan prinsip *Least Privilege* (hanya memberi akses seperlunya sesuai tugas).
  3. **Multi-Factor Authentication (MFA):** Keamanan berlapis menggabungkan minimal dua faktor: sesuatu yang diketahui (Password) + sesuatu yang dimiliki (Kode OTP di HP) / biometrik.
* **Animasi Mnemonik Teori:**
  1. *Gedung Kantor Virtual:* Mahasiswa menggerakkan karakter pegawai "Budi (Staf HR)". Di pintu utama, Budi memasukkan password -> lampu berkedip hijau (*Terautentikasi*). Saat Budi mencoba masuk pintu "Ruang Server", pintu menolak dengan tanda silang merah besar (*Tidak Terotorisasi*).
  2. *Brankas MFA:* Brankas dengan dua lubang kunci. Memasukkan password hanya memutar gembok setengah; mahasiswa harus menggeser elemen "Token OTP HP" ke lubang kedua agar pintu brankas terbuka.
* **Laboratorium (`/laboratorium/modul-3`):**
  * **Mode:** `PRAKTIKUM`
  * **Skenario:** *Audit & Perbaikan Kebocoran Hak Akses (Privilege Escalation)*. Mahasiswa dihadapkan pada matriks kontrol akses (tabel RBAC) Sistem Informasi Rumah Sakit. Mahasiswa ditugaskan mencari celah keamanan (seperti peran `Perawat_Magang` yang memiliki centang aktif pada izin `Hapus_Database_Pasien` dan akun `Admin` yang belum mengaktifkan `MFA`), lalu memperbaikinya langkah demi langkah. Penjelasan prinsip *Least Privilege* muncul setelah perbaikan tervalidasi.

---

### MODUL 4: Arsitektur & Keamanan Jaringan
* **Istilah Auto-Tooltip:** *IP Address*, *Port*, *Packet*, *Firewall*, *Inbound/Outbound*, *Network Segmentation*, *DMZ*.
* **Poin Materi Teori (`/materi/modul-4`):**
  1. **Analogi Jaringan, IP, dan Port:** Jaringan sebagai jalan raya, IP Address sebagai alamat gedung, dan Port sebagai nomor pintu spesifik di gedung tersebut (contoh: Port 80/443 untuk pintu layanan web, Port 22 untuk pintu kontrol jarak jauh/SSH).
  2. **Firewall (Satpam Gerbang):** Penyaring lalu lintas paket data yang bekerja berdasarkan tabel aturan (*Allow/Accept* atau *Block/Drop*).
  3. **Segmentasi Jaringan:** Memisahkan jaringan menjadi zona-zona terpisah (misal: memisahkan Wi-Fi Tamu dengan Server Keuangan) agar serangan di satu titik tidak menyebar ke seluruh sistem.
* **Animasi Mnemonik Teori:**
  * *Sabuk Konveyor Firewall:* Animasi kotak-kotak paket data berjalan di atas *conveyor belt* menuju server. Palang pintu otomatis (Firewall) memeriksa label kotak dan secara visual "menendang" kotak berwarna merah (paket berbahaya) ke keranjang sampah, sambil meloloskan kotak hijau.
* **Laboratorium (`/laboratorium/modul-4`):**
  * **Mode:** `PRAKTIKUM`
  * **Skenario:** *Konfigurasi Aturan Firewall Berbasis Topologi Node (React Flow)*. Kanvas menampilkan topologi jaringan (Internet, IP Penyerang, Firewall, Web Server, Database Server). Mahasiswa harus menyusun aturan Firewall ( memilih `Action: DROP/ACCEPT`, `Source IP`, dan `Destination Port`) secara bertahap untuk menghentikan aliran paket serangan merah sambil tetap membiarkan trafik pengguna normal (hijau) mencapai Web Server di Port 443.

---

### MODUL 5: Ancaman Siber & Analisis Malware
* **Istilah Auto-Tooltip:** *Social Engineering*, *Phishing*, *Malware*, *Trojan / RAT*, *Ransomware*, *Command and Control (C2)*, *Indicator of Compromise (IoC)*, *Sandboxing*.
* **Poin Materi Teori (`/materi/modul-5`):**
  1. **Rekayasa Sosial (Social Engineering):** Memanipulasi psikologi manusia (seperti email *Phishing* berkedok undangan/tagihan mendesak) sebagai pintu masuk utama malware.
  2. **Anatomi Malware:** Membedakan cara kerja *Trojan/RAT* (menyamar sebagai file normal lalu membuka akses kendali jarak jauh diam-diam), *Ransomware* (mengunci file dan meminta tebusan), dan *Worm* (menggandakan diri lewat jaringan).
  3. **Indicator of Compromise (IoC):** Tanda-tanda anomali sistem yang mengindikasikan infeksi (proses asing di memori, lonjakan trafik ke IP luar negeri pada port tidak wajar).
* **Animasi Mnemonik Teori:**
  * *Cangkang Telur Trojan:* Mahasiswa mengklik ikon file `Jadwal_Ujian.pdf.exe` yang tampak normal. Seketika ikon PDF tersebut retak dan pecah seperti cangkang telur, mengeluarkan akar-akar merah menyala yang merambat keluar menuju ikon "Server Peretas (C2)".
* **Laboratorium (`/laboratorium/modul-5`):**
  * **Mode:** `PRAKTIKUM`
  * **Skenario:** *Deteksi & Penanganan Infeksi Remote Access Trojan (RAT)*. Menggunakan kanvas React Flow dan panel inspeksi sistem dalam 3 langkah wajib berurutan:
    1. *Fase Deteksi IoC:* Mahasiswa menganalisis Tabel Proses dan Log Jaringan pada node PC yang terinfeksi, lalu mengklik proses anak mencurigakan (`svchost_fake.exe`) dan koneksi *outbound* ke server C2 untuk menandainya sebagai IoC.
    2. *Fase Isolasi & Penghentian:* Mahasiswa wajib menekan tombol **"1. Isolasi Jaringan Host"** terlebih dahulu (memutus garis koneksi di React Flow), dilanjutkan **"2. Hentikan Proses (Kill Process)"**. (Jika mahasiswa langsung menekan "Hapus File" di awal, sistem menolak dengan umpan balik bahwa malware masih aktif di memori RAM).
    3. *Fase Pembersihan:* Mahasiswa menekan **"3. Hapus File Artefak Malware"** hingga status node kembali Hijau (Aman). Setiap langkah yang selesai akan membuka penjelasan teknis mendalam.

---

### MODUL 6: Keamanan Aplikasi dan Web
* **Istilah Auto-Tooltip:** *OWASP Top 10*, *SQL Injection (SQLi)*, *Cross-Site Scripting (XSS)*, *Payload*, *Input Validation*, *Sanitization*.
* **Poin Materi Teori (`/materi/modul-6`):**
  1. **SQL Injection (SQLi):** Teknik mengelabui penjaga pintu database dengan menyisipkan teka-teki logika (seperti `' OR 1=1 --`) ke dalam kolom input sehingga kueri database selalu bernilai benar (`TRUE`).
  2. **Cross-Site Scripting (XSS):** Menyisipkan kode skrip berbahaya ke halaman web (misal lewat kolom komentar) yang kemudian dieksekusi oleh browser pengunjung lain.
  3. **Validasi & Sanitasi Input:** Prinsip utama pertahanan aplikasi web: jangan pernah mempercayai input pengguna secara mentah; gunakan *Parameterized Queries* dan pembersihan karakter khusus (*Sanitization*).
* **Animasi Mnemonik Teori:**
  * *Gembok Bingung SQLi:* Sebuah form login dengan karakter gembok penjaga. Saat mahasiswa menekan tombol isi input `' OR 1=1 --`, muncul gelembung pikiran pada gembok yang menghitung `"Apakah 1 sama dengan 1? YA BENAR!"`, lalu gembok melompat terbuka sendiri meskipun kolom password kosong.
* **Laboratorium (`/laboratorium/modul-6`):**
  * **Mode:** `PRAKTIKUM`
  * **Skenario:** *Audit Celah Aplikasi Web & Penerapan Sanitasi*. Layar simulasi menampilkan aplikasi web tiruan berdampingan dengan panel inspeksi kueri/DOM di belakang layar:
    * *Langkah 1 (Observasi Celah SQLi):* Mahasiswa memilih payload pengujian pada form login untuk melihat bagaimana struktur teks kueri SQL berubah warna dan melewati logika autentikasi.
    * *Langkah 2 (Observasi Celah Stored XSS):* Mahasiswa menguji input komentar berisi tag `<script>` (disimulasikan secara aman menggunakan manipulasi state tanpa `eval()` asli) yang memicu peringatan pencurian sesi tiruan.
    * *Langkah 3 (Mitigasi Kode):* Mahasiswa memperbaiki kode konfigurasi pertahanan dengan mengganti metode kueri mentah menjadi *Prepared Statement* dan mengaktifkan fungsi *HTML Sanitizer* (`textContent`), lalu menguji ulang hingga serangan berhasil dinetralkan menjadi teks biasa.

---

### MODUL 7: Respons Insiden & Forensik Digital Dasar
* **Istilah Auto-Tooltip:** *Incident Response*, *Containment*, *Eradication*, *Digital Forensics*, *Order of Volatility*, *Triage*, *Event Log / SIEM*.
* **Poin Materi Teori (`/materi/modul-7`):**
  1. **Siklus Hidup Respons Insiden:** Tahapan terstruktur menghadapi serangan siber: *Persiapan*, *Deteksi & Analisis*, *Penahanan (Containment)*, *Pemberantasan (Eradication)*, dan *Pemulihan (Recovery)*.
  2. **Triage & Urutan Volatilitas Data (Order of Volatility):** Prinsip mengumpulkan bukti digital dimulai dari komponen yang paling cepat hilang saat listrik mati (Memori RAM & Koneksi Jaringan aktif) sebelum memeriksa penyimpanan permanen (Hardisk/SSD).
  3. **Analisis Log (Buku Tamu Sistem):** Cara membaca jejak waktu (*timestamp*), alamat IP, dan aksi pengguna pada catatan sistem untuk merekonstruksi kronologi serangan.
* **Animasi Mnemonik Teori:**
  * *Mesin Waktu VCR (Rewind Insiden):* Layar komputer yang sedang terkunci layar merah (*terinfeksi*) memiliki tombol *"Rewind (Putar Mundur Waktu)"*. Saat ditekan, animasi berputar mundur cepat mengembalikan file yang rusak hingga berhenti tepat pada detik sebuah file asing dari flashdisk dibuka pertama kali.
* **Laboratorium (`/laboratorium/modul-7`):**
  * **Mode:** `VISUALISASI TEKNIS`
  * **Skenario:** *Time-Travel Forensic Debugger (Rekonstruksi Kronologi Serangan)*. Antarmuka menggunakan slider garis waktu (*Timeline Scrubber*) yang memiliki 5 titik *Snapshot* waktu (mulai dari `08:00 - Sistem Normal`, `08:15 - Phishing Dibuka`, `08:17 - Eksekusi Payload di RAM`, `08:20 - Eskalasi Hak Akses`, hingga `08:30 - Eksfiltrasi Data`). Saat mahasiswa menggeser slider waktu atau menekan tombol *Play*, metrik RAM, daftar proses, topologi jaringan, dan baris *Log SIEM* berubah secara sinkron disertai penjelasan forensik terbuka yang membedah bukti digital di setiap titik waktu tersebut.

---

## 5. ARSITEKTUR STATE MANAGEMENT & DATA (ZUSTAND)

Seluruh state disimpan di sisi klien. Gunakan pola implementasi berikut:

### 5.1 Penyimpanan Progres & Portabilitas (`store/useProgressStore.ts`)
* Gunakan *hashing/encoding* ringan (Base64) untuk menyamarkan ID modul yang disimpan di `localStorage` agar tidak terlalu gamblang dimodifikasi secara tidak sengaja, serta sertakan `version: 1` untuk keamanan migrasi skema.
* **Penting:** Tidak ada state `unlockedModules` karena semua modul terbuka sejak awal. State hanya mencatat `completedModules` dan `completedLabs`.

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const encodeId = (id: string) => btoa(`cyber_done_${id}`);
const decodeId = (hash: string) => {
  try {
    return atob(hash).replace('cyber_done_', '');
  } catch {
    return '';
  }
};

interface ProgressState {
  completedTheoryHashes: string[];
  completedLabHashes: string[];
  markTheoryComplete: (moduleId: string) => void;
  markLabComplete: (moduleId: string) => void;
  isTheoryCompleted: (moduleId: string) => boolean;
  isLabCompleted: (moduleId: string) => boolean;
  exportProgressData: () => string;
  importProgressData: (jsonString: string) => boolean;
  resetAllProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTheoryHashes: [],
      completedLabHashes: [],

      markTheoryComplete: (moduleId) =>
        set((state) => ({
          completedTheoryHashes: Array.from(
            new Set([...state.completedTheoryHashes, encodeId(moduleId)])
          ),
        })),

      markLabComplete: (moduleId) =>
        set((state) => ({
          completedLabHashes: Array.from(
            new Set([...state.completedLabHashes, encodeId(moduleId)])
          ),
        })),

      isTheoryCompleted: (moduleId) =>
        get().completedTheoryHashes.includes(encodeId(moduleId)),

      isLabCompleted: (moduleId) =>
        get().completedLabHashes.includes(encodeId(moduleId)),

      exportProgressData: () =>
        JSON.stringify({
          version: 1,
          timestamp: new Date().toISOString(),
          completedTheoryHashes: get().completedTheoryHashes,
          completedLabHashes: get().completedLabHashes,
        }, null, 2),

      importProgressData: (jsonString) => {
        try {
          const parsed = JSON.parse(jsonString);
          if (
            parsed &&
            Array.isArray(parsed.completedTheoryHashes) &&
            Array.isArray(parsed.completedLabHashes)
          ) {
            set({
              completedTheoryHashes: parsed.completedTheoryHashes,
              completedLabHashes: parsed.completedLabHashes,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      resetAllProgress: () =>
        set({ completedTheoryHashes: [], completedLabHashes: [] }),
    }),
    {
      name: 'cybered-sandbox-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

### 5.2 Mesin State Laboratorium (`PraktikumEngine` vs `VisualisasiEngine`)
1. **Skema `PraktikumScenario` (Untuk Modul 1, 3, 4, 5, 6):**
   * Memiliki array `steps`: `{ id: number, title: string, instructionPrompt: string, expectedActionId: string, unlockedExplanation: string, isCompleted: boolean }`.
   * Saat awal dimulai, `unlockedExplanation` disembunyikan dari DOM.
   * Ketika interaksi pengguna di kanvas memicu `validateStep(actionId)` dan cocok dengan `expectedActionId` dari langkah aktif saat ini:
     * Ubah `isCompleted = true`.
     * Tampilkan `unlockedExplanation` dengan animasi transisi *Accordion* (Framer Motion).
     * Pindahkan penunjuk langkah aktif ke `currentStep + 1`.
     * Jika langkah terakhir selesai, panggil `markLabComplete(moduleId)` dan picu `confetti()`.
2. **Skema `VisualisasiScenario` (Untuk Modul 2 dan 7):**
   * Memiliki array `timelineFrames`: `{ stepIndex: number, title: string, technicalExplanation: string, visualStatePayload: Record<string, any> }`.
   * Seluruh `technicalExplanation` ditampilkan secara terbuka tanpa terkunci validasi.
   * Pengguna mengontrol jalannya visualisasi melalui tombol `Play / Pause`, `Next / Prev Step`, atau *Timeline Slider* serta input parameter kustom (seperti mengetik pesan pada modul Kriptografi/Steganografi).

---

## 6. STRUKTUR DIREKTORI PROYEK YANG DIREKOMENDASIKAN

Gunakan struktur folder modular berikut agar kode mudah dikelola selama *vibe coding*:

```text
src/
├── app/
│   ├── layout.tsx                 # Root layout (Dark theme, Font Geist/Inter, Navbar)
│   ├── page.tsx                   # Halaman Beranda (Hero, Info KSI, Backup/Restore, Bento Grid)
│   ├── materi/
│   │   ├── page.tsx               # Katalog 7 Modul Materi
│   │   └── [moduleId]/
│   │       └── page.tsx           # Halaman Teori + Auto-Tooltip + Animasi Mnemonik
│   └── laboratorium/
│       ├── page.tsx               # Katalog 7 Laboratorium (Badge Mode: Praktikum / Visualisasi)
│       └── [moduleId]/
│           └── page.tsx           # Viewport Guard (<1024px block) + Lab Factory Switcher
├── components/
│   ├── ui/                        # Komponen dasar (Button, Card, Tooltip, Badge, Accordion)
│   ├── shared/
│   │   ├── Navbar.tsx             # Navigasi utama + indikator progres singkat
│   │   ├── GlossaryTerm.tsx       # Komponen Auto-Tooltip untuk istilah teknis
│   │   └── ProgressManager.tsx    # Modal/Panel Ekspor & Impor JSON LocalStorage
│   ├── mnemonics/                 # 7 Komponen Animasi Mnemonik untuk Halaman Teori
│   │   ├── CiaTriadMnemonic.tsx
│   │   ├── CryptoStegoMnemonic.tsx
│   │   ├── IamBuildingMnemonic.tsx
│   │   ├── FirewallConveyorMnemonic.tsx
│   │   ├── TrojanEggMnemonic.tsx
│   │   ├── SqlLockMnemonic.tsx
│   │   └── ForensicRewindMnemonic.tsx
│   └── lab/
│       ├── PraktikumEngine.tsx    # Wrapper standar untuk Mode Praktikum (Step-by-step reveal)
│       ├── VisualisasiEngine.tsx  # Wrapper standar untuk Mode Visualisasi Teknis
│       └── scenarios/             # Implementasi kanvas spesifik per modul (1 s/d 7)
│           ├── Lab1RiskMatrix.tsx
│           ├── Lab2CryptoStego.tsx
│           ├── Lab3IamRbac.tsx
│           ├── Lab4FirewallFlow.tsx
│           ├── Lab5TrojanIncident.tsx
│           ├── Lab6WebSecSanitizer.tsx
│           └── Lab7ForensicTimeline.tsx
├── data/
│   ├── glossary.ts                # Kamus istilah teknis & penjelasan bahasa sederhana
│   ├── modulesData.ts             # Metadata 7 modul, teks teori ringkas, dan pemetaan mode lab
│   └── labScenariosData.ts        # Data langkah-langkah praktikum dan timeline visualisasi
└── store/
    └── useProgressStore.ts        # Zustand store dengan LocalStorage persistence
```

---

## 7. BATASAN KRITIS & ATURAN UNTUK AI CODING ASSISTANT (GUARDRAILS)

Saat membangun kode untuk proyek ini, asisten AI **WAJIB** mematuhi aturan mutlak berikut:

1. **DILARANG MENGGUNAKAN BACKEND ATAU DATABASE:** Jangan pernah menambahkan kode autentikasi (NextAuth, Clerk, Supabase Auth), jangan membuat API route (`app/api/...`) yang membutuhkan server runtime, dan jangan menghubungkan ke database eksternal. Semua fitur harus berjalan 100% di sisi klien (*Client-Side*).
2. **DILARANG MENGEKSEKUSI KODE BERBAHAYA NYATA:** Semua simulasi serangan (Trojan, SQL Injection, XSS) harus direpresentasikan murni sebagai **manipulasi state React, animasi elemen DOM, atau perubahan grafik node React Flow**. Dilarang menggunakan `eval()` atau mengeksekusi payload berbahaya sungguhan.
3. **DILARANG MENGGUNAKAN SISTEM GEMBOK MODUL:** Seluruh 7 modul di halaman `/materi` maupun `/laboratorium` harus dapat diakses dan diklik sejak pertama kali pengguna membuka web.
4. **PATUHI PEMISAHAN MODE LABORATORIUM:** Setiap modul di `/laboratorium/[moduleId]` hanya boleh memiliki **satu** mode sesuai spesifikasi (Modul 1, 3, 4, 5, 6 = Mode `PRAKTIKUM`; Modul 2, 7 = Mode `VISUALISASI TEKNIS`). Jangan mencampur kedua mode di dalam satu modul yang sama.
5. **JAGA KUALITAS BAHASA & VISUAL:** Gunakan Bahasa Indonesia yang santai, jelas, namun tetap akurat secara akademis. Setiap kali ada istilah asing/teknis di dalam paragraf teori, bungkus kata tersebut dengan komponen `<GlossaryTerm term="...">` agar penjelasannya muncul saat disentuh kursor.

---

## 8. RENCANA TAHAPAN EKSEKUSI VIBE CODING (PROMPTING ROADMAP)

Agar AI tidak kewalahan (*context limit*) saat Anda melakukan *vibe coding*, mintalah AI membangun aplikasi ini secara bertahap dengan urutan berikut:

* **Tahap 1 (Pondasi & Data):** Minta AI menginisialisasi proyek Next.js + Tailwind + Framer Motion + Lucide + Zustand, membuat `useProgressStore.ts`, `glossary.ts`, dan `modulesData.ts`, serta membangun `Navbar` dan Halaman Beranda (`/`) lengkap dengan fitur Backup/Restore JSON dan Bento Grid 7 modul.
* **Tahap 2 (Ruang Teori & Animasi Mnemonik):** Minta AI membangun halaman `/materi` dan `/materi/[moduleId]`, komponen `<GlossaryTerm>`, serta membuat ke-7 komponen Animasi Mnemonik (`CiaTriadMnemonic` hingga `ForensicRewindMnemonic`).
* **Tahap 3 (Kerangka Mesin Laboratorium):** Minta AI membangun halaman `/laboratorium` dan `/laboratorium/[moduleId]` lengkap dengan proteksi ukuran layar (*Viewport Lock `< 1024px`*), kerangka komponen `PraktikumEngine.tsx` (dengan sistem *step-by-step reveal* penjelasan), dan `VisualisasiEngine.tsx`.
* **Tahap 4 (Implementasi Skenario Lab 1–4):** Minta AI membangun kanvas interaktif untuk `Lab1RiskMatrix`, `Lab2CryptoStego` (Visualisasi Block Cipher & LSB Piksel), `Lab3IamRbac`, dan `Lab4FirewallFlow` (React Flow).
* **Tahap 5 (Implementasi Skenario Lab 5–7 & Pemolesan Akhir):** Minta AI membangun `Lab5TrojanIncident` (React Flow), `Lab6WebSecSanitizer`, dan `Lab7ForensicTimeline` (Time-Travel Slider), lalu menghubungkan efek konfeti penyelesaian modul.