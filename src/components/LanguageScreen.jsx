import React from 'react';

const LanguageScreen = ({ setCurrentScreen }) => (
    <section id="language-screen" className="screen active"> {/* `active` class might be handled by parent or routing later */}
        <h1>Language Selection</h1>
        <p>Please select your preferred language.</p>
        <div className="button-group">
            <button className="btn btn-primary" onClick={() => setCurrentScreen('service-screen')}>ENGLISH</button>
            <button className="btn btn-primary" onClick={() => setCurrentScreen('service-screen')}>BISAYA</button>
            <button className="btn btn-primary" onClick={() => setCurrentScreen('service-screen')}>TAGALOG</button>
            {/* Add other language buttons here, e.g.: */}
            {/* <button className="btn btn-primary" onClick={() => setCurrentScreen('service-screen')}>Español</button> */}
            {/* <button className="btn btn-primary" onClick={() => setCurrentScreen('service-screen')}>Français</button> */}
        </div>
    </section>
);

export default LanguageScreen;
