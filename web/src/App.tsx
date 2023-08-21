import React, { useEffect } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import 'flag-icon-css/css/flag-icons.min.css';
import LandingPage from './components/pages/landingPage/LandingPage';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/homePage/HomePage';
import Login from './components/pages/authPage/Login';
import GalleryPage from './components/pages/galleryPage/GalleryPage';
import LocationsPage from './components/pages/locationsPage/LocationsPage';
import TreePage from './components/pages/treePage/TreePage';
import Menu from './components/shared/components/Menu';
import NoContentPage from './components/pages/noContentPage/NoContentPage';
import Register from './components/pages/authPage/Register';

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('app_title');
  }, [t]);

  return (
    <Box className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pagrindinis" element={<HomePage />} />
        <Route path="/paskyra/prisijungti" element={<Login />} />
        <Route path="/paskyra/registruotis" element={<Register />} />
        <Route path="/galerija" element={<GalleryPage />} />
        <Route path="/vietoves" element={<LocationsPage />} />
        <Route path="/medis" element={<TreePage />} />
        <Route path="*" element={<NoContentPage />} />
      </Routes>
    </Box>
  );
}

export default App;
