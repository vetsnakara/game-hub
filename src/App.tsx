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
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const handleSelectGenre = (genre: Genre) =>
    setGameQuery({ ...gameQuery, genre });

  const handleSelectPlatform = (platform: Platform) =>
    setGameQuery({ ...gameQuery, platform });

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
            selectedGenre={gameQuery.genre}
            onSelectGenre={handleSelectGenre}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <GameHeading gameQuery={gameQuery} />
          <Flex marginBottom={4} gap={3}>
            <PlatformSelector
              selectedPlatform={gameQuery.platform}
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
