import { readdir, stat } from 'fs/promises';
import path from 'path';
import { red, resetColor, errorMessage, currentMessage } from '../constants/constants.js';

const printFilesFromDirectory = async (dir, args) => {
  try {
    if (args.length) {
      console.log(red, errorMessage, resetColor);
    } else {
    await stat(path.resolve(dir));
    const files = await readdir(dir, {withFileTypes: true});
    const data = files
      .map((file) => {
        return new Object({
          Name: file.name,
          Type: file.isFile() ? 'file' : 'directory',
        });
      })
      .reduce((newArr, obj) => {
        newArr.push(obj);
        return newArr;
      }, []);
    console.table(data);
    }
  } catch (error) {
    console.log(red, errorMessage, ':', error.message, resetColor);
  }
  console.log(currentMessage, dir);
};

export { printFilesFromDirectory };
