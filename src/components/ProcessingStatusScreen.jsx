
import React, { useEffect } from 'react';
import Navigation from './Navigation';
import PrintIcon from '@mui/icons-material/Print';
import ScannerIcon from '@mui/icons-material/Scanner';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Typography, Paper, Stack, Avatar } from '@mui/material';

// Simple contextual animation (SVG or icon-based)
function PrintAnimation() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
      <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72, mb: 2 }}>
        <PrintIcon sx={{ fontSize: 48 }} />
      </Avatar>
      <Box sx={{ width: 60, height: 60, position: 'relative', mt: 1 }}>
        {/* Paper sliding animation */}
        <Box
          sx={{
            width: 36,
            height: 48,
            bgcolor: 'background.paper',
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: 2,
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            animation: 'printPaper 1.2s infinite',
          }}
        />
        <style>{`
          @keyframes printPaper {
            0% { top: 0; opacity: 0.7; }
            30% { top: 10px; opacity: 1; }
            60% { top: 30px; opacity: 1; }
            100% { top: 50px; opacity: 0.2; }
          }
        `}</style>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Printing your document...</Typography>
    </Box>
  );
}

function ScanAnimation() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
      <Avatar sx={{ bgcolor: 'primary.main', width: 72, height: 72, mb: 2 }}>
        <ScannerIcon sx={{ fontSize: 48 }} />
      </Avatar>
      <Box sx={{ width: 60, height: 60, position: 'relative', mt: 1 }}>
        {/* Scanning bar animation */}
        <Box
          sx={{
            width: 48,
            height: 36,
            bgcolor: 'background.paper',
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: 2,
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: 6,
              bgcolor: 'primary.light',
              position: 'absolute',
              left: 0,
              top: 0,
              animation: 'scanBar 1.2s infinite',
            }}
          />
        </Box>
        <style>{`
          @keyframes scanBar {
            0% { top: 0; opacity: 0.7; }
            40% { top: 12px; opacity: 1; }
            80% { top: 24px; opacity: 1; }
            100% { top: 30px; opacity: 0.2; }
          }
        `}</style>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Scanning your document...</Typography>
    </Box>
  );
}

const ProcessingStatusScreen = ({ setCurrentScreen, selectedService, jobDetails }) => {
    // Simulate processing delay and then navigate
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentScreen('confirmation-screen');
        }, 3000); // Simulate a 3-second processing time

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [setCurrentScreen]);

    // Determine which animation to show
    let animation;
    let label;
    const service = (jobDetails && jobDetails.service?.toLowerCase()) || selectedService;
    if (service === 'scan') {
      animation = <ScanAnimation />;
      label = 'Scanning';
    } else if (service === 'photocopy') {
      animation = <PrintAnimation />;
      label = 'Copying';
    } else {
      animation = <PrintAnimation />;
      label = 'Printing';
    }

    return (
        <section id="processing-status-screen" className="screen active">
            <h1 id="status-title">{label} in Progress...</h1>
            {animation}
            <div className="progress-indicator" style={{ margin: 'var(--spacing-xl) 0' }}>
                <p>Please wait.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                    <div className="progress-dot active" style={{width: '10px', height: '10px', backgroundColor: 'var(--primary)', borderRadius: '50%'}}></div>
                    <div className="progress-dot" style={{width: '10px', height: '10px', backgroundColor: 'var(--outline)', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out'}}></div>
                    <div className="progress-dot" style={{width: '10px', height: '10px', backgroundColor: 'var(--outline)', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out 0.5s'}}></div>
                </div>
            </div>
            {/* Navigation hidden intentionally for this screen */}
            <Navigation hideBack hideNext />
        </section>
    );
}

export default ProcessingStatusScreen;
