import React, { useState } from 'react';
import { AuthCard, CenteredContainer, InputField, styles } from './styles';
import { useTranslation } from 'react-i18next';
import { Box, Divider, IconButton, InputAdornment, Typography } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import CustomButton from '../../shared/components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/icons/Logo_icon.svg';
import { useLogin } from './hooks/useLogin';
import { Controller } from 'react-hook-form';

const Login = () => {
  const { t } = useTranslation();
  const { loginForm, submit, error } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <CenteredContainer>
      <AuthCard>
        <Box margin="0 auto">
          <Logo />
        </Box>
        <form onSubmit={loginForm.handleSubmit(submit)}>
          <Box mb={3}>
            <Controller
              name="email"
              control={loginForm.control}
              render={({ field }) => (
                <InputField
                  {...field}
                  name="email"
                  placeholder={t('authorization.input_user_placeholder')}
                  type="text"
                  endAdornment={
                    <InputAdornment position="start">
                      <AccountCircle sx={styles.inputIcon} />
                    </InputAdornment>
                  }
                />
              )}
            />
            <Controller
              name="password"
              control={loginForm.control}
              render={({ field }) => (
                <InputField
                  {...field}
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
                        {showPassword ? <VisibilityOff sx={styles.inputIcon} /> : <Visibility sx={styles.inputIcon} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            <Typography
              sx={{
                textTransform: 'lowercase',
                color: '#F04438',
                fontWeight: 400,
                fontSize: 12,
              }}
            >
              {error}
            </Typography>
          </Box>
          <CustomButton
            type="submit"
            text={t('authorization.login_button')}
            color="light"
            shadowSize={5}
            width="full"
            onClick={loginForm.handleSubmit(submit)}
          />
        </form>
        <Divider sx={{ my: '16px' }}>
          <Box sx={{ color: 'grey', fontWeight: 400, textTransform: 'lowercase' }}>
            {t('authorization.login_divider')}
          </Box>
        </Divider>
        <Link to="/paskyra/registruotis">
          <CustomButton text={t('authorization.register_button')} color="light" shadowSize={5} width="full" />
        </Link>
      </AuthCard>
    </CenteredContainer>
  );
};

export default Login;
