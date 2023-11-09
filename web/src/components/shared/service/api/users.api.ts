import { AxiosRequestConfig } from 'axios';
import { PermissionUpdate } from '../../models/authorizationModel';

export const getAllUsers = (): Partial<AxiosRequestConfig> => ({
  url: '/users',
  method: 'GET',
});

export const activateUser = (id: string): Partial<AxiosRequestConfig> => ({
  url: `/users/${id}/activate`,
  method: 'PATCH',
});

export const updateUsersPermission = (id: string, data: PermissionUpdate): Partial<AxiosRequestConfig> => ({
  url: `/users/${id}/permission`,
  method: 'PATCH',
  data,
});

export const deleteSingleUser = (id: string): Partial<AxiosRequestConfig> => ({
  url: `/users/${id}`,
  method: 'DELETE',
});
