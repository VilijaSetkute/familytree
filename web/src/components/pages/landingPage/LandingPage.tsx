import { Box } from '@mui/material';
import CustomButton from '../../shared/components/CustomButton';
import { useTranslation } from 'react-i18next';
import { styles, LandingTitle, CenteredContainer } from './styles';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <CenteredContainer>
      <Box mb={3}>
        <LandingTitle sx={styles.landingSubtitle}>{t('landing_title.subtitle')}</LandingTitle>

        <LandingTitle sx={styles.landingTitle}>{t('landing_title.main_title')}</LandingTitle>
      </Box>
      <Link to="/pagrindinis">
        <CustomButton color="gradient" text={t('buttons.button_landing_start')} />
      </Link>
    </CenteredContainer>
  );
};

export default LandingPage;
