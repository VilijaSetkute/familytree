import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegistrationForm, CreateAccountForm } from '../../../shared/models/authorizationModel';
import { useHttpRequest } from '../../../shared/service/api/useHttpRequest';
import { register } from '../../../shared/service/api/authorization.api';

const defaultValues = {
  userName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  userName: yup.string().required('Please provide a user name'),
  email: yup.string().required('Please provide an email'),
  password: yup.string().required('Please provide a password'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const useRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const registerApi = useHttpRequest<RegistrationForm>();

  const registrationForm = useForm<RegistrationForm>({
    defaultValues: defaultValues,
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
      }, 2000);
      setMessage('Request sent successfully');
    } else {
      setError(message);
    }
  };

  return { registrationForm, submit, error, message };
};
