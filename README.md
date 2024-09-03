<p align="center">
<img src="https://github.com/Morsmalleo/L3MON/raw/master/server/assets/webpublic/logo.png" height="60"><br>
Suite manajemen android jarak jauh berbasis cloud, didukung oleh NodeJS
</p>

<h1 align="center">Hallo saya Reza Mahendra</h1>

**Peringatan** !!

Anda adalah satu-satunya yang bertanggung jawab atas segala jenis penggunaan alat ini, pengembang tidak bertanggung jawab sama sekali.

<p>gunakanlah untuk hp sendiri jadi ketika hp kalian hilang tools ini bisa digunakan untuk melacak, memonitoring kamera untuk mengetahui hp kalian yang hilang atau dicuri orang.</p>

## Fitur
- Pencatatan GPS
- Rekaman Mikrofon
- Lihat Kontak
- Log SMS
- Kirim SMS
- Log Panggilan
- Lihat Aplikasi Terinstal
- Lihat Izin Stub
- Pencatatan Clipboard Langsung
- Pencatatan Notifikasi Langsung
- Lihat Jaringan WiFi (log yang dilihat sebelumnya)
- File Explorer & Downloader
- Antrean Perintah
- Pembuat APK Bawaan

## Prasyarat
- Java Runtime Environment 8
- Lihat [instalasi](#Instalasi) untuk spesifikasi OS
- NodeJs
- Server

## Instalasi
1. Instal JRE 8 (Kami tidak dapat cukup menekankan ini GUNAKAN java 1.8.0 APAPUN masalah yang tidak menggunakan ini akan ditutup TANPA respons)
- Debian, Ubuntu, Dll
- `sudo apt-get install openjdk-8-jre`
- Fedora, Oracle, Red Hat, dll
- `su -c "yum install java-1.8.0-openjdk"`
- Windows
- klik [DI SINI](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) untuk mengunduh

2. Instal NodeJS [Petunjuk di Sini](https://nodejs.org/en/download/package-manager/) (Jika Anda tidak dapat menemukan ini, Anda seharusnya tidak menggunakan ini)

3. instal PM2
- `npm install pm2 -g`

4. Unduh dan Ekstrak

5. Di folder yang diekstrak, jalankan perintah berikut
- `npm install` <- install dependencies
- `pm2 start index.js` <-- jalankan skrip
- `pm2 startup` <- untuk menjalankan L3MON saat startup

6. Buat Akun di peramban Anda, navigasikan ke `http://<SERVER IP>:22533/register`

Disarankan untuk menjalankan L3MON di balik proxy terbalik seperti [NGINX](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)

## Catatan
Saat membuka masalah, Anda **HARUS** menggunakan templat yang disediakan. Masalah tanpa ini tidak akan segera menerima dukungan dan akan diletakkan di bagian bawah tumpukan kiasan.

Harap lihat masalah terkini, terbuka dan tertutup untuk melihat apakah masalah Anda telah ditangani sebelumnya. Jika ini terkait dengan Java, pasti sudah ditangani - Singkatnya Gunakan Java 1.8.0

## Tangkapan Layar
| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/call_log.png"> <img width="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/call_log.png"> Log Panggilan</a> | <a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/apk_builder.png"> <img lebar="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/apk_builder.png"> Pembuat APK</a> |<a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/clipboard.png"> <img lebar="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/clipboard.png"> Catatan Papan Klip</a>|| <a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/contacts.png"> <img width="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/contacts.png"> Kontak</a> | <a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/devices.png"> <img lebar="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/devices.png"> Perangkat</a>|<a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/file_explorer.png"> <img lebar="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/file_explorer.png"> Penjelajah Berkas</a>|| <a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/gps_log.png"> <img width="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/gps_log.png"> Catatan GPS</a> | <a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/sms_log.png"> <img lebar="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/sms_log.png"> Catatan SMS</a> |<a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/sms_send.png"> <img lebar="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/sms_send.png"> Kirim SMS</a>|| <a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/installed_apps.png"> <img width="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/installed_apps.png"> Aplikasi yang Terinstal</a> | <a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/microphone.png"> <img width="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/microphone.png"> Mikrofon</a> |<a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/notification_log.png"> <img width="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/notification_log.png"> Notifikasi</a>|| <a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/event_log.png"> <img lebar="1604" src="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/event_log.png"> Catatan Peristiwa</a> | <a href="https://github.com/Morsmalleo/L3MON/raw/master/Screenshots/login.png"> <img lebar="1604" src="https:/
