'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateRC;

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readRC = require('./readRC');

var _readRC2 = _interopRequireDefault(_readRC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function updateRC(directory, update) {
  return new Promise((() => {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      try {
        console.log({ updateRC: directory });
        const rc = yield (0, _readRC2.default)(directory);
        update(rc);
        const write = (0, _fs.createWriteStream)(_path2.default.join(directory, '.eslintrc.json'));
        write.on('error', reject);
        write.write(JSON.stringify(rc, null, 2));
        write.on('finish', resolve);
        write.end();
      } catch (error) {
        reject(error);
      }
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })());
}