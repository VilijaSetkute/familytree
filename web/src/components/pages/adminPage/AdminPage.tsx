import React, { useEffect, useState } from 'react';
import { ContentContainerPaper } from '../../shared/styledComponents/paper.styles';
import { Box, Tabs, CircularProgress } from '@mui/material';
import { AdminTab, WarningTypography } from './styles';
import { useAdmin } from './hooks/useAdmin';
import { useTranslation } from 'react-i18next';
import { SocketProp } from '../../shared/models/websocketModel';
import {
  TabPanelProps,
  tabs,
  options,
  ADMIN_USER,
  ADMIN_EMAIL,
  ADMIN_DATE,
  ADMIN_PERMISSION,
  ADMIN_STATUS,
  ADMIN_ACTION,
  ADMIN_DELETE,
} from '../../shared/models/adminModel';
import AdminTable from './AdminTable';

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

interface Props {
  socket: SocketProp;
}

const AdminPage: React.FC<Props> = ({ socket }) => {
  const { users, manageUser, loading } = useAdmin(socket);
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const tableColumns = [
    { title: t(ADMIN_USER) },
    { title: t(ADMIN_EMAIL) },
    { title: t(ADMIN_DATE) },
    { title: t(ADMIN_PERMISSION) },
    { title: t(ADMIN_STATUS) },
    { title: t(ADMIN_ACTION) },
    { title: t(ADMIN_DELETE) },
  ];

  const updateScreenWidth = () => {
    const width = window.innerWidth;
    setIsMobile(width < 700);
  };

  useEffect(() => {
    updateScreenWidth();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ContentContainerPaper>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {tabs.map((tab) => (
              <AdminTab key={tab.tabId} label={tab.tabName} {...a11yProps(tab.tabId)} disableRipple />
            ))}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box sx={{ overflow: 'auto' }}>
              <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
                {isMobile && (
                  <WarningTypography>You are using smaller screen, please use bigger screen device.</WarningTypography>
                )}
                <AdminTable tableColumns={tableColumns} users={users} options={options} manageUser={manageUser} />
              </Box>
            </Box>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Gallery
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Locations
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          Tree
        </CustomTabPanel>
      </Box>
    </ContentContainerPaper>
  );
};

export default AdminPage;
