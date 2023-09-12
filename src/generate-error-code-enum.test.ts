import { GraphQLEnumType, printSchema } from 'graphql';
import { describe, expect, it } from 'vitest';
import { generateErrorCodeEnum } from './generate-error-code-enum';
import { getCommonTypesSchema } from './get-common-types-schema';

describe('generateErrorCodeEnum', () => {
    const COMMON_TYPES = printSchema(getCommonTypesSchema());
    it('should generate an enum with the names of all the types which inherit from the ErrorResult interface', () => {
        const schema = generateErrorCodeEnum(`
            ${COMMON_TYPES}
            type UserError implements ErrorResult {
                message: String!
                username: String!
            }
            type SystemError implements ErrorResult {
                message: String!
                code: Int!
            }
            type Query {
                userError: UserError
                systemError: SystemError
            }
        `);
        expect(schema.getType('ErrorCode')).toBeDefined();
        expect((schema.getType('ErrorCode') as GraphQLEnumType).getValues().map(v => v.name)).toEqual(['UNKNOWN_ERROR', 'USER_ERROR', 'SYSTEM_ERROR']);
    });

    it('should not generate an extended enum if there are no types which inherit from the ErrorResult interface', () => {
        const schema = generateErrorCodeEnum(`
            ${COMMON_TYPES}
            type Query {
                hello: String!
            }
        `);
        expect((schema.getType('ErrorCode') as GraphQLEnumType).getValues().length).toBe(1);
        expect((schema.getType('ErrorCode') as GraphQLEnumType).getValues().map(v => v.name)).toEqual(['UNKNOWN_ERROR']);
    });
});