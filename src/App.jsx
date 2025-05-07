import React, { useState } from 'react'; // Removed unused useEffect
import './index.css'; // Import the global styles

// Import screen components
import LanguageScreen from './components/LanguageScreen';
import ServiceScreen from './components/ServiceScreen';
import AttachFileScreen from './components/AttachFileScreen';
import PrintSettingsScreen from './components/PrintSettingsScreen';
import ScanSettingsScreen from './components/ScanSettingsScreen';
import PaymentSettingsScreen from './components/PaymentSettingsScreen';
import ProcessingStatusScreen from './components/ProcessingStatusScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import ThankYouScreen from './components/ThankYouScreen';

function App() {
    const [currentScreen, setCurrentScreen] = useState('language-screen');
    const [selectedService, setSelectedService] = useState(''); // 'print', 'photocopy', 'scan'
    const [totalCost, setTotalCost] = useState(0); // Example state for cost
    const [jobDetails, setJobDetails] = useState(null); // Changed initial state to null

    // Add any other global state management here (e.g., using Context API or Zustand/Redux for more complex state)

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
                return <ProcessingStatusScreen setCurrentScreen={setCurrentScreen} />;
            case 'confirmation-screen':
                return <ConfirmationScreen setCurrentScreen={setCurrentScreen} jobDetails={jobDetails} />;
            case 'thank-you-screen':
                return <ThankYouScreen setCurrentScreen={setCurrentScreen} />;
            default:
                return <LanguageScreen setCurrentScreen={setCurrentScreen} />;
        }
    };

    return (
        <div className="kiosk-container">
            <header className="kiosk-header">
                <div className="logo">E-Print Station</div>
            </header>
            {renderScreen()}
        </div>
    );
}

export default App;
