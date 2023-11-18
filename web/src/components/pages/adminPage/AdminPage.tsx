import React, { useContext, useEffect, useState } from 'react';
import { ContentContainerPaper } from '../../shared/styledComponents/paper.styles';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Tabs, CircularProgress } from '@mui/material';
import { AdminTab, HeadTableCell, WarningTypography } from './styles';
import { useAdmin } from './hooks/useAdmin';
import { colors } from '../../../config/theme/theme';
import { format } from 'date-fns';
import { lt, enGB } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { UserContext } from '../../../utils/context/userContext';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { SocketProp } from '../../shared/models/websocketModel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface Option {
  value: string;
  label: string;
  isDisabled: boolean;
}

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
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { userName, accountPermissions } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  const tableColumns = [
    { title: t('admin.users_table_header.user') },
    { title: t('admin.users_table_header.email') },
    { title: t('admin.users_table_header.date') },
    { title: t('admin.users_table_header.permission') },
    { title: t('admin.users_table_header.status') },
    { title: t('admin.users_table_header.action') },
    { title: t('admin.users_table_header.delete') },
  ];

  const options = [
    { value: 'global_admin', label: 'Global Admin', isDisabled: true },
    { value: 'admin', label: 'Admin', isDisabled: false },
    { value: 'manage', label: 'Manage', isDisabled: false },
    { value: 'read', label: 'Read', isDisabled: false },
  ];

  const disableUserLine = (permission: string, name: string) => {
    return permission === 'global_admin' || name === userName;
  };

  const disableUserDeletion = (isActivated: boolean) => {
    return accountPermissions !== 'global_admin' || !!isActivated;
  };

  return (
    <ContentContainerPaper>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <AdminTab label="Users" {...a11yProps(0)} disableRipple />
            <AdminTab label="Gallery" {...a11yProps(1)} disableRipple />
            <AdminTab label="Locations" {...a11yProps(2)} disableRipple />
            <AdminTab label="Tree" {...a11yProps(3)} disableRipple />
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
                <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor: colors.dark.hint }}>
                    <TableRow>
                      {tableColumns.map((col, idx) => (
                        <HeadTableCell key={idx}>{col.title}</HeadTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users &&
                      users.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            pointerEvents: disableUserLine(row.accountPermissions, row.userName) ? 'none' : 'unset',
                            opacity: disableUserLine(row.accountPermissions, row.userName) ? 0.5 : 1,
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.userName}
                          </TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>
                            {format(new Date(row.createdAt), 'yyyy-MM-dd', {
                              locale: currentLanguage === 'en' ? enGB : lt,
                            })}
                          </TableCell>
                          <TableCell>
                            <Select
                              defaultValue={options.filter((option) => option.value === row.accountPermissions)}
                              options={options}
                              onChange={(option: Option | Option[] | null) => manageUser('update', row.id, option)}
                              menuPortalTarget={document.body}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,
                                  borderColor: state.isFocused ? 'green' : 'lightgrey',
                                  width: '150px',
                                  borderRadius: '8px',
                                  boxShadow: state.isFocused ? `0 0 0 1px ${colors.primaryGreen.green500}` : 'none',
                                  '&:hover': {
                                    boxShadow: `0 0 0 1px ${colors.primaryGreen.green500}`,
                                  },
                                }),
                                option: (baseStyles, state) => ({
                                  ...baseStyles,
                                  backgroundColor: state.isSelected ? colors.primaryGreen.green500 : colors.white,
                                  '&:hover': {
                                    backgroundColor: state.isSelected
                                      ? colors.primaryGreen.green500
                                      : colors.primaryGreen.green100,
                                  },
                                }),
                                indicatorSeparator: (baseStyles) => ({ ...baseStyles, height: '100%', marginTop: 0 }),
                                dropdownIndicator: (baseStyles, state) => ({
                                  ...baseStyles,
                                  transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: '0.5s',
                                }),
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 700,
                              color: row.accountActivated ? colors.primaryGreen.green500 : colors.error.error,
                            }}
                          >
                            {row.accountActivated
                              ? t('admin.users_table_cell.status_active')
                              : t('admin.users_table_cell.status_inactive')}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                minWidth: '130px',
                                fontWeight: 700,
                                borderRadius: '8px',
                                padding: '8px 16px',
                                backgroundColor: row.accountActivated
                                  ? colors.error.error
                                  : colors.primaryGreen.green500,
                                '&:hover': {
                                  backgroundColor: row.accountActivated
                                    ? colors.error.errorDarker
                                    : colors.primaryGreen.green600,
                                },
                              }}
                              onClick={() =>
                                manageUser('activate', row.id, {
                                  isActive: row.accountActivated,
                                  userName: row.userName,
                                })
                              }
                            >
                              {row.accountActivated
                                ? t('admin.users_table_cell.action_deactivate')
                                : t('admin.users_table_cell.action_activate')}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={disableUserDeletion(row.accountActivated)}
                              sx={{
                                minWidth: '130px',
                                fontWeight: 700,
                                backgroundColor: colors.error.error,
                                borderRadius: '8px',
                                padding: '8px 16px',
                                '&:hover': {
                                  backgroundColor: colors.error.errorDarker,
                                },
                              }}
                              onClick={() => manageUser('delete', row.id)}
                            >
                              {t('admin.users_table_cell.action_delete')}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
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
