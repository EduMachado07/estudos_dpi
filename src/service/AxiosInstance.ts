import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";

// ✅ Instância base SEM interceptadores
export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

// ✅ Instância principal (usada no app)
export const AxiosInstanceWithRefreshToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedRequestQueue: {
  onSuccess: () => void;
  onFailure: (error: AxiosError) => void;
}[] = [];

AxiosInstanceWithRefreshToken.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalConfig = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalConfig._retry) {
      return Promise.reject(error);
    }
    originalConfig._retry = true;

    // Enquanto o refresh acontece
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: () => resolve(AxiosInstanceWithRefreshToken(originalConfig)),
          onFailure: (err) => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      // ✅ Faz refresh usando instância sem interceptadores
      await AxiosInstance.post("/refresh");

      // ✅ Reexecuta todas as requisições da fila
      failedRequestQueue.forEach((req) => req.onSuccess());
      failedRequestQueue = [];

      // ✅ Refaz a requisição original imediatamente
      return AxiosInstanceWithRefreshToken(originalConfig);
    } catch (refreshError) {
      failedRequestQueue.forEach((req) =>
        req.onFailure(refreshError as AxiosError)
      );
      failedRequestQueue = [];

      console.warn("⚠️ Refresh token inválido. Redirecionando...");
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
