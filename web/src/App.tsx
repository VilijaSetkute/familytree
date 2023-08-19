import React, { useEffect } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import 'flag-icon-css/css/flag-icons.min.css';
import LanguageSelector from './components/shared/components/LanguageSelector/LanguageSelector';
import LandingPage from './components/pages/landingPage/LandingPage';

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('app_title');
  }, [t]);

  return (
    <Box className="App">
      <LanguageSelector />
      <LandingPage />
    </Box>
  );
}

export default App;
