import { Box, Input } from '@mui/material';
import { colors } from '../../../config/theme/theme';
import { SxProps } from '@mui/system';
import { Theme, styled } from '@mui/material/styles';

interface StylesProps {
  [x: string]: SxProps<Theme>;
}

export const styles: StylesProps = {
  inputIcon: {
    fill: colors.primaryGreen.greenLight,
  },
};

export const CenteredContainer = styled(Box)({
  height: 'calc(100vh - 280px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const AuthCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '440px',
  minWidth: '300px',
  backgroundColor: colors.white,
  borderRadius: '16px',
  filter: 'drop-shadow(0px 15px 15px rgba(0, 0, 0, 0.75))',
  padding: '32px',
  textTransform: 'capitalize',
  fontWeight: 600,
});

export const InputField = styled(Input)({
  backgroundColor: 'transparent',
  borderRadius: '100px',
  margin: '8px 0',
  width: '100%',
  padding: '8px 16px',
  border: '1px solid #99C58F',
  '&::before, ::after ': {
    display: 'none',
  },
  '& .MuiInput-input:-webkit-autofill': {
    // Override autofill background
    '-webkit-box-shadow': '0 0 0 1000px white inset',
  },
});
