import { useQuery } from "@tanstack/react-query";

import { GameQuery } from "../App";
import { CACHE_KEY_GAMES } from "../constants";
import { ApiClient } from "../services/apiClient";

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

export const useGames = (gameQuery: GameQuery) => {
  const { genre, platform, sortOrder, searchText } = gameQuery;

  const params = {
    genres: genre?.id,
    parent_platforms: platform?.id,
    ordering: sortOrder,
    search: searchText,
  };

  return useQuery<Game[], Error>({
    queryKey: [...CACHE_KEY_GAMES, gameQuery],
    queryFn: () => apiClient.getAll({ params }),
  });
};
