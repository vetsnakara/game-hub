import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import ms from "ms";

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
  const { genreId, platformId, sortOrder, searchText } = gameQuery;

  const queryFn = ({ pageParam = 1 }: QueryFunctionContext) => {
    const params = {
      genres: genreId,
      parent_platforms: platformId,
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
    staleTime: ms("24h"),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
  });
};
