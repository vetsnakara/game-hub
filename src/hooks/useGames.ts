import { useData } from "./useData";
import { Genre } from "./useGenres";

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

export const useGames = (selectedGenre: Genre | null) =>
  useData<Game>({
    endpoint: "/games",
    requestConfig: {
      params: {
        genres: selectedGenre?.id,
      },
    },
    deps: [selectedGenre?.id],
  });
