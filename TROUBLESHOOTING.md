# Troubleshooting Guide

## Backend Issues

### Issue: "Cannot find module 'mongoose'"
**Çözüm:**
```bash
cd backend
npm install
```

### Issue: "EADDRINUSE: address already in use :::5000"
**Çözüm:**
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: MongoDB bağlantısı başarısız
**Çözüm:**
1. MongoDB kurulu ve çalışıyor mu kontrol edin
2. `.env` dosyasında `MONGODB_URI` doğru mu?
3. MongoDB sunucusunu başlatın:
```bash
# Linux
sudo systemctl start mongodb

# Mac
brew services start mongodb-community
```

---

## Frontend Issues

### Issue: "npm ERR! code ENOENT"
**Çözüm:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "CORS error" (Frontend → Backend)
**Çözüm:**
1. Backend'in `.env` dosyasında `CLIENT_URL=http://localhost:3000`
2. Frontend'in `.env` dosyasında `REACT_APP_API_URL=http://localhost:5000`

### Issue: Port 3000 zaten kullanımda
**Çözüm:**
```bash
PORT=3001 npm start
```

---

## General Issues

### Git Issues
```bash
# Changes kaybetmeden clone yapın
git stash
git pull

# develop branch'ine geçin
git checkout develop
```

### Node version
```bash
# Node versiyonunu kontrol edin
node --version  # 16+ olmalı

# nvm ile güncelleyin
nvm install 18
nvm use 18
```
