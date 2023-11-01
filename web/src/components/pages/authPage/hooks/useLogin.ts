import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginForm, UserResponse } from '../../../shared/models/authorizationModel';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../utils/context/userContext';
import { useHttpRequest } from '../../../shared/service/api/useHttpRequest';
import { login, verifyUser } from '../../../shared/service/api/authorization.api';

const defaultValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().required('Please provide email'),
  password: yup.string().required('Please provide password'),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState('');

  const loginApi = useHttpRequest<LoginForm>();
  const authApi = useHttpRequest<UserResponse>();

  const loginForm = useForm<LoginForm>({
    defaultValues: defaultValues,
    mode: 'onBlur',
    shouldFocusError: true,
    shouldUnregister: false,
    resolver: yupResolver(validationSchema),
  });

  const submit: SubmitHandler<LoginForm> = async (form) => {
    const values = { email: form.email, password: form.password };

    const { success: loginSucsess } = await loginApi.call(login(values));

    if (loginSucsess) {
      const authorization = await authApi.call(verifyUser());
      if (authorization.data?.status) {
        setTimeout(() => {
          setUser({ isAuthorized: authorization.data?.status as boolean, user: authorization.data?.user });
          navigate('/pagrindinis');
        }, 1000);
      } else {
        setError('something went wrong');
      }
    } else {
      setError('something went wrong');
    }
  };

  return { loginForm, submit, error };
};
