/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Navigation.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useAuth } from '../lib/authContext';
import { Box, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
// import { AccountCircle } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #8C1D40 30%, #C1A01E 90%)',
  boxShadow: '0 3px 5px 2px rgba(140, 29, 64, .3)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '6px 16px',
  margin: '0 8px',
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Navigation = () => {
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          SFUsed Books
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" passHref>
            <StyledButton>Home</StyledButton>
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" passHref>
                <StyledButton>Dashboard</StyledButton>
              </Link>
              <StyledIconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {user.email?.[0].toUpperCase()}
                </Avatar>
              </StyledIconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={signOut}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <StyledButton>Login</StyledButton>
              </Link>
              <Link href="/register" passHref>
                <StyledButton variant="outlined" sx={{ borderColor: 'white', '&:hover': { borderColor: 'white' } }}>
                  Register
                </StyledButton>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navigation;