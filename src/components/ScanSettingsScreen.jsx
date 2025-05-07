
import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Paper, Box, Typography, Stack, Button, ToggleButton, ToggleButtonGroup, Divider, FormControlLabel, Switch, Select, MenuItem } from '@mui/material';
import ScannerIcon from '@mui/icons-material/Scanner';

const ScanSettingsScreen = ({ setCurrentScreen, setTotalCost }) => {
    // Basic state for settings - expand as needed
    const [resolution, setResolution] = useState('300dpi'); // e.g., '150dpi', '300dpi', '600dpi'
    const [fileFormat, setFileFormat] = useState('pdf'); // e.g., 'pdf', 'jpeg', 'png'
    const [saveToUsb, setSaveToUsb] = useState(false);

    // Cost calculation based on settings
    useEffect(() => {
        let cost = 0;
        const baseScanCost = 0.20; // Base cost for any scan
        const highResolutionCost = 0.10; // Additional cost for 600 DPI
        const usbSaveCost = 0.15; // Cost for saving to USB

        cost += baseScanCost;

        if (resolution === '600dpi') {
            cost += highResolutionCost;
        }

        if (saveToUsb) {
            cost += usbSaveCost;
        }

        // File format might influence cost in more complex scenarios (e.g., OCR for PDF)
        // For now, fileFormat does not change the cost in this example.

        setTotalCost(cost);
    }, [resolution, fileFormat, saveToUsb, setTotalCost]);

    return (
        <section id="scan-settings-screen" className="screen active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
            <Paper elevation={4} sx={{ px: { xs: 2, sm: 6 }, py: { xs: 4, sm: 6 }, borderRadius: 6, minWidth: 320, maxWidth: 480, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)', background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Box sx={{ bgcolor: 'primary.main', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ScannerIcon sx={{ color: 'white', fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" color="primary" fontWeight={800}>Scan Settings</Typography>
                </Stack>
                <Divider sx={{ mb: 2, width: '100%' }} />
                <Stack spacing={3} sx={{ width: '100%' }}>
                    <Box>
                        <Typography fontWeight={600} mb={1}>Resolution</Typography>
                        <ToggleButtonGroup value={resolution} exclusive onChange={(_, v) => v && setResolution(v)} sx={{ width: '100%' }}>
                            <ToggleButton value="150dpi" sx={{ flex: 1, fontWeight: 600 }}>150 DPI</ToggleButton>
                            <ToggleButton value="300dpi" sx={{ flex: 1, fontWeight: 600 }}>300 DPI</ToggleButton>
                            <ToggleButton value="600dpi" sx={{ flex: 1, fontWeight: 600 }}>600 DPI</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box>
                        <Typography fontWeight={600} mb={1}>File Format</Typography>
                        <Select value={fileFormat} onChange={e => setFileFormat(e.target.value)} size="small" sx={{ width: '100%' }}>
                            <MenuItem value="pdf">PDF</MenuItem>
                            <MenuItem value="jpeg">JPEG</MenuItem>
                            <MenuItem value="png">PNG</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <FormControlLabel control={<Switch checked={saveToUsb} onChange={e => setSaveToUsb(e.target.checked)} color="primary" />} label="Save to USB Drive" sx={{ justifyContent: 'center', width: '100%' }} />
                    </Box>
                </Stack>
                <Divider sx={{ my: 3, width: '100%' }} />
                <Navigation
                    onBack={() => setCurrentScreen('attach-file-screen')}
                    onNext={() => setCurrentScreen('payment-settings-screen')}
                />
            </Paper>
        </section>
    );
}

export default ScanSettingsScreen;
