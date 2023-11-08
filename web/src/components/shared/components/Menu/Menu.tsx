import { Box, ClickAwayListener } from '@mui/material';
import { Notifications, Logout, Settings } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../../../assets/icons/Logo_icon.svg';
import { useTranslation } from 'react-i18next';
import {
  MenuAuthButton,
  MenuCloseIcon,
  MenuContainer,
  MenuExpandIcon,
  MenuListContainer,
  MenuPositioning,
} from './styles';
import { Link, useNavigate } from 'react-router-dom';
import StyledNavButton from './StyledNavButton';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { UserContext } from '../../../../utils/context/userContext';
import Cookies from 'js-cookie';

const Menu = () => {
  const { t } = useTranslation();
  const { isAuthorized, userName, accountPermissions, setUser } = useContext(UserContext);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(window.innerWidth >= 700);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();

  const canAccessAdmin = accountPermissions === 'global_admin' || accountPermissions === 'admin';

  const logoutUser = () => {
    Cookies.remove('token');
    setUser({ isAuthorized: false, userName: undefined, accountPermissions: undefined, id: undefined });
    navigate('/paskyra/prisijungti');
  };

  const updateScreenWidth = () => {
    const width = window.innerWidth;
    setIsMenuVisible(width >= 700);
    setIsMobile(width < 700);
  };

  useEffect(() => {
    updateScreenWidth();
  }, []);

  const handleMenuItem = () => {
    setIsMenuVisible(!isMobile);
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => handleMenuItem()}>
        <Box>
          <MenuContainer>
            <MenuPositioning>
              <Link to="/">
                <Logo width={50} />
              </Link>

              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center">
                  <MenuListContainer visiblemenu={`${isMenuVisible}`}>
                    <MenuCloseIcon onClick={() => setIsMenuVisible(false)} />
                    <StyledNavButton to="/pagrindinis" text={t('menu.home')} onClose={handleMenuItem} />
                    <StyledNavButton to="/medis" text={t('menu.tree')} onClose={handleMenuItem} />
                    <StyledNavButton to="/vietoves" text={t('menu.locations')} onClose={handleMenuItem} />
                    <StyledNavButton to="/galerija" text={t('menu.gallery')} onClose={handleMenuItem} />
                  </MenuListContainer>
                </Box>

                <Box display="flex" alignItems="center">
                  {isAuthorized ? (
                    <Box display="flex" justifyItems="space-between" alignItems="center" marginRight="8px">
                      {canAccessAdmin && (
                        <Box marginRight="8px" sx={{ color: 'white' }} onClick={() => navigate('/admin')}>
                          <Settings sx={{ fill: 'white', cursor: 'pointer' }} />
                        </Box>
                      )}

                      <Box marginRight="8px" sx={{ color: 'white' }}>
                        <Notifications sx={{ fill: 'white', cursor: 'pointer' }} />
                      </Box>
                      <Box marginRight="16px" sx={{ color: 'white' }}>
                        {userName}
                      </Box>
                      <Box>
                        <Logout sx={{ fill: 'white', cursor: 'pointer' }} onClick={logoutUser} />
                      </Box>
                    </Box>
                  ) : (
                    <Link to="/paskyra/prisijungti">
                      <MenuAuthButton disableRipple>{t('authorization.menu_auth')}</MenuAuthButton>
                    </Link>
                  )}
                  <LanguageSelector />
                  <MenuExpandIcon sx={{ fill: 'white', cursor: 'pointer' }} onClick={() => setIsMenuVisible(true)} />
                </Box>
              </Box>
            </MenuPositioning>
          </MenuContainer>
        </Box>
      </ClickAwayListener>
    </>
  );
};

export default Menu;
