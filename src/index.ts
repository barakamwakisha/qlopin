import { GraphQLSchema, buildSchema, printSchema } from "graphql";

import { generateListOptions } from './generate-list-options';
import { getCommonTypesSchema } from "./get-common-types-schema";
import { generateErrorCodeEnum } from './generate-error-code-enum';

export type QlopinOptions = {
    typeDefs: string;
}

export function buildQlopinSchema(options: QlopinOptions): GraphQLSchema {
    let qlopinSchema = buildSchema(`
        ${printSchema(getCommonTypesSchema())}
        ${options.typeDefs}
    `);

    qlopinSchema = generateListOptions(qlopinSchema);
    qlopinSchema = generateErrorCodeEnum(qlopinSchema);

    return qlopinSchema;
}