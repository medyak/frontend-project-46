import path from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));
  const diff = keys.reduce((acc, key) => {
    const value1 = _.get(data1, key);
    const value2 = _.get(data2, key);
    if (value1 === value2) {
      return [...acc, [`  ${key}`, value1]];
    }
    return [
      ...acc,
      [`- ${key}`, value1],
      [`+ ${key}`, value2],
    ];
  }, [])
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `  ${key}: ${value}`).join('\n');

  return diff;
};

const getPath = (file) => path.resolve(cwd(), file);
const genDiff = (filepath1, filepath2) => {
  const file1 = readFileSync(getPath(filepath1), 'utf-8');
  const file2 = readFileSync(getPath(filepath2), 'utf-8');
  const difference = getDiff(JSON.parse(file1), JSON.parse(file2));

  return difference;
};

export default genDiff;
