import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { GraphQLSchema, buildSchema, printSchema, print } from "graphql";

import { generateListOptions } from './generate-list-options';
import { getCommonTypesSchema } from "./get-common-types-schema";
import { generateErrorCodeEnum } from './generate-error-code-enum';

export type QlopinOptions = {
    /*
    * Glob pattern for type definitions files.
    */
    typeDefsPath: string;
} | {
    /*
    * SDL string for type definitions.
    */
    typeDefs: string;
}

/**
 * Builds a modified schema from type definitions.
 * 
 * @param options Options for building the schema.
 * @returns The Qlopin GraphQL schema.
 * 
 **/
export function buildQlopinSchema(options: QlopinOptions): GraphQLSchema {
    let typeDefs: string;

    if ('typeDefs' in options) {
        typeDefs = options.typeDefs;
    } else {
        const typeDefsObjects = loadFilesSync(options.typeDefsPath);
        typeDefs = print(mergeTypeDefs(typeDefsObjects));
    }

    let qlopinSchema = buildSchema(`
        ${printSchema(getCommonTypesSchema())}
        ${typeDefs}
    `);

    qlopinSchema = generateListOptions(qlopinSchema);
    qlopinSchema = generateErrorCodeEnum(qlopinSchema);

    return qlopinSchema;
}