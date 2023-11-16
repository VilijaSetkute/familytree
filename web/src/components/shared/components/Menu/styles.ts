import styled from '@emotion/styled';
import { Menu, Close } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { colors } from '../../../../config/theme/theme';

export const styles = {
  navLinkPositioning: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
  },
};

export const MenuContainer = styled(Box)({
  maxWidth: '1000px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 auto',
  '@media (max-width: 700px)': {
    display: 'flex',
  },
});

export const MenuPositioning = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: '0 24px',
});

export const MenuListContainer = styled(Box)<{ visiblemenu: string }>(({ visiblemenu }) => ({
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 700px)': {
    display: visiblemenu === 'true' ? 'block' : 'none',
    flexDirection: 'column',
    backgroundColor: 'gray',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    background: 'radial-gradient(green, teal)',
    filter: 'drop-shadow(0px 15px 15px rgba(0, 0, 0, 0.75))',
    padding: '24px 0',
  },
}));

export const MenuNavButton = styled(Button)<{
  isactive: string;
}>(({ isactive }) => ({
  fontFamily: 'Karla, sans-serif',
  color: colors.white,
  fontSize: '16px',
  fontWeight: isactive === 'true' ? 600 : 300,
  margin: '0 4px',
  maxWidth: 'fit-content',
  textDecoration: 'none',
  boxSizing: 'border-box',
  borderBottom: `2px solid ${isactive === 'true' ? colors.primaryGreen.green300 : 'transparent'}`,
  borderRadius: 0,
  '&:hover': {
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${colors.primaryGreen.green300}`,
  },
  '& @media screen and (max-width: 1200px)': {
    backgroundColor: 'yellow',
  },
}));

export const MenuAuthButton = styled(Button)({
  margin: '0 8px',
  color: colors.primaryGreen.green200,
  cursor: 'pointer',
  border: `2px solid ${colors.primaryGreen.green300}`,
  borderRadius: '100px 0 100px 100px',
  padding: '4px 16px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

export const MenuExpandIcon = styled(Menu)({
  display: 'none',
  marginLeft: '8px',
  color: colors.primaryGreen.green200,
  fontSize: '32px',
  cursor: 'pointer',
  '@media (max-width: 700px)': {
    display: 'block',
  },
});

export const MenuCloseIcon = styled(Close)({
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'none',
  margin: '8px 8px 0 0',
  color: colors.primaryGreen.green200,
  fill: colors.white,
  fontSize: '32px',
  cursor: 'pointer',
  '@media (max-width: 700px)': {
    display: 'block',
  },
});

export const GreenDotBox = styled(Box)({
  height: '8px',
  width: '8px',
  backgroundColor: colors.primaryGreen.green300,
  borderRadius: '50%',
  margin: '0 16px',
});

export const NotificationCountBox = styled(Box)({
  color: colors.white,
  backgroundColor: colors.error.error,
  zIndex: 1,
  fontSize: '12px',
  width: '10px',
  height: '10px',
  padding: '5px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '-5px',
  right: '-5px',
});
