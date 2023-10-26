import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '../../../../service/useApiCall';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegistrationForm } from '../../../shared/models/authorizationModel';

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
  const { httpPost } = useApiCall();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const registrationForm = useForm<RegistrationForm>({
    defaultValues: defaultValues,
    mode: 'onBlur',
    shouldFocusError: true,
    shouldUnregister: false,
    resolver: yupResolver(validationSchema),
  });

  const submit: SubmitHandler<RegistrationForm> = async (form) => {
    const values = { userName: form.userName, email: form.email, password: form.password, createdAt: Date() };

    try {
      const data = await httpPost<{ success: boolean; message: string }>('/signup', { ...values });
      const { success, message } = data;
      if (success) {
        setTimeout(() => {
          navigate('/paskyra/prisijungti');
        }, 2000);
        setMessage(message);
      } else {
        setError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { registrationForm, submit, error, message };
};
