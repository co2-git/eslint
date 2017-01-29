'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscoreSwitch = require('underscore-switch');

var _underscoreSwitch2 = _interopRequireDefault(_underscoreSwitch);

var _reactors = require('reactors');

var _reactorsGrid = require('reactors-grid');

var _BottomNav = require('./components/BottomNav');

var _BottomNav2 = _interopRequireDefault(_BottomNav);

var _fetchRules = require('./actions/fetchRules');

var _fetchRules2 = _interopRequireDefault(_fetchRules);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Queue = require('./tools/Queue');

var _Queue2 = _interopRequireDefault(_Queue);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Rules = require('./components/Rules');

var _Rules2 = _interopRequireDefault(_Rules);

var _Plugins = require('./components/Plugins');

var _Plugins2 = _interopRequireDefault(_Plugins);

var _Parser = require('./components/Parser');

var _Parser2 = _interopRequireDefault(_Parser);

var _TopBar = require('./components/TopBar');

var _TopBar2 = _interopRequireDefault(_TopBar);

var _readRC = require('./tools/readRC');

var _readRC2 = _interopRequireDefault(_readRC);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class App extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      availableRules: [],
      directory: this.props.directory || _path2.default.dirname(__dirname),
      hasRC: true,
      plugins: [],
      rules: [],
      view: 'rules'
    }, _temp;
  }

  componentDidMount() {
    if (this.state.directory) {
      this.changeDirectory(this.state.directory);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.directory !== this.state.directory) {
      this.changeDirectory(this.state.directory);
    }
  }

  fetchRules(directory) {
    var _this = this;

    return new Promise((() => {
      var _ref = _asyncToGenerator(function* (resolve, reject) {
        try {
          _this.setState({ availableRules: yield (0, _fetchRules2.default)(directory) }, resolve);
        } catch (error) {
          console.log(error.stack);
          reject(error);
        }
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })());
  }

  changeDirectory(directory) {
    // if (this.watcher) {
    //   this.watcher.close();
    // }

    const file = _path2.default.join(directory, '.eslintrc.json');

    (0, _fs.stat)(file, error => {
      if (error) {
        this.setState({ hasRC: false });
      } else {
        this.readRC(directory);
        // this.watcher = watch(file, (eventType, filename) => {
        //   this.readRC(directory);
        // });
      }
    });
  }

  readRC(directory) {
    var _this2 = this;

    return new Promise((() => {
      var _ref2 = _asyncToGenerator(function* (resolve, reject) {
        try {
          var _ref3 = yield (0, _readRC2.default)(directory);

          const parser = _ref3.parser;
          const parserOptions = _ref3.parserOptions;
          const rules = _ref3.rules;
          var _ref3$plugins = _ref3.plugins;
          const plugins = _ref3$plugins === undefined ? [] : _ref3$plugins;


          _this2.setState({ parser, parserOptions, rules, plugins }, function () {
            _this2.fetchRules(directory);
          });
        } catch (error) {
          reject(error);
        }
      });

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    })());
  }

  render() {
    return _react2.default.createElement(
      _reactorsGrid.Stack,
      { style: styles.container },
      _react2.default.createElement(
        _reactors.View,
        { style: { flexShrink: 1 } },
        _react2.default.createElement(_TopBar2.default, {
          app: this.state,
          setAppState: partial => this.setState(partial)
        })
      ),
      _react2.default.createElement(
        _reactors.View,
        { style: styles.main },
        !this.state.availableRules.length && _react2.default.createElement(
          _reactors.Text,
          null,
          'Fetching rules'
        ),
        this.state.availableRules.length && (0, _underscoreSwitch2.default)(this.state.view, {
          rules: _react2.default.createElement(_Rules2.default, {
            app: this.state,
            setAppState: partial => this.setState(partial)
          }),

          plugins: _react2.default.createElement(_Plugins2.default, { app: this.state }),

          config: _react2.default.createElement(_Parser2.default, { app: this.state })
        })
      ),
      this.state.hasRC && _react2.default.createElement(
        _reactors.View,
        { style: { flexShrink: 1 } },
        _react2.default.createElement(_BottomNav2.default, {
          app: this.state,
          switchView: view => {
            this.setState({ view });
          }
        })
      )
    );
  }
}

exports.default = App;
const styles = new _reactors.StyleSheet({
  container: {
    height: _reactors.Dimensions.get('window').height
  },
  main: {
    flexGrow: 2,
    overflow: 'auto'
  }
});