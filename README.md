# AI Chatbot Application 🤖

Modern fullstack yapay zeka chatbot uygulaması. React frontend ve Node.js backend ile geliştirilmiştir.

## 📋 Özellikler

- ✅ Real-time AI sohbet
- ✅ Sohbet geçmişi saklanması
- ✅ Modern ve responsive UI
- ✅ Kullanıcı kimlik doğrulaması
- ✅ REST API
- ✅ MongoDB veritabanı

## 🏗️ Proje Yapısı

```
A--Deneme/
├── backend/              # Node.js + Express sunucusu
│   ├── src/
│   │   ├── routes/      # API rotaları
│   │   ├── controllers/ # İş mantığı
│   │   ├── models/      # Veritabanı modelleri
│   │   └── config/      # Konfigürasyon
│   ├── .env.example
│   └── package.json
├── frontend/             # React uygulaması
│   ├── src/
│   │   ├── components/  # React bileşenleri
│   │   ├── pages/       # Sayfalar
│   │   ├── styles/      # Tailwind CSS
│   │   └── utils/       # Yardımcı fonksiyonlar
│   ├── .env.example
│   └── package.json
├── docker-compose.yml    # Docker kurulumu
└── .gitignore
```

## 🚀 Kurulum

### Gereksinimler
- Node.js 16+
- MongoDB
- npm veya yarn

### Backend Kurulumu

```bash
cd backend
npm install

# .env dosyasını oluşturun
cp .env.example .env

# .env dosyasını düzenleyin ve gerekli API anahtarlarını ekleyin
# OPENAI_API_KEY=your_key_here
# MONGODB_URI=mongodb://localhost:27017/ai-chatbot

# Sunucuyu başlatın
npm run dev
```

Backend `http://localhost:5000` adresinde çalışacak.

### Frontend Kurulumu

```bash
cd frontend
npm install

# .env dosyasını oluşturun
cp .env.example .env

# .env dosyasını düzenleyin
# REACT_APP_API_URL=http://localhost:5000

# Geliştirme sunucusunu başlatın
npm start
```

Frontend `http://localhost:3000` adresinde açılacak.

## 🐳 Docker ile Çalıştırma

```bash
docker-compose up -d
```

## 📚 API Endpoints

### Sohbet
- `POST /api/chat/message` - Mesaj gönder
- `GET /api/chat/history/:userId` - Geçmişi getir
- `DELETE /api/chat/history/:userId` - Geçmişi sil

### Kullanıcı
- `POST /api/auth/register` - Kayıt ol
- `POST /api/auth/login` - Giriş yap
- `POST /api/auth/logout` - Çıkış yap

## 🛠️ Teknolojiler

### Backend
- Express.js
- MongoDB & Mongoose
- OpenAI API
- JWT Authentication
- Cors

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Axios
- React Router

## 📝 Lisans

MIT
