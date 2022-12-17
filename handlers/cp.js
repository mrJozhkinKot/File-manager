import { createReadStream, createWriteStream } from 'fs';
import path, { sep } from 'path';
import { stat } from 'fs/promises';
import { red, green, errorMessage, currentMessage, resetColor } from '../constants/constants.js';

const copyFileToNewDirectory = async (dir, args) => {
  try {
    const filePath = path.resolve(dir, args[0]);
    const fileName = filePath.substring(
      filePath.lastIndexOf(sep) + 1,
      filePath.length
    );
    const newFilePath = path.resolve(dir, args[1]);
    await stat(filePath);
    await stat(newFilePath);
    const readable = createReadStream(filePath, { encoding: 'utf8' });
    const writable = createWriteStream(path.resolve(newFilePath, fileName));
    readable.pipe(writable);
    console.log(green, 'The file was copied', resetColor);
  } catch (error) {
    console.log(red, errorMessage, ': ', error.message, resetColor);
  }
  console.log(currentMessage, dir)
};

export { copyFileToNewDirectory };
