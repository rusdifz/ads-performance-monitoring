1. Apa pendekatan kamu untuk mengevaluasi performa iklan vs kontrak ?
   Untuk mengevaluasi performa iklan beberapa pendekatan yang akan saya lakukan :

   1. saya akan membandingkan matrik aktual dengan kpi target yang tertera di kontrak lalu hitung persentasi pencapaian
   2. Membuat cronjob untuk menganalisa trend harian/mingguan untuk mendeteksi perubahan drastis (con: penurunan CTR atau penurunan laju impresi) dan kirim notifkasi ke email atau dashboard jika pencapaian jauh dari expetasi
   3. Simpan data performa terstruktur di database (tabel per kontrak/KPI) dan jalankan query terjadwal atau proses batch yang menghitung pencapaian vs target secara otomatis.
   4. Terapkan logika bisnis kontrak (misalnya batas pengeluaran, penalti/bonus) dalam penghitungan KPI. Pastikan hasil analisis memperhitungkan semua parameter kontrak.

2. Jika client punya banyak kontrak dan KPI sekaligus, bagaimana desain datanya agar scalable?
   dari latar belakang yang di berikan, saya akan membuat entitas berikut :

| Tabel          | Kolom                                                                           | Keterangan                      |
| -------------- | ------------------------------------------------------------------------------- | ------------------------------- |
| Clients        | `id` (PK), `name`                                                               | Data klien                      |
| Contracts      | `id` (PK), `client_id` (FK), `kpi_type`, `kpi_target`, `start_date`, `end_date` | Kontrak per client dengan KPI   |
| AdPerformances | `id` (PK),`client_id`(FK),`contract_id` (FK), `date`, `kpi_type`,`actual_value` | Performa iklan per hari per KPI |

selain itu di setiap entitas / tabel akan saya buat indexing ke kolom yang sering di gunakan untuk pencarian, untuk penjelasan detail dan schema database akan saya jelaskan via pdf

3. Jika performa data datang dari sistem eksternal tiap 6 jam, bagaimana kamu desain
   sistem ingest-nya?
   disini saya mengasumsikan flow data yang akan berjalan seperti di ini : eksternal -> send file -> system check file -> validate data -> insert database

   langkah yang akan saya buat antara lain :

   1. menyiapkan endpoint untuk di akses oleh pihak ekstrenal yang mendukung upload file excel,
   2. menyiapkan cronjob yang mana berjalan setiap 6 jam sekali atau menyesuaikan dengan waktu dari pihak eksternal untuk membaca berkas dan mengunggahnya ke database internal,
   3. Membuat validasi schema agar data konsisten dan buat validasi untuk memastikan tidak ada ada duplikasi selama cronjob berjalan
   4. Menambahkan log system untuk mencatat history dari cronjob
