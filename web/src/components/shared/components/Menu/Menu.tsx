import React, { useContext, useEffect, useState } from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import { Notifications, Logout, Settings } from '@mui/icons-material';
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
import Notification from './Notification';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { SocketProp } from '../../models/websocketModel';

interface Props {
  socket: SocketProp;
}

const Menu: React.FC<Props> = ({ socket }) => {
  const { t } = useTranslation();
  const { accountActivated, userName, accountPermissions, setUser } = useContext(UserContext);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(window.innerWidth >= 700);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);

  const canAccessAdmin = accountPermissions === 'global_admin' || accountPermissions === 'admin';

  useEffect(() => {
    if (socket) {
      socket.on('newUser', (data) => {
        const message = t('notifications.new_user', { userName: data.userName });
        setMessages((prev) => [...prev, message]);
      });
    }
  }, [socket]);

  const logoutUser = () => {
    Cookies.remove('token');
    setUser({ accountActivated: false, userName: undefined, accountPermissions: undefined, id: undefined });
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
      setMessages(() => []);
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
                  {accountActivated ? (
                    <Box display="flex" justifyItems="space-between" alignItems="center" marginRight="8px">
                      {!isMobile && <GreenDotBox />}
                      <Box marginRight="16px" sx={{ color: 'white' }}>
                        {userName?.toUpperCase()}
                      </Box>

                      <Box marginRight="16px" sx={{ color: 'white', position: 'relative', cursor: 'pointer' }}>
                        <Box onClick={handleNotifications}>
                          <Notifications sx={{ fill: 'white', cursor: 'pointer' }} />
                          {!!messages.length && <NotificationCountBox>{messages.length}</NotificationCountBox>}
                        </Box>
                        {isNotificationOpen && (
                          <Notification messages={messages} setIsNotificationOpen={handleNotifications} />
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
