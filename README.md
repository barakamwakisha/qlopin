# Qlopin
[![npm version](https://badge.fury.io/js/@barakamwakisha%2Fqlopin.svg)](https://badge.fury.io/js/@barakamwakisha%2Fqlopin) &nbsp; ![GitHub CI](https://github.com/barakamwakisha/qlopin/actions/workflows/build.yml/badge.svg)

Inspired by [Vendure's](https://github.com/vendure-ecommerce/vendure) approach to GraphQL, Qlopin is an opinionated GraphQL utility package that accelerates your GraphQL API development development, putting conventions over code, reducing boilerplate and enhancing maintainability.
## Installation
    
```bash
npm install @barakamwakisha/qlopin

yarn add @barakamwakisha/qlopin

pnpm add @barakamwakisha/qlopin
```

### Pagination, Sorting & Filtering
Following a set of conventions, Qlopin extends your GraphQL schema making pagination, sorting and filtering in queries a breeze. Suppose you have a user type and a query that returns a list of users;

```graphql
type User {
  id: ID!
  name: String!
  age: Int!
}

type Query {
  users: [User!]!
}
```

This looks fine and dandy, but what if we want to paginate and filter the users list by each of the respective type fields? We would have to add a bunch of arguments to the query. In a large codebase, this could easily spiral out of control. This is where Qlopin comes in. 

Define a a new type to represent a list of users. The convention is to use the singular form of the type and append the `List` suffix. In this case, the type would be `UserList`. The type should extend the `PaginatedList` interface from Qlopin and have the `items` and `totalItems` fields as shown below;

```graphql
type UserList extends PaginatedList {
    items: [User!]!
    totalItems: Int!
}
```

Next, define an empty input type for the users list sorting, pagination and filtering arguments. This type will be extended and populated with the relevant fields by Qlopin at runtime. The convention here is to append the `Options` suffix to the list return type name.

```graphql
# Generated at runtime
input UserListOptions
```

Now refactor the `users` query to return the `UserList` type and accept the `UserListOptions` input type as an argument. 

```graphql
type Query {
    users(options: UserListOptions): UserList!
}
```

That's it! Qlopin will take care of the rest. The `UserListOptions` input type will be populated with the relevant fields for pagination, sorting and filtering at runtime. The extended schema will now have the definitions below;

```graphql
input UserSortParameter {
    id: SortOrder
    name: SortOrder
    age: SortOrder
}

input CastMemberFilterParameter {
    id: IDOperators
    name: StringOperators
    age: NumberOperators
}

input UserListOptions {
    """Skips the first n results, for use in pagination"""
    skip: Int

    """Takes n results, for use in pagination"""
    take: Int

    """Specifies which properties to sort the results by"""
    sort: UserSortParameter

    """Allows the results to be filtered"""
    filter: UserFilterParameter

    """
    Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND.
    """
    filterOperator: LogicalOperator
}
```

## Example Usage
```typescript
import type { GraphQLSchema } from 'graphql';
import { buildQlopinSchema } from '@barakamwakisha/qlopin';

// Using Glob pattern to find type definitions in files
const apiSchema: GraphQLSchema = buildQlopinSchema({ typeDefsPath: join(__dirname, './schema/**/*.graphql') });

// Using raw SDL string
const typeDefs = `
    ADD TYPE DEFINITIONS FOLLOWING THE QLOPIN CONVENTIONS HERE
`;
const apiSchema: GraphQLSchema = buildQlopinSchema({ typeDefs });
```

### TODO
- [ ] Add Error Handling docs
- [ ] Add NestJS and Graphql Yoga examples
- [ ] Build scaffolding CLI tool
