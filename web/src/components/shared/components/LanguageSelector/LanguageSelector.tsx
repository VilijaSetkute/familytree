import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import 'flag-icon-css/css/flag-icons.min.css';
import { Box } from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { AbsoluteContainer, LanguageIcon, LanguageItem } from './styles';
import { languageOptions, getLangugageCookie } from './model';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentCookie, setCurrentCookie] = useState<string>('');

  const handlelanguage = (language: string) => {
    i18next.changeLanguage(language);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const cookie = getLangugageCookie();
    setCurrentCookie(cookie);
  }, [isOpen]);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <AbsoluteContainer>
        <LanguageIcon onClick={() => setIsOpen(!isOpen)} />
        {isOpen && (
          <Box>
            {languageOptions.map(({ value, label, country_code, flag }) => (
              <LanguageItem
                key={country_code}
                isSelected={currentCookie === value}
                onClick={() =>
                  currentCookie === value ? null : handlelanguage(value)
                }
              >
                <Box
                  component="span"
                  className={`flag-icon ${flag}`}
                  marginRight={2}
                />
                {label}
              </LanguageItem>
            ))}
          </Box>
        )}
      </AbsoluteContainer>
    </ClickAwayListener>
  );
};

export default LanguageSelector;
