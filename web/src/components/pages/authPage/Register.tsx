import React, { useState } from 'react';
import { AuthCard, CenteredContainer, InputField, styles } from './styles';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import CustomButton from '../../shared/components/CustomButton/CustomButton';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/icons/Logo_icon.svg';

const Register = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
            placeholder={t('authorization.input_userName_placeholder')}
            type="text"
            endAdornment={
              <InputAdornment position="start">
                <AccountCircle sx={styles.inputIcon} />
              </InputAdornment>
            }
          />
          <InputField
            placeholder={t('authorization.input_user_placeholder')}
            type="text"
            endAdornment={
              <InputAdornment position="start">
                <AccountCircle sx={styles.inputIcon} />
              </InputAdornment>
            }
          />
          <InputField
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
          />
          <InputField
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
                  {showPassword ? (
                    <VisibilityOff sx={styles.inputIcon} />
                  ) : (
                    <Visibility sx={styles.inputIcon} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
        <Link to="/pagrindinis">
          <CustomButton
            text={t('authorization.register_button')}
            color="light"
            shadowSize={5}
            width="full"
          />
        </Link>
      </AuthCard>
    </CenteredContainer>
  );
};

export default Register;
