# Defining Mutations

1. Once you have completed [Defining Queries 04](../step07f_defining_queries_resolvers_04) run the following in two different terminals

   ```bash
   tsc -w
   ```

   ```bash
   npm start
   ```

2. Update `src/schema/typeDefs.ts`. Add follwoing input types to the schema

   ```graphql
   input AddMovieInput {
     name: String!
     yearReleased: Int!
     isInTheaters: Boolean = true
   }

   input UpdateMovieInput {
     id: ID!
     isInTheaters: Boolean!
   }
   ```

3. Update `src/schema/typeDefs.ts`. Add follwoing mutation type to the schema

   ```graphql
   type Mutation {
     addMovie(input: AddMovieInput!): Movie!
     updateMovie(input: UpdateMovieInput!): Movie
     deleteMovie(id: ID!): Movie
   }
   ```

4. After all the changes we made, `schema` should look like this

   ```ts
   export const typeDefs = `#graphql
   
       type User {
       id: ID!
       name: String!
       userName: String!
       age: Int!
       nationality: Nationality!
       friends: [User]
       favoriteMovies: [Movie]
       }
   
       type Movie {
           id: ID!
           name: String!
           yearReleased: Int!
           isInTheaters: Boolean!
       }
   
       type Query {
       users: [User!]!
       user(id: ID!): User
       movies(id: ID, name:String, yearReleased:Int, isInTheaters:Boolean): [Movie]
       }
   
       input AddMovieInput {
           name: String!
           yearReleased: Int!
           isInTheaters: Boolean = true
       }
   
       input UpdateMovieInput {
           id: ID!
           isInTheaters: Boolean!
       }
   
       type Mutation {
           addMovie(input: AddMovieInput!): Movie!
           updateMovie(input: UpdateMovieInput!): Movie
           deleteMovie(id: ID!): Movie
       }
   
       enum Nationality {
           PAKISTAN
           CHINA
           INDIA
           USA
           CANADA
       }
         
   `;
   ```

5. Update `src/resolvers/resolvers.ts` and add following resolvers for the mutations we just added to our schema

   ```ts
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
   ```

6. After all the changes we made, `resolvers` should look like this

   ```ts
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
         const movieIndex = movieList.findIndex(
           (movie) => movie.id === args.id
         );
         if (movieIndex !== -1) {
           const deletedMovie = movieList.splice(movieIndex, 1)[0];
           return deletedMovie;
         }
         return null;
       },
     },
   };
   ```

7. Navigate to http://localhost:4000/ in the browser and test the mutations
