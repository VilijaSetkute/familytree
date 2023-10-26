import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginForm, UserResponse } from '../../../shared/models/authorizationModel';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '../../../../service/useApiCall';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../utils/context/userContext';

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
  const { httpPost } = useApiCall();
  const [error, setError] = useState('');

  const loginForm = useForm<LoginForm>({
    defaultValues: defaultValues,
    mode: 'onBlur',
    shouldFocusError: true,
    shouldUnregister: false,
    resolver: yupResolver(validationSchema),
  });

  const submit: SubmitHandler<LoginForm> = async (form) => {
    const values = { email: form.email, password: form.password };

    try {
      const data = await httpPost<{ success: boolean; message: string }>('/login', { ...values });
      const { success, message } = data;
      if (success) {
        const { status, user } = await httpPost<UserResponse>('/', {});
        setTimeout(() => {
          setUser({ isAuthorized: status, user });
          navigate('/pagrindinis');
        }, 1000);
      } else {
        setError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { loginForm, submit, error };
};
