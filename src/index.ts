import { GraphQLSchema, buildSchema, printSchema } from "graphql";

import { generateListOptions } from './generate-list-options';
import { getCommonTypesSchema } from "./get-common-types-schema";
import { generateErrorCodeEnum } from './generate-error-code-enum';

export type QlopinOptions = {
    typeDefs: string;
} | {
    typeDefsLoader: () => Promise<string>;
}

export async function buildQlopinSchema(options: QlopinOptions): Promise<GraphQLSchema> {
    let qlopinSchema: GraphQLSchema;

    if ('typeDefs' in options) {
        qlopinSchema = buildSchema(`
            ${printSchema(getCommonTypesSchema())}
            ${options.typeDefs}
        `);
    } else {
        qlopinSchema = buildSchema(`
            ${printSchema(getCommonTypesSchema())}
            ${await options.typeDefsLoader()}
        `);
    }

    qlopinSchema = generateListOptions(qlopinSchema);
    qlopinSchema = generateErrorCodeEnum(qlopinSchema);

    return qlopinSchema;
}