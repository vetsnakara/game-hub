import { useEffect, useMemo, useState } from "react";
import { CanceledError } from "axios";

import { api } from "../services/apiClient";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

export const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    api
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
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
  }, []);

  return useMemo(
    () => ({
      data,
      isLoading,
      error,
    }),
    [data, isLoading, error]
  );
};
