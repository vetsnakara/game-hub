import { useEffect, useMemo, useState } from "react";
import { CanceledError } from "axios";

import { api } from "../services/apiClient";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: {
    platform: Platform;
  }[];
  metacritic: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    api
      .get<FetchGamesResponse>("/games", {
        signal: controller.signal,
      })
      .then(({ data }) => setGames(data.results))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });

    return () => controller.abort();
  }, []);

  return useMemo(
    () => ({
      games,
      error,
    }),
    [games, error]
  );
};
