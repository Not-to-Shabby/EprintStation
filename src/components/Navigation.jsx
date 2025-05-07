import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/**
 * Modular navigation component for kiosk screens.
 * @param {Object} props
 * @param {function} [props.onBack] - Callback for back button
 * @param {function} [props.onNext] - Callback for next button
 * @param {string} [props.backLabel] - Label for back button
 * @param {string} [props.nextLabel] - Label for next button
 * @param {boolean} [props.nextDisabled] - Disable next button
 * @param {React.ReactNode} [props.children] - Custom content (optional)
 * @param {boolean} [props.hideBack] - Hide back button
 * @param {boolean} [props.hideNext] - Hide next button
 */
const Navigation = ({
  onBack,
  onNext,
  backLabel = 'Back',
  nextLabel = 'Next',
  nextDisabled = false,
  children,
  hideBack = false,
  hideNext = false,
}) => (
  <Box sx={{
    width: '100%',
    mt: 4,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  }}>
    <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
      {!hideBack && (
        <Button
          variant="text"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ fontWeight: 600, fontSize: '1.1rem', borderRadius: 3, px: 3 }}
        >
          {backLabel}
        </Button>
      )}
      {children}
      {!hideNext && (
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          onClick={onNext}
          disabled={nextDisabled}
          sx={{ fontWeight: 600, fontSize: '1.1rem', borderRadius: 3, px: 4 }}
        >
          {nextLabel}
        </Button>
      )}
    </Stack>
  </Box>
);

export default Navigation;
