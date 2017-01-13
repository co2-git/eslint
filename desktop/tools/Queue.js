'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _drop = require('lodash/drop');

var _drop2 = _interopRequireDefault(_drop);

var _take = require('lodash/take');

var _take2 = _interopRequireDefault(_take);

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

            yield Promise.all((0, _take2.default)(_this.queue, 5).map(function (item) {
              return item();
            }));

            _this.queue = (0, _drop2.default)(_this.queue, 5);

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