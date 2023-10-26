import {describe, expect, test} from '@jest/globals';
 

it('testing works', () => {
  expect(0).toEqual(0);
});

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});