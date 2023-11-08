import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../../config/theme/theme';

export const ContentContainerPaper = styled(Paper)({
  // maxWidth: '900px',
  width: '75%',
  margin: '0 auto',
  padding: '24px',
  color: colors.dark.main,
  height: 'calc(100vh - 150px)',
});
