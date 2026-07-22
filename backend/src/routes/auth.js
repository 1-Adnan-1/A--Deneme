const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// JWT Token Oluştur
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// KAYIT
router.post('/register', [
  body('name').trim().notEmpty().withMessage('İsim gerekli'),
  body('email').isEmail().withMessage('Geçerli email gerekli'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalı')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Email zaten kayıtlı mı?
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Bu email zaten kayıtlı' });
    }

    // Yeni kullanıcı oluştur
    user = new User({
      name,
      email,
      password
    });

    await user.save();

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server hatası' });
  }
});

// GİRİŞ
router.post('/login', [
  body('email').isEmail().withMessage('Geçerli email gerekli'),
  body('password').notEmpty().withMessage('Şifre gerekli')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Geçersiz kimlik bilgileri' });
    }

    // Şifre kontrol et
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Geçersiz kimlik bilgileri' });
    }

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server hatası' });
  }
});

module.exports = router;
