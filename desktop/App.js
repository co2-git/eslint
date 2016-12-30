'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactors = require('reactors');

var _reactorsIcons = require('reactors-icons');

var _reactorsIcons2 = _interopRequireDefault(_reactorsIcons);

var _reactorsGrid = require('reactors-grid');

var _reactorsForm = require('reactors-form');

var _electron = require('electron');

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _readRC = require('./tools/readRC');

var _readRC2 = _interopRequireDefault(_readRC);

var _TopBar = require('./components/TopBar');

var _TopBar2 = _interopRequireDefault(_TopBar);

var _Directory = require('./components/Directory');

var _Directory2 = _interopRequireDefault(_Directory);

var _BottomNav = require('./components/BottomNav');

var _BottomNav2 = _interopRequireDefault(_BottomNav);

var _Parser = require('./components/Parser');

var _Parser2 = _interopRequireDefault(_Parser);

var _Plugins = require('./components/Plugins');

var _Plugins2 = _interopRequireDefault(_Plugins);

var _switch2 = require('./tools/_switch');

var _switch3 = _interopRequireDefault(_switch2);

var _Queue = require('./tools/Queue');

var _Queue2 = _interopRequireDefault(_Queue);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const dialog = _electron.remote.dialog;


_reactorsIcons2.default.href = 'node_modules/reactors-icons/assets/font-awesome/css/font-awesome.min.css';

class App extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      directory: '',
      hasRC: false,
      rules: {},
      parser: '',
      view: 'config',
      parserOptions: _config2.default.parserOptions,
      plugins: []
    }, _temp;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.directory !== this.state.directory) {
      nextState.hasRC = true;
      const directory = nextState.directory;

      this.changeDirectory(directory);
    }
  }

  changeDirectory(directory) {
    if (this.watcher) {
      this.watcher.close();
    }

    const file = _path2.default.join(directory, '.eslintrc.json');

    (0, _fs.stat)(file, error => {
      if (error) {
        this.setState({ hasRC: false });
      } else {
        this.readRC(directory);
      }
    });

    this.watcher = (0, _fs.watch)(file, (eventType, filename) => {
      this.readRC(directory);
    });
  }

  readRC(directory) {
    var _this = this;

    return _asyncToGenerator(function* () {
      var _ref = yield (0, _readRC2.default)(directory);

      const parser = _ref.parser;
      const parserOptions = _ref.parserOptions;
      const rules = _ref.rules;
      var _ref$plugins = _ref.plugins;
      const plugins = _ref$plugins === undefined ? [] : _ref$plugins;

      _this.setState({ parser, parserOptions, rules, plugins });
    })();
  }

  init() {
    _Queue2.default.push(() => {
      const directory = this.state.directory;


      const initial = _extends({}, _lodash2.default.pick(_config2.default, ['parser', 'parserOptions']), {
        plugins: [],
        rules: {}
      });

      const write = (0, _fs.createWriteStream)(_path2.default.join(directory, '.eslintrc.json'));

      write.on('error', error => console.log(error.stack)).on('finish', () => {
        this.setState({ hasRC: true }, () => this.readRC(directory));
      });

      write.write(JSON.stringify(initial, null, 2));

      write.end();
    });
  }

  render() {
    var _state = this.state;
    const directory = _state.directory;
    const hasRC = _state.hasRC;
    const rules = _state.rules;
    const view = _state.view;


    return _react2.default.createElement(
      _reactorsGrid.Stack,
      { style: styles.container },
      _react2.default.createElement(_TopBar2.default, {
        app: this.state
      }),
      _react2.default.createElement(_Directory2.default, {
        directory: directory,
        updateDirectory: directory => this.setState({ directory })
      }),
      _react2.default.createElement(
        _reactors.View,
        { style: { flexGrow: 2 } },
        directory && !hasRC && _react2.default.createElement(
          _reactors.View,
          null,
          _react2.default.createElement(
            _reactorsForm.Button,
            { onPress: () => this.init() },
            'Init'
          )
        ),
        directory && hasRC && (0, _switch3.default)(view, {
          rules: _react2.default.createElement(
            _reactorsGrid.Row,
            null,
            _react2.default.createElement(
              _reactors.Text,
              null,
              'Rules (',
              _lodash2.default.keys(rules).length,
              ')'
            )
          ),

          plugins: _react2.default.createElement(_Plugins2.default, { app: this.state }),

          config: _react2.default.createElement(_Parser2.default, { app: this.state })
        })
      ),
      _react2.default.createElement(_BottomNav2.default, {
        app: this.state,
        switchView: view => this.setState({ view })
      })
    );
  }
}

exports.default = App;
const styles = _reactors.StyleSheet.create({
  container: {
    height: _reactors.Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column'
  }
});