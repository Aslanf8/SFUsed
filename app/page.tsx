// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, CardActions, InputAdornment, Chip, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Navigation from '../components/Navigation';
import { supabase } from '../lib/supabaseClient';
// import Image from 'next/image';

interface Listing {
  id: number;
  title: string;
  author: string;
  price: number;
  condition: string;
  course_number: string;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) {
        throw error;
      } else {
        setListings(data || []);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .or(`title.ilike.%${search}%,author.ilike.%${search}%,course_number.ilike.%${search}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching listings:', error);
    } else {
      setListings(data || []);
    }
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to SFUsed Books
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Find and sell textbooks within the SFU community
          </Typography>
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for textbooks by title, author, or course number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={handleSearch}>
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <Grid container spacing={3}>
          {listings.map((listing) => (
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
                  <Button size="small" color="primary">View Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}