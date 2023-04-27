import axios, { AxiosRequestConfig } from "axios";

interface FetchResponse<T> {
  count: number;
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

  getAll = (config?: AxiosRequestConfig) =>
    api
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data.results);
}
