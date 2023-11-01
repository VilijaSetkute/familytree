import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../../config/theme/theme';

export const ErrorTypography = styled(Typography)({
  textTransform: 'lowercase',
  color: colors.error.error,
  fontWeight: 400,
  fontSize: 12,
});

export const HintTypography = styled(Typography)({
  textTransform: 'lowercase',
  color: colors.dark.hint,
  fontWeight: 400,
  fontSize: 12,
});
