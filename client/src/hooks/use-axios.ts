import { useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

type TMethods = "get" | "post" | "put" | "patch" | "delete";

const useAxios = (url: string | (() => string), method: TMethods, body?: Object) => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState<AxiosError<{ message: string }> | null>(
    null
  );
  const [data, setData] = useState<any>(null);
  const [statusCode, setStatusCode] = useState(0);

  const { getToken } = useAuth();

  const navigate = useNavigate();

  const request = useCallback(async (dynamicBody?: Object) => {
    try {
      setloading(true);
      const token = await getToken();
      const currentUrl = typeof url === 'function' ? url() : url;
      const res = await axios.request({
        url: currentUrl,
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: dynamicBody || body,
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
  }, [body, method, navigate, getToken, url]);

  return { request, data, loading, error, statusCode };
};

export default useAxios;
