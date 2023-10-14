import { usersList } from "../data/data.js";
export const resolvers = {
    Query: {
        users: () => usersList,
        user: (_, args) => usersList.find((user) => user.id === args.id),
    },
};
