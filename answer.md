1. Pendekatan Evaluasi Performa Iklan vs Kontrak
   Untuk mengevaluasi performa iklan beberapa pendekatan yang akan saya lakukan : ,
   saya akan membandingkan matrik aktual dengan kpi target yang tertera di kontrak lalu hitung persentasi pencapaian
   Membuat cronjob untuk menganalisa trend harian/mingguan untuk mendeteksi perubahan drastis (con: penurunan CTR atau penurunan laju impresi) dan kirim notifkasi ke email atau dashboard jika pencapaian jauh dari expetasi
   Simpan data performa terstruktur di database (tabel per kontrak/KPI) dan jalankan query terjadwal atau proses batch yang menghitung pencapaian vs target secara otomatis.
   Terapkan logika bisnis kontrak (misalnya batas pengeluaran, penalti/bonus) dalam penghitungan KPI. Pastikan hasil analisis memperhitungkan semua parameter kontrak.

2. Desain Sistem Ingest Data Setiap 6 Jam
   Saya akan membuat cronjob setiap 6 jam sekali atau menyesuaikan dengan waktu dari pihak eksternal untuk membaca berkas dan mengunggahnya ke database internal
   Membuat validasi schema agar data konsisten dan buat validasi untuk memastikan tidak ada ada duplikasi selama cronjob berjalan
   Menambahkan log system untuk mencatat history dari cronjob
