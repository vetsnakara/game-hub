import { create } from "./httpService";

export interface User {
  id: number;
  name: string;
}

export const userService = create<User>("/users");
