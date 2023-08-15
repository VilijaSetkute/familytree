import React from 'react';
import { Button, Typography } from '@mui/material';

interface ButtonProps {
  text: string;
}

const CustomButton: React.FC<ButtonProps> = ({ text }) => {
  return (
    <Button
      sx={{
        padding: '8px 40px',
        borderRadius: '100px',
        background: 'linear-gradient(270deg, #3F0 0%, #00477A 100%)',
        '&:hover': {
          background: 'linear-gradient(270deg, #00477A 0%, #3F0 100%)',
          transition: 'ease-in-out 0.5s',
        },
      }}
    >
      <Typography
        sx={{
          color: '#FFFBFB',
          textAlign: 'center',
          fontSize: '20px',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </Typography>
    </Button>
  );
};

export default CustomButton;
