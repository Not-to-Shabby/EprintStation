import React, { useState, useEffect } from 'react';

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
        <section id="print-settings-screen" className="screen active">
            <h1 id="print-settings-title">{title}</h1>
            
            <form className="settings-form" style={{width: '100%', maxWidth: '500px'}}>
                <div className="form-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)'}}>
                    <label htmlFor="copies">Copies:</label>
                    <div className="input-group" style={{display: 'flex', alignItems: 'center'}}>
                        <button type="button" className="stepper-btn" onClick={() => setCopies(c => Math.max(1, c - 1))}>-</button>
                        <input type="number" id="copies" value={copies} onChange={e => setCopies(Math.max(1, parseInt(e.target.value) || 1))} style={{width: '50px', textAlign: 'center', border: '1px solid var(--outline)', padding: 'var(--spacing-sm)'}} />
                        <button type="button" className="stepper-btn" onClick={() => setCopies(c => c + 1)}>+</button>
                    </div>
                </div>

                <div className="form-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)'}}>
                    <label htmlFor="color-mode">Color Mode:</label>
                    <select id="color-mode" value={colorMode} onChange={e => setColorMode(e.target.value)} style={{padding: 'var(--spacing-sm)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-sm)'}}>
                        <option value="bw">Black & White</option>
                        <option value="color">Color</option>
                    </select>
                </div>

                <div className="form-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)'}}>
                    <label htmlFor="two-sided">Two-Sided Printing:</label>
                    <input type="checkbox" id="two-sided" checked={twoSided} onChange={e => setTwoSided(e.target.checked)} style={{height: '20px', width: '20px'}} />
                </div>
                
                {selectedService === 'print' && (
                    <div className="form-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)'}}>
                        <label htmlFor="page-range">Page Range (e.g., 1-5, 8):</label>
                        <input 
                            type="text" 
                            id="page-range" 
                            value={pageRange} 
                            onChange={e => setPageRange(e.target.value)} 
                            placeholder="All pages"
                            style={{padding: 'var(--spacing-sm)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-sm)', width: '150px'}} 
                        />
                    </div>
                )}
                
                {selectedService === 'photocopy' && (
                    <>
                        <div id="save-copy-option-row" className="form-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)'}}>
                            <label htmlFor="save-copy-checkbox">Save Digital Copy:</label>
                            <input 
                                type="checkbox" 
                                id="save-copy-checkbox" 
                                checked={saveDigitalCopy} 
                                onChange={e => setSaveDigitalCopy(e.target.checked)}
                                style={{height: '20px', width: '20px'}}
                            /> 
                        </div>
                        {saveDigitalCopy && (
                            <div id="digital-copy-format-row" className="form-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)'}}>
                                <label htmlFor="digital-copy-format">Digital Copy Format:</label>
                                <select 
                                    id="digital-copy-format" 
                                    value={digitalCopyFormat} 
                                    onChange={e => setDigitalCopyFormat(e.target.value)} 
                                    style={{padding: 'var(--spacing-sm)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-sm)'}}
                                >
                                    <option value="pdf">PDF</option>
                                    <option value="jpeg">JPEG</option>
                                    <option value="png">PNG</option>
                                </select>
                            </div>
                        )}
                    </>
                )}
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

export default PrintSettingsScreen;
