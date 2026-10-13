# Misi Detektif Hobi

Aplikasi pembelajaran interaktif berbasis React dan Vite.

## Mengedit konten empat level

1. Buka **Kustomisasi 4 Level** dari halaman awal.
2. Setiap level memiliki kumpulan 20 soal/profil. Level 3 memiliki 20 soal Susun Kalimat dan 20 Pasangan Makna. Pilih tab level dan soal yang ingin diedit; soal dapat ditambah atau dihapus.
3. Atur jumlah yang dimainkan pada setiap tab level. Nilai awalnya 10 dari 20; permainan mengambil soal secara acak setiap kali level dimainkan atau diulang. Level 2 menghitung profil warga, dengan dua pertanyaan untuk setiap profil.
4. Buka tab **Tampilan** untuk mengganti latar aplikasi, ilustrasi halaman mulai, gambar detektif, dan latar peta. Foto dapat dipilih atau diseret ke area foto; pratinjau dan status **Foto terpasang** menunjukkan gambar yang aktif.
5. Foto per soal tidak digunakan; gambar pilihan jawaban tetap dapat dipilih atau diseret ke area foto.
6. Tandai jawaban benar sebelum menyimpan. **Simpan di Browser** menyimpan perubahan untuk browser/perangkat saat ini saja.
7. Untuk mengubah konten proyek, pilih **Ekspor JSON + Foto**. Salin `level-content.json` hasil unduhan ke `public/level-content.json` dan foto hasil unduhan ke `public/images/`, lalu build dan deploy ulang.

Untuk memakai file JSON yang sudah diedit, pilih **Buka JSON**. Referensi foto seperti `/images/nama-foto.jpg` harus memiliki file yang cocok di `public/images/`.

## Batasan hosting statis

Halaman web statis tidak memiliki izin menulis ke folder proyek atau server. Karena itu aplikasi tidak bisa langsung membuat atau mengubah file di `public/` dari browser. Ekspor menyediakan JSON dan file foto terpisah untuk disalin ke proyek sebelum deployment; perubahan yang langsung tersimpan dari halaman hanya berlaku di browser lokal.

## Perintah

- `npm run dev` — jalankan server pengembangan.
- `npm run build` — buat berkas produksi di `dist/`.
- `npm run preview` — pratinjau hasil build.
- `npm run lint` — jalankan ESLint.
