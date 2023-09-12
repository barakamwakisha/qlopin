import { describe, it, expect } from 'vitest';
import { camelToUpperSnakeCase } from './camel-to-upper-snake-case';

describe('camelToUpperSnakeCase', () => {
    it('correctly converts case', () => {
        expect(camelToUpperSnakeCase('fooBar')).toBe('FOO_BAR');
    });
})
