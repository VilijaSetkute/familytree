import { Box, Typography } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import { colors } from '../../../config/theme/theme';
import { SxProps } from '@mui/system';

interface StylesProps {
  [x: string]: SxProps<Theme>;
}

export const styles: StylesProps = {
  landingTitle: { fontSize: 'min(calc(8vw + 40px), 180px)', fontWeight: 800 },
  landingSubtitle: {
    fontSize: 'min(calc(8vw), 75px)',
    fontWeight: 300,
    textAlign: 'left',
    width: '58%',
    marginX: 'auto',
  },
};

export const LandingTitle = styled(Typography)({
  marginX: '40px',
  color: colors.white,
  textShadow: '0px 15px 15px rgba(0, 0, 0, 0.75)',
  textTransform: 'uppercase',
  userSelect: 'none',
  lineHeight: 1,
});

export const CenteredContainer = styled(Box)({
  height: 'calc(100vh - 280px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
