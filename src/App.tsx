import { useState } from "react";
import { Grid, GridItem, Show } from "@chakra-ui/react";

import { Navbar } from "./components/Navbar";
import { GameGrid } from "./components/GameGrid";
import { GenreList } from "./components/GenreList";
import { Genre } from "./hooks/useGenres";
import { PlatformSelector } from "./components/PlatformSelector";

function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  const handleSelectedGenre = (genre: Genre) => setSelectedGenre(genre);

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
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={selectedGenre}
            onSelectGenre={handleSelectedGenre}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <PlatformSelector />
        <GameGrid selectedGenre={selectedGenre} />
      </GridItem>
    </Grid>
  );
}

export default App;
