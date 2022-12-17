import os from 'os';
import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import {
  red,
  yellow,
  resetColor,
  errorMessage,
  welcomeMessage,
  currentMessage,
  thankMessage,
  farewellMessage,
} from './constants/constants.js';
import { getArgs } from './handlers/args.js';
import { getCurrentDirectory } from './handlers/cd.js';
import { printFilesFromDirectory } from './handlers/ls.js';
import { readFileFromDirectory } from './handlers/cat.js';
import { addFileToDirectory } from './handlers/add.js';
import { renameFileInDirectory } from './handlers/rn.js';
import { copyFileToNewDirectory } from './handlers/cp.js';
import { moveFileFromDirectory } from './handlers/mv.js';
import { deleteFileToDirectory } from './handlers/rm.js';
import { getOSInfo } from './handlers/os.js';
import { calculateHash } from './handlers/hash.js';
import { compressFileFromDirectory } from './handlers/compress.js';
import { decompressFileFromDirectory } from './handlers/decompress.js';

const rl = readline.createInterface({ input, output });
const args = getArgs(process.argv);
let currentDirectory = os.homedir();
console.log(yellow, welcomeMessage, args, resetColor);
console.log(currentMessage, currentDirectory);

const logCurrentDirectory = async (dir, args) => {
  const newPath = await getCurrentDirectory(dir, args);
  currentDirectory = newPath ? newPath : currentDirectory;
};

try {
  rl.on('line', async (input) => {
    const rline = input.toString().trim();
    let [command, ...cArgs] = rline.split(' ');

    switch (command) {
      case '.exit':
        console.log(yellow, thankMessage, args, farewellMessage, resetColor);
        process.exit();
      case 'cd':
        await logCurrentDirectory(currentDirectory, cArgs);
        break;
      case 'up':
        await logCurrentDirectory(currentDirectory, ['..']);
        break;
      case 'ls':
        await printFilesFromDirectory(currentDirectory);
        break;
      case 'cat':
        await readFileFromDirectory(currentDirectory, cArgs);
        break;
      case 'add':
        await addFileToDirectory(currentDirectory, cArgs);
        break;
      case 'rn':
        await renameFileInDirectory(currentDirectory, cArgs);
        break;
      case 'cp':
        await copyFileToNewDirectory(currentDirectory, cArgs);
        break;
      case 'mv':
        await moveFileFromDirectory(currentDirectory, cArgs);
        break;
      case 'rm':
        await deleteFileToDirectory(currentDirectory, cArgs);
        break;
      case 'os':
        await getOSInfo(currentDirectory, cArgs);
        break;
      case 'hash':
        await calculateHash(currentDirectory, cArgs);
        break;
      case 'compress':
        await compressFileFromDirectory(currentDirectory, cArgs)
        break;
      case 'decompress':
        await decompressFileFromDirectory(currentDirectory, cArgs);
        break;
      default:
        console.log(red, errorMessage);
    }
  });

  rl.on('SIGINT', () => {
    console.log(yellow, thankMessage, args, farewellMessage, resetColor);
    process.exit();
  });
} catch (error) {
  console.log(red, errorMessage, resetColor);
}
