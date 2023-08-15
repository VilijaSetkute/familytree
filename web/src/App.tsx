import React, { useEffect } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import 'flag-icon-css/css/flag-icons.min.css';
import LanguageSelector from './components/shared/components/LanguageSelector';
import CustomButton from './components/shared/components/CustomButton';
import Menu from './components/shared/components/Menu';

function App() {
  const { t } = useTranslation();
  // const releaseDate: Date = new Date('2023-08-01');
  // const dateNow: Date = new Date();
  // const timeDifference = Number(dateNow) - Number(releaseDate);
  // const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  useEffect(() => {
    document.title = t('app_title');
  }, [t]);

  return (
    <Box className="App">
      <Menu />
      <LanguageSelector />
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyItems="center"
          alignItems="center"
          sx={{ color: 'white' }}
        >
          <Box
            sx={{
              color: '#FFF',
              textAlign: 'center',
              marginLeft: '-250px',
              textShadow: '0px 15px 15px rgba(0, 0, 0, 0.75)',
              fontFamily: 'Karla',
              fontSize: '75px',
              fontWeight: 300,
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            {t('landing_title.subtitle')}
          </Box>
          <Box
            sx={{
              color: '#FFF',
              textAlign: 'center',
              textShadow: '0px 15px 15px rgba(0, 0, 0, 0.75)',
              fontFamily: 'Karla',
              fontSize: '180px',
              fontWeight: 800,
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            {t('landing_title.main_title')}
          </Box>
        </Box>
        {/* <Box>{t('days_since_last_release', { number_of_days })}</Box> */}
      </Box>
      <CustomButton text={t('buttons.button_landing_start')} />
      {/* <CustomButton text="pradėti" /> */}
    </Box>
  );
}

export default App;
