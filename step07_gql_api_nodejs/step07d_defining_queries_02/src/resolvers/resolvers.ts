import { usersList } from "../data/data.js";

export const resolvers = {
  Query: {
    users: () => usersList,

    user: (_: any, args: { id: string }) =>
      usersList.find((user) => user.id === args.id),
  },
};
