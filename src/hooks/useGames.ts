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

interface Options {
  selectedGenre: Genre | null;
  selectedPlatform: Platform | null;
}

export const useGames = ({ selectedGenre, selectedPlatform }: Options) => {
  return useData<Game>({
    endpoint: "/games",
    requestConfig: {
      params: {
        genres: selectedGenre?.id,
        platforms: selectedPlatform?.id,
      },
    },
    deps: [selectedGenre?.id, selectedPlatform?.id],
  });
};
