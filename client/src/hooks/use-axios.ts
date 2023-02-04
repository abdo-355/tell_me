import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND;

type TMethods = "get" | "post" | "put" | "patch" | "delete";

const useAxios = (url: string, method: TMethods, data?: Object) => {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [responseData, setResponseData] = useState<any>({});
  const [statusCode, setStatusCode] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const res = !data
        ? await axios({ url, method })
        : await axios({ url, method, data });

      setResponseData(res.data);
      setStatusCode(res.status);
    } catch (err) {
      setError(err as AxiosError);
      setStatusCode((err as AxiosError).status || 400);
    } finally {
      setloading(false);
    }
  }, [data, method, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetchData, responseData, loading, error, statusCode };
};

export default useAxios;
