import { movieList, usersList } from "../data/data.js";

export const resolvers = {
  Query: {
    users: () => usersList,

    user: (_: any, args: { id: string }) =>
      usersList.find((user) => user.id === args.id),

    movies: (
      _: any,
      args: {
        id?: string;
        name?: string;
        yearReleased?: number;
        isInTheaters?: boolean;
      }
    ) => {
      if (Object.values(args).every((value) => value === undefined)) {
        return movieList;
      }
      const filteredMovies = movieList.filter((movie) => {
        if (args.id && movie.id != args.id) {
          return false;
        }
        if (
          args.name &&
          !movie.name.toLowerCase().includes(args.name.toLowerCase())
        ) {
          return false;
        }
        if (args.yearReleased && movie.yearReleased !== args.yearReleased) {
          return false;
        }
        if (
          args.isInTheaters !== undefined &&
          movie.isInTheaters !== args.isInTheaters
        ) {
          return false;
        }
        return true;
      });
      return filteredMovies;
    },
  },

  User: {
    favoriteMovies: (_: any) => {
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
    addMovie: (
      _: any,
      args: {
        input: {
          name: string;
          yearReleased: number;
          isInTheaters: boolean;
        };
      }
    ) => {
      const id = (Number(movieList[movieList.length - 1].id) + 1).toString();
      const movie = { ...args.input, id: id };
      movieList.push(movie);
      return movie;
    },

    updateMovie: (
      _: any,
      args: {
        input: {
          id: string;
          isInTheaters: boolean;
        };
      }
    ) => {
      let updatedMovie: any;
      movieList.forEach((movie) => {
        if (movie.id === args.input.id) {
          movie.isInTheaters = args.input.isInTheaters;
          updatedMovie = movie;
        }
      });
      return updatedMovie;
    },

    deleteMovie: (_: any, args: { id: string }) => {
      const movieIndex = movieList.findIndex((movie) => movie.id === args.id);
      if (movieIndex !== -1) {
        const deletedMovie = movieList.splice(movieIndex, 1)[0];
        return deletedMovie;
      }
      return null;
    },
  },
};
