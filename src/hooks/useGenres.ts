import { useQuery } from "@tanstack/react-query";

import { CACHE_KEY_GENRES } from "../constants";
import { FetchResponse, api } from "../services/apiClient";
import { genres } from "../data/genres";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export const useGenres = () =>
  useQuery<Genre[], Error>({
    queryKey: CACHE_KEY_GENRES,
    queryFn: () =>
      api.get<FetchResponse<Genre>>("/genres").then((res) => res.data.results),
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: genres,
  });
