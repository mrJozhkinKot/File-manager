import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import path, { sep } from 'path';
import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { red, green, errorMessage, currentMessage, resetColor } from '../constants/constants.js';


const compressFileFromDirectory = async (dir, args) => {
    try {
        const filePath = path.resolve(dir, args[0]);
        const fileName = filePath.substring(
          filePath.lastIndexOf(sep) + 1,
          filePath.length
        ); 
        const newFilePath = path.resolve(dir, args[1]);
        console.log(newFilePath);
        await stat(filePath);
        await stat(newFilePath);
        const gzip = zlib.createGzip();
        const r_stream = createReadStream(filePath);
        const w_stream = createWriteStream(path.resolve(newFilePath, fileName));
        await pipeline(
            r_stream,
            gzip, w_stream,
          );
        console.log(green, 'The file was compressed', resetColor);

    } catch (error) {
        console.log(red, errorMessage, ': ', error.message, resetColor);
    }
    console.log(currentMessage, dir, resetColor)
}

export {compressFileFromDirectory}