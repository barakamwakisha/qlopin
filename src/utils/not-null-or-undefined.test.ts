import { describe, it, expect } from "vitest";
import { notNullOrUndefined } from './not-null-or-undefined';

describe("notNullOrUndefined", () => {
    it("returns true for non-null-or-undefined values", () => {
        expect(notNullOrUndefined(0)).toBe(true);
        expect(notNullOrUndefined("")).toBe(true);
        expect(notNullOrUndefined(false)).toBe(true);
        expect(notNullOrUndefined([])).toBe(true);
        expect(notNullOrUndefined({})).toBe(true);
    });

    it("returns false for null-or-undefined values", () => {
        expect(notNullOrUndefined(undefined)).toBe(false);
        expect(notNullOrUndefined(null)).toBe(false);
    });
});