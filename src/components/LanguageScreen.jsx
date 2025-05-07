import React from 'react';
import { Box, Button, Typography, Paper, Stack, Avatar } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const languages = [
  { label: 'ENGLISH', value: 'en' },
  { label: 'BISAYA', value: 'bisaya' },
  { label: 'TAGALOG', value: 'tagalog' },
];

const LanguageScreen = ({ setCurrentScreen }) => (
  <Box
    id="language-screen"
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      p: 0,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Paper
      elevation={4}
      sx={{
        px: { xs: 2, sm: 8 },
        py: { xs: 4, sm: 8 },
        borderRadius: 6,
        minWidth: 340,
        maxWidth: 480,
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
      }}
    >
      <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72, mb: 2 }}>
        <LanguageIcon sx={{ fontSize: 44 }} />
      </Avatar>
      <Typography variant="h3" color="primary" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>
        Welcome
      </Typography>
      <Typography variant="h5" color="text.secondary" fontWeight={500} mb={4}>
        Please select your language
      </Typography>
      <Stack spacing={3} sx={{ width: '100%' }}>
        {languages.map(lang => (
          <Button
            key={lang.value}
            variant="contained"
            size="large"
            fullWidth
            sx={{
              borderRadius: 5,
              fontWeight: 700,
              fontSize: '1.5rem',
              py: 2.5,
              letterSpacing: 1,
              boxShadow: 3,
              textTransform: 'none',
            }}
            onClick={() => setCurrentScreen('service-screen')}
          >
            {lang.label}
          </Button>
        ))}
      </Stack>
    </Paper>
  </Box>
);

export default LanguageScreen;
