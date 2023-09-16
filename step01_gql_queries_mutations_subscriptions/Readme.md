# Queries and Mutations in gql

## Fetching Data with Queries

When working with REST APIs, data is loaded from specific endpoints. Each endpoint has a clearly defined structure of the information that it returns. This means that the data requirements of a client are effectively encoded in the URL that it connects to.

The approach that’s taken in GraphQL is radically different. Instead of having multiple endpoints that return fixed data structures, GraphQL APIs typically only expose a single endpoint. This works because the structure of the data that’s returned is not fixed. Instead, it’s completely flexible and lets the client decide what data is actually needed.

That means that the client needs to send more information to the server to express its data needs - this information is called a query.

## Writing Data with Mutations

Next to requesting information from a server, the majority of applications also need some way of making changes to the data that’s currently stored in the backend. With GraphQL, these changes are made using so-called mutations. There generally are three kinds of mutations:

- creating new data
- updating existing data
- deleting existing data

## Realtime Updates with Subscriptions

Another important requirement for many applications today is to have a realtime connection to the server in order to get immediately informed about important events. For this use case, GraphQL offers the concept of subscriptions.

When a client subscribes to an event, it will initiate and hold a steady connection to the server. Whenever that particular event then actually happens, the server pushes the corresponding data to the client. Unlike queries and mutations that follow a typical “request-response-cycle”, subscriptions represent a stream of data sent over to the client.

### Core Concepts

**Operations**

- query
- mutation
- subscription

**Operation name**

In GraphQL, an "operation name" is an optional but helpful label that you can give to your queries, mutations, and subscriptions.

```graphql
query GetCountries {
}
```

```graphql
mutation Insert_users {
}
```

```graphql
subscription GetNotified {
}
```

**Querying Data**

In GraphQL, while querying data after specifying operation and operation name we need to define the type from where we are querying. You can think of type as the table name.

```graphql
query GetCountries {
  countries {
  }
}
```

**Fields**

At its simplest, GraphQL is about asking for specific fields on objects. You can run the following query at

```graphql
query Continents {
  continents {
    name
    code
  }
}
```

**Arguments**

In GraphQL (GQL), "arguments" are values that you can include when making a query or a mutation to provide additional information to the server. These arguments are used to customize the results of your query or to specify parameters for a mutation.

```graphql
query Country {
  country(code: "AD") {
    name
    phone
    continent {
      name
    }
  }
}
```

We can have multiple arguments

```graphql
query Launches {
  launches(limit: 3, offset: 1) {
    mission_name
  }
}
```

We can have arguments on fields too. Check the query [here](https://graphql.org/learn/queries/#arguments)

```graphql
query Human {
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

**Aliases**

In GraphQL, aliases are used to rename the fields returned in the response to something other than their original field names. Aliases are particularly useful when you have multiple fields with the same name or when you want to improve the clarity of your query results.

```graphql
query Country {
  selectedCountry1: country(code: "AD") {
    name
    phone
  }
  selectedCountry2: country(code: "PT") {
    name
    phone
  }
}
```

**Fragments**

GraphQL includes reusable units called fragments. Fragments let you construct sets of fields, and then include them in queries where you need to.

```graphql
query Country {
  selectedCountry1: country(code: "AD") {
    ...selectCountry
  }
  selectedCountry2: country(code: "PT") {
    ...selectCountry
  }
}
fragment selectCountry on Country {
  name
  phone
}
```

**Variables**

So far, we have been writing all of our arguments inside the query string. But in most applications, the arguments to fields will be dynamic: For example, there might be a dropdown that lets you select the value of the arguments. GraphQL has a first-class way to factor dynamic values out of the query, and pass them as a separate dictionary. These values are called variables.

```graphql
query Country($code: ID!) {
  country(code: $code) {
    name
    continent {
      name
    }
  }
}
```

```json
{
  "code": "PT"
}
```

**Default variables**

Default values can also be assigned to the variables in the query by adding the default value after the type declaration. When default values are provided for all variables, you can call the query without passing any variables. If any variables are passed as part of the variables dictionary, they will override the defaults.

```graphql
query Country($code: ID! = "PT") {
  country(code: $code) {
    name
    continent {
      name
    }
  }
}
```

**Using variables inside fragments**

It is possible for fragments to access variables declared in the query or mutation.

```graphql
query Country($code1: ID!, $code2: ID!) {
  selectedCountry1: country(code: $code1) {
    ...selectCountry
  }
  selectedCountry2: country(code: $code2) {
    ...selectCountry
  }
}
fragment selectCountry on Country {
  name
  phone
}
```

```json
{
  "code1": "PT",
  "code2": "AD"
}
```

**Directives**

In GraphQL, directives are special indicators that provide instructions to the GraphQL server on how to execute or format a query, mutation, or subscription. Directives allow you to control the behavior of your GraphQL operation without changing the server's schema. They provide a flexible and powerful way to customize queries and mutations.

```graphql
query Launches {
  launches(limit: 3) {
    mission_name
    upcoming @include(if: true)
    launch_success @skip(if: false)
  }
}
```

- @include(if: Boolean) Only include this field in the result if the argument is true.
- @skip(if: Boolean) Skip this field if the argument is true.

**Mutating Data**

For testing mutations you can use `GraphQLZero` playground.

Create a new post

```graphql
mutation ($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    body
  }
}
```

```json
{
  "input": {
    "title": "A Very Captivating Post Title",
    "body": "Some interesting content."
  }
}
```

Delete a post

```graphql
mutation ($id: ID!) {
  deletePost(id: $id)
}
```

```json
{
  "id": 101
}
```

Update a post

```graphql
mutation ($id: ID!, $input: UpdatePostInput!) {
  updatePost(id: $id, input: $input) {
    id
    body
  }
}
```

```json
{
  "id": 1,
  "input": {
    "body": "Some updated content."
  }
}
```

**Subscriptions**
For testing mutations you can use `moonhighway` playground.

Run the following subscription

```graphql
subscription {
  liftStatusChange {
    name
    capacity
    status
  }
}
```

In another tab run the following mutation to test subscription

```graphql
mutation closeLift {
  setLiftStatus(id: "panorama", status: HOLD) {
    name
    status
  }
}
```

### Sample gql api's and Explorers

**Api's**

- SpaceX GraphQL API https://main--spacex-l4uc6p.apollographos.net/graphql

**Explorers**

- [Countries GraphQL API explorer](https://countries.trevorblades.com/)
- [SpaceX GraphQL API explorer](https://studio.apollographql.com/public/SpaceX-pxxbxen/variant/current/explorer)
- [GraphQLZero Playground](https://graphqlzero.almansi.me/api)
- [Moonhighway Playground](http://snowtooth.moonhighway.com)
