import { DependencyList, useEffect, useMemo, useState } from "react";
import { AxiosRequestConfig, CanceledError } from "axios";

import { api } from "../services/apiClient";

interface UseDataOptions {
  endpoint: string;
  requestConfig?: AxiosRequestConfig;
  deps?: DependencyList;
}

interface FetchResponse<T> {
  count: number;
  results: T[];
}

export const useData = <T>(options: UseDataOptions) => {
  const { endpoint, requestConfig = {}, deps = [] } = options;

  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    api
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
        ...requestConfig,
      })
      .then(({ data }) => setData(data.results))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return useMemo(
    () => ({
      data,
      isLoading,
      error,
    }),
    [data, isLoading, error]
  );
};
