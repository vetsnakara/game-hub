import { HStack, List, ListItem, Image, Text } from "@chakra-ui/react";

import { getCroppedImageUrl } from "../services/imageUrl";
import { useGenres } from "../hooks/useGenres";

export const GenreList = () => {
  const { data: genres } = useGenres();
  return (
    <List>
      {genres.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius="8px"
              src={getCroppedImageUrl(genre.image_background)}
            />
            <Text fontSize="large">{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};
