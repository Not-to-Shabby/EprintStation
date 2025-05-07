import React from 'react';

const ConfirmationScreen = ({ setCurrentScreen, jobDetails }) => {
    return (
        <section id="confirmation-screen" className="screen active">
            <h1 id="confirmation-message">Job Confirmed!</h1>
            
            {jobDetails && typeof jobDetails === 'object' ? (
                <div id="confirmation-details" style={{ textAlign: 'left', margin: 'var(--spacing-lg) auto', padding: 'var(--spacing-md)', border: '1px solid var(--outline)', borderRadius: 'var(--radius-md)', maxWidth: '400px', backgroundColor: 'var(--surface-variant)' }}>
                    <p><strong>Service:</strong> {jobDetails.service}</p>
                    <p><strong>Total Cost:</strong> ₱{jobDetails.cost}</p>
                    <p><strong>Payment Method:</strong> {jobDetails.paymentMethod}</p>
                    <p><strong>Transaction ID:</strong> {jobDetails.transactionId}</p>
                    <p><strong>Date:</strong> {jobDetails.timestamp}</p>
                </div>
            ) : (
                <p id="confirmation-details">Your document is being processed.</p>
            )}

            <p id="confirmation-prompt" style={{marginTop: 'var(--spacing-lg)'}}>What would you like to do next?</p>
            <div className="button-group-horizontal">
                <button className="btn btn-primary" onClick={() => setCurrentScreen('thank-you-screen')}>Done</button>
                <button className="btn btn-secondary" onClick={() => setCurrentScreen('language-screen')}>New Transaction</button>
            </div>
        </section>
    );
}

export default ConfirmationScreen;
