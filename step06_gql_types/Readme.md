# GraphQL Types and Schema.

- What data can be queried from a gql api can be described by types.

## Type system

- GraphQL query language is basically about selecting fields on objects

- Have a look at following query and response

  ```graphql
  query HeroQuery {
    hero {
      name
      appearsIn
    }
  }
  ```

  ```json
  {
    "data": {
      "hero": {
        "name": "R2-D2",
        "appearsIn": ["NEWHOPE", "EMPIRE", "JEDI"]
      }
    }
  }
  ```

  1. We start with a special "root" object
  2. We select the hero field on that
  3. For the object returned by hero, we select the name and appearsIn fields

- The shape of a GraphQL query closely matches the result, you can predict what the query will return without knowing that much about the server.

- It's useful to have

  - an exact description of the data we can ask for
  - what fields can we select?
  - What kinds of objects might they return?
  - What fields are available on those sub-objects?

- That's where the schema comes in.

- Every GraphQL service defines a set of types which completely describe the set of possible data you can query on that service.

- Then, when queries come in, they are validated and executed against that schema.

## Type language

- GraphQL schema language

## Scalar types

- Represent the leaves of the query.

  1. `Int`: A signed 32‐bit integer.
  2. `Float`: A signed double-precision floating-point value.
  3. `String`: A UTF‐8 character sequence.
  4. `Boolean`: true or false.
  5. `ID`: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

- custom scalar types

  ```graphql
  scalar Date
  ```

## Enumeration types

- Also called Enums, enumeration types are a special kind of scalar that is restricted to a particular set of allowed values.

  1. Validate that any arguments of this type are one of the allowed values
  2. Communicate through the type system that a field will always be one of a finite set of values

  ```graphql
  enum Episode {
    NEWHOPE
    EMPIRE
    JEDI
  }
  ```

## Object types and fields

- The most basic components of a GraphQL schema are object types, which just represent a kind of object you can fetch from your service, and what fields it has.

  ```graphql
  type Character {
    name: String
  }
  ```

  1. `Character` is a GraphQL Object Type, meaning it's a type with some fields. Most of the types in your schema will be object types.
  2. `name`is field on the Character type. That means that name is the only field that can appear in any part of a GraphQL query that operates on the Character type.

## Arguments

- Every field on a GraphQL object type can have zero or more arguments

  ```graphql
  type Starship {
    id: ID
    name: String
    length(unit: String = METER): Float
  }
  ```

  - Arguments can be either required or optional. When an argument is optional, we can define a default value
  - if the `unit` argument is not passed, it will be set to `METER` by default.

## The Query and Mutation types

- There are two types that are special within a schema

  ```graphql
  schema {
    query: Query
    mutation: Mutation
  }
  ```

- Every GraphQL service has a query type and may or may not have a mutation type

  ```graphql
  type Query {
    hero(episode: Episode): Character
    droid(id: ID): Droid
  }
  ```

  ```graphql
  query NewQuery {
    hero {
      name
    }
    droid(id: "2000") {
      name
    }
  }
  ```

- Mutations work in a similar way, you define fields on the Mutation type

  ```graphql
  type Mutation {
    addTodo(text: String): Todo
    updateTodoDone(id: ID!): Todo
  }
  ```

## Lists and Non-Null

- Non-Null

  ```graphql
  type Character {
    name: String!
  }
  ```

  - Non-Null by adding an exclamation mark, `!` after the type name.
  - The Non-Null type modifier can also be used when defining arguments for a field

  ```graphql
  query DroidById($id: ID!) {
    droid(id: $id) {
      name
    }
  }
  ```

- List

  ```graphql
  type Character {
    appearsIn: [String]!
  }
  ```

- The Non-Null and List modifiers can be combined. For example,

  - you can have a List of Non-Null Strings

    ```graphql
    myField: [String!]
    ```

    ```ts
    myField: null; // valid
    myField: []; // valid
    myField: ["a", "b"]; // valid
    myField: ["a", null, "b"]; // error
    ```

  - Non-Null List of Strings

    ```graphql
    myField: [String]!
    ```

    ```ts
    myField: null; // error
    myField: []; // valid
    myField: ["a", "b"]; // valid
    myField: ["a", null, "b"]; // valid
    ```

## Interfaces

- An Interface is an abstract type that includes a certain set of fields that a type must include to implement the interface.

  ```graphql
  interface Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
  }
  ```

  ```graphql
  type Human implements Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
    starships: [Starship]
    totalCredits: Int
  }

  type Droid implements Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
    primaryFunction: String
  }
  ```

## Union types

- Union types are very similar to interfaces, but they don't get to specify any common fields between the types.

  ```graphql
  union SearchResult = Human | Droid | Starship
  ```

- Wherever we return a `SearchResult` type in our schema, we might get a `Human`, a `Droid`, or a `Starship`. Note that members of a union type need to be concrete object types; you can't create a union type out of interfaces or other unions.

## Input types

- You can also easily pass complex objects as arguments

  ```graphql
  input ReviewInput {
    stars: Int!
    commentary: String
  }
  ```
