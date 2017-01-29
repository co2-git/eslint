import path from 'path';
import map from 'lodash/map';
import readdir from '../tools/readdir';

export default function fetchRules(directory) {
  return new Promise(async (resolve, reject) => {
    try {
      const pathToRules = path.resolve(
        directory,
        'node_modules',
        'eslint',
        'lib',
        'rules',
      );

      const files = await readdir(pathToRules);

      const availableRules = files.filter((file) => !/^\./.test(file));

      const getAllFiles = map(availableRules, (rule) =>
        new Promise((resolve, reject) => {
          try {
            const ruleDef = require(path.join(pathToRules, rule));
            resolve({
              ...ruleDef,
              name: rule.replace(/\.js$/, ''),
              description: ruleDef.meta.docs.description,
            });
          } catch (error) {
            reject(error);
          }
        }),
      );

      resolve(await Promise.all(getAllFiles));
    } catch (error) {
      reject(error);
    }
  });
}
