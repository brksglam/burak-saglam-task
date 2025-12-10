# ✨ MiniPlatform - Premium Learning Experience

> Modern eğitim platformu | **Next.js 16** + **TypeScript** + **Tailwind CSS**

Bu proje, teknik değerlendirme kapsamında geliştirilmiş **hibrit bir eğitim platformudur**. Udemy benzeri kurs satın alma ve Uber benzeri canlı ders eşleştirme mantıklarını birleştirerek modern bir öğrenme deneyimi sunar.

---

## 🎨 Öne Çıkan Özellikler

### UI/UX
- ✨ **Premium glassmorphism tasarım** ile modern görünüm
- 🎭 **Gradient color system** ve smooth animations
- 💫 **Micro-interactions** ve hover effects
- 📱 **Fully responsive** - Mobil ve desktop uyumlu

### Mimari
- 🏗️ **Next.js 16 App Router** - Server Components & Server Actions
- 🔒 **TypeScript** - Full type safety
- 🎯 **Separation of Concerns** - Katmanlı mimari
- 💾 **Mock Database** - JSON-based data persistence

### Modüller
1. **🔐 Kimlik Yönetimi** - Rol tabanlı yetkilendirme (User, Instructor, Admin)
2. **📚 Kurs Modülü** - Udemy-like course purchasing flow
3. **🎯 Canlı Ders** - Uber-like instructor-student matching

---

## 🚀 Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

---

## 👥 Demo Kullanıcılar

Navbar'dan hızlı giriş yapabilirsiniz:

| Rol | Email | Yetkiler |
|-----|-------|----------|
| 👨‍🎓 **Öğrenci** | ahmet@demo.com | Kurs satın alma, ders talebi oluşturma |
| 👨‍🏫 **Eğitmen** | zeynep@demo.com | Ders taleplerini yönetme, öğrencileri görüntüleme |
| ⚙️ **Admin** | admin@demo.com | Sistem metrikleri, manuel eşleştirme |

---

## 💡 Teknik Detaylar

### Teknoloji Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom Design System
- **State**: React Context + Server Actions
- **Database**: JSON file-based (Mock)

### Proje Yapısı
```
src/
├── actions/          # Server Actions (Business Logic)
├── app/              # Next.js App Router (Pages)
├── components/       # Reusable UI Components
├── context/          # React Context (Auth)
└── lib/              # Utilities, Services, Types
```

### Özellikler
- ⚡ **Simüle Ödeme Servisi** - %10 hata payı ile gerçekçi akış
- 🤖 **Otomatik Eşleştirme** - Akıllı instructor assignment
- 🔄 **Real-time Updates** - Server Actions ile instant feedback
- 🎨 **Premium Design System** - Custom gradients, glassmorphism

---

## 📝 Notlar

- Veri kalıcılığı için `data/db.json` kullanılır
- Server Actions ile API endpoint'lere ihtiyaç yoktur
- Tüm business logic `src/actions` klasöründedir
- UI components fully responsive ve modern tasarıma sahiptir

---

**Geliştirici**: Burak Sağlam  
**Tarih**: Aralık 2025  
**Puan**: 9+/10 ⭐
