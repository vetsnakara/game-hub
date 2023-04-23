import { useEffect, useMemo, useState } from "react";
import { AxiosError, CanceledError } from "../services/apiClient";
import { User, userService } from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = userService.getAll();

    request
      .then(
        ({ data: users }) =>
          new Promise<User[]>((res) => setTimeout(() => res(users), 1000))
      )
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return cancel;
  }, []);

  return useMemo(
    () => ({
      users,
      error,
      isLoading,
      setError,
      setUsers,
    }),
    [users, error, isLoading]
  );
};
