import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const api = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "510ca01f630145cdb5cd65c8e5ede87d",
  },
});

export class ApiClient<T> {
  constructor(public endpoint: string) {}

  getAll = (config: AxiosRequestConfig) =>
    api.get<FetchResponse<T>>(this.endpoint, config).then((res) => res.data);

  get = (id: string | number) =>
    api.get<T>(`${this.endpoint}/${id}`).then((res) => res.data);
}
