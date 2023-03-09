import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const getPath = (file) => `__fixtures__/${file}`;
test.each([
  {
    file1: 'file1.json', file2: 'file2.json', expectation: 'file12.txt',
  },
])('PASS flat JSON files test', ({
  file1, file2, expectation,
}) => {
  const fileOne = getPath(file1);
  const fileTwo = getPath(file2);
  const expectedFile = getPath(expectation);
  const expectedData = readFileSync(expectedFile, 'utf-8');
  expect(genDiff(fileOne, fileTwo)).toEqual(expectedData);
});
