import React from 'react';
import { Box, Paper, Typography, Button, Stack, IconButton, Fade } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScannerIcon from '@mui/icons-material/Scanner';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const services = [
  {
    key: 'print',
    label: 'Print',
    description: 'Print documents from your files',
    icon: <PrintIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  },
  {
    key: 'photocopy',
    label: 'Photocopy',
    description: 'Make copies of physical documents',
    icon: <ContentCopyIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  },
  {
    key: 'scan',
    label: 'Scan',
    description: 'Convert physical documents to digital files',
    icon: <ScannerIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  },
];

const ServiceScreen = ({ setCurrentScreen, setSelectedService }) => (
  <Fade in timeout={400}>
    <Box
      id="service-screen"
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
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
        }}
      >
        <Typography variant="h3" color="primary" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>
          Select a Service
        </Typography>
        <Typography variant="h6" color="text.secondary" fontWeight={500} mb={4}>
          Choose the service you need today
        </Typography>
        {/* Spacious triangular grid layout */}
        <Box sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 500,
          height: { xs: 320, sm: 400 },
          mx: 'auto',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Top center - Print */}
          <Box sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translate(-50%, 0)',
            width: { xs: 150, sm: 180 },
            zIndex: 2,
          }}>
            <Button
              onClick={() => { setSelectedService(services[0].key); setCurrentScreen('attach-file-screen'); }}
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 150,
                width: '100%',
                borderRadius: '50%',
                boxShadow: 3,
                bgcolor: 'background.paper',
                p: 3,
                transition: 'box-shadow 0.2s, background 0.2s',
                '&:hover': {
                  boxShadow: 8,
                  bgcolor: 'primary.light',
                },
                textTransform: 'none',
              }}
            >
              {services[0].icon}
              <Typography variant="h5" fontWeight={700} color="text.primary" mt={1} mb={0.5}>
                {services[0].label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {services[0].description}
              </Typography>
              <ArrowForwardIosIcon color="primary" sx={{ mt: 1 }} />
            </Button>
          </Box>
          {/* Bottom left - Photocopy */}
          <Box sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: { xs: 130, sm: 160 },
            zIndex: 1,
          }}>
            <Button
              onClick={() => { setSelectedService(services[1].key); setCurrentScreen('attach-file-screen'); }}
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 130,
                width: '100%',
                borderRadius: '50%',
                boxShadow: 2,
                bgcolor: 'background.paper',
                p: 2,
                transition: 'box-shadow 0.2s, background 0.2s',
                '&:hover': {
                  boxShadow: 6,
                  bgcolor: 'primary.light',
                },
                textTransform: 'none',
              }}
            >
              {services[1].icon}
              <Typography variant="h6" fontWeight={700} color="text.primary" mt={1} mb={0.5}>
                {services[1].label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {services[1].description}
              </Typography>
              <ArrowForwardIosIcon color="primary" sx={{ mt: 1 }} />
            </Button>
          </Box>
          {/* Bottom right - Scan */}
          <Box sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: { xs: 130, sm: 160 },
            zIndex: 1,
          }}>
            <Button
              onClick={() => { setSelectedService(services[2].key); setCurrentScreen('attach-file-screen'); }}
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 130,
                width: '100%',
                borderRadius: '50%',
                boxShadow: 2,
                bgcolor: 'background.paper',
                p: 2,
                transition: 'box-shadow 0.2s, background 0.2s',
                '&:hover': {
                  boxShadow: 6,
                  bgcolor: 'primary.light',
                },
                textTransform: 'none',
              }}
            >
              {services[2].icon}
              <Typography variant="h6" fontWeight={700} color="text.primary" mt={1} mb={0.5}>
                {services[2].label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {services[2].description}
              </Typography>
              <ArrowForwardIosIcon color="primary" sx={{ mt: 1 }} />
            </Button>
          </Box>
        </Box>
        <Stack direction="row" justifyContent="flex-start" sx={{ width: '100%' }}>
          <IconButton
            color="primary"
            size="large"
            onClick={() => setCurrentScreen('language-screen')}
            sx={{ borderRadius: 3 }}
            aria-label="Back"
          >
            <ArrowBackIcon sx={{ fontSize: 32 }} />
            <Typography sx={{ ml: 1, fontWeight: 600, fontSize: '1.1rem' }}>Back</Typography>
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  </Fade>
);

export default ServiceScreen;
