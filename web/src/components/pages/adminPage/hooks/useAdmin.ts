import { useEffect } from 'react';
import { useHttpRequest } from '../../../shared/service/api/useHttpRequest';
import { getAllUsers } from '../../../shared/service/api/users.api';

export const useAdmin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const usersApi = useHttpRequest<any[]>();

  useEffect(() => {
    usersApi.call(getAllUsers());
  }, []);

  return { users: usersApi.data };
};
