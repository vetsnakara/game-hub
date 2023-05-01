import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import ms from "ms";

import { CACHE_KEY_GAMES } from "../constants";
import { ApiClient, FetchResponse } from "../services/apiClient";
import { useGameQueryStore } from "../store";
import { Game } from "../entitites/Game";

const apiClient = new ApiClient<Game>("/games");

type GamesResponse = FetchResponse<Game>;

export const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

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
