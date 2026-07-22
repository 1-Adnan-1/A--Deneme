# Installation & Setup Guide

## 🚀 Hızlı Başlangıç

### 1. Repoyu Klonlayın
```bash
git clone https://github.com/1-Adnan-1/A--Deneme.git
cd A--Deneme
```

### 2. develop Branch'ine Geçin
```bash
git checkout develop
```

## 📋 Gereksinimler

- Node.js 16+ 
- MongoDB 5+
- npm veya yarn

## 🛠️ Backend Kurulumu

### Adım 1: Backend Klasörüne Girin
```bash
cd backend
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Environment Dosyası Oluşturun
```bash
cp .env.example .env
```

### Adım 4: .env Dosyasını Düzenleyin
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-chatbot
JWT_SECRET=your_super_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
CLIENT_URL=http://localhost:3000
```

### Adım 5: Sunucuyu Başlatın
```bash
npm run dev
```

✅ Backend sunucusu `http://localhost:5000` adresinde çalışıyor

---

## 💻 Frontend Kurulumu

### Adım 1: Yeni Terminal Açın ve Frontend Klasörüne Girin
```bash
cd frontend
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Environment Dosyası Oluşturun
```bash
cp .env.example .env
```

### Adım 4: .env Dosyasını Düzenleyin
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NAME=AI Chatbot
```

### Adım 5: Geliştirme Sunucusunu Başlatın
```bash
npm start
```

✅ Frontend uygulaması `http://localhost:3000` adresinde açılacak

---

## 🐳 Docker ile Çalıştırma (Opsiyonel)

### Adım 1: Docker Desktop'ı Kurun
https://www.docker.com/products/docker-desktop

### Adım 2: Docker Compose ile Başlatın
```bash
# Proje root klasöründe
docker-compose up -d
```

### Adım 3: Uygulamaya Erişin
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: `http://localhost:27017`

### Durdurma
```bash
docker-compose down
```

---

## 📚 API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

### Chat
- `POST /api/chat/new` - Yeni sohbet başlat
- `POST /api/chat/message` - Mesaj gönder
- `GET /api/chat/history` - Sohbet geçmişini getir
- `GET /api/chat/:chatId` - Belirli sohbeti getir
- `DELETE /api/chat/:chatId` - Sohbeti sil

### Health Check
- `GET /api/health` - Backend durumunu kontrol et

---

## 🧪 Test Etme

### 1. Yeni Hesap Oluşturun
1. `http://localhost:3000/register` adresine gidin
2. Ad, email ve şifre girin
3. "Kaydol" butonuna tıklayın

### 2. Sohbet Başlatın
1. Login sayfasında giriş yapın
2. "Yeni Sohbet" butonuna tıklayın
3. Mesaj yazıp "Gönder" butonuna tıklayın

### 3. Sohbet Yönetimi
- Sidebar'da sohbetleri görebilirsiniz
- Bir sohbete tıklayarak geçiş yapabilirsiniz
- Sohbetin sağına hover yapıp silme simgesine tıklayarak silebilirsiniz

---

## 🔗 Proje Yapısı

```
A--Deneme/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Chat.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── chat.js
│   │   └── index.js
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatMessage.js
│   │   │   └── ChatSidebar.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Chat.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   ├── Dockerfile
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚨 Sorun Giderme

### MongoDB bağlantı hatası
```bash
# MongoDB'nin çalışıp çalışmadığını kontrol edin
mongo --version
# Servisi başlatın
sudo systemctl start mongodb
```

### Port zaten kullanımda
```bash
# Port 5000 kullanımda mı?
lsof -i :5000
# Süreci öldürün
kill -9 <PID>
```

### CORS Hatası
Backend'in `.env` dosyasında `CLIENT_URL` doğru şekilde ayarlandığından emin olun.

### Node Modules İssüsü
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch'i oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişiklikleri commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'e push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request açın

---

## 📝 Lisans

MIT Lisansı altında dağıtılmaktadır.

---

## 📞 Destek

Sorunuz varsa, GitHub Issues'da rapor etebilirsiniz.

---

**Mutlu Hacking! 🚀**
