'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readRC;

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readRC(directory) {
  return new Promise((resolve, reject) => {
    let src = '';
    const read = (0, _fs.createReadStream)(_path2.default.join(directory, '.eslintrc.json'));
    read.on('error', reject);
    read.on('data', data => {
      src += data.toString();
    });
    read.on('end', () => {
      const rc = JSON.parse(src);
      resolve(rc);
    });
  });
}