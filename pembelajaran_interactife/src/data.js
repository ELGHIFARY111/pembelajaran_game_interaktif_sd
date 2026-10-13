// Isi game. Ubah teks di sini tanpa menyentuh tampilan.

export const MAX_POINTS = 25 // poin maksimal per level (4 level = 100)

// Nama hobi untuk tiap gambar benda
export const HOBI = {
  kuas: 'Melukis',
  bola: 'Bermain bola',
  buku: 'Membaca',
  gitar: 'Bermain gitar',
  tanaman: 'Berkebun',
  raket: 'Bulu tangkis',
}

export const ROLES = ['Pembaca petunjuk', 'Pencatat', 'Penyusun jawaban', 'Juru bicara']

export const LEVELS = [
  { title: 'TKP: Jejak Hobi yang Hilang', place: 'Taman Kota', skill: 'Mengenali jenis hobi' },
  { title: 'Rahasia di Balik Profil Warga', place: 'Rumah Warga', skill: 'Membaca dan memahami teks' },
  { title: 'Papan Bukti Detektif', place: 'Markas Detektif', skill: 'Kosakata dan kalimat' },
  { title: 'Kasus Terakhir: Siapakah Aku?', place: 'Balai Kota', skill: 'Menarik kesimpulan' },
]

// Level 1: cocokkan benda dengan hobi
export const LEVEL1 = [
  {
    q: 'Benda yang digunakan untuk melukis adalah ....',
    options: ['kuas', 'raket', 'bola'],
    answer: 'kuas',
    hint: 'Benda ini punya bulu halus di ujungnya dan dicelupkan ke cat.',
  },
  {
    q: 'Benda yang dipakai untuk membaca cerita adalah ....',
    options: ['bola', 'buku', 'gitar'],
    answer: 'buku',
    hint: 'Benda ini punya banyak halaman berisi cerita.',
  },
  {
    q: 'Benda yang dimainkan untuk membuat musik adalah ....',
    options: ['kuas', 'tanaman', 'gitar'],
    answer: 'gitar',
    hint: 'Benda ini punya senar yang dipetik.',
  },
  {
    q: 'Benda yang dirawat saat berkebun adalah ....',
    options: ['buku', 'tanaman', 'raket'],
    answer: 'tanaman',
    hint: 'Benda ini perlu disiram dan terkena sinar matahari.',
  },
  {
    q: 'Benda yang dipakai untuk bermain bulu tangkis adalah ....',
    options: ['raket', 'bola', 'gitar'],
    answer: 'raket',
    hint: 'Benda ini dipakai untuk memukul kok.',
  },
  { q: 'Sebelum melukis, Rani menyiapkan ....', options: ['kuas', 'buku', 'raket'], answer: 'kuas', hint: 'Benda ini memiliki gagang dan bulu untuk mengoleskan cat.' },
  { q: 'Agar bisa membaca dongeng, kita membuka ....', options: ['gitar', 'buku', 'bola'], answer: 'buku', hint: 'Di dalam benda ini ada halaman dan tulisan.' },
  { q: 'Benda yang dipetik saat bermain musik adalah ....', options: ['tanaman', 'gitar', 'kuas'], answer: 'gitar', hint: 'Benda ini memiliki senar.' },
  { q: 'Saat merawat kebun, kita menyiram ....', options: ['raket', 'tanaman', 'buku'], answer: 'tanaman', hint: 'Benda hidup ini tumbuh di tanah dan membutuhkan air.' },
  { q: 'Untuk memukul kok saat bermain bulu tangkis, gunakan ....', options: ['raket', 'gitar', 'kuas'], answer: 'raket', hint: 'Benda ini memiliki pegangan dan permukaan berjaring.' },
  { q: 'Alat yang membantu memberi warna pada gambar adalah ....', options: ['bola', 'kuas', 'buku'], answer: 'kuas', hint: 'Celupkan ujung alat ini ke cat.' },
  { q: 'Cerita petualangan dapat kita baca di ....', options: ['buku', 'tanaman', 'raket'], answer: 'buku', hint: 'Cari benda yang memiliki sampul dan banyak halaman.' },
  { q: 'Alat musik yang mempunyai enam senar biasanya adalah ....', options: ['gitar', 'bola', 'kuas'], answer: 'gitar', hint: 'Alat musik ini dimainkan dengan cara dipetik atau digenjreng.' },
  { q: 'Benda yang tumbuh dan dapat berbunga di kebun adalah ....', options: ['tanaman', 'raket', 'gitar'], answer: 'tanaman', hint: 'Benda ini perlu dirawat dan disiram.' },
  { q: 'Kok dipukul menggunakan ....', options: ['buku', 'raket', 'tanaman'], answer: 'raket', hint: 'Alat olahraga ini diayunkan untuk memukul kok.' },
  { q: 'Hobi melukis paling sering menggunakan cat dan ....', options: ['kuas', 'bola', 'gitar'], answer: 'kuas', hint: 'Alat ini membantu mengoleskan cat ke kertas.' },
  { q: 'Tempat yang berisi banyak halaman untuk dibaca disebut ....', options: ['buku', 'raket', 'tanaman'], answer: 'buku', hint: 'Benda ini bisa berisi cerita atau pengetahuan.' },
  { q: 'Untuk menghasilkan nada dari senar, kita dapat memainkan ....', options: ['gitar', 'kuas', 'bola'], answer: 'gitar', hint: 'Alat musik ini mempunyai badan kayu dan senar.' },
  { q: 'Pupuk dan air membantu tumbuhnya ....', options: ['tanaman', 'buku', 'raket'], answer: 'tanaman', hint: 'Benda ini bisa tumbuh di pot atau kebun.' },
  { q: 'Alat berjaring untuk memukul kok dalam bulu tangkis adalah ....', options: ['raket', 'bola', 'gitar'], answer: 'raket', hint: 'Pilih alat yang dipakai untuk memukul kok.' },
]

// Level 2: profil warga. bukti = nomor kalimat (mulai dari 0) yang menunjukkan kegiatan hobi
export const LEVEL2 = [
  {
    name: 'Dita',
    look: { skin: '#f4c7a0', hair: '#3b2a20', shirt: '#17b3a3' },
    options: ['buku', 'kuas', 'raket'],
    answer: 'buku',
    sentences: [
      'Setiap hari Minggu, Dita pergi ke taman.',
      'Ia membawa buku dan duduk di bawah pohon untuk menikmati cerita.',
      'Dita merasa tenang dan senang.',
    ],
    bukti: [1],
  },
  {
    name: 'Rani',
    look: { skin: '#e8b48c', hair: '#1e2a4a', shirt: '#ff6f61' },
    options: ['bola', 'gitar', 'kuas'],
    answer: 'kuas',
    sentences: [
      'Sepulang sekolah, Rani mengambil kuas dan cat.',
      'Ia menggambar bunga di atas kertas.',
      'Rani senang karena gambarnya berwarna-warni.',
    ],
    bukti: [0, 1],
  },
  {
    name: 'Bima',
    look: { skin: '#d9a37a', hair: '#222222', shirt: '#7a5cff' },
    options: ['tanaman', 'gitar', 'buku'],
    answer: 'gitar',
    sentences: [
      'Bima tinggal di dekat taman kota.',
      'Ia anak yang ramah dan suka berteman.',
      'Setiap sore Bima memetik senar gitar dan bernyanyi di teras rumah.',
    ],
    bukti: [2],
  },
  { name: 'Sari', look: { skin: '#f0c49f', hair: '#5a3828', shirt: '#f28b64' }, options: ['kuas', 'buku', 'bola'], answer: 'kuas', sentences: ['Sari menyimpan cat warna-warni di meja.', 'Ia membuat gambar pemandangan di buku gambar.', 'Tangannya menggerakkan kuas perlahan.'], bukti: [0, 1, 2] },
  { name: 'Doni', look: { skin: '#d9a37a', hair: '#302820', shirt: '#4c9db5' }, options: ['gitar', 'raket', 'tanaman'], answer: 'raket', sentences: ['Doni berlatih di lapangan setiap Sabtu.', 'Ia memukul kok melewati net.', 'Doni membawa raket di dalam tas olahraga.'], bukti: [0, 1, 2] },
  { name: 'Lala', look: { skin: '#e8b48c', hair: '#302820', shirt: '#d979a7' }, options: ['tanaman', 'gitar', 'buku'], answer: 'buku', sentences: ['Lala memilih cerita tentang hewan.', 'Ia membaca beberapa halaman sebelum tidur.', 'Buku ceritanya diletakkan di samping bantal.'], bukti: [0, 1, 2] },
  { name: 'Riko', look: { skin: '#f4c7a0', hair: '#4c3429', shirt: '#79ad64' }, options: ['bola', 'kuas', 'tanaman'], answer: 'tanaman', sentences: ['Riko memiliki pot kecil di teras.', 'Setiap pagi ia menyiram bunga dan membersihkan daunnya.', 'Riko senang melihat tanaman tumbuh subur.'], bukti: [0, 1, 2] },
  { name: 'Maya', look: { skin: '#d9a37a', hair: '#241e1a', shirt: '#8b78ce' }, options: ['gitar', 'buku', 'raket'], answer: 'gitar', sentences: ['Maya belajar memainkan lagu sederhana.', 'Ia memetik senar gitar mengikuti irama.', 'Saat berkumpul, Maya mengiringi teman-temannya bernyanyi.'], bukti: [0, 1, 2] },
  { name: 'Fajar', look: { skin: '#e8b48c', hair: '#33251e', shirt: '#e2ad45' }, options: ['kuas', 'bola', 'buku'], answer: 'bola', sentences: ['Fajar berlari ke lapangan bersama teman.', 'Mereka menendang bola ke arah gawang.', 'Fajar menjadi penjaga gawang pada babak kedua.'], bukti: [0, 1, 2] },
  { name: 'Nina', look: { skin: '#f4c7a0', hair: '#5a3828', shirt: '#5caa9a' }, options: ['buku', 'raket', 'gitar'], answer: 'buku', sentences: ['Nina sering meminjam cerita dari perpustakaan.', 'Ia membaca buku selama waktu istirahat.', 'Setelah selesai, Nina mengembalikan buku ke rak.'], bukti: [0, 1, 2] },
  { name: 'Ardi', look: { skin: '#d9a37a', hair: '#302820', shirt: '#e67759' }, options: ['raket', 'tanaman', 'kuas'], answer: 'kuas', sentences: ['Ardi suka membuat kartu ucapan sendiri.', 'Ia mencampur cat lalu melukis gambar matahari.', 'Kuas kecil dipakainya untuk membuat garis halus.'], bukti: [0, 1, 2] },
  { name: 'Tia', look: { skin: '#e8b48c', hair: '#39271f', shirt: '#62a7d6' }, options: ['tanaman', 'bola', 'gitar'], answer: 'gitar', sentences: ['Tia mengikuti latihan musik di sekolah.', 'Ia belajar memetik gitar dengan benar.', 'Lagu yang dimainkan Tia terdengar merdu.'], bukti: [0, 1, 2] },
  { name: 'Bagas', look: { skin: '#f4c7a0', hair: '#302820', shirt: '#8b78ce' }, options: ['bola', 'buku', 'raket'], answer: 'bola', sentences: ['Bagas memakai sepatu olahraga di lapangan.', 'Ia menggiring bola lalu mengoper kepada temannya.', 'Mereka bermain sepak bola dengan gembira.'], bukti: [0, 1, 2] },
  { name: 'Wulan', look: { skin: '#d9a37a', hair: '#5a3828', shirt: '#d979a7' }, options: ['tanaman', 'kuas', 'buku'], answer: 'tanaman', sentences: ['Wulan menanam bibit cabai di pot.', 'Ia memberi air secukupnya setiap sore.', 'Wulan mencatat pertumbuhan tanamannya.'], bukti: [0, 1, 2] },
  { name: 'Rafa', look: { skin: '#e8b48c', hair: '#302820', shirt: '#4c9db5' }, options: ['raket', 'gitar', 'bola'], answer: 'raket', sentences: ['Rafa dan kakaknya bermain di lapangan.', 'Rafa mengayunkan raket untuk mengembalikan kok.', 'Mereka bergantian bermain bulu tangkis.'], bukti: [0, 1, 2] },
  { name: 'Intan', look: { skin: '#f4c7a0', hair: '#33251e', shirt: '#79ad64' }, options: ['kuas', 'tanaman', 'buku'], answer: 'buku', sentences: ['Intan menyukai cerita tentang luar angkasa.', 'Ia membaca buku ensiklopedia bersama ayah.', 'Banyak hal baru ia temukan dari bacaannya.'], bukti: [0, 1, 2] },
  { name: 'Yusuf', look: { skin: '#d9a37a', hair: '#241e1a', shirt: '#e2ad45' }, options: ['gitar', 'bola', 'kuas'], answer: 'gitar', sentences: ['Yusuf duduk di kursi dekat jendela.', 'Ia menyetem senar gitar sebelum berlatih.', 'Yusuf memainkan lagu untuk keluarganya.'], bukti: [0, 1, 2] },
  { name: 'Kiki', look: { skin: '#e8b48c', hair: '#5a3828', shirt: '#e67759' }, options: ['tanaman', 'raket', 'kuas'], answer: 'kuas', sentences: ['Kiki menyiapkan kertas dan cat air.', 'Ia melukis ikan berwarna biru.', 'Kiki membersihkan kuas setelah selesai.'], bukti: [0, 1, 2] },
  { name: 'Ayu', look: { skin: '#f4c7a0', hair: '#302820', shirt: '#62a7d6' }, options: ['bola', 'tanaman', 'buku'], answer: 'tanaman', sentences: ['Ayu membantu ibu di kebun.', 'Ia menggemburkan tanah dan menanam bunga.', 'Setiap hari Ayu memeriksa tanaman yang dirawatnya.'], bukti: [0, 1, 2] },
  { name: 'Dewa', look: { skin: '#d9a37a', hair: '#39271f', shirt: '#5caa9a' }, options: ['buku', 'gitar', 'raket'], answer: 'raket', sentences: ['Dewa membawa botol minum ke lapangan.', 'Ia berlatih mengarahkan kok dengan raket.', 'Dewa ingin bermain bulu tangkis dengan lebih baik.'], bukti: [0, 1, 2] },
]

// Level 3 bagian A: susun kata menjadi kalimat (answers boleh lebih dari satu susunan)
export const LEVEL3_SENTENCES = [
  { words: ['suka', 'Rani', 'bunga', 'menggambar'], answers: ['Rani suka menggambar bunga'] },
  {
    words: ['gitar', 'Bima', 'sore', 'bermain', 'setiap'],
    answers: ['Bima bermain gitar setiap sore', 'Setiap sore Bima bermain gitar'],
  },
  { words: ['di', 'Dita', 'taman', 'membaca', 'buku'], answers: ['Dita membaca buku di taman'] },
  { words: ['setiap', 'pagi', 'Ayu', 'menyiram', 'tanaman'], answers: ['Ayu menyiram tanaman setiap pagi'] },
  { words: ['Rafa', 'kok', 'memukul', 'dengan', 'raket'], answers: ['Rafa memukul kok dengan raket'] },
  { words: ['gitar', 'Yusuf', 'memainkan', 'lagu', 'merdu', 'dengan'], answers: ['Yusuf memainkan lagu merdu dengan gitar'] },
  { words: ['bunga', 'Kiki', 'melukis', 'di', 'kertas'], answers: ['Kiki melukis bunga di kertas'] },
  { words: ['Bagas', 'bola', 'menendang', 'ke', 'gawang'], answers: ['Bagas menendang bola ke gawang'] },
  { words: ['Intan', 'cerita', 'membaca', 'sebelum', 'tidur'], answers: ['Intan membaca cerita sebelum tidur'] },
  { words: ['Wulan', 'bibit', 'menanam', 'di', 'pot'], answers: ['Wulan menanam bibit di pot'] },
  { words: ['Doni', 'bulu', 'bermain', 'tangkis', 'setiap', 'Sabtu'], answers: ['Doni bermain bulu tangkis setiap Sabtu'] },
  { words: ['Maya', 'senar', 'gitar', 'memetik', 'perlahan'], answers: ['Maya memetik senar gitar perlahan'] },
  { words: ['Sari', 'warna', 'mencampur', 'cat', 'di', 'palet'], answers: ['Sari mencampur warna cat di palet'] },
  { words: ['Fajar', 'bola', 'mengoper', 'kepada', 'teman'], answers: ['Fajar mengoper bola kepada teman'] },
  { words: ['Nina', 'buku', 'meminjam', 'dari', 'perpustakaan'], answers: ['Nina meminjam buku dari perpustakaan'] },
  { words: ['Riko', 'daun', 'membersihkan', 'tanaman', 'di', 'teras'], answers: ['Riko membersihkan daun tanaman di teras'] },
  { words: ['Tia', 'lagu', 'berlatih', 'memainkan', 'gitar', 'dengan'], answers: ['Tia berlatih memainkan lagu dengan gitar'] },
  { words: ['Ardi', 'gambar', 'membuat', 'kuas', 'dengan'], answers: ['Ardi membuat gambar dengan kuas'] },
  { words: ['Bima', 'sore', 'bernyanyi', 'sambil', 'bermain', 'gitar', 'hari'], answers: ['Bima bernyanyi sambil bermain gitar sore hari'] },
  { words: ['Lala', 'halaman', 'membaca', 'cerita', 'beberapa'], answers: ['Lala membaca beberapa halaman cerita'] },
]

// Level 3 bagian B: pasangkan kata dengan maknanya
export const LEVEL3_PAIRS = [
  { term: 'Hobi', meaning: 'Kegiatan yang disukai dan dilakukan saat waktu luang' },
  { term: 'Melukis', meaning: 'Membuat gambar dengan kuas dan cat' },
  { term: 'Berkebun', meaning: 'Menanam dan merawat tumbuhan' },
  { term: 'Kuas', meaning: 'Alat bergagang untuk mengoleskan cat' },
  { term: 'Warna', meaning: 'Rupa yang tampak seperti merah, biru, atau kuning' },
  { term: 'Membaca', meaning: 'Melihat tulisan lalu memahami isinya' },
  { term: 'Novel', meaning: 'Buku cerita yang memiliki banyak halaman' },
  { term: 'Halaman', meaning: 'Lembar-lembar yang menyusun sebuah buku' },
  { term: 'Perpustakaan', meaning: 'Tempat untuk membaca dan meminjam buku' },
  { term: 'Raket', meaning: 'Alat berjaring yang digunakan untuk memukul kok' },
  { term: 'Kok', meaning: 'Benda ringan yang dipukul dalam bulu tangkis' },
  { term: 'Net', meaning: 'Jaring pembatas di tengah lapangan' },
  { term: 'Gitar', meaning: 'Alat musik berdawai yang dimainkan dengan dipetik' },
  { term: 'Senar', meaning: 'Dawai yang bergetar untuk menghasilkan nada' },
  { term: 'Irama', meaning: 'Panjang pendek bunyi yang tersusun teratur' },
  { term: 'Kebun', meaning: 'Lahan tempat menanam dan merawat tumbuhan' },
  { term: 'Menyiram', meaning: 'Memberi air kepada tanaman' },
  { term: 'Bibit', meaning: 'Tanaman kecil yang dapat ditanam' },
  { term: 'Panen', meaning: 'Mengambil hasil tanaman yang sudah tumbuh' },
  { term: 'Sepak bola', meaning: 'Permainan beregu yang menggunakan bola dan gawang' },
]
// Urutan makna di layar (nomor pasangan), sengaja diacak
export const MEANING_ORDER = [2, 0, 1]

// Level 4: Siapakah Aku?
export const LEVEL4 = [
  {
    clues: [
      'Aku menyukai kegiatan di luar ruangan.',
      'Aku menggunakan raket dan kok.',
      'Aku biasanya bermain bersama orang lain.',
    ],
    options: ['bola', 'raket', 'kuas', 'buku'],
    answer: 'raket',
    hint: 'Baca lagi petunjuk nomor 2. Benda apa yang dipakai?',
    chips: ['di luar ruangan', 'memakai raket dan kok', 'dimainkan bersama orang lain'],
  },
  {
    clues: [
      'Aku suka kegiatan di taman.',
      'Aku menyiram dan merawat tanaman setiap pagi.',
      'Aku senang melihat bunga mekar.',
    ],
    options: ['gitar', 'buku', 'tanaman', 'raket'],
    answer: 'tanaman',
    hint: 'Baca lagi petunjuk nomor 2. Apa yang aku rawat?',
    chips: ['di taman', 'merawat tanaman', 'senang melihat bunga mekar'],
  },
  { clues: ['Aku suka membuat gambar.', 'Aku memilih warna yang cerah.', 'Aku mengoleskan cat pada kertas dengan alat bergagang.'], options: ['kuas', 'raket', 'bola', 'gitar'], answer: 'kuas', hint: 'Alat apa yang digunakan untuk mengoleskan cat?', chips: ['membuat gambar', 'memakai cat', 'menggunakan kuas'] },
  { clues: ['Aku senang membaca cerita.', 'Aku membalik halaman untuk mengetahui kelanjutannya.', 'Benda yang kubawa memiliki sampul dan banyak tulisan.'], options: ['buku', 'tanaman', 'raket', 'bola'], answer: 'buku', hint: 'Benda apa yang memiliki halaman dan sampul?', chips: ['membaca cerita', 'membalik halaman', 'membawa buku'] },
  { clues: ['Aku menyukai olahraga di lapangan.', 'Aku berdiri di sisi berlawanan dengan teman.', 'Aku memukul benda kecil melewati net.'], options: ['gitar', 'raket', 'kuas', 'buku'], answer: 'raket', hint: 'Alat apa yang dipakai untuk memukul kok?', chips: ['berolahraga', 'memukul kok', 'bermain melewati net'] },
  { clues: ['Aku suka membuat bunyi yang indah.', 'Aku duduk sambil memegang alat musik.', 'Jari-jariku memetik dawai.'], options: ['tanaman', 'gitar', 'bola', 'kuas'], answer: 'gitar', hint: 'Alat musik apa yang dimainkan dengan memetik senar?', chips: ['membuat bunyi', 'memetik dawai', 'memainkan gitar'] },
  { clues: ['Aku senang berada di kebun.', 'Aku memberi air pada sesuatu yang tumbuh di pot.', 'Daunnya menjadi segar setelah kurawat.'], options: ['tanaman', 'raket', 'buku', 'gitar'], answer: 'tanaman', hint: 'Apa yang tumbuh di pot dan perlu disiram?', chips: ['berada di kebun', 'memberi air', 'merawat tanaman'] },
  { clues: ['Aku bermain bersama teman satu tim.', 'Kami berusaha memasukkan benda bulat ke gawang.', 'Benda itu kami tendang dengan kaki.'], options: ['bola', 'kuas', 'buku', 'gitar'], answer: 'bola', hint: 'Benda apa yang ditendang menuju gawang?', chips: ['bermain satu tim', 'menendang benda bulat', 'memasukkan ke gawang'] },
  { clues: ['Aku duduk di tempat yang tenang.', 'Aku melihat tulisan dan memahami ceritanya.', 'Benda yang kubaca punya banyak halaman.'], options: ['buku', 'raket', 'tanaman', 'kuas'], answer: 'buku', hint: 'Apa yang dibaca dan memiliki banyak halaman?', chips: ['duduk dengan tenang', 'memahami cerita', 'membaca buku'] },
  { clues: ['Aku suka merawat sesuatu yang hidup.', 'Aku menanamnya di tanah yang subur.', 'Aku membersihkan daun dan memberi air.'], options: ['tanaman', 'bola', 'gitar', 'raket'], answer: 'tanaman', hint: 'Apa yang ditanam di tanah dan memiliki daun?', chips: ['merawat yang hidup', 'menanam di tanah', 'membersihkan daun'] },
  { clues: ['Aku suka tampil di depan keluarga.', 'Aku memainkan lagu dengan jari.', 'Alat musikku memiliki senar.'], options: ['gitar', 'buku', 'kuas', 'tanaman'], answer: 'gitar', hint: 'Alat apa yang mempunyai senar untuk dimainkan?', chips: ['tampil di depan keluarga', 'memainkan lagu', 'memetik senar'] },
  { clues: ['Aku membawa alat olahraga ke lapangan.', 'Aku berdiri dekat net.', 'Aku mengayunkan alat untuk memukul kok.'], options: ['raket', 'bola', 'buku', 'tanaman'], answer: 'raket', hint: 'Apa nama alat olahraga berjaring untuk memukul kok?', chips: ['membawa alat olahraga', 'berdiri dekat net', 'mengayunkan raket'] },
  { clues: ['Aku suka menggambar pemandangan.', 'Aku menyiapkan cat di atas palet.', 'Aku memakai alat kecil untuk membuat garis.'], options: ['kuas', 'gitar', 'tanaman', 'raket'], answer: 'kuas', hint: 'Alat apa yang membantu membuat garis dengan cat?', chips: ['menggambar pemandangan', 'menyiapkan cat', 'membuat garis dengan kuas'] },
  { clues: ['Aku suka cerita tentang hewan.', 'Aku mencari kisah baru di rak.', 'Aku meminjam benda itu dari perpustakaan.'], options: ['buku', 'bola', 'gitar', 'kuas'], answer: 'buku', hint: 'Benda apa yang dipinjam untuk dibaca?', chips: ['suka cerita hewan', 'mencari kisah baru', 'meminjam buku'] },
  { clues: ['Aku bermain di luar bersama teman.', 'Kami berlari mengejar benda yang ditendang.', 'Permainan kami mempunyai gawang.'], options: ['bola', 'raket', 'tanaman', 'buku'], answer: 'bola', hint: 'Benda apa yang dimainkan dengan cara ditendang?', chips: ['bermain di luar', 'berlari mengejar', 'menendang bola'] },
  { clues: ['Aku mendengarkan bunyi saat berlatih.', 'Aku menekan dan memetik beberapa senar.', 'Alat musik kayu itu sering dimainkan sambil bernyanyi.'], options: ['gitar', 'kuas', 'raket', 'tanaman'], answer: 'gitar', hint: 'Alat musik apa yang mengeluarkan nada dari senar?', chips: ['mendengarkan bunyi', 'memetik beberapa senar', 'bernyanyi sambil bermain gitar'] },
  { clues: ['Aku suka melihat bunga tumbuh.', 'Aku meletakkan bibit di dalam tanah.', 'Aku merawatnya dengan air dan sinar matahari.'], options: ['tanaman', 'bola', 'buku', 'raket'], answer: 'tanaman', hint: 'Apa yang tumbuh dari bibit dan perlu dirawat?', chips: ['melihat bunga tumbuh', 'meletakkan bibit', 'merawat tanaman'] },
  { clues: ['Aku berlatih olahraga dengan kakak.', 'Kami memakai kok dan net.', 'Alat yang kuayunkan memiliki permukaan berjaring.'], options: ['raket', 'kuas', 'gitar', 'buku'], answer: 'raket', hint: 'Alat berjaring apa yang dipakai dalam bulu tangkis?', chips: ['berlatih olahraga', 'memakai kok dan net', 'mengayunkan raket'] },
  { clues: ['Aku suka mewarnai gambar.', 'Aku mencelupkan alat ke dalam cat.', 'Ujung alat itu memiliki bulu halus.'], options: ['kuas', 'tanaman', 'bola', 'buku'], answer: 'kuas', hint: 'Apa nama alat berbulu halus untuk melukis?', chips: ['mewarnai gambar', 'mencelupkan ke cat', 'memakai kuas'] },
  { clues: ['Aku belajar hal baru dari tulisan.', 'Aku membaca dari awal hingga akhir.', 'Aku menyimpan bacaan itu di rak setelah selesai.'], options: ['buku', 'gitar', 'raket', 'bola'], answer: 'buku', hint: 'Benda apa yang bisa dibaca lalu disimpan di rak?', chips: ['belajar dari tulisan', 'membaca sampai selesai', 'menyimpan buku'] },
]

// Peran kelompok berputar tiap level
export function rolesFor(levelId) {
  return ROLES.map((role, i) => ({ no: ((i + levelId - 1) % 4) + 1, role }))
}

// ratio = bagian jawaban yang benar pada percobaan pertama (0 sampai 1)
export function scoreFrom(ratio) {
  const stars = ratio >= 0.85 ? 3 : ratio >= 0.55 ? 2 : 1
  return { stars, points: Math.round(MAX_POINTS * ratio) }
}

export function titleFor(total) {
  if (total >= 90) return 'Detektif Ahli Bahasa'
  if (total >= 70) return 'Detektif Andal'
  if (total >= 50) return 'Detektif Muda'
  return 'Detektif Pantang Menyerah'
}