export const typeDefs = `#graphql

    type User {
     id: ID!
     name: String!
     userName: String!
     age: Int!
     nationality: String!
    }
   
    type Query {
     users: [User!]!
    }
      
`;
