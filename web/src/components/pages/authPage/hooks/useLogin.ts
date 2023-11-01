import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginForm, UserResponse } from '../../../shared/models/authorizationModel';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../../utils/context/userContext';
import { useHttpRequest } from '../../../shared/service/api/useHttpRequest';
import { login, verifyUser } from '../../../shared/service/api/authorization.api';

const EMAIL_REGX =
  /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

const defaultValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().required('Please provide email').matches(EMAIL_REGX, 'Invalid email address'),
  password: yup.string().required('Please provide password'),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

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
    const { data } = await loginApi.call(login(values));

    if (data) {
      const authorization = await authApi.call(verifyUser());
      if (authorization.data?.status) {
        setTimeout(() => {
          setUser({ isAuthorized: authorization.data?.status as boolean, user: authorization.data?.user });
          navigate('/pagrindinis');
        }, 1000);
      }
    }
  };

  return { loginForm, submit, error: loginApi.error };
};
