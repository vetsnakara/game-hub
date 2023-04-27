import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

export const api = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "510ca01f630145cdb5cd65c8e5ede87d",
  },
});
