import {readdir} from 'fs';

export default function _readdir(dir) {
  return new Promise((resolve, reject) => {
    readdir(dir, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });
}
