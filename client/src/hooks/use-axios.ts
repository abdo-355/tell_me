import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";

type TMethods = "get" | "post" | "put" | "patch" | "delete";

const useAxios = (url: string, method: TMethods, body?: Object) => {
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<any>(null);
  const [statusCode, setStatusCode] = useState(0);

  const request = useCallback(async () => {
    try {
      const res = !body
        ? await axios({ url, method })
        : await axios({ url, method, data: body });

      setData(res.data);
      setStatusCode(res.status);
    } catch (err) {
      setError(err as AxiosError);
      setStatusCode((err as AxiosError).status || 400);
    } finally {
      setloading(false);
    }
  }, [body, method, url]);

  return { request, data, loading, error, statusCode };
};

export default useAxios;
