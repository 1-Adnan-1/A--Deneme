const express = require('express');
const Chat = require('../models/Chat');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware: JWT Kontrol
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token gerekli' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Geçersiz token' });
  }
};

// YENİ SOHBET BAŞLAT
router.post('/new', authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    
    const chat = new Chat({
      userId: req.userId,
      title: title || 'Yeni Sohbet',
      messages: []
    });

    await chat.save();

    res.status(201).json({
      success: true,
      chat
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sohbet oluşturulamadı' });
  }
});

// MESAJ GÖNDER
router.post('/message', authMiddleware, async (req, res) => {
  try {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
      return res.status(400).json({ error: 'chatId ve message gerekli' });
    }

    // Sohbeti bul
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Sohbet bulunamadı' });
    }

    // Kullanıcı mesajı ekle
    chat.messages.push({
      role: 'user',
      content: message
    });

    // Simüle edilmiş AI Yanıtı (daha sonra gerçek OpenAI API ile değiştirilecek)
    const aiResponse = `Bu benim cevabım: "${message}" hakkında bilgi sağlayabilirim.`;
    
    chat.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    chat.updatedAt = Date.now();
    await chat.save();

    res.json({
      success: true,
      chat
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Mesaj gönderilemedi' });
  }
});

// SOHBET GEÇMİŞİ
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId })
      .sort({ updatedAt: -1 })
      .select('_id title createdAt updatedAt');

    res.json({
      success: true,
      chats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Geçmiş alınamadı' });
  }
});

// SOHBET DETAYI
router.get('/:chatId', authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    
    if (!chat) {
      return res.status(404).json({ error: 'Sohbet bulunamadı' });
    }

    res.json({
      success: true,
      chat
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sohbet alınamadı' });
  }
});

// SOHBET SİL
router.delete('/:chatId', authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.chatId);
    
    if (!chat) {
      return res.status(404).json({ error: 'Sohbet bulunamadı' });
    }

    res.json({
      success: true,
      message: 'Sohbet silindi'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sohbet silinemedi' });
  }
});

module.exports = router;
