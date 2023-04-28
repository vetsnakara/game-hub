import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

import { GameQuery } from "../App";
import { useGames } from "../hooks/useGames";
import { GameCard } from "./GameCard";
import { GameCardContainer } from "./GameCardContainer";
import { GameCardSkeleton } from "./GameCardSkeleton";

interface Props {
  gameQuery: GameQuery;
}

const skeletons = [1, 2, 3, 4, 5, 6];

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

  console.log("data.pages", data?.pages);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) ?? 0;

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={!!hasNextPage}
      next={fetchNextPage}
      loader={null}
    >
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
    </InfiniteScroll>
  );
};
