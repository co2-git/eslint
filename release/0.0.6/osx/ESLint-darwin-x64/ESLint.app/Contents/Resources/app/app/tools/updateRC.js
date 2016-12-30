import {createWriteStream} from 'fs';
import path from 'path';
import readRC from './readRC';

export default function updateRC(directory, update) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log({updateRC: directory});
      const rc = await readRC(directory);
      update(rc);
      const write = createWriteStream(path.join(directory, '.eslintrc.json'));
      write.on('error', reject);
      write.write(JSON.stringify(rc, null, 2));
      write.on('finish', resolve);
      write.end();
    } catch (error) {
      reject(error);
    }
  });
}
