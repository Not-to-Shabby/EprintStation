
import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { Paper, Box, Typography, Stack, Button, ToggleButton, ToggleButtonGroup, Divider, TextField, FormControlLabel, Switch, Select, MenuItem, Avatar } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PrintSettingsScreen = ({ setCurrentScreen, selectedService, setTotalCost }) => {
    const title = selectedService === 'photocopy' ? 'Photocopy Settings' : 'Print Settings';

    // Settings States
    const [copies, setCopies] = useState(1);
    const [colorMode, setColorMode] = useState('bw'); // 'bw', 'color'
    const [twoSided, setTwoSided] = useState(false);
    const [pageRange, setPageRange] = useState(''); // For print service
    const [saveDigitalCopy, setSaveDigitalCopy] = useState(false); // For photocopy service
    const [digitalCopyFormat, setDigitalCopyFormat] = useState('pdf'); // For photocopy service if saveDigitalCopy is true

    // Effect to reset specific photocopy/print options when service changes
    useEffect(() => {
        if (selectedService === 'print') {
            setSaveDigitalCopy(false);
        } else if (selectedService === 'photocopy') {
            setPageRange('');
        }
    }, [selectedService]);

    // Calculate cost based on settings
    useEffect(() => {
        let cost = 0;
        const baseCopyCost = 0.10;
        const colorCopyCost = 0.25;
        const twoSidedMultiplier = twoSided ? 1.8 : 1; // Example: 80% extra for two-sided

        if (selectedService === 'print' || selectedService === 'photocopy') {
            cost = copies * (colorMode === 'color' ? colorCopyCost : baseCopyCost) * twoSidedMultiplier;
        }
        // Add more sophisticated cost logic here, e.g., page range for print,
        // cost for saving digital copy for photocopy, etc.
        if (selectedService === 'photocopy' && saveDigitalCopy) {
            cost += 0.50; // Example: flat fee for saving a digital copy
        }

        setTotalCost(cost);
    }, [copies, colorMode, twoSided, pageRange, saveDigitalCopy, digitalCopyFormat, selectedService, setTotalCost]);

    return (
        <section id="print-settings-screen" className="screen active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
            <Paper elevation={4} sx={{ px: { xs: 2, sm: 6 }, py: { xs: 4, sm: 6 }, borderRadius: 6, minWidth: 320, maxWidth: 480, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)', background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>{selectedService === 'photocopy' ? <ContentCopyIcon /> : <PrintIcon />}</Avatar>
                    <Typography variant="h5" color="primary" fontWeight={800}>{title}</Typography>
                </Stack>
                <Divider sx={{ mb: 2, width: '100%' }} />
                <Stack spacing={3} sx={{ width: '100%' }}>
                    <Box>
                        <Typography fontWeight={600} mb={1}>Number of Copies</Typography>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                            <Button variant="outlined" onClick={() => setCopies(c => Math.max(1, c - 1))} sx={{ minWidth: 48, fontSize: 24, borderRadius: 2 }}>-</Button>
                            <TextField type="number" value={copies} onChange={e => setCopies(Math.max(1, parseInt(e.target.value) || 1))} inputProps={{ min: 1, style: { textAlign: 'center', fontWeight: 700, fontSize: 20 } }} sx={{ width: 80 }} size="small" />
                            <Button variant="outlined" onClick={() => setCopies(c => c + 1)} sx={{ minWidth: 48, fontSize: 24, borderRadius: 2 }}>+</Button>
                        </Stack>
                    </Box>
                    <Box>
                        <Typography fontWeight={600} mb={1}>Color Mode</Typography>
                        <ToggleButtonGroup value={colorMode} exclusive onChange={(_, v) => v && setColorMode(v)} sx={{ width: '100%' }}>
                            <ToggleButton value="bw" sx={{ flex: 1, fontWeight: 600 }}>Black & White</ToggleButton>
                            <ToggleButton value="color" sx={{ flex: 1, fontWeight: 600 }}>Color</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box>
                        <FormControlLabel control={<Switch checked={twoSided} onChange={e => setTwoSided(e.target.checked)} color="primary" />} label="Two-Sided Printing" sx={{ justifyContent: 'center', width: '100%' }} />
                    </Box>
                    {selectedService === 'print' && (
                        <Box>
                            <Typography fontWeight={600} mb={1}>Page Range</Typography>
                            <TextField type="text" value={pageRange} onChange={e => setPageRange(e.target.value)} placeholder="All pages" size="small" sx={{ width: '100%' }} />
                        </Box>
                    )}
                    {selectedService === 'photocopy' && (
                        <Box>
                            <FormControlLabel control={<Switch checked={saveDigitalCopy} onChange={e => setSaveDigitalCopy(e.target.checked)} color="primary" />} label="Save Digital Copy" sx={{ justifyContent: 'center', width: '100%' }} />
                            {saveDigitalCopy && (
                                <Box mt={2}>
                                    <Typography fontWeight={600} mb={1}>Digital Copy Format</Typography>
                                    <Select value={digitalCopyFormat} onChange={e => setDigitalCopyFormat(e.target.value)} size="small" sx={{ width: '100%' }}>
                                        <MenuItem value="pdf">PDF</MenuItem>
                                        <MenuItem value="jpeg">JPEG</MenuItem>
                                        <MenuItem value="png">PNG</MenuItem>
                                    </Select>
                                </Box>
                            )}
                        </Box>
                    )}
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

export default PrintSettingsScreen;
