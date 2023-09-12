import { join } from 'path';
import { GraphQLSchema } from 'graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

export function getCommonTypesSchema(): GraphQLSchema {
    return loadSchemaSync(join(__dirname, './**/*.graphql'), {
        loaders: [new GraphQLFileLoader()],
    });
}