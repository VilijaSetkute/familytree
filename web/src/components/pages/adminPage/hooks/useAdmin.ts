import { useEffect } from 'react';
import { useHttpRequest } from '../../../shared/service/api/useHttpRequest';
import {
  getAllUsers,
  deleteSingleUser,
  activateUser,
  updateUsersPermission,
} from '../../../shared/service/api/users.api';
import { UserResponse } from '../../../shared/models/authorizationModel';
import { SocketProp } from '../../../shared/models/websocketModel';

export interface Option {
  value: string;
  label: string;
  isDisabled: boolean;
}

export interface UserData {
  isActive: boolean;
  userName: string;
}

type AccessData = Option | Option[] | null;

export const useAdmin = (socket: SocketProp) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const usersApi = useHttpRequest<UserResponse[]>();
  const manageApi = useHttpRequest();

  useEffect(() => {
    usersApi.call(getAllUsers());
  }, []); // eslint-disable-line

  const deleteUser = async (id: string) => {
    await manageApi.call(deleteSingleUser(id));
    await usersApi.call(getAllUsers());
  };

  const manageUser = async (action: string, id: string, data?: UserData | AccessData) => {
    const isDataProvided = data !== null && data !== undefined && !Array.isArray(data);
    const isUserData = isDataProvided && 'userName' in data;
    const isAccessData = isDataProvided && 'value' in data;
    if (action === 'delete') await manageApi.call(deleteSingleUser(id));
    if (action === 'activate' && isUserData) {
      await manageApi.call(activateUser(id));
      !data.isActive &&
        socket &&
        socket.emit('user_activated', {
          userName: data.userName,
          id,
        });
    }
    if (action === 'update' && isAccessData) {
      await manageApi.call(updateUsersPermission(id, { accountPermissions: data?.value as string }));
    }

    await usersApi.call(getAllUsers());
  };

  return { users: usersApi.data, deleteUser, manageUser, loading: usersApi.loading || manageApi.loading };
};
