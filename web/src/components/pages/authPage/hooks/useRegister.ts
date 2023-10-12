import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '../../../../service/useApiCall';

export const useRegister = () => {
  const navigate = useNavigate();
  const { httpPost } = useApiCall();
  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = await httpPost<{ success: boolean; message: string }>(
        '/signup',
        { ...inputValue, createdAt: Date() }
      );
      const { success, message } = data;
      if (success) {
        setTimeout(() => {
          navigate('/paskyra/prisijungti');
        }, 2000);
        setInputValue({
          ...inputValue,
          email: '',
          password: '',
          username: '',
        });
        setMessage(message);
      } else {
        setError(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleSubmit, handleOnChange, inputValue, error, message };
};
