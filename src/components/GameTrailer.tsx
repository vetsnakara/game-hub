import { useTrailers } from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

export const GameTrailer = (props: Props) => {
  const { gameId } = props;
  const { data, isLoading, error } = useTrailers(gameId);

  if (isLoading) return null;
  if (error) throw error;

  const first = data?.results[0];

  return first ? (
    <video src={first.data[480]} poster={first.prefiew} controls />
  ) : null;
};
