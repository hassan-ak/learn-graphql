# GraphQL API in NextJS (Static Data)

1. Create next app

   ```bash
   npx create-next-app@latest
   ```

2. Install dependancies

   ```bash
   npm install @apollo/server
   npm install @as-integrations/next
   npm install graphql-tag
   npm install encoding
   ```

3. Create `src/app/api/graphql/lib/data/data.ts` to define dummy data

   ```ts
   export const usersList = [
     {
       id: "1",
       name: "Zubair",
       userName: "zubair334",
       age: 24,
       nationality: "PAKISTAN",
       friends: [
         {
           id: "2",
           name: "Saad",
           userName: "saad007",
           age: 20,
           nationality: "CHINA",
         },
         {
           id: "3",
           name: "Asif",
           userName: "asif1009",
           age: 32,
           nationality: "INDIA",
         },
       ],
     },
     {
       id: "2",
       name: "Saad",
       userName: "saad007",
       age: 20,
       nationality: "CHINA",
     },
     {
       id: "3",
       name: "Asif",
       userName: "asif1009",
       age: 32,
       nationality: "INDIA",
     },
     {
       id: "4",
       name: "Ali",
       userName: "ali123",
       age: 35,
       nationality: "USA",
       friends: [
         {
           id: "3",
           name: "Asif",
           userName: "asif1009",
           age: 32,
           nationality: "INDIA",
         },
       ],
     },
     {
       id: "5",
       name: "Minsa",
       userName: "minsa2020",
       age: 3,
       nationality: "CANADA",
     },
   ];

   export const movieList = [
     {
       id: "1",
       name: "Forrest Gump",
       yearReleased: 1994,
       isInTheaters: false,
     },
     {
       id: "2",
       name: "Interstellar",
       yearReleased: 2007,
       isInTheaters: true,
     },
     {
       id: "3",
       name: "Avengers Endgame",
       yearReleased: 2019,
       isInTheaters: true,
     },
     {
       id: "4",
       name: "Suits",
       yearReleased: 2019,
       isInTheaters: false,
     },
   ];
   ```

4. Create `src/app/api/graphql/lib/schema/schema.ts` to define schema for the api

   ```ts
   import { gql } from "graphql-tag";

   export const typeDefs = gql`
     #graphql

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
       movies(
         id: ID
         name: String
         yearReleased: Int
         isInTheaters: Boolean
       ): [Movie]
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

5. Create `src/app/api/graphql/lib/resolver/resolver.ts` to define resolvers for the api

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

6. Create `src/app/api/graphql/route.ts` to define api endpoint

   ```ts
   import { startServerAndCreateNextHandler } from "@as-integrations/next";
   import { ApolloServer } from "@apollo/server";
   import { NextRequest } from "next/server";
   import { typeDefs } from "./lib/schema/schema";
   import { resolvers } from "./lib/resolver/resolvers";

   const server = new ApolloServer({
     typeDefs,
     resolvers,
   });

   const handler = startServerAndCreateNextHandler<NextRequest>(server, {
     context: async (req) => ({ req }),
   });

   export { handler as GET, handler as POST };
   ```

7. Run the app using

   ```bash
   npm run dev
   ```

8. Test the api at `http://localhost:3000/api/graphql`
