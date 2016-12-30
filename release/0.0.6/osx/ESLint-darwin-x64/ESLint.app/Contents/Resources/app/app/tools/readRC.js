import {createReadStream} from 'fs';
import path from 'path';

export default function readRC(directory) {
  return new Promise((resolve, reject) => {
    let src = '';
    const read = createReadStream(path.join(directory, '.eslintrc.json'));
    read.on('error', reject);
    read.on('data', (data) => {
      src += data.toString();
    });
    read.on('end', () => {
      const rc = JSON.parse(src);
      resolve(rc);
    });
  });
}
