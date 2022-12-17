import { open } from 'fs/promises';
import path from 'path';
import { stat } from 'node:fs/promises';
import { red, green, errorMessage, currentMessage } from '../constants/constants.js';

const addFileToDirectory = async (dir, [file]) => {
  try {
    await stat(dir);
    const filePath = path.resolve(dir, file);
    open(filePath, 'w');
    console.log(green, 'The file was created');
  } catch (error) {
    console.log(red, errorMessage, ':', error.message);
  }
  console.log(currentMessage, dir);
};

export { addFileToDirectory };
