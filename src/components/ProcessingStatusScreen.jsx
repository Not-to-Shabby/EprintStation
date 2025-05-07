import React, { useEffect } from 'react';

const ProcessingStatusScreen = ({ setCurrentScreen }) => {
    // Simulate processing delay and then navigate
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentScreen('confirmation-screen');
        }, 3000); // Simulate a 3-second processing time

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [setCurrentScreen]);

    return (
        <section id="processing-status-screen" className="screen active">
            <h1 id="status-title">Processing Your Request...</h1>
            {/* Basic visual cue for processing, e.g., a spinner or dots */}
            <div className="progress-indicator" style={{ margin: 'var(--spacing-xl) 0' }}>
                <p>Please wait.</p>
                {/* You can add a more sophisticated loading animation here */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                    <div className="progress-dot active" style={{width: '10px', height: '10px', backgroundColor: 'var(--primary)', borderRadius: '50%'}}></div>
                    <div className="progress-dot" style={{width: '10px', height: '10px', backgroundColor: 'var(--outline)', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out'}}></div>
                    <div className="progress-dot" style={{width: '10px', height: '10px', backgroundColor: 'var(--outline)', borderRadius: '50%', animation: 'pulse 1.5s infinite ease-in-out 0.5s'}}></div>
                </div>
            </div>
            {/* No navigation buttons here, as it auto-navigates */}
        </section>
    );
}

export default ProcessingStatusScreen;
