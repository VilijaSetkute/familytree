import { Box, ClickAwayListener } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import StyledNavButton from './StyledNavButton';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const Menu = () => {
  const { t } = useTranslation();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(
    window.innerWidth >= 700
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
                    <StyledNavButton
                      to="/pagrindinis"
                      text={t('menu.home')}
                      onClose={handleMenuItem}
                    />
                    <StyledNavButton
                      to="/medis"
                      text={t('menu.tree')}
                      onClose={handleMenuItem}
                    />
                    <StyledNavButton
                      to="/vietoves"
                      text={t('menu.locations')}
                      onClose={handleMenuItem}
                    />
                    <StyledNavButton
                      to="/galerija"
                      text={t('menu.gallery')}
                      onClose={handleMenuItem}
                    />
                  </MenuListContainer>
                </Box>

                <Box display="flex" alignItems="center">
                  <Link to="/paskyra/prisijungti">
                    <MenuAuthButton disableRipple>
                      {t('authorization.menu_auth')}
                    </MenuAuthButton>
                  </Link>
                  <LanguageSelector />
                  <MenuExpandIcon onClick={() => setIsMenuVisible(true)} />
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
