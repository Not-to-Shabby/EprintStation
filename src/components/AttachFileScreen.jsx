

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navigation from './Navigation';
import { Box, Paper, Typography, Button, Stack, Avatar } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
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
        <section id="attach-file-screen" className="screen active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
            <Paper
                elevation={4}
                sx={{
                    px: { xs: 2, sm: 6 },
                    py: { xs: 4, sm: 6 },
                    borderRadius: 6,
                    minWidth: 320,
                    maxWidth: 420,
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)',
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
                }}
            >
                <Typography variant="h4" color="primary" fontWeight={800} gutterBottom sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}>
                    {title}
                </Typography>
                <Typography variant="h6" color="text.secondary" fontWeight={500} mb={3}>
                    {instruction}
                </Typography>
                {/* Only show attach file for print service */}
                {selectedService === 'print' && (
                    <>
                        <input
                            type="file"
                            id="file-upload"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <Button
                            onClick={handleChooseFileClick}
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 120,
                                width: 120,
                                borderRadius: '50%',
                                boxShadow: 3,
                                bgcolor: 'background.paper',
                                p: 0,
                                mb: 2,
                                transition: 'box-shadow 0.2s, background 0.2s',
                                '&:hover': {
                                    boxShadow: 8,
                                    bgcolor: 'primary.light',
                                },
                                textTransform: 'none',
                            }}
                        >
                            <AttachFileIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                        </Button>
                        <Typography variant="body1" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
                            Attach File
                        </Typography>
                        {selectedFile && (
                            <Typography variant="body2" color="primary" sx={{ mb: 1, wordBreak: 'break-all' }}>
                                {selectedFile.name}
                            </Typography>
                        )}
                        {fileError && (
                            <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                                Error: {fileError}
                            </Typography>
                        )}
                    </>
                )}


            {(selectedService === 'scan' || selectedService === 'photocopy') && (
                <>
                    <Box className="camera-container" sx={{ border: '1px dashed', borderColor: 'outline', width: '100%', maxWidth: 400, minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', my: 4, mx: 'auto', bgcolor: '#000', position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
                        {cameraError && (
                            <Typography color="error" sx={{ mb: 2, p: 2, textAlign: 'center' }}>{cameraError}</Typography>
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
                            <Typography color="text.secondary">Attempting to start camera...</Typography>
                        )}
                    </Box>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                        {cameraStream && !cameraError && !capturedImage && (
                            <Button variant="contained" color="primary" onClick={handleCapture} startIcon={<span className="material-icons">camera_alt</span>} sx={{ fontWeight: 600, fontSize: '1.1rem', borderRadius: 3, px: 3 }}>
                                Capture Document
                            </Button>
                        )}
                        {capturedImage && (
                            <Button variant="outlined" color="primary" onClick={handleRecapture} startIcon={<span className="material-icons">refresh</span>} sx={{ fontWeight: 600, fontSize: '1.1rem', borderRadius: 3, px: 3 }}>
                                Recapture
                            </Button>
                        )}
                    </Stack>
                </>
            )}

            <Navigation
                onBack={() => setCurrentScreen('service-screen')}
                onNext={() => setCurrentScreen(selectedService === 'scan' ? 'scan-settings-screen' : 'print-settings-screen')}
                nextDisabled={isNextDisabled}
            />
            </Paper>
        </section>
    );
}

export default AttachFileScreen;
