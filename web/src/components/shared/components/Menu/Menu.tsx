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
  GreenDotBox,
  NotificationCountBox,
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
  const [notificationCount, setNotificationCount] = useState<number | null>(3);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  const canAccessAdmin = accountPermissions === 'global_admin' || accountPermissions === 'admin';

  console.log('canAccessAdmin', canAccessAdmin, 'isAuthorized', isAuthorized);

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

  const handleNotifications = () => {
    if (isNotificationOpen) {
      setNotificationCount(null);
    }
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => handleMenuItem()}>
        <Box>
          <MenuContainer>
            <MenuPositioning>
              <Box display="flex" alignItems="center">
                <Link to="/">
                  <Logo width={50} />
                </Link>
                <MenuExpandIcon sx={{ fill: 'white', cursor: 'pointer' }} onClick={() => setIsMenuVisible(true)} />
              </Box>

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

                <Box display="flex" alignItems="center" height={'100%'}>
                  {isAuthorized ? (
                    <Box display="flex" justifyItems="space-between" alignItems="center" marginRight="8px">
                      {!isMobile && <GreenDotBox />}
                      <Box marginRight="16px" sx={{ color: 'white' }}>
                        {userName?.toUpperCase()}
                      </Box>

                      <Box marginRight="16px" sx={{ color: 'white', position: 'relative', cursor: 'pointer' }}>
                        <Notifications sx={{ fill: 'white', cursor: 'pointer' }} onClick={handleNotifications} />
                        {!!notificationCount && <NotificationCountBox>{notificationCount}</NotificationCountBox>}
                        {isNotificationOpen && (
                          <Box
                            display="flex"
                            flexDirection="column"
                            position="absolute"
                            sx={{
                              borderRadius: '8px',
                              backgroundColor: 'white',
                              padding: '12px',
                              right: 0,
                              width: '200px',
                              textAlign: 'left',
                            }}
                          >
                            <Box padding="4px" sx={{ borderBottom: '1px solid gray' }}>
                              testas testas testas testas
                            </Box>
                            <Box padding="4px" sx={{ borderBottom: '1px solid gray' }}>
                              testas testas
                            </Box>
                            <Box padding="4px" sx={{ borderBottom: '1px solid gray' }}>
                              testas
                            </Box>
                            <Box padding="4px" sx={{ borderBottom: '1px solid gray' }}>
                              testas testas testas
                            </Box>
                            <Box padding="4px">testas</Box>
                          </Box>
                        )}
                      </Box>
                      {canAccessAdmin && (
                        <Box marginRight="8px" sx={{ color: 'white' }} onClick={() => navigate('/admin')}>
                          <Settings sx={{ fill: 'white', cursor: 'pointer' }} />
                        </Box>
                      )}
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
