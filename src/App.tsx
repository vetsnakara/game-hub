import { useState } from "react";
import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";

import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/usePlatforms";

import { Navbar } from "./components/Navbar";
import { GameGrid } from "./components/GameGrid";
import { GenreList } from "./components/GenreList";
import { PlatformSelector } from "./components/PlatformSelector";
import { SortSelector } from "./components/SortSelector";
import { GameHeading } from "./components/GameHeading";

export interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const handleSelectGenre = (genre: Genre) =>
    setGameQuery({ ...gameQuery, genreId: genre.id });

  const handleSelectPlatform = (platform: Platform) =>
    setGameQuery({ ...gameQuery, platformId: platform.id });

  const handleSelectSortOrder = (sortOrder: string) =>
    setGameQuery({ ...gameQuery, sortOrder });

  const handleSearch = (searchText: string) =>
    setGameQuery({ ...gameQuery, searchText });

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`, // mobile
        lg: `"nav nav" "aside main"`, // 1024px
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <Navbar onSearch={handleSearch} />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenreId={gameQuery.genreId}
            onSelectGenre={handleSelectGenre}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading gameQuery={gameQuery} />
          <Flex marginBottom={4} gap={3}>
            <PlatformSelector
              selectedPlatformId={gameQuery.platformId}
              onSelectPlatform={handleSelectPlatform}
            />
            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={handleSelectSortOrder}
            />
          </Flex>
        </Box>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
