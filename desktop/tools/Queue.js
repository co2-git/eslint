'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Queue extends _events2.default {

  static push(promise) {
    this.queue.push(promise);
    if (!this.running) {
      this.resume();
    }
  }

  static resume() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.queue.length) {
        _this.running = true;
        yield Promise.all(_this.queue.filter(function (item, index) {
          return index < _this.limit;
        }).map(function (item) {
          return item();
        }));
        _this.queue = _this.queue.filter(function (item, index) {
          return index >= _this.limit;
        });
        _this.running = false;
        process.nextTick(_asyncToGenerator(function* () {
          yield _this.resume();
        }));
      }
    })();
  }
}
exports.default = Queue;
Queue.running = false;
Queue.limit = 5;
Queue.queue = [];