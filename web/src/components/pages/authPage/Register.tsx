import React, { useState } from 'react';
import { AuthCard, CenteredContainer, InputField, styles } from './styles';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import CustomButton from '../../shared/components/CustomButton/CustomButton';
import { ReactComponent as Logo } from '../../../assets/icons/Logo_icon.svg';
import { useRegister } from './hooks/useRegister';
import SnackbarChip from '../../shared/components/Snackbar';
import { Controller } from 'react-hook-form';

const Register = () => {
  const { t } = useTranslation();
  const { registrationForm, submit, error, message } = useRegister();
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
        <form onSubmit={registrationForm.handleSubmit(submit)}>
          <Box mb={3}>
            <Controller
              name="userName"
              control={registrationForm.control}
              render={({ field }) => (
                <InputField
                  {...field}
                  name="userName"
                  placeholder={t('authorization.input_userName_placeholder')}
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
              name="email"
              control={registrationForm.control}
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
              control={registrationForm.control}
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

            <Controller
              name="passwordConfirmation"
              control={registrationForm.control}
              render={({ field }) => (
                <InputField
                  {...field}
                  name="passwordConfirmation"
                  placeholder={t('authorization.input_password_repeat_placeholder')}
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
            text={t('authorization.register_button')}
            color="light"
            shadowSize={5}
            width="full"
            onClick={registrationForm.handleSubmit(submit)}
          />
        </form>
      </AuthCard>
      {message && <SnackbarChip status="success" isStatus={true} message={message} />}
    </CenteredContainer>
  );
};

export default Register;
