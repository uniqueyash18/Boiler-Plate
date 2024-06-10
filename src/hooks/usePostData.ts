import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { getItem } from '../services/apiService';
import { LIVE_URL } from '../services/routes';

const axiosInstance = axios.create({
  baseURL: LIVE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const modifiedConfig = {...config};
  const userData = getItem('userData');
  if (userData) {
    modifiedConfig.headers.Authorization = `Bearer ${userData.token}`;
  }

  return modifiedConfig;
});
axiosInstance.interceptors.request.use(config => {
  console.log('Final Request URL:', `${LIVE_URL}${config.url}`);
  console.log('Request Data:', config.data);
  console.log('Request Headers:', config.headers);
  return config;
});

axiosInstance.interceptors.response.use(
  async function (response) {
    console.log(response, 'api ressss');
    return response;
  },
  function (error) {
    console.log(error, 'api eroorrrr');
    if (error?.response?.status === 401) {
      return Promise.reject(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Unauthorized',
      );
    }

    return Promise.reject(error?.response?.data?.message);
  },
);

interface MutationData {}
const usePostData = <
  TData,
  TError,
  TVariables = MutationData,
  TContext = unknown,
>(
  url: string,
  options?: UseMutationOptions<
    AxiosResponse<TData>,
    TError,
    TVariables,
    TContext
  >,
): UseMutationResult<AxiosResponse<TData>, TError, TVariables, TContext> => {
  const result = useMutation<
    AxiosResponse<TData>,
    TError,
    TVariables,
    TContext
  >({
    ...options,
    retry:1,
    mutationFn: (variables: TVariables) =>
      axiosInstance.post<TData>(url, variables),
  });
  return result;
};

export default usePostData;
