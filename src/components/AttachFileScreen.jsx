import React, { useState, useEffect, useRef, useCallback } from 'react';

const AttachFileScreen = ({ setCurrentScreen, selectedService, /* setCapturedScan */ }) => {
    // Determine titles and instructions based on the selected service
    const title = selectedService === 'scan' || selectedService === 'photocopy' ? 'Place Document' : 'Attach File';
    const instruction = selectedService === 'print' 
        ? 'Please attach your file using the button below.' 
        : 'Place your document on the scanner glass and close the lid.';

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);

    // Camera related states
    const [cameraStream, setCameraStream] = useState(null);
    const [cameraError, setCameraError] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null); // For capturing image from video
    const [capturedImage, setCapturedImage] = useState(null); // To store the captured image data URL

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileError('');
        } else {
            setSelectedFile(null);
        }
    };

    const handleChooseFileClick = () => {
        fileInputRef.current.click();
    };

    const stopCamera = useCallback(() => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraStream(null);
    }, [setCameraStream]);

    const startCamera = useCallback(async () => {
        stopCamera(); // Ensure any existing stream is stopped first

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setCameraStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setCameraError('');
        } catch (err) {
            console.error("Error accessing camera:", err);
            setCameraError(`Error accessing camera: ${err.name}. Please ensure permissions are granted and no other app is using the camera.`);
            setCameraStream(null);
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setCapturedImage(null); // Clear any previous capture on error
        }
    }, [setCameraStream, setCameraError, stopCamera]);

    useEffect(() => {
        if (selectedService === 'scan' || selectedService === 'photocopy') {
            startCamera();
        } else {
            stopCamera();
        }

        // Cleanup function: called when component unmounts or before effect re-runs
        return () => {
            stopCamera();
        };
    }, [selectedService, startCamera, stopCamera]);

    const handleCapture = () => {
        if (videoRef.current && cameraStream) {
            const videoNode = videoRef.current;
            let canvasNode = canvasRef.current; // Get canvas from ref

            if (!canvasNode) { // Create canvas if it doesn't exist (e.g. first capture)
                canvasNode = document.createElement('canvas');
                canvasRef.current = canvasNode; // Assign to ref
            }

            canvasNode.width = videoNode.videoWidth;
            canvasNode.height = videoNode.videoHeight;
            const context = canvasNode.getContext('2d');
            context.drawImage(videoNode, 0, 0, canvasNode.width, canvasNode.height);
            const imageDataUrl = canvasNode.toDataURL('image/jpeg');
            setCapturedImage(imageDataUrl);
            // setCapturedScan(imageDataUrl); // Pass to App.jsx if needed globally
            // stopCamera(); // Optionally stop camera after capture
        }
    };

    const handleRecapture = () => {
        setCapturedImage(null);
        // if (!cameraStream) { // Restart camera if it was stopped after capture
        //     startCamera();
        // }
    };

    const isNextDisabled = 
        (selectedService === 'print' && !selectedFile) ||
        ((selectedService === 'scan' || selectedService === 'photocopy') && !capturedImage);

    return (
        <section id="attach-file-screen" className="screen active">
            <h1 id="attach-title">{title}</h1>
            <p id="attach-instruction">{instruction}</p>
            
            {selectedService === 'print' && (
                <div className="button-group" style={{alignItems: 'center'}}>
                    <input 
                        type="file" 
                        id="file-upload" 
                        ref={fileInputRef}
                        style={{ display: 'none' }} 
                        onChange={handleFileChange}
                        // accept=".pdf,.doc,.docx,.jpg,.png" 
                    />
                    <button 
                        className="btn btn-primary" 
                        onClick={handleChooseFileClick}
                        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    >
                        <span className="material-icons" style={{ marginRight: 'var(--spacing-sm)' }}>attach_file</span> 
                        Choose File
                    </button>
                    {selectedFile && (
                        <p style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--fs-small)' }}>
                            Selected: {selectedFile.name}
                        </p>
                    )}
                    {fileError && (
                        <p style={{ marginTop: 'var(--spacing-md)', fontSize: 'var(--fs-small)', color: 'var(--error)' }}>
                            Error: {fileError}
                        </p>
                    )}
                </div>
            )}

            {(selectedService === 'scan' || selectedService === 'photocopy') && (
                <div className="camera-container" style={{border: '1px dashed var(--outline)', width: '100%', maxWidth:'400px', minHeight: '300px', display:'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', margin:'var(--spacing-lg) auto', backgroundColor: '#000', position: 'relative'}}>
                    {cameraError && (
                        <p style={{ color: 'var(--error)', marginBottom: 'var(--spacing-md)', padding: 'var(--spacing-md)', textAlign: 'center' }}>{cameraError}</p>
                    )}
                    
                    {/* Hidden canvas for image capture */} 
                    <canvas ref={canvasRef} style={{ display: 'none' }} />

                    {capturedImage ? (
                        <img src={capturedImage} alt="Captured Scan" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    ) : (
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            style={{ width: '100%', height: 'auto', display: cameraStream && !cameraError ? 'block' : 'none' }}
                        />
                    )}

                    {!cameraStream && !cameraError && !capturedImage && (selectedService === 'scan' || selectedService === 'photocopy') && (
                        <p style={{color: 'var(--on-surface-light)'}}>Attempting to start camera...</p>
                    )}

                    <div className="button-group-horizontal" style={{ marginTop: 'var(--spacing-md)'}}>
                        {cameraStream && !cameraError && !capturedImage && (
                            <button className="btn btn-primary" onClick={handleCapture} style={{display: 'flex', alignItems: 'center'}}>
                                <span className="material-icons" style={{marginRight: 'var(--spacing-sm)'}}>camera_alt</span>Capture Document
                            </button>
                        )}
                        {capturedImage && (
                            <button className="btn btn-secondary" onClick={handleRecapture} style={{display: 'flex', alignItems: 'center'}}>
                                <span className="material-icons" style={{marginRight: 'var(--spacing-sm)'}}>refresh</span>Recapture
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="navigation">
                <button className="nav-btn" onClick={() => setCurrentScreen('service-screen')}>
                    <span className="material-icons">arrow_back</span> Back
                </button>
                <button 
                    id="capture-done-btn" 
                    className="btn btn-primary" 
                    onClick={() => setCurrentScreen(selectedService === 'scan' ? 'scan-settings-screen' : 'print-settings-screen')}
                    disabled={isNextDisabled}
                >
                    Next <span className="material-icons">arrow_forward</span>
                </button>
            </div>
        </section>
    );
}

export default AttachFileScreen;
