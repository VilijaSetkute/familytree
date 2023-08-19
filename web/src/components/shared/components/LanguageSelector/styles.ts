import styled from '@emotion/styled';
import { Language } from '@mui/icons-material';
import { Box } from '@mui/material';

export const AbsoluteContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  textAlign: 'end',
  margin: '16px',
});

export const LanguageIcon = styled(Language)({
  color: '#fff',
  fontSize: 'min(10vw, 40px)',
  cursor: 'pointer',
});

export const LanguageItem = styled(Box)<{ isSelected: boolean }>(
  ({ isSelected }) => ({
    padding: '8px 16px',
    marginBottom: '4px',
    borderRadius: '8px',
    textAlign: 'start',
    cursor: isSelected ? 'default' : 'pointer',
    backgroundColor: 'rgba(255,255,255,0.1)',
    '&:hover': {
      backgroundColor: isSelected ? 'none' : 'rgba(255,255,255,0.3)',
    },
    opacity: isSelected ? 0.5 : 1,
  })
);
