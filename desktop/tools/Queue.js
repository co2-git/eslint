'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Queue {

  static push(...promises) {
    this.queue.push(...promises);
    if (!this.running) {
      this.resume();
    }
  }

  static resume() {
    var _this = this;

    return new Promise((() => {
      var _ref = _asyncToGenerator(function* (resolve, reject) {
        try {
          if (_this.queue.length) {
            _this.running = true;

            console.log('running queue', _this.queue.length, _this.limit);

            yield Promise.all(_lodash2.default.take(_this.queue, 5).map(function (item) {
              return item();
            }));

            _this.queue = _lodash2.default.drop(_this.queue, 5);

            _this.running = false;

            setTimeout(_asyncToGenerator(function* () {
              yield _this.resume();
              resolve();
            }), _this.pause);
          }
        } catch (error) {
          reject(error);
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })());
  }
}
exports.default = Queue;
Queue.running = false;
Queue.limit = 5;
Queue.pause = 500;
Queue.queue = [];