import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);
const getFile = (obj) => fs.readFileSync(getPath(obj), 'utf-8');

const findDifference = (data1, data2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(data1), ...Object.keys(data2)]));
  const difference = keys.reduce((acc, key) => {
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
  return difference;
};

const genDiff = (filepath1, filepath2) => {
  const file1 = getFile(filepath1);
  const file2 = getFile(filepath2);
  const data1 = JSON.parse(file1.toString());
  const data2 = JSON.parse(file2.toString());
  const difference = findDifference(data1, data2);
  return difference;
};

export default genDiff;
