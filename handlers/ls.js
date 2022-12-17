import { readdir } from 'fs/promises';
import path from 'path';
import { statSync } from 'fs';
import { red, errorMessage, currentMessage } from '../constants/constants.js';

const printFilesFromDirectory = async (dir) => {
  try {
    const files = await readdir(dir);
    const data = files
      .map((file) => {
        const option = statSync(path.resolve(dir, file));
        return new Object({
          Name: file,
          Type: option.isFile() ? 'file' : 'directory',
        });
      })
      .reduce((newArr, obj) => {
        newArr.push(obj);
        return newArr;
      }, []);

    console.table(data);
  } catch (error) {
    console.log(red, errorMessage, ':', error.message);
  }
  console.log(currentMessage, dir);
};

export { printFilesFromDirectory };
