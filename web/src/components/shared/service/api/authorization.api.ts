import { AxiosRequestConfig } from 'axios';

export interface LoginForm {
  email: string;
  password: string;
}

export const login = (data: LoginForm): Partial<AxiosRequestConfig> => ({
  url: 'http://localhost:7000/login',
  method: 'POST',
  data,
});
