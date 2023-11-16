import { useEffect } from 'react';
import { useHttpRequest } from '../../../shared/service/api/useHttpRequest';
import {
  getAllUsers,
  deleteSingleUser,
  activateUser,
  updateUsersPermission,
} from '../../../shared/service/api/users.api';
import { UserResponse } from '../../../shared/models/authorizationModel';

export interface Option {
  value: string;
  label: string;
  isDisabled: boolean;
}

export const useAdmin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const usersApi = useHttpRequest<UserResponse[]>();
  const manageApi = useHttpRequest();

  useEffect(() => {
    usersApi.call(getAllUsers());
  }, []);

  const deleteUser = async (id: string) => {
    await manageApi.call(deleteSingleUser(id));
    await usersApi.call(getAllUsers());
  };

  const manageUser = async (action: string, id: string, data?: Option | Option[] | null) => {
    if (action === 'delete') await manageApi.call(deleteSingleUser(id));
    if (action === 'activate') await manageApi.call(activateUser(id));
    if (action === 'update' && data !== null && !Array.isArray(data)) {
      await manageApi.call(updateUsersPermission(id, { accountPermissions: data?.value as string }));
    }

    await usersApi.call(getAllUsers());
  };

  return { users: usersApi.data, deleteUser, manageUser, loading: usersApi.loading || manageApi.loading };
};