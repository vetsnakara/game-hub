import { SimpleGrid, Text } from "@chakra-ui/react";

import { useGames } from "../hooks/useGames";
import { Genre } from "../hooks/useGenres";
import { GameCard } from "./GameCard";
import { GameCardSkeleton } from "./GameCardSkeleton";
import { GameCardContainer } from "./GameCardContainer";

interface Props {
  selectedGenre: Genre | null;
}

export const GameGrid = (props: Props) => {
  const { selectedGenre } = props;
  const { data: games, error, isLoading } = useGames(selectedGenre);

  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{
          sm: 1,
          md: 2,
          lg: 3,
          xl: 5,
        }}
        spacing={3}
        padding="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}

        {games.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};
