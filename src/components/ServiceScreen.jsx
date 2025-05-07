import React from 'react';

const ServiceScreen = ({ setCurrentScreen, setSelectedService }) => (
    <section id="service-screen" className="screen active">
        <h1>Select a Service</h1>
        <div className="button-group" style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '600px', gap: 'var(--spacing-xl)' }}>
            <button className="service-btn" onClick={() => { setSelectedService('print'); setCurrentScreen('attach-file-screen'); }}>
                <i className="material-icons">print</i>
                <span>Print</span>
            </button>
            <button className="service-btn" onClick={() => { setSelectedService('photocopy'); setCurrentScreen('attach-file-screen'); }}>
                <i className="material-icons">content_copy</i>
                <span>Photocopy</span>
            </button>
            <button className="service-btn" onClick={() => { setSelectedService('scan'); setCurrentScreen('attach-file-screen'); }}>
                <i className="material-icons">scanner</i>
                <span>Scan</span>
            </button>
        </div>
        <div className="navigation">
            <button className="nav-btn" onClick={() => setCurrentScreen('language-screen')}>
                <span className="material-icons">arrow_back</span> Back
            </button>
        </div>
    </section>
);

export default ServiceScreen;
