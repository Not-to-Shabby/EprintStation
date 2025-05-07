import React, { useState } from 'react';

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
        <section id="payment-settings-screen" className="screen active">
            <h1 id="payment-title">Payment</h1>
            
            <div className="cost-summary" style={{ margin: 'var(--spacing-lg) 0' }}>
                <h2>Total Cost: <span id="total-cost">₱{calculatedCost.toFixed(2)}</span></h2>
            </div>

            <p>Please select your payment method:</p>
            <div className="button-group" style={{flexDirection: 'column', gap: 'var(--spacing-md)'}}>
                <button 
                    className={`btn btn-tonal ${selectedPaymentMethod === 'Coins' ? 'btn-primary' : ''}`}
                    onClick={() => setSelectedPaymentMethod('Coins')}
                >
                    Coins
                </button>
                <button 
                    className={`btn btn-tonal ${selectedPaymentMethod === 'Mobile Payment' ? 'btn-primary' : ''}`}
                    onClick={() => setSelectedPaymentMethod('Mobile Payment')}
                >
                    Mobile Payment
                </button>
                {/* <button 
                    className={`btn btn-tonal ${selectedPaymentMethod === 'Coin/Cash' ? 'btn-primary' : ''}`}
                    onClick={() => setSelectedPaymentMethod('Coin/Cash')}
                >
                    Coin/Cash (if applicable)
                </button> */}
            </div>

            <div className="navigation">
                <button 
                    id="payment-prev-btn" 
                    className="nav-btn" 
                    onClick={() => setCurrentScreen(selectedService === 'scan' ? 'scan-settings-screen' : 'print-settings-screen')}
                >
                    <span className="material-icons">arrow_back</span> Back
                </button>
                <button 
                    className="btn btn-primary" 
                    onClick={handlePayment} 
                    disabled={calculatedCost <= 0 || !selectedPaymentMethod}
                >
                    Pay Now
                </button>
            </div>
        </section>
    );
}

export default PaymentSettingsScreen;
