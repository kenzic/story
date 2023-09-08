#!/usr/bin/env node

import fs from 'fs';
import { Command } from '@commander-js/extra-typings';
import { storyToJsonl } from './parser';

const program = new Command();

program
  .name('story')
  .version('0.9.0');

program
  .command("convert <input> [output]")
  .action(async (input: string, output?: string) => {
    const inputFile = fs.readFileSync(input, 'utf8')
    let outputFile = null;

    const jsonLFormat = storyToJsonl(inputFile);


    if (output) {
      outputFile = fs.writeFileSync(output, jsonLFormat)
    } else {
      console.log(jsonLFormat)
    }
  });


program.parse(process.argv);
