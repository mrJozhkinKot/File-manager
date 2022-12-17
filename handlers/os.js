import os from 'os';
import {
  red,
  green,
  resetColor,
  currentMessage,
  errorMessage,
} from '../constants/constants.js';

const getOSInfo = async (dir, [args]) => {
  switch (args) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      const cpus = [];
      os.cpus().forEach((c) => {
        const cpu = new Object({ model: c.model, speed: c.speed });
        cpus.push(cpu);
      });
      console.log(green, 'Total CPUS:', cpus.length);
      console.log(cpus);
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      console.log(red, errorMessage, resetColor);
  }
  console.log(currentMessage, dir);
};
export { getOSInfo };
