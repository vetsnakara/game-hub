import { useEffect, useMemo, useState } from "react";
import { CanceledError } from "axios";

import { api } from "../services/apiClient";

export interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    api
      .get<FetchGenresResponse>("/genres", {
        signal: controller.signal,
      })
      .then(({ data }) => setGenres(data.results))
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
      genres,
      isLoading,
      error,
    }),
    [genres, isLoading, error]
  );
};
