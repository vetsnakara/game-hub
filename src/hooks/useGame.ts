import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_GAMES } from "../constants";
import { ApiClient } from "../services/apiClient";
import { Game } from "./useGames";
import ms from "ms";

const api = new ApiClient<Game>("/games");

export const useGame = (slug: string) =>
  useQuery<Game, Error>({
    queryKey: [CACHE_KEY_GAMES, slug],
    queryFn: () => api.get(slug),
    staleTime: ms("24h"),
  });
