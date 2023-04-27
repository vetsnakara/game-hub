import { SimpleGrid, Text } from "@chakra-ui/react";

import { GameQuery } from "../App";
import { useGames } from "../hooks/useGames";
import { GameCard } from "./GameCard";
import { GameCardContainer } from "./GameCardContainer";
import { GameCardSkeleton } from "./GameCardSkeleton";

interface Props {
  gameQuery: GameQuery;
}

export const GameGrid = (props: Props) => {
  const { gameQuery } = props;

  const { data: games, error, isLoading } = useGames(gameQuery);

  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <SimpleGrid
      columns={{
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
      }}
      spacing={6}
      padding="10px"
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}

      {games?.map((game) => (
        <GameCardContainer key={game.id}>
          <GameCard game={game} />
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};
