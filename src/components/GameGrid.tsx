import React from "react";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";

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

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGames(gameQuery);

  console.log("isFetchingNextPage", isFetchingNextPage);

  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Box padding="10px">
      <SimpleGrid
        columns={{
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
        }}
        spacing={6}
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.results.map((game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}

        {(isLoading || isFetchingNextPage) &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
      </SimpleGrid>
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          marginY={5}
        >
          {isFetchingNextPage ? "Loading" : "Load More"}
        </Button>
      )}
    </Box>
  );
};
