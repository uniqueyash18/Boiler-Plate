import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { getItem } from "../services/apiService";
import { APIS, LIVE_URL } from "../services/routes";

const axiosInstance = axios.create({
  baseURL: LIVE_URL
});

// Adding interceptor to log request details
axiosInstance.interceptors.request.use((config) => {
  const userData = getItem("userData");
  if (!!userData) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  // Log the headers and data being sent with the request
  console.log("Request Headers:", config.headers);
  console.log("Request Data:", config.data);
  return config;
});

export const useCustomQuery = <T>(url: APIS, query = "") =>
  useQuery<T>({
    queryKey: [url + query],
    queryFn: async () => {
      console.log(url + query, 'api hittin');
      const response = await axiosInstance.get<T>(url + query);
      console.log(response, 'api ress');
      return response.data;
    },
    retry: 3,
  });

export default useCustomQuery;
