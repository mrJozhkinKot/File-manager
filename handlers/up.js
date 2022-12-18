import path from 'path';
import { stat } from 'node:fs/promises';
import { red, errorPathMessage, resetColor } from '../constants/constants.js';

const getUpperDirectory = async (dir, args) => {
  try {
    if (args.length) {
        console.log(red, errorPathMessage, resetColor);
        return;
    }
    const curPath = path.resolve(dir, '..');
    await stat(curPath);
    return curPath;
  } catch (error) {
    console.log(red, errorPathMessage, ': ', error.message, resetColor);
  }
};

export { getUpperDirectory };