'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _switch;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _switch(value, cases) {
  if (Array.isArray(cases)) {
    for (const on of cases) {
      if (on.when === value) {
        return on.then;
      }
    }
    const _default = _lodash2.default.find(cases, 'otherwise');
    if (_default) {
      return _default.otherwise;
    }
    return;
  }

  for (const key in cases) {
    if (key === value) {
      return cases[key];
    }
  }
}