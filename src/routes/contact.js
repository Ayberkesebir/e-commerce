const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    
    // Form validasyonu
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ message: 'Tüm alanlar gereklidir.' });
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Geçerli bir email adresi giriniz.' });
    }

    // Burada veritabanına kayıt işlemi yapılabilir
    console.log('Form data received:', { firstName, lastName, email, phone });

    // Başarılı yanıt
    res.status(200).json({ message: 'Form başarıyla alındı' });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ message: 'Sunucu hatası oluştu' });
  }
});

module.exports = router;