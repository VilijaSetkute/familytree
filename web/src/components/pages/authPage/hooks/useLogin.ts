import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginForm, UserVerificationResponse } from '../../../shared/models/authorizationModel';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../../utils/context/userContext';
import { useHttpRequest } from '../../../shared/service/api/useHttpRequest';
import { login, verifyUser } from '../../../shared/service/api/authorization.api';
import { EMAIL_REGX, defaultLoginValues } from '../../../shared/models/authorizationModel';

const validationSchema = yup.object().shape({
  email: yup.string().required('Please provide email').matches(EMAIL_REGX, 'Invalid email address'),
  password: yup.string().required('Please provide password'),
});

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const loginApi = useHttpRequest<LoginForm>();
  const authApi = useHttpRequest<UserVerificationResponse>();

  const loginForm = useForm<LoginForm>({
    defaultValues: defaultLoginValues,
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
          setUser({
            accountActivated: authorization.data?.status as boolean,
            userName: authorization.data?.user?.userName,
            accountPermissions: authorization.data?.user?.accountPermissions,
            id: authorization.data?.user?.id,
          });
          navigate('/pagrindinis');
        }, 0);
      }
    }
  };

  return { loginForm, submit, error: loginApi.error, loading: loginApi.loading || authApi.loading };
};
