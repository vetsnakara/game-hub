import { platforms } from "../data/platforms";
import { useData } from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

type UsePlatformsReturnType = ReturnType<typeof useData<Platform>>;

export const usePlatforms = (): UsePlatformsReturnType => ({
  data: platforms,
  isLoading: false,
  error: "",
});
