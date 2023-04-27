import { useQuery } from "@tanstack/react-query";

import { CACHE_KEY_PLATFORMS } from "../constants";
import { ApiClient } from "../services/apiClient";
import { platforms } from "../data/platforms";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const apiClient = new ApiClient<Platform>("/platforms/lists/parents");
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: {
    platform: Platform;
  }[];
  metacritic: number;
  rating_top: number;
}

export const usePlatforms = () =>
  useQuery<Platform[], Error>({
    queryKey: CACHE_KEY_PLATFORMS,
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: platforms,
  });
