import { open } from 'fs/promises';
import path from 'path';
import { stat } from 'node:fs/promises';
import { red, green, resetColor, errorMessage, currentMessage } from '../constants/constants.js';

const addFileToDirectory = async (dir, [args]) => {
  try {
    const filePath = path.resolve(dir, args);
    await stat(filePath);
    open(filePath, 'w');
    console.log(green, 'The file was created', resetColor);
  } catch (error) {
    console.log(red, errorMessage, ':', error.message, resetColor);
  }
  console.log(currentMessage, dir);
};

export { addFileToDirectory };
