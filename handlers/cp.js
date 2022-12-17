import { createReadStream, createWriteStream } from 'fs';
import path, { sep } from 'path';
import { stat } from 'fs/promises';
import { red, green, errorMessage, currentMessage } from '../constants/constants.js';

const copyFileToNewDirectory = async (dir, args) => {
  try {
    const filePath = path.resolve(dir, args[0]);
    const fileName = filePath.substring(
      filePath.lastIndexOf(sep) + 1,
      filePath.length
    );
    await stat(filePath);
    await stat(args[1]);
    const newFilePath = path.resolve(args[1], fileName);
    const readable = createReadStream(filePath, { encoding: 'utf8' });
    const writable = createWriteStream(newFilePath);
    readable.pipe(writable);
    console.log(green, 'The file was copied');
  } catch (error) {
    console.log(red, errorMessage, ': ', error.message);
  }
  console.log(currentMessage, dir)
};

export { copyFileToNewDirectory };
