import { useContext, useEffect, useState } from 'react';
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
import Cookies from 'js-cookie';
import { UserContext } from './utils/context/userContext';
import { UserVerificationResponse, User } from './components/shared/models/authorizationModel';
import AdminPage from './components/pages/adminPage/AdminPage';
import { useHttpRequest } from './components/shared/service/api/useHttpRequest';
import { verifyUser } from './components/shared/service/api/authorization.api';
import io from 'socket.io-client';
import { SocketProp, socketOrigin } from './components/shared/models/websocketModel';

const App = () => {
  const { t } = useTranslation();
  const { accountActivated, userName, accountPermissions, id } = useContext(UserContext);
  const navigate = useNavigate();
  const [socket, setSocket] = useState<SocketProp>(null);
  const [userStatus, setUserStatus] = useState<User>({
    accountActivated,
    userName,
    accountPermissions,
    id,
  });
  const verificationApi = useHttpRequest<UserVerificationResponse>();

  useEffect(() => {
    const socketTest = io(socketOrigin as string);
    setSocket(socketTest);
  }, []);

  const verifyCookie = async () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/paskyra/prisijungti');
    }
    const { success, data } = await verificationApi.call(verifyUser());

    if (success && data?.status) {
      setUserStatus({
        accountActivated: data.user?.accountActivated,
        id: data.user?.id,
        userName: data.user?.userName,
        accountPermissions: data.user?.accountPermissions,
      });
      navigate('/');
    } else {
      Cookies.remove('token');
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        // Intentionally left empty
      });
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    verifyCookie();
  }, []); // eslint-disable-line

  useEffect(() => {
    document.title = t('app_title');
  }, [t]);

  return (
    <UserContext.Provider
      value={{
        accountActivated: userStatus.accountActivated,
        id: userStatus.id,
        userName: userStatus.userName,
        accountPermissions: userStatus.accountPermissions,
        setUser: setUserStatus,
      }}
    >
      <Box className="App">
        <Menu socket={socket} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pagrindinis" element={<HomePage />} />
          <Route path="/paskyra/prisijungti" element={<Login />} />
          <Route path="/paskyra/registruotis" element={<Register />} />
          <Route path="/galerija" element={<GalleryPage />} />
          <Route path="/vietoves" element={<LocationsPage />} />
          <Route path="/medis" element={<TreePage />} />

          <Route path="/admin" element={<AdminPage socket={socket} />} />

          <Route path="*" element={<NoContentPage />} />
        </Routes>
      </Box>
    </UserContext.Provider>
  );
};

export default App;
