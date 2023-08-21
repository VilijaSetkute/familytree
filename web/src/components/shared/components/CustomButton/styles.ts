import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../../../config/theme/theme';
import { ColorVariant } from './model';
// import { SxProps } from '@mui/system';
// import React from 'react';

// interface StylesProps {
//   [x: string]: SxProps<Theme>;
// }

const getButtonColor = (colorVariant: ColorVariant) => {
  switch (colorVariant) {
    case 'gradient':
      return `linear-gradient(270deg, ${colors.primaryGreen.greenVibrant} 0%, ${colors.secondaryBlue.blueDark} 100%)`;
    case 'accent':
      return colors.primaryGreen.greenVibrant;
    default:
      return `linear-gradient(270deg, ${colors.primaryGreen.greenVibrant} 0%, ${colors.secondaryBlue.blueDark} 100%)`;
  }
};

const getButtonTextColor = (colorVariant: ColorVariant) => {
  switch (colorVariant) {
    case 'gradient':
      return colors.white;
    case 'accent':
      return colors.dark;
    default:
      return colors.white;
  }
};

export const ButtonContainer = styled(Button)<{ colorVariant: ColorVariant }>(
  ({ colorVariant }) => ({
    padding: '8px 40px',
    borderRadius: '100px',
    background: getButtonColor(colorVariant),
    filter: 'drop-shadow(0px 15px 15px rgba(0, 0, 0, 0.75))',
    transition: 'all 0.1s ease',
    '&:hover': {
      filter: `drop-shadow(0px 0px 3px ${colors.primaryGreen.greenVibrant})`,
    },
  })
);

export const ButtonText = styled(Typography)<{ colorVariant: ColorVariant }>(
  ({ colorVariant }) => ({
    textAlign: 'center',
    fontSize: 'min(4vw, 20px)',
    textTransform: 'uppercase',
    color: getButtonTextColor(colorVariant),
  })
);
