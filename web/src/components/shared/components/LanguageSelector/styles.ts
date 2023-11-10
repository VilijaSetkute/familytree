import styled from '@emotion/styled';
import { Language } from '@mui/icons-material';
import { Box } from '@mui/material';
import { colors } from '../../../../config/theme/theme';

export const LanguageIcon = styled(Language)({
  color: colors.white,
  fontSize: '32px',
  cursor: 'pointer',
});

export const LanguageItem = styled(Box)<{ isSelected: boolean }>(({ isSelected }) => ({
  padding: '8px 16px',
  marginBottom: '4px',
  borderRadius: '8px',
  textAlign: 'start',
  cursor: isSelected ? 'default' : 'pointer',
  backgroundColor: 'rgba(255,255,255,1)',
  '&:hover': {
    backgroundColor: isSelected ? 'none' : 'rgba(255,255,255,0.9)',
  },
  opacity: isSelected ? 0.5 : 1,
  filter: isSelected ? 'grayscale(100%)' : 'none',
}));
