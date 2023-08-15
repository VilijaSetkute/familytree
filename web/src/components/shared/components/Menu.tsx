import { Box, Button } from '@mui/material';
import React from 'react';
import { ReactComponent as Logo } from '../../../assets/icons/Logo_icon.svg';
import { useTranslation } from 'react-i18next';
import { Menu as MenuIcon } from '@mui/icons-material';

const Menu = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{ width: '900px', marginX: 'auto' }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Logo />
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            disableRipple
            sx={{ color: '#fff', fontSize: '16px', fontWeight: 300 }}
          >
            {t('menu.tree')}
          </Button>
          <Button
            disableRipple
            sx={{ color: '#fff', fontSize: '16px', fontWeight: 300 }}
          >
            {t('menu.locations')}
          </Button>
          <Button
            disableRipple
            sx={{ color: '#fff', fontSize: '16px', fontWeight: 300 }}
          >
            {t('menu.gallery')}
          </Button>
          <Button
            sx={{
              color: '#fff',
              fontSize: '16px',
              fontWeight: 300,
              border: '1px solid #60C646',
              paddingX: '16px',
              borderRadius: '100px 0px 100px 100px',
            }}
          >
            {t('menu.auth')}
          </Button>
          <MenuIcon
            sx={{
              marginX: '16px',
              color: '#99C58F',
              fontSize: '32px',
              cursor: 'pointer',
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Menu;
