'use client';

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import Navigation from '../../components/Navigation';
import { useAuth } from '../../lib/authContext';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash'; // Make sure to install lodash: npm install lodash

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
  }

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signUp } = useAuth();
  const router = useRouter();
  const debouncedSignUp = debounce(async (email, password, name, studentNumber) => {
    try {
      await signUp(email, password, name, studentNumber);
      setSuccess('Registration successful. Please check your email to confirm your account.');
      setTimeout(() => router.push('/login'), 5000);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      if (errorMessage.includes('Too many requests')) {
        setError('Too many signup attempts. Please try again later.');
      } else {
        setError(errorMessage);
      }
    }
  }, 1000);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    debouncedSignUp(email, password, name, studentNumber);
  };
  return (
    <>
      <Navigation />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="studentNumber"
            label="Student Number"
            name="studentNumber"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Container>
    </>
  );
}