import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "../services/apiClient";
import { Screenshot } from "../entitites/Screenshot";

export const useScreenshots = (gameId: number) => {
  const api = new ApiClient<Screenshot>(`/games/${gameId}/screenshots`);

  return useQuery({
    queryKey: ["screenshots", gameId],
    queryFn: api.getAll,
  });
};
