import axios, { AxiosRequestConfig } from "axios";
// import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
// import { redirect } from 'react-router-dom';

export const axiosInstance = axios.create({
  // baseURL: "https://localhost:7157",
  baseURL: "https://bwc-api-testing.runasp.net",
});

type Config = AxiosRequestConfig<unknown> | undefined;

// function isAuth() {
//   const isAuthenticated = useIsAuthenticated()
//   console.log(isAuthenticated)
//   if (isAuthenticated) return true

//   redirect('login')
//   return false
// }

export function getApi<T>(url: string, config?: Config) {
  // if (isAuth()) return
  return axiosInstance.get<T>(url, config);
}

export function putApi<T>(url: string, data: unknown, config?: Config) {
  return axiosInstance.put<T>(url, data, config);
}

export function postApi<T>(url: string, data: unknown, config?: Config) {
  // if (isAuth()) return
  // console.log(url)
  return axiosInstance.post<T>(url, data, config);
}

export function patchApi<T>(url: string, data: unknown, config?: Config) {
  return axiosInstance.patch<T>(url, data, config);
}

export function deleteApi<T>(url: string, config?: Config) {
  return axiosInstance.delete<T>(url, config);
}
