import { useEffect, useState } from 'react';
import i18next from 'i18next';
import 'flag-icon-css/css/flag-icons.min.css';
import { Box } from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { LanguageItem } from './styles';
import { languageOptions, getLangugageCookie } from './model';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentCookie, setCurrentCookie] = useState<string>('');
  const [flag, setFlag] = useState<string>('');
  const [menuToRight, setmenuToRight] = useState<boolean>(false);

  const updateScreenWidth = () => {
    const width = window.innerWidth;
    setmenuToRight(width < 1200);
  };

  useEffect(() => {
    updateScreenWidth();
  }, []);

  const handlelanguage = (language: string, flag: string) => {
    i18next.changeLanguage(language);
    setIsOpen(!isOpen);
    setCurrentCookie(language);
    setFlag(flag);
  };

  useEffect(() => {
    const cookie = getLangugageCookie();
    setCurrentCookie(cookie);
    setFlag(`flag-icon-${cookie === 'en' ? 'gb' : 'lt'}`);
  }, [isOpen]);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Box position="relative" sx={{ zIndex: 99 }}>
        <Box display="flex" alignItems="center">
          <Box
            sx={{ cursor: 'pointer' }}
            component="div"
            className={`flag-icon ${flag}`}
            onClick={() => setIsOpen(!isOpen)}
          />
        </Box>
        {isOpen && (
          <Box position="absolute" width="130px" marginTop={1} right={menuToRight ? 0 : 'none'}>
            {languageOptions.map(({ value, label, country_code, flag }) => (
              <LanguageItem
                key={country_code}
                isSelected={currentCookie === value}
                onClick={() => (currentCookie === value ? null : handlelanguage(value, flag))}
              >
                <Box component="span" className={`flag-icon ${flag}`} marginRight={2} />
                {label}
              </LanguageItem>
            ))}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default LanguageSelector;
