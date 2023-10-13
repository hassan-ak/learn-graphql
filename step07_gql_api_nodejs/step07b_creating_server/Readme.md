# Creating Server

1. Follow [Setup Project](../step07a_setup_project/) before following this step.. Once you have completed the last step run the following in two different terminals

Follow 


   ```bash
   tsc -w
   ```

   ```bash
   npm start
   ```

2. Update `src/index.ts` to define a server for graphql api. This file also include the code to start the api

   ```ts
   import { ApolloServer } from "@apollo/server";
   import { startStandaloneServer } from "@apollo/server/standalone";

   const server = new ApolloServer({
     typeDefs,
     resolvers,
   });

   const { url } = await startStandaloneServer(server, {
     listen: { port: 4000 },
   });

   console.log("🚀 Server ready at:", url);
   ```

   this will return an error as we did not define any schema and resolvers.

3. First we define a schema. For that we create `src/schema/typeDefs.ts` with the following content

   ```ts
   export const typeDefs = `#graphql
      type Query {
         hello: String 
      }
   `;
   ```

   Here we defined a single Query. As a query type is mandatory for each schema.

4. Now, it's time to define resolvers, the real action heroes. These are the ones that step up and make things happen when we fire off a query. Create `src/resolvers/resolvers.ts` to define an empty object for now we are not defining any thing in the resolver.

   ```ts
   export const resolvers = {};
   ```

5. Update `src/index.ts` and include following to the top of the file to import type definitions and resolvers.

   ```ts
   import { typeDefs } from "./schema/typeDefs.js";
   import { resolvers } from "./resolvers/resolvers.js";
   ```

   Now navigating to the terminal will display the following message

   ```bash
   🚀 Server ready at: http://localhost:4000/  
   ```
6. Navigate to http://localhost:4000/ in the browser and you will see a apollo playground running which you can use to test the graphql API


