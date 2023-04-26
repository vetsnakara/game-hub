import { useData } from "./useData";
import { genres } from "../data/genres";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

type UseGenresReturnType = ReturnType<typeof useData<Genre>>;

export const useGenres = (): UseGenresReturnType => ({
  data: genres,
  isLoading: false,
  error: "",
});
