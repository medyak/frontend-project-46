#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0', '-V, --version', 'output the current version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  })
  .parse();
