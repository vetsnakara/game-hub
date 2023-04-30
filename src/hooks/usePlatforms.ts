import { useQuery } from "@tanstack/react-query";

import { CACHE_KEY_PLATFORMS } from "../constants";
import { ApiClient, FetchResponse } from "../services/apiClient";
import { platforms } from "../data/platforms";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

type PlatformsResponse = FetchResponse<Platform>;

const apiClient = new ApiClient<Platform>("/platforms/lists/parents");

export const usePlatforms = () =>
  useQuery<PlatformsResponse>({
    queryKey: CACHE_KEY_PLATFORMS,
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: platforms,
  });
