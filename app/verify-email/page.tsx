// app/verify-email/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { Container, Typography, Alert, CircularProgress } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

function VerifyEmailContent() {
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (type !== 'signup' || !token) {
        setError('Invalid verification link');
        setVerifying(false);
        return;
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token,
          type: 'signup',
          email: '',
        });
        if (error) throw error;
        
        // Redirect to login page after successful verification
        router.push('/login');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [router, searchParams]);

  if (verifying) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Verifying your email...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Email Verification
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {!error && (
        <Alert severity="success">
          Your email has been verified. You can now log in.
        </Alert>
      )}
    </Container>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <VerifyEmailContent />
    </Suspense>
  );
}