import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '../../../../service/useApiCall';
import { UserResponse } from '../../../../App';
import { UserContext } from '../../../../utils/context/userContext';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { httpPost } = useApiCall();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

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
        '/login',
        { ...inputValue }
      );
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
    setInputValue({
      ...inputValue,
      email: '',
      password: '',
    });
  };

  return { handleSubmit, handleOnChange, inputValue, error };
};
