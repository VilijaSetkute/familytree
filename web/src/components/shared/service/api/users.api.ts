import { AxiosRequestConfig } from 'axios';
// import { LoginForm, CreateAccountForm } from '../../models/authorizationModel';

export const getAllUsers = (): Partial<AxiosRequestConfig> => ({
  url: '/users',
  method: 'GET',
});
