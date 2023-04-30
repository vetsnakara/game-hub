import { useQuery } from "@tanstack/react-query";
import ms from "ms";

import { CACHE_KEY_GENRES } from "../constants";
import { genres } from "../data/genres";
import { ApiClient, FetchResponse } from "../services/apiClient";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const apiClient = new ApiClient<Genre>("/genres");

export const useGenres = () =>
  useQuery<FetchResponse<Genre>>({
    queryKey: CACHE_KEY_GENRES,
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    initialData: genres,
  });
