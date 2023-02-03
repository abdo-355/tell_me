import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;

const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (params: AxiosRequestConfig) => {
    try {
      const res = await axios.request(params);
      setResponse(res);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(axiosParams);
  }, [axiosParams, fetchData]);

  return { response, loading, error };
};

export default useAxios;
