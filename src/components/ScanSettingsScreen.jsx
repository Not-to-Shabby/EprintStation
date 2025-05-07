import React, { useState, useEffect } from 'react';

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
        <section id="scan-settings-screen" className="screen active">
            <h1>Scan Settings</h1>
            
            <form className="settings-form" style={{width: '100%', maxWidth: '500px'}}>
                <div className="form-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)'}}>
                    <label htmlFor="resolution">Resolution:</label>
                    <select id="resolution" value={resolution} onChange={e => setResolution(e.target.value)} style={{padding: 'var(--spacing-sm)'}}>
                        <option value="150dpi">150 DPI</option>
                        <option value="300dpi">300 DPI</option>
                        <option value="600dpi">600 DPI</option>
                    </select>
                </div>

                <div className="form-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)'}}>
                    <label htmlFor="file-format">File Format:</label>
                    <select id="file-format" value={fileFormat} onChange={e => setFileFormat(e.target.value)} style={{padding: 'var(--spacing-sm)'}}>
                        <option value="pdf">PDF</option>
                        <option value="jpeg">JPEG</option>
                        <option value="png">PNG</option>
                    </select>
                </div>

                <div id="save-format-row" className="form-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)'}}>
                    <label htmlFor="save-to-usb">Save to USB Drive:</label>
                    <input type="checkbox" id="save-to-usb" checked={saveToUsb} onChange={e => setSaveToUsb(e.target.checked)} />
                </div>
                
                {/* Add more form rows for other settings if needed */}
            </form>

            <div className="navigation">
                <button className="nav-btn" onClick={() => setCurrentScreen('attach-file-screen')}>
                    <span className="material-icons">arrow_back</span> Back
                </button>
                <button className="btn btn-primary" onClick={() => setCurrentScreen('payment-settings-screen')}>
                    Next
                </button>
            </div>
        </section>
    );
}

export default ScanSettingsScreen;
