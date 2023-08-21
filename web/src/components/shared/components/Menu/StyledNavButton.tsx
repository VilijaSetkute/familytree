import React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuNavButton, styles } from './styles';
import { ReactComponent as LeafIcon } from '../../../../assets/icons/leaf_icon.svg';
import { ReactComponent as LeafIconLeft } from '../../../../assets/icons/leaf_icon_left.svg';

interface NavButtonProps {
  to: string;
  text: string;
  onClose?: () => void;
}

const StyledNavButton: React.FC<NavButtonProps> = ({ to, text, onClose }) => {
  return (
    <NavLink to={to} style={styles.navLinkPositioning} onClick={onClose}>
      {({ isActive }) => (
        <>
          {isActive ? <LeafIconLeft width={40} /> : undefined}
          <MenuNavButton
            isactive={`${isActive}`}
            disableRipple
            sx={{ fontWeight: isActive ? '800' : '300' }}
          >
            {text}
          </MenuNavButton>
          {isActive ? <LeafIcon width={40} /> : undefined}
        </>
      )}
    </NavLink>
  );
};

export default StyledNavButton;
