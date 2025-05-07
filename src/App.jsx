import React, { useState } from 'react';
import './index.css';
import LanguageScreen from './components/LanguageScreen';
import ServiceScreen from './components/ServiceScreen';
import AttachFileScreen from './components/AttachFileScreen';
import PrintSettingsScreen from './components/PrintSettingsScreen';
import ScanSettingsScreen from './components/ScanSettingsScreen';
import PaymentSettingsScreen from './components/PaymentSettingsScreen';
import ProcessingStatusScreen from './components/ProcessingStatusScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import ThankYouScreen from './components/ThankYouScreen';
import { Box, Paper, Typography, Avatar, Stack } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

function App() {
  const [currentScreen, setCurrentScreen] = useState('language-screen');
  const [selectedService, setSelectedService] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [jobDetails, setJobDetails] = useState(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'language-screen':
        return <LanguageScreen setCurrentScreen={setCurrentScreen} />;
      case 'service-screen':
        return <ServiceScreen setCurrentScreen={setCurrentScreen} setSelectedService={setSelectedService} />;
      case 'attach-file-screen':
        return <AttachFileScreen setCurrentScreen={setCurrentScreen} selectedService={selectedService} />;
      case 'print-settings-screen':
        return <PrintSettingsScreen setCurrentScreen={setCurrentScreen} selectedService={selectedService} setTotalCost={setTotalCost} />;
      case 'scan-settings-screen':
        return <ScanSettingsScreen setCurrentScreen={setCurrentScreen} setTotalCost={setTotalCost} />;
      case 'payment-settings-screen':
        return <PaymentSettingsScreen setCurrentScreen={setCurrentScreen} selectedService={selectedService} totalCost={totalCost} setJobDetails={setJobDetails} />;
      case 'processing-status-screen':
        return <ProcessingStatusScreen setCurrentScreen={setCurrentScreen} selectedService={selectedService} jobDetails={jobDetails} />;
      case 'confirmation-screen':
        return <ConfirmationScreen setCurrentScreen={setCurrentScreen} jobDetails={jobDetails} />;
      case 'thank-you-screen':
        return <ThankYouScreen setCurrentScreen={setCurrentScreen} />;
      default:
        return <LanguageScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Material 3 Modern Header */}
      <Paper
        elevation={3}
        sx={{
          borderRadius: '0 0 32px 32px',
          bgcolor: 'background.paper',
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
          px: { xs: 2, sm: 6 },
          py: { xs: 2, sm: 3 },
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          minHeight: { xs: 72, sm: 96 },
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>
          <PrintIcon sx={{ fontSize: 36 }} />
        </Avatar>
        <Stack direction="column" sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 800, letterSpacing: 1, color: 'primary.main', fontSize: { xs: '1.6rem', sm: '2.2rem' } }}
          >
            E-Print Station
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: 'text.secondary', fontWeight: 500, fontSize: { xs: '1rem', sm: '1.15rem' }, mt: 0.5 }}
          >
            Self-Service Printing & Scanning Kiosk
          </Typography>
        </Stack>
      </Paper>
      <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: { xs: 1, sm: 3 }, overflow: 'hidden' }}>
        {renderScreen()}
      </Box>
    </Box>
  );
}

export default App;
