import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackbarProp {
  status?: string;
  isStatus?: boolean;
  message?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

const SnackbarChip: React.FC<SnackbarProp> = ({
  status,
  isStatus,
  message,
}) => {
  const [open, setOpen] = useState(isStatus);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getMessageType = (status: string) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'success';
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={handleClose}
      sx={{ color: 'white' }}
    >
      <Alert
        onClose={handleClose}
        severity={status ? getMessageType(status) : 'success'}
        sx={{
          width: '100%',
          '& .MuiAlert-message': { color: 'white' },
          '& .MuiAlert-icon .MuiSvgIcon-root': { fill: 'white' },
          '& .MuiAlert-action .MuiSvgIcon-root': { fill: 'white' },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarChip;
