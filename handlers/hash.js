import { stat, readFile } from 'fs/promises';
import { createHash } from 'crypto';
import path from 'path';
import {
  red,
  green,
  resetColor,
  errorMessage,
  currentMessage,
} from '../constants/constants.js';

const calculateHash = async (dir, [args]) => {
  try {
    const filePath = path.resolve(dir, args);
    await stat(dir);
    const content = await readFile(filePath);
    console.log(green, createHash('sha256').update(content).digest('hex'), resetColor);
  } catch (error) {
    console.log(red, errorMessage, ':', error.message, resetColor);
  }
  console.log(currentMessage, dir, resetColor);
};

export { calculateHash };
