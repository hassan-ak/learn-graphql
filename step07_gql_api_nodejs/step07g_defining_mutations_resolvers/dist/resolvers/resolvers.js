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
    User: {
        favoriteMovies: (_) => {
            const filteredMovies = movieList.filter((movie) => {
                if (movie.id !== _.id) {
                    return false;
                }
                return true;
            });
            return filteredMovies;
        },
    },
    Mutation: {
        addMovie: (_, args) => {
            const id = (Number(movieList[movieList.length - 1].id) + 1).toString();
            const movie = { ...args.input, id: id };
            movieList.push(movie);
            return movie;
        },
        updateMovie: (_, args) => {
            let updatedMovie;
            movieList.forEach((movie) => {
                if (movie.id === args.input.id) {
                    movie.isInTheaters = args.input.isInTheaters;
                    updatedMovie = movie;
                }
            });
            return updatedMovie;
        },
        deleteMovie: (_, args) => {
            const movieIndex = movieList.findIndex((movie) => movie.id === args.id);
            if (movieIndex !== -1) {
                const deletedMovie = movieList.splice(movieIndex, 1)[0];
                return deletedMovie;
            }
            return null;
        },
    },
};
