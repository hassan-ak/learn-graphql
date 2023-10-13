import { usersList } from "../data/data.js";

export const resolvers = {
  Query: {
    users: () => usersList,
  },
};
