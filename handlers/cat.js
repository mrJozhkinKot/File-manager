import { createReadStream } from 'fs';
import path from 'path';
import { red, errorMessage, currentMessage } from '../constants/constants.js';

const readFileFromDirectory = async (dir, [filename]) => {
  try {
    const filePath = path.resolve(dir, filename);
    const stream = createReadStream(filePath, { encoding: 'utf8' });
    stream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
  } catch (error) {
    console.log(red, errorMessage, ': ', error.message);
  }
  console.log(currentMessage, dir);
};

export { readFileFromDirectory };
