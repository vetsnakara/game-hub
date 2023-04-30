import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
import { usePlatform } from "../hooks/usePlatform";
import { useGenre } from "../hooks/useGenre";

interface Props {
  gameQuery: GameQuery;
}

export const GameHeading = (props: Props) => {
  const {
    gameQuery: { platformId, genreId },
  } = props;

  const selectedPlatform = usePlatform(platformId);
  const selectedGenre = useGenre(genreId);

  const heading = `${selectedPlatform?.name || ""} ${
    selectedGenre?.name || ""
  } Games`;

  return (
    <Heading as="h1" marginBottom={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};
