import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuNavButton, styles } from './styles';

interface NavButtonProps {
  to: string;
  text: string | ReactNode;
  onClose?: () => void;
}

const StyledNavButton: React.FC<NavButtonProps> = ({ to, text, onClose }) => {
  return (
    <NavLink to={to} style={styles.navLinkPositioning} onClick={onClose}>
      {({ isActive }) => (
        <>
          <MenuNavButton isactive={`${isActive}`} disableRipple sx={{ fontWeight: isActive ? '800' : '300' }}>
            {text}
          </MenuNavButton>
        </>
      )}
    </NavLink>
  );
};

export default StyledNavButton;
