import { AxiosRequestConfig } from 'axios';
import { LoginForm, CreateAccountForm } from '../../models/authorizationModel';

export const verifyUser = (): Partial<AxiosRequestConfig> => ({
  url: '/',
  method: 'POST',
});

export const login = (data: LoginForm): Partial<AxiosRequestConfig> => ({
  url: '/login',
  method: 'POST',
  data,
});

export const register = (data: CreateAccountForm): Partial<AxiosRequestConfig> => ({
  url: '/signup',
  method: 'POST',
  data,
});
