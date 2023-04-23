import axios from "axios";
export { AxiosError, CanceledError } from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "api-key": "...",
  },
});
