require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static dosya servis etme
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Body parser
app.use(express.json());
// API Routes
app.get('/welcome', (req, res) => {
  res.json({ message: 'Hoşgeldiniz! Node.js API çalışıyor.' });
});

// Contact Routes
const contactRouter = require('./routes/contact');
app.use('/contact', contactRouter);

// React uygulaması için catch-all route
// Bu route API rotalarından sonra gelmeli
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Bir şeyler ters gitti!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});