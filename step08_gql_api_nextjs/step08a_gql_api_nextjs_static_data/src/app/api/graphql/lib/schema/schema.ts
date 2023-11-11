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
