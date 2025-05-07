import React, { useEffect, useState } from 'react';

const ThankYouScreen = ({ setCurrentScreen }) => {
    const [countdown, setCountdown] = useState(5); // Initial countdown time in seconds

    // Auto-redirect to the language screen after a delay with visible countdown
    useEffect(() => {
        if (countdown <= 0) {
            setCurrentScreen('language-screen');
            return;
        }

        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, [countdown, setCurrentScreen]);

    return (
        <section id="thank-you-screen" className="screen active">
            <h1>Thank You!</h1>
            <p>Please collect your documents.</p>
            <p style={{fontSize: 'var(--fs-base)', color: 'var(--on-surface-medium)'}}>
                Redirecting to the main screen in {countdown} second{countdown === 1 ? '' : 's'}...
            </p>
            {/* No navigation buttons here, as it auto-navigates */}
        </section>
    );
}

export default ThankYouScreen;
