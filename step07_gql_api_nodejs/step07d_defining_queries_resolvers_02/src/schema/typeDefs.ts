export const typeDefs = `#graphql

    type User {
     id: ID!
     name: String!
     userName: String!
     age: Int!
     nationality: Nationality!
     friends: [User]
    }

    enum Nationality {
        PAKISTAN
        CHINA
        INDIA
        USA
        CANADA
    }
   
    type Query {
     users: [User!]!
     user(id: ID!): User
    }
      
`;
