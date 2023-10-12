const publicUrl = 'https://back.mususaknys.lt';
const localUrl = 'http://localhost:7000';
const production = false;
const serverULR = production ? publicUrl : localUrl;

export const useApiCall = () => {
  const post = async <T>(url: string, data: object): Promise<T> => {
    const options: RequestInit = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    };
    let res = await fetch(serverULR + url, options);
    res = await res.json();
    return res as T;
  };

  const get = async (url: string) => {
    const options: RequestInit = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    };
    let res = await fetch(serverULR + url, options);
    res = await res.json();
    return res;
  };

  return { httpPost: post, httpGet: get };
};
