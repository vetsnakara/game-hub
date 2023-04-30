import { usePlatforms } from "./usePlatforms";

export const usePlatform = (id?: number) => {
  const {
    data: { results: platforms },
  } = usePlatforms();

  return platforms?.find((platform) => platform.id === id);
};
