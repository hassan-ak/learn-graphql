import { movieList, usersList } from "../data/data.js";
export const resolvers = {
    Query: {
        users: () => usersList,
        user: (_, args) => usersList.find((user) => user.id === args.id),
        movies: (_, args) => {
            if (Object.values(args).every((value) => value === undefined)) {
                return movieList;
            }
            const filteredMovies = movieList.filter((movie) => {
                if (args.id && movie.id != args.id) {
                    return false;
                }
                if (args.name &&
                    !movie.name.toLowerCase().includes(args.name.toLowerCase())) {
                    return false;
                }
                if (args.yearReleased && movie.yearReleased !== args.yearReleased) {
                    return false;
                }
                if (args.isInTheaters !== undefined &&
                    movie.isInTheaters !== args.isInTheaters) {
                    return false;
                }
                return true;
            });
            return filteredMovies;
        },
    },
};
