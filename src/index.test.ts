import { printType } from 'graphql';
import { buildQlopinSchema } from './index';
import { describe, expect, it } from 'vitest';

describe('qlopin', () => {
    const SOURCE_SCHEMA = `
        input AddCastMemberInput {
            name: String!
            role: String!
        }
        
        type CastMember implements Node {
            id: ID!
            name: String!
            role: String!
        }
        
        type CastMemberList implements PaginatedList {
            items: [CastMember!]!
            totalItems: Int!
        }
        
        type MemberExistsError implements ErrorResult {
            errorCode: ErrorCode!
            message: String!
        }
        
        union AddCastMemberResult = CastMember | MemberExistsError
        
        type Query {
            castMembers(options: CastMemberListOptions): CastMemberList!
        }
        
        type Mutation {
            addCastMember(input: AddCastMemberInput!): AddCastMemberResult!
        }
        
        # Generated at runtime
        input CastMemberListOptions
    `;

    const removeLeadingWhitespace = (s: string) => {
        const indent = s.match(/^\s+/m)![0].replace(/\n/, '');
        return s.replace(new RegExp(`^${indent}`, 'gm'), '').trim();
    };

    it('should generate list options', () => {
        const schema = buildQlopinSchema({
            typeDefs: SOURCE_SCHEMA,
        });

        const listOptions = schema.getType('CastMemberListOptions')!;
        expect(listOptions).toBeDefined();
        expect(printType(listOptions)).toBe(
            removeLeadingWhitespace(`
                   input CastMemberListOptions {
                     """Skips the first n results, for use in pagination"""
                     skip: Int

                     """Takes n results, for use in pagination"""
                     take: Int

                     """Specifies which properties to sort the results by"""
                     sort: CastMemberSortParameter

                     """Allows the results to be filtered"""
                     filter: CastMemberFilterParameter

                     """
                     Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND.
                     """
                     filterOperator: LogicalOperator
                   }`)
        );
    });

    it('should generate sort parameters', () => {
        const schema = buildQlopinSchema({
            typeDefs: SOURCE_SCHEMA,
        });
        const sortParameter = schema.getType('CastMemberSortParameter')!;
        expect(sortParameter).toBeDefined();
        expect(printType(sortParameter)).toBe(
            removeLeadingWhitespace(`
                   input CastMemberSortParameter {
                     id: SortOrder
                     name: SortOrder
                     role: SortOrder
                   }`),
        );
    });

    it('should generate filter parameters', () => {
        const schema = buildQlopinSchema({
            typeDefs: SOURCE_SCHEMA,
        });

        const filterParameter = schema.getType('CastMemberFilterParameter')!;
        expect(filterParameter).toBeDefined();
        expect(printType(filterParameter)).toBe(
            removeLeadingWhitespace(`
                   input CastMemberFilterParameter {
                     id: IDOperators
                     name: StringOperators
                     role: StringOperators
                   }`),
        );
    });
});