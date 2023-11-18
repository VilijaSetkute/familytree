import { Typography } from '@mui/material';
import { CenteredContainer } from './styles';
import { useTranslation, Trans } from 'react-i18next';

const NoContentPage = () => {
  const { t } = useTranslation();
  return (
    <CenteredContainer>
      <Typography color="white" variant="h4">
        {t('page_no_content.text_main')}
      </Typography>
      <Typography color="white">
        {/* {t('page_no_content.text_instruction')} */}
        <Trans i18nKey="page_no_content.text_instruction" />
      </Typography>
    </CenteredContainer>
  );
};

export default NoContentPage;
