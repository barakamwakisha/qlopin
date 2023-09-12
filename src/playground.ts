import { buildSchema, extendSchema, GraphQLSchema, parse } from 'graphql';

export declare const schemaBuilder: (...opts: any[]) => any;

// Error interface name
// Introspection URL, typedefs or schema

schemaBuilder({
    errorInterfaceName: 'ErrorType',

})