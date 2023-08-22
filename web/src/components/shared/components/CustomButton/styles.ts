import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../../../config/theme/theme';
import { ColorVariant, WidthVariant } from './model';
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
    case 'light':
      return colors.primaryGreen.greenLight;
    case 'pale':
      return colors.primaryGreen.greenLighter;
    default:
      return `linear-gradient(270deg, ${colors.primaryGreen.greenVibrant} 0%, ${colors.secondaryBlue.blueDark} 100%)`;
  }
};

const getButtonTextColor = (colorVariant: ColorVariant) => {
  switch (colorVariant) {
    case 'gradient':
    case 'accent':
    case 'light':
      return colors.white;
    case 'pale':
      return colors.dark;
    default:
      return colors.white;
  }
};

const getHoverStyle = (colorVariant: ColorVariant) => {
  switch (colorVariant) {
    case 'gradient':
      return {
        filter: `drop-shadow(0px 0px 3px ${colors.primaryGreen.greenVibrant})`,
      };
    case 'accent':
    case 'light':
      return {
        boxShadow: `0px 0px 5px ${colors.primaryGreen.greenVibrant}`,
        filter: 'none',
        '&.MuiButton-root': {
          filter: `drop-shadow(0px 0px 3px ${colors.primaryGreen.greenLight})`,
          backgroundColor: colors.primaryGreen.greenLight,
        },
      };
    case 'pale':
      return colors.dark;
    default:
      return colors.white;
  }
};

export const ButtonContainer = styled(Button)<{
  colorVariant: ColorVariant;
  shadow: number;
  width: WidthVariant;
}>(({ colorVariant, shadow, width }) => ({
  width: width === 'content' ? 'fit-content' : '100%',
  padding: '8px 40px',
  borderRadius: '100px',
  background: getButtonColor(colorVariant),
  filter: `drop-shadow(0px ${shadow}px ${shadow}px rgba(0, 0, 0, 0.75))`,
  transition: 'all 0.1s ease',
  '&:hover': getHoverStyle(colorVariant),
}));

export const ButtonText = styled(Typography)<{
  colorVariant: ColorVariant;
  uppercase: boolean;
}>(({ colorVariant, uppercase }) => ({
  textAlign: 'center',
  fontSize: 'min(4vw, 20px)',
  textTransform: uppercase ? 'uppercase' : 'capitalize',
  color: getButtonTextColor(colorVariant),
}));
