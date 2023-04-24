import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

export const CriticScore = (props: Props) => {
  const { score } = props;

  const color = score > 75 ? "green" : score > 60 ? "yellow" : "";

  return (
    <Badge
      colorScheme={color}
      fontSize="14px"
      paddingX="8px"
      borderRadius="4px"
    >
      {score}
    </Badge>
  );
};
