import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
import { useGenres } from "../hooks/useGenres";
import { usePlatforms } from "../hooks/usePlatforms";

interface Props {
  gameQuery: GameQuery;
}

export const GameHeading = (props: Props) => {
  const {
    gameQuery: { platformId, genreId },
  } = props;

  const {
    data: { results: genres },
  } = useGenres();

  const {
    data: { results: platforms },
  } = usePlatforms();

  const selectedPlatform = platforms?.find(
    (platform) => platform.id === platformId
  );

  const selectedGenre = genres?.find((genre) => genre.id === genreId);

  const heading = `${selectedPlatform?.name || ""} ${
    selectedGenre?.name || ""
  } Games`;

  return (
    <Heading as="h1" marginBottom={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};
