export const EMAIL_REGX =
  /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

export const defaultLoginValues = {
  email: '',
  password: '',
};

export const defaultRegisterValues = {
  userName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegistrationForm {
  userName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type CreateAccountForm = Omit<RegistrationForm, 'passwordConfirmation'> & { createdAt: string };

export interface User {
  accountActivated: boolean | undefined;
  id: string | undefined;
  userName: string | undefined;
  accountPermissions: string | undefined;
}

export interface UserVerificationResponse {
  status: boolean;
  user: undefined | User;
}

export interface UserResponse {
  id: string;
  userName: string;
  email: string;
  createdAt: string;
  accountActivated: boolean;
  accountPermissions: string;
}

export interface PermissionUpdate {
  accountPermissions: string;
}
