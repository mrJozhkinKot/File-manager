import { createReadStream } from 'fs';
import path from 'path';
import { red, resetColor, errorMessage, currentMessage } from '../constants/constants.js';

const readFileFromDirectory = async (dir, [args]) => {
  try {
    const filePath = path.resolve(dir, args);
    const stream = createReadStream(filePath, { encoding: 'utf8' });
    stream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
  } catch (error) {
    console.log(red, errorMessage, ': ', error.message, resetColor);
  }
  console.log(currentMessage, dir);
};

export { readFileFromDirectory };
