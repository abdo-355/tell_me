import { useState, useCallback, useContext } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
        withCredentials: true,
      });

      setData(res.data);
      setStatusCode(res.status);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;

      // if email not verified
      if (
        axiosErr.response &&
        axiosErr.response.status === 401 &&
        axiosErr.response.data &&
        axiosErr.response.data.message === "email not verified"
      ) {
        navigate("/email/not-verified");
      }
      setError(axiosErr);
      setStatusCode(axiosErr.response?.status || 400);
    } finally {
      setloading(false);
    }
  }, [body, method, navigate, token, url]);

  return { request, data, loading, error, statusCode };
};

export default useAxios;
