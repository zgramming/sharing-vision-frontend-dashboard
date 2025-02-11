import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./constant";

export const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const http = {
  fetcher: async (url: string) => {
    const uri = `${baseURL}${url}`;
    const resp = await instance.get(uri);

    return resp.data;
  },
  fetcherPost: async (url: string, data: any, opts?: AxiosRequestConfig) => {
    const uri = `${baseURL}${url}`;
    const resp = await instance.post(uri, data, opts);

    return resp.data;
  },
  get: async (url: string, opts = {}) => {
    const resp = await instance.get(baseURL + url, opts);

    return resp.data;
  },
  post: async (url: string, data: any, opts?: AxiosRequestConfig) => {
    const resp = await instance.post(baseURL + url, data, opts);

    return resp.data;
  },
  put: async (url: string, data: any, opts?: AxiosRequestConfig) => {
    const resp = await instance.put(baseURL + url, data, opts);

    return resp.data;
  },
  patch: async (url: string, data: any, opts?: AxiosRequestConfig) => {
    const resp = await instance.patch(baseURL + url, data, opts);

    return resp.data;
  },
  del: async (url: string, opts?: AxiosRequestConfig) => {
    const resp = await instance.delete(baseURL + url, opts);

    return resp.data;
  },
};
