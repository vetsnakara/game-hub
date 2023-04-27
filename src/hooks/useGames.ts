import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";

import { GameQuery } from "../App";
import { CACHE_KEY_GAMES } from "../constants";
import { ApiClient, FetchResponse } from "../services/apiClient";

import { Platform } from "./usePlatforms";

const apiClient = new ApiClient<Game>("/games");

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

type GamesResponse = FetchResponse<Game>;

export const useGames = (gameQuery: GameQuery) => {
  const { genre, platform, sortOrder, searchText } = gameQuery;

  const queryFn = ({ pageParam = 1 }: QueryFunctionContext) => {
    const params = {
      genres: genre?.id,
      parent_platforms: platform?.id,
      ordering: sortOrder,
      search: searchText,
      page: pageParam,
      page_size: 10,
    };

    return apiClient.getAll({ params });
  };

  return useInfiniteQuery<GamesResponse, Error>({
    queryKey: [CACHE_KEY_GAMES, gameQuery],
    queryFn,
    staleTime: 1 * 60 * 1000, // 1min
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
  });
};
