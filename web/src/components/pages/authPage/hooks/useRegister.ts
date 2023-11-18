import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegistrationForm, CreateAccountForm } from '../../../shared/models/authorizationModel';
import { useHttpRequest } from '../../../shared/service/api/useHttpRequest';
import { register } from '../../../shared/service/api/authorization.api';
import { EMAIL_REGX, defaultRegisterValues } from '../../../shared/models/authorizationModel';

const validationSchema = yup.object().shape({
  userName: yup.string().required('Please provide a user name'),
  email: yup.string().required('Please provide an email').matches(EMAIL_REGX, 'Invalid email address'),
  password: yup.string().required('Please provide a password'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const useRegister = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const registerApi = useHttpRequest<RegistrationForm>();

  const registrationForm = useForm<RegistrationForm>({
    defaultValues: defaultRegisterValues,
    mode: 'onBlur',
    shouldFocusError: true,
    shouldUnregister: false,
    resolver: yupResolver(validationSchema),
  });

  const submit: SubmitHandler<RegistrationForm> = async (form) => {
    const values: CreateAccountForm = {
      userName: form.userName,
      email: form.email,
      password: form.password,
      createdAt: Date(),
    };

    const testRes = await registerApi.call(register({ ...values }));

    if (testRes.success) {
      setTimeout(() => {
        navigate('/paskyra/prisijungti');
        setMessage('Request sent successfully');
      }, 0);
    }
  };

  return { registrationForm, submit, error: registerApi.error, message, loading: registerApi.loading };
};
