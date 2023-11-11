export const typeDefs = `#graphql

    type User {
     id: ID!
     name: String!
     userName: String!
     age: Int!
     nationality: Nationality!
     friends: [User]
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

    enum Nationality {
        PAKISTAN
        CHINA
        INDIA
        USA
        CANADA
    }
      
`;
