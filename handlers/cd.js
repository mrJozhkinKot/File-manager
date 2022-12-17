import path from 'path';
import { stat } from 'node:fs/promises';
import { red, errorPathMessage, currentMessage } from '../constants/constants.js';

const getCurrentDirectory = async (dir, [nextPath]) => {
  try {
    const curPath = path.resolve(dir, nextPath);
    await stat(curPath);
    return curPath;
  } catch (error) {
    console.log(red, errorPathMessage, ': ', error.message);
  }
  console.log(currentMessage, dir);
};

export { getCurrentDirectory };
