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
  isAuthorized: boolean;
  user: string | undefined;
}

export interface UserResponse {
  status: boolean;
  user: string | undefined;
}
