import { rename } from 'fs/promises';
import path, { sep } from 'path';
import { stat } from 'fs/promises';
import { red, green, errorMessage } from '../constants/constants.js';

const renameFileInDirectory = async (dir, args) => {
  try {
    const filePath = path.resolve(dir, args[0]);
    const newDirection = filePath.substring(0, filePath.lastIndexOf(sep));
    const newFilePath = path.resolve(newDirection, args[1]);
    await stat(filePath);
    rename(filePath, newFilePath);
    console.log(green, 'The file was renamed');
  } catch (error) {
    console.log(red, errorMessage, ': ', error.message);
  }
  console.log(currentMessage, dir);
};

export { renameFileInDirectory };
