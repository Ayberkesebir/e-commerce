import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  Paper
} from '@mui/material';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      console.log('Sending form data:', formData);

      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(response)
      console.log('Status:', response.status);

      if (response.ok) {
        setMessage('Form başarıyla gönderildi!');
        setSeverity('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        });
      } else {
        setMessage(data.message || 'Bir hata oluştu.');
        setSeverity('error');
      }
    } catch (error) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      setSeverity('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          İletişim Formu
        </Typography>

        {message && (
          <Alert severity={severity} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="İsim"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Soyisim"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Adresi"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Telefon Numarası"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Gönderiliyor...' : 'Gönder'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactForm;