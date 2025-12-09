# Mini Udemy/Uber Clone Project

Bu proje, bir teknik mülakat görevi kapsamında geliştirilmiş örnek bir uygulamadır.
**Next.js 14**, **TypeScript**, **Tailwind CSS** teknolojileri kullanılmıştır.

## Özellikler

### 1. Rol Bazlı Sistem (Auth Simulation)
*   **User (Öğrenci):** Eğitim satın alabilir, canlı ders talep edebilir.
*   **Instructor (Eğitmen):** Eşleştirmelerde atanır.
*   **Admin:** (Demo amaçlı eklenmiştir).
*   *Not:* Sağ üstteki menüden demo hesaplara tek tıkla giriş yapılabilir.

### 2. Mini Udemy (Eğitim Modülü)
*   Eğitimleri listeleme
*   Eğitim detayı ve "Satın Al" butonu
*   Mock Ödeme Simülasyonu (%90 başarı, %10 fail ihtimali, 1.5sn gecikme)
*   "Satın Aldığım Eğitimler" sayfası

### 3. Mini Uber (Canlı Ders Modülü)
*   Canlı ders talebi oluşturma
*   Mock Eşleştirme Servisi (İlk müsait eğitmeni atar)
*   Başarılı/Başarısız durum bildirimi

## Kurulum ve Çalıştırma

1.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

2.  Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```

3.  Tarayıcıda `http://localhost:3000` adresine gidin.

## Mimari Notlar
*   Veri tabanı olarak `MockDB` (In-Memory Singleton Class) kullanılmıştır. Sunucu yeniden başlatıldığında veriler sıfırlanır.
*   Tüm aksiyonlar (satın alma, eşleşme) **Server Actions** üzerinde simüle edilmiştir.
*   Tasarım için Tailwind CSS kullanılmıştır.

## Geliştiren
Burak Sağlam (Aday)
