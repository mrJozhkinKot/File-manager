import { stat, readFile } from 'fs/promises';
import { createHash } from 'crypto';
import path from 'path';
import {
  red,
  green,
  errorMessage,
  currentMessage,
} from '../constants/constants.js';

const calculateHash = async (dir, [args]) => {
  try {
    const filePath = path.resolve(dir, args);
    await stat(dir);
    const content = await readFile(filePath);
    console.log(green, createHash('sha256').update(content).digest('hex'));
  } catch (error) {
    console.log(red, errorMessage, ':', error.message);
  }
  console.log(currentMessage, dir);
};

export { calculateHash };
