
import React, { useState } from 'react';
import Navigation from './Navigation';
import { Paper, Box, Typography, Stack, Button, Divider, Avatar } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

const PaymentSettingsScreen = ({ setCurrentScreen, selectedService, totalCost, setJobDetails }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const calculatedCost = totalCost || 0;

    const handlePayment = () => {
        // Simulate payment processing
        if (!selectedPaymentMethod) {
            alert("Please select a payment method."); // Simple validation
            return;
        }

        const details = {
            service: selectedService.charAt(0).toUpperCase() + selectedService.slice(1),
            cost: calculatedCost.toFixed(2),
            paymentMethod: selectedPaymentMethod,
            transactionId: `TXN-${Date.now()}`,
            timestamp: new Date().toLocaleString(),
            // Add other relevant details from previous screens if needed
            // e.g., fileName, copies, resolution, etc. by passing them down or lifting state further
        };

        setJobDetails(details);
        setCurrentScreen('processing-status-screen');
    };

    return (
        <section id="payment-settings-screen" className="screen active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
            <Paper elevation={4} sx={{ px: { xs: 2, sm: 6 }, py: { xs: 4, sm: 6 }, borderRadius: 6, minWidth: 320, maxWidth: 420, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)', background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                        <PaymentsIcon />
                    </Avatar>
                    <Typography variant="h5" color="primary" fontWeight={800}>Payment</Typography>
                </Stack>
                <Divider sx={{ mb: 2, width: '100%' }} />
                <Typography variant="h6" color="text.secondary" fontWeight={500} mb={2}>
                    Please select your payment method
                </Typography>
                <Typography variant="h4" color="primary" fontWeight={700} mb={3}>
                    ₱{calculatedCost.toFixed(2)}
                </Typography>
                <Stack spacing={3} sx={{ width: '100%' }}>
                    <Button
                        variant={selectedPaymentMethod === 'Coins' ? 'contained' : 'outlined'}
                        color="primary"
                        startIcon={<MonetizationOnIcon />}
                        onClick={() => setSelectedPaymentMethod('Coins')}
                        sx={{ py: 2, fontWeight: 700, fontSize: '1.2rem', borderRadius: 4, boxShadow: selectedPaymentMethod === 'Coins' ? 3 : 0 }}
                        fullWidth
                    >
                        Coins
                    </Button>
                    <Button
                        variant={selectedPaymentMethod === 'Mobile Payment' ? 'contained' : 'outlined'}
                        color="primary"
                        startIcon={<SmartphoneIcon />}
                        onClick={() => setSelectedPaymentMethod('Mobile Payment')}
                        sx={{ py: 2, fontWeight: 700, fontSize: '1.2rem', borderRadius: 4, boxShadow: selectedPaymentMethod === 'Mobile Payment' ? 3 : 0 }}
                        fullWidth
                    >
                        Mobile Payment
                    </Button>
                </Stack>
                <Divider sx={{ my: 3, width: '100%' }} />
                <Navigation
                    onBack={() => setCurrentScreen(selectedService === 'scan' ? 'scan-settings-screen' : 'print-settings-screen')}
                    onNext={handlePayment}
                    nextLabel="Pay Now"
                    nextDisabled={calculatedCost <= 0 || !selectedPaymentMethod}
                />
            </Paper>
        </section>
    );
}

export default PaymentSettingsScreen;
