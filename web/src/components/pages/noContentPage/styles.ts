import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CenteredContainer = styled(Box)({
  height: 'calc(100vh - 280px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 24px',
});
