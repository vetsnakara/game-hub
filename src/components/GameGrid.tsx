import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

import { api } from "../services/apiClient";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

export const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<FetchGamesResponse>("/games")
      .then(({ data }) => setGames(data.results))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};
