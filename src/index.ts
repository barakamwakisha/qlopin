import { GraphQLSchema, buildSchema, printSchema } from "graphql";

import { generateListOptions } from './generate-list-options';
import { generateErrorCodeEnum } from './generate-error-code-enum';
import { getCommonTypesSchema } from "./get-common-types-schema";

export type QlopinOptions = {
    /**
     * The GraphQL schema to generate types for.
     * 
     * This shouldd be string of SDL.
     */
    schema: string;
}

export function buildQlopinSchema(options: QlopinOptions): GraphQLSchema {
    const { schema } = options;
    let qlopinSchema = buildSchema(`
        ${printSchema(getCommonTypesSchema())}
        ${schema}
    `);

    qlopinSchema = generateListOptions(qlopinSchema);
    qlopinSchema = generateErrorCodeEnum(qlopinSchema);

    return qlopinSchema;
}