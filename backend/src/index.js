const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Konfigürasyon
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-chatbot')
  .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch(err => console.error('❌ MongoDB hatasıı:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Backend çalışıyor' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server hatası' });
});

// Sunucu Başlatma
app.listen(PORT, () => {
  console.log(`🚀 Backend sunucusu ${PORT} portunda çalışıyor`);
  console.log(`📍 http://localhost:${PORT}`);
});

module.exports = app;
