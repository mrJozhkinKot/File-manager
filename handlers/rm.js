import { stat, rm } from 'fs/promises';
import path from 'path';
import { red, green, errorMessage, currentMessage } from '../constants/constants.js';

const deleteFileToDirectory = async (dir, [file]) => {
  try {
    const filePath = path.resolve(dir, file);
    await stat(dir);
    rm(filePath);
    console.log(green, 'The file was deleted');
  } catch (error) {
    console.log(red, errorMessage, ':', error.message);
  }
  console.log(currentMessage, dir)
};

export { deleteFileToDirectory };
