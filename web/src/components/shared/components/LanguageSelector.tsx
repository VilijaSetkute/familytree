import React, { useEffect, useState } from 'react';
import { Language } from '@mui/icons-material';
import i18next from 'i18next';
import 'flag-icon-css/css/flag-icons.min.css';
import { Box } from '@mui/material';
import { ClickAwayListener } from '@mui/base';

const options = [
  {
    value: 'en',
    label: 'English',
    country_code: 'gb',
    flag: 'flag-icon-gb',
  },
  {
    value: 'lt',
    label: 'Lietuvių',
    country_code: 'lt',
    flag: 'flag-icon-lt',
  },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentCookie, setCurrentCookie] = useState<string>('');

  const handlelanguage = (language: string) => {
    i18next.changeLanguage(language);
    setIsOpen(!isOpen);
  };

  const getLangugageCookie = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    const currentCookie = cookies
      .find((cookie) => cookie.startsWith('i18next'))
      ?.split('=')[1];
    setCurrentCookie(currentCookie || '');
  };

  useEffect(() => {
    getLangugageCookie();
  }, [isOpen]);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          textAlign: 'end',
          margin: '16px',
        }}
      >
        <Language
          sx={{
            color: 'white',
            fontSize: '40px',
            cursor: 'pointer',
          }}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <Box>
            {options.map(({ value, label, country_code, flag }) => (
              <Box
                sx={{
                  padding: '8px 16px',
                  marginBottom: '4px',
                  borderRadius: '8px',
                  textAlign: 'start',
                  cursor: currentCookie === value ? 'default' : 'pointer',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor:
                      currentCookie === value
                        ? 'none'
                        : 'rgba(255,255,255,0.3)',
                  },
                  opacity: currentCookie === value ? 0.5 : 1,
                }}
                key={country_code}
                onClick={() =>
                  currentCookie === value ? null : handlelanguage(value)
                }
              >
                <span
                  className={`flag-icon ${flag}`}
                  style={{ marginRight: '16px' }}
                />
                {label}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default LanguageSelector;
