import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import 'flag-icon-css/css/flag-icons.min.css';
import LandingPage from './components/pages/landingPage/LandingPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './components/pages/homePage/HomePage';
import Login from './components/pages/authPage/Login';
import GalleryPage from './components/pages/galleryPage/GalleryPage';
import LocationsPage from './components/pages/locationsPage/LocationsPage';
import TreePage from './components/pages/treePage/TreePage';
import Menu from './components/shared/components/Menu';
import NoContentPage from './components/pages/noContentPage/NoContentPage';
import Register from './components/pages/authPage/Register';
import { useApiCall } from './service/useApiCall';
import Cookies from 'js-cookie';
import { UserContext } from './utils/context/userContext';
import { User, UserResponse } from './components/shared/models/authorizationModel';
import AdminPage from './components/pages/adminPage/AdminPage';

function App() {
  const { t } = useTranslation();
  const { isAuthorized, userName, accountPermissions, id } = useContext(UserContext);
  const { httpPost } = useApiCall();
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState<User>({
    isAuthorized,
    userName,
    accountPermissions,
    id,
  });

  const verifyCookie = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/paskyra/prisijungti');
    }
    const { status, user } = await httpPost<UserResponse>('/', {});

    const setAuthorized = () => {
      setUserStatus({
        isAuthorized: status,
        id: user?.id,
        userName: user?.userName,
        accountPermissions: user?.accountPermissions,
      });
      navigate('/pagrindinis');
    };

    return status ? setAuthorized() : Cookies.remove('token');
  };

  useEffect(() => {
    verifyCookie();
  }, []);

  useEffect(() => {
    document.title = t('app_title');
  }, [t]);

  return (
    <UserContext.Provider
      value={{
        isAuthorized: userStatus.isAuthorized,
        id: userStatus.id,
        userName: userStatus.userName,
        accountPermissions: userStatus.accountPermissions,
        setUser: setUserStatus,
      }}
    >
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

          <Route path="/admin" element={<AdminPage />} />

          <Route path="*" element={<NoContentPage />} />
        </Routes>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
