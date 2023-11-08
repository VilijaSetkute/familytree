import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

const production = process.env.REACT_APP_PRODUCTION === 'true';
const baseURL = production ? process.env.REACT_APP_PUBLIC_URL : process.env.REACT_APP_LOCAL_URL;

interface ResponseWrapper<T> {
  data: T | null;
  success: boolean;
}

interface Response<T> {
  didError: boolean;
  message: string;
  data: T | null;
  errorMessages?: string[];
}

interface ApiCallState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  errorMessages: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialApiCallState: ApiCallState<any> = {
  data: null,
  error: null,
  loading: false,
  errorMessages: [],
};

type ApiCallAction<T> = (prevState: ApiCallState<T>) => ApiCallState<T>;

const apiLoadStart =
  <T>(): ApiCallAction<T> =>
  ({ data }) => ({
    ...initialApiCallState,
    data,
    loading: true,
  });

const apiLoadSuccess =
  <T>(data: T | null): ApiCallAction<T> =>
  (state) => ({
    ...state,
    data,
    loading: false,
  });

const apiLoadFailure =
  <T>(error: string, errorMessages: string[] = []): ApiCallAction<T> =>
  (state) => ({
    ...state,
    error,
    errorMessages,
    loading: false,
  });

export async function httpRequest<T>(options: Partial<AxiosRequestConfig>): Promise<AxiosResponse<Response<T>>> {
  const headers: Record<string, string> = {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };

  let result = await axios({ ...options, baseURL: options.baseURL || baseURL, headers, withCredentials: true });

  if (result.status > 199 && result.status <= 299) {
    result = {
      ...result,
      data: { data: result.data.data ?? result.data, message: null, didError: false, errorMessages: null },
    };
  } else {
    result = {
      ...result,
      data: { data: null, message: result.data, didError: true, errorMessages: [result.data] },
    };
  }

  return result;
}

// useHttpRequest: states, http error handling, call function

export function useHttpRequest<T>() {
  const [state, setState] = useState<ApiCallState<T>>(initialApiCallState);

  const call = async (options: Partial<AxiosRequestConfig>) => {
    let res: ResponseWrapper<T> = { data: null, success: false };

    try {
      setState(apiLoadStart());
      const { data } = await httpRequest<T>(options);
      setState(apiLoadSuccess(data.data));
      const _data = data.data ?? data;
      res = { data: _data, success: true } as ResponseWrapper<T>;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        const response = error.response as AxiosResponse<Response<T>>;
        setState(apiLoadFailure(response.data.message, response.data.errorMessages));
      } else {
        setState(apiLoadFailure(error));
      }
    }

    return res;
  };

  return { ...state, call };
}
