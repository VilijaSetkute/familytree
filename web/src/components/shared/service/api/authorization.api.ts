import { AxiosRequestConfig } from 'axios';
import { LoginForm } from '../../../pages/authPage/hooks/useLogin';

export const login = (data: LoginForm): Partial<AxiosRequestConfig> => ({
  url: 'http://localhost:7000/login',
  method: 'POST',
  data,
});
