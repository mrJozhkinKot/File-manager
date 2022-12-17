import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import path, { sep } from 'path';
import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { red,errorMessage, currentMessage } from '../constants/constants.js';

const decompressFileFromDirectory = async(dir, args) => {
    try {
        const filePath = path.resolve(dir, args[0]);
        const fileName = filePath.substring(
          filePath.lastIndexOf(sep) + 1,
          filePath.length
        ); 
        const newFilePath = path.resolve(args[1], fileName);
        await stat(filePath);
        await stat(args[1]);
        const gzip = zlib.createGunzip();
        const r_stream = createReadStream(filePath);
        const w_stream = createWriteStream(newFilePath);
    
        await pipeline(
            r_stream,
            gzip, w_stream,
          );
    } catch (error) {
        console.log(red, errorMessage, ':', error.message)
    }
    console.log(currentMessage);
}
export {decompressFileFromDirectory}