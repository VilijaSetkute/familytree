import { Box, Tab, TableCell, Typography } from '@mui/material';
import { colors } from '../../../config/theme/theme';
// import { SxProps } from '@mui/system';
import { styled } from '@mui/material/styles';

export const CenteredContainer = styled(Box)({
  height: 'calc(100vh - 280px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const AdminTab = styled(Tab)({
  textTransform: 'capitalize',
  color: colors.dark.main,
  '&.Mui-selected': {
    fontWeight: 700,
  },
});

export const HeadTableCell = styled(TableCell)({
  color: colors.white,
  fontWeight: 600,
});

export const WarningTypography = styled(Typography)({
  fontSize: '14px',
  color: colors.error.error,
  marginBottom: '8px',
});
