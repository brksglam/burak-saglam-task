# Mini Course & Live Lesson Platform

Bu proje, teknik değerlendirme süreci kapsamında **Next.js 16**, **TypeScript** ve **Tailwind CSS** kullanılarak geliştirilmiştir. Proje, Udemy benzeri kurs satın alma ve Uber benzeri eğitmen eşleştirme mantıklarını içeren hibrit bir mimari örneğidir.

## Genel Bakış

Uygulama temel olarak 3 ana modülden oluşmaktadır:

1.  **Kimlik Yönetimi**: Ziyaretçi, Öğrenci, Eğitmen ve Admin rolleri arasında geçiş yapabilen simüle edilmiş bir auth sistemi.
2.  **Kurs Modülü (Mini Udemy)**: Kurs listeleme, detay görüntüleme ve simüle edilmiş kredi kartı ödeme altyapısı.
3.  **Canlı Ders Modülü (Mini Uber)**: Öğrencilerin anlık ders talebi oluşturabildiği ve sistemin otomatik/manuel olarak eğitmen atadığı eşleştirme sistemi.

## Teknoloji Yığını

*   **Framework**: Next.js 16 (App Router)
*   **Dil**: TypeScript
*   **Stil**: Tailwind CSS v4
*   **State Yönetimi**: React Context (Client) + Server Actions (Server)
*   **Database**: JSON tabanlı dosya sistemi (Mock DB)

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## Kullanım Senaryoları & Test

Sistemde oturum işlemleri için sağ üstteki menüden hazır profilleri seçebilirsiniz.

| Rol | Email | Yetkiler |
|---|---|---|
| **Öğrenci** | student@example.com | Kurs satın alma, ders talebi oluşturma, profil görüntüleme. |
| **Eğitmen** | instructor@example.com | Gelen ders taleplerini görüntüleme, onaylama/reddetme. |
| **Admin** | admin@example.com | Sistem genelindeki metrikleri izleme ve manuel atama yapma. |

### Önemli Özellikler

*   **Ödeme Simülasyonu**: Ödeme servisi, gerçek dünya senaryolarını test etmek amacıyla %10 hata payı (random failure) ve ağ gecikmesi ile kurgulanmıştır.
*   **Eşleştirme Algoritması**: Ders taleplerinde belirli bir eğitmen seçilmezse, sistem "Otomatik Eşleştirme" modunda çalışarak veritabanındaki ilk uygun eğitmeni atar.

## Notlar

*   Proje veri kalıcılığı (persistence) için `data/db.json` dosyasını kullanmaktadır.
*   Tüm iş mantığı (Business Logic) `src/actions` altında Server Action olarak, UI komponentleri ise `src/app` altında Client Component olarak ayrılmıştır.
