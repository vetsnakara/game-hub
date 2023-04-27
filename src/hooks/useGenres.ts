import { useQuery } from "@tanstack/react-query";

import { CACHE_KEY_GENRES } from "../constants";
import { genres } from "../data/genres";
import { ApiClient } from "../services/apiClient";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const apiClient = new ApiClient<Genre>("/genres");

export const useGenres = () =>
  useQuery<Genre[], Error>({
    queryKey: CACHE_KEY_GENRES,
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: genres,
  });
