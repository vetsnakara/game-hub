import { useQuery } from "@tanstack/react-query";

import { ApiClient } from "../services/apiClient";
import { Trailer } from "../entitites/Trailer";

export const useTrailers = (gameId: number) => {
  const api = new ApiClient<Trailer>(`/games/${gameId}/movies`);

  return useQuery({
    queryKey: ["trailers", gameId],
    queryFn: api.getAll,
  });
};
