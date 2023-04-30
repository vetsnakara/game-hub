import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";

import { Navbar } from "./components/Navbar";
import { GameGrid } from "./components/GameGrid";
import { GenreList } from "./components/GenreList";
import { PlatformSelector } from "./components/PlatformSelector";
import { SortSelector } from "./components/SortSelector";
import { GameHeading } from "./components/GameHeading";

const App = () => (
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
      <Navbar />
    </GridItem>
    <Show above="lg">
      <GridItem area="aside" paddingX={5}>
        <GenreList />
      </GridItem>
    </Show>
    <GridItem area="main">
      <Box paddingLeft={2}>
        <GameHeading />
        <Flex marginBottom={4} gap={3}>
          <PlatformSelector />
          <SortSelector />
        </Flex>
      </Box>
      <GameGrid />
    </GridItem>
  </Grid>
);

export default App;
