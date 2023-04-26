import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";

import { Game } from "../hooks/useGames";
import { getCroppedImageUrl } from "../services/imageUrl";

import { PlatformIconList } from "./PlatformIconList";
import { CriticScore } from "./CriticScore";

interface GameCardProps {
  game: Game;
}

export const GameCard = (props: GameCardProps) => {
  const { game } = props;

  const platforms = game.parent_platforms.map((p) => p.platform);

  return (
    <Card>
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={2}>
          <PlatformIconList platforms={platforms} />
          <CriticScore score={game.metacritic} />
        </HStack>
        <Heading fontSize="2xl">{game.name}</Heading>
      </CardBody>
    </Card>
  );
};
