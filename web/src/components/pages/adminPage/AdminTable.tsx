import React, { useContext } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { HeadTableCell, selectedStyles, CustomTableRow, TableCellButton, TableCellStatusBox } from './styles';
import { colors } from '../../../config/theme/theme';
import { format } from 'date-fns';
import { lt, enGB } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { UserContext } from '../../../utils/context/userContext';
import { UserResponse } from '../../shared/models/authorizationModel';
import { UserData } from './hooks/useAdmin';

type AccessData = Option | Option[] | null;

export interface Option {
  value: string;
  label: string;
  isDisabled: boolean;
}

interface TableProps {
  tableColumns: { title: string }[];
  users: UserResponse[] | null;
  options: Option[];
  manageUser: (action: string, id: string, data?: UserData | AccessData) => void;
}

const AdminTable: React.FC<TableProps> = ({ tableColumns, users, options, manageUser }) => {
  const { userName, accountPermissions } = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const disableUserRow = (permission: string, name: string) => {
    return permission === 'global_admin' || name === userName;
  };

  const disableUserDeletion = (isActivated: boolean) => {
    return accountPermissions !== 'global_admin' || !!isActivated;
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'yyyy-MM-dd', {
      locale: currentLanguage === 'en' ? enGB : lt,
    });
  };

  const getStatusText = (status: boolean) => {
    return status ? t('admin.users_table_cell.status_active') : t('admin.users_table_cell.status_inactive');
  };

  const getStatusButtonText = (status: boolean) => {
    return status ? t('admin.users_table_cell.action_deactivate') : t('admin.users_table_cell.action_activate');
  };

  const getDeleteButtonText = t('admin.users_table_cell.action_delete');

  return (
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
            <CustomTableRow key={row.id} isDisabled={disableUserRow(row.accountPermissions, row.userName)}>
              <TableCell>{row.userName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{formatDate(row.createdAt)}</TableCell>
              <TableCell>
                <Select
                  defaultValue={options.filter((option) => option.value === row.accountPermissions)}
                  options={options}
                  onChange={(option: Option | Option[] | null) => manageUser('update', row.id, option)}
                  menuPortalTarget={document.body}
                  styles={selectedStyles()}
                />
              </TableCell>
              <TableCell>
                <TableCellStatusBox isActive={row.accountActivated}>
                  {getStatusText(row.accountActivated)}
                </TableCellStatusBox>
              </TableCell>
              <TableCell>
                <TableCellButton
                  variant="contained"
                  size="small"
                  isDefault={row.accountActivated}
                  onClick={() =>
                    manageUser('activate', row.id, {
                      isActive: row.accountActivated,
                      userName: row.userName,
                    })
                  }
                >
                  {getStatusButtonText(row.accountActivated)}
                </TableCellButton>
              </TableCell>
              <TableCell>
                <TableCellButton
                  variant="contained"
                  size="small"
                  disabled={disableUserDeletion(row.accountActivated)}
                  isDefault={true}
                  onClick={() => manageUser('delete', row.id)}
                >
                  {getDeleteButtonText}
                </TableCellButton>
              </TableCell>
            </CustomTableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default AdminTable;
