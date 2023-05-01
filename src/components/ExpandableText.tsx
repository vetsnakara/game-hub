import { Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  children: string;
}

const limit = 300;

export const ExpandableText = (props: Props) => {
  const { children } = props;

  const [expanded, setExpanded] = useState(false);

  if (!children) return null;

  if (children.length <= limit) return <Text>{children}</Text>;

  const summary = expanded ? children : children.substring(0, limit) + "...";

  return (
    <Text>
      {summary}
      <Button
        onClick={() => setExpanded(!expanded)}
        size="xs"
        fontWeight="bold"
        colorScheme="yellow"
        marginLeft={1}
      >
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </Text>
  );
};
