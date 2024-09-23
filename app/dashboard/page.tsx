// app/dashboard/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, Box, Chip, Dialog, DialogTitle, DialogContent } from '@mui/material';
import Navigation from '../../components/Navigation';
import CreateListing from '../../components/CreateListing';
import { useAuth } from '../../lib/authContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

interface Listing {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: string;
  course_number: string;
}

export default function Dashboard() {
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchUserListings();
    }
  }, [user, router, fetchUserListings]);

  const fetchUserListings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserListings(data || []);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
}, [user]);

  const handleListingCreated = () => {
    setShowCreateForm(false);
    fetchUserListings();
  };

  const handleDeleteListing = async (listingId: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', listingId);

      if (error) throw error;
      fetchUserListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Your Dashboard
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShowCreateForm(true)}
          >
            Create New Listing
          </Button>
        </Box>
        <Grid container spacing={3}>
          {userListings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" component="div" noWrap>
                    {listing.title}
                  </Typography>
                  <Typography color="text.secondary" noWrap>
                    {listing.author}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Chip label={listing.condition} color="primary" size="small" />
                    <Typography variant="h6" color="secondary">
                      ${listing.price.toFixed(2)}
                    </Typography>
                  </Box>
                  {listing.course_number && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Course: {listing.course_number}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">Edit</Button>
                  <Button size="small" color="error" onClick={() => handleDeleteListing(listing.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={showCreateForm} onClose={() => setShowCreateForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Listing</DialogTitle>
        <DialogContent>
          <CreateListing onListingCreated={handleListingCreated} />
        </DialogContent>
      </Dialog>
    </>
  );
}