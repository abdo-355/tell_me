import { useState, useCallback, useContext } from "react";
import axios, { AxiosError } from "axios";
import authContext from "../context/auth-context";

type TMethods = "get" | "post" | "put" | "patch" | "delete";

const useAxios = (url: string, method: TMethods, body?: Object) => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState<AxiosError<{ message: string }> | null>(
    null
  );
  const [data, setData] = useState<any>(null);
  const [statusCode, setStatusCode] = useState(0);

  const { token } = useContext(authContext);

  const request = useCallback(async () => {
    try {
      setloading(true);
      const res = await axios.request({
        url,
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      });

      setData(res.data);
      setStatusCode(res.status);
    } catch (err) {
      setError(err as AxiosError<{ message: string }>);
      setStatusCode((err as AxiosError).status || 400);
    } finally {
      setloading(false);
    }
  }, [body, method, token, url]);

  return { request, data, loading, error, statusCode };
};

export default useAxios;
