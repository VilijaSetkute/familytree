import React, { useState } from 'react';
import { AuthCard, CenteredContainer, InputField, styles } from './styles';
import { useTranslation } from 'react-i18next';
import { Box, Divider, IconButton, InputAdornment } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import CustomButton from '../../shared/components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/icons/Logo_icon.svg';
import { useLogin } from './hooks/useLogin';
import SnackbarChip from '../../shared/components/Snackbar/SnackbarChip';

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handleSubmit, handleOnChange, error } = useLogin();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <CenteredContainer>
      <AuthCard>
        <Box margin="0 auto">
          <Logo />
        </Box>
        <Box mb={3}>
          <InputField
            name="email"
            placeholder={t('authorization.input_user_placeholder')}
            type="text"
            endAdornment={
              <InputAdornment position="start">
                <AccountCircle sx={styles.inputIcon} />
              </InputAdornment>
            }
            onChange={handleOnChange}
          />
          <InputField
            name="password"
            placeholder={t('authorization.input_password_placeholder')}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  disableRipple
                >
                  {showPassword ? (
                    <VisibilityOff sx={styles.inputIcon} />
                  ) : (
                    <Visibility sx={styles.inputIcon} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            onChange={handleOnChange}
          />
        </Box>
        <CustomButton
          text={t('authorization.login_button')}
          color="light"
          shadowSize={5}
          width="full"
          onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
        />
        <Divider sx={{ my: '16px' }}>
          <Box>{t('authorization.login_divider')}</Box>
        </Divider>
        <Link to="/paskyra/registruotis">
          <CustomButton
            text={t('authorization.register_button')}
            color="light"
            shadowSize={5}
            width="full"
          />
        </Link>
      </AuthCard>
      {error && <SnackbarChip status="error" isStatus={true} message={error} />}
    </CenteredContainer>
  );
};

export default Login;
