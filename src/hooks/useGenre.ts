import { useGenres } from "./useGenres";

export const useGenre = (id?: number) => {
  const {
    data: { results: genres },
  } = useGenres();

  return genres?.find((genre) => genre.id === id);
};
