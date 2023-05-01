import { useQuery } from "@tanstack/react-query";
import ms from "ms";

import { CACHE_KEY_PLATFORMS } from "../constants";
import { ApiClient, FetchResponse } from "../services/apiClient";
import { platforms } from "../data/platforms";
import { Platform } from "../entitites/Platform";

type PlatformsResponse = FetchResponse<Platform>;

const apiClient = new ApiClient<Platform>("/platforms/lists/parents");

export const usePlatforms = () =>
  useQuery<PlatformsResponse>({
    queryKey: CACHE_KEY_PLATFORMS,
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
    initialData: platforms,
  });
