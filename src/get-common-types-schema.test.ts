import { describe, expect, it } from 'vitest';
import { getCommonTypesSchema } from './get-common-types-schema';

describe('getCommonTypesSchema', () => {
    it('returns a schema with all the common types', () => {
        const schema = getCommonTypesSchema();

        expect(schema.getType('DateTime')).toBeDefined();

        expect(schema.getType('DateRange')).toBeDefined();
        expect(schema.getType('NumberRange')).toBeDefined();

        expect(schema.getType('SortOrder')).toBeDefined();
        expect(schema.getType('LogicalOperator')).toBeDefined();

        expect(schema.getType('IDOperators')).toBeDefined();
        expect(schema.getType('DateOperators')).toBeDefined();
        expect(schema.getType('NumberOperators')).toBeDefined();
        expect(schema.getType('StringOperators')).toBeDefined();
        expect(schema.getType('BooleanOperators')).toBeDefined();

        expect(schema.getType('IDListOperators')).toBeDefined();
        expect(schema.getType('DateListOperators')).toBeDefined();
        expect(schema.getType('NumberListOperators')).toBeDefined();
        expect(schema.getType('StringListOperators')).toBeDefined();
        expect(schema.getType('BooleanListOperators')).toBeDefined();

        expect(schema.getType('ErrorCode')).toBeDefined();
        expect(schema.getType('ErrorResult')).toBeDefined();

        expect(schema.getType('Node')).toBeDefined();
        expect(schema.getType('PaginatedList')).toBeDefined();
    });
});