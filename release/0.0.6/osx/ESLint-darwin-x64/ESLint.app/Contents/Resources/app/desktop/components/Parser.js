'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactorsGrid = require('reactors-grid');

var _reactorsForm = require('reactors-form');

var _reactors = require('reactors');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _updateRC = require('../tools/updateRC');

var _updateRC2 = _interopRequireDefault(_updateRC);

var _Queue = require('../tools/Queue');

var _Queue2 = _interopRequireDefault(_Queue);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _Entry = require('./Entry');

var _Entry2 = _interopRequireDefault(_Entry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Parser extends _react.Component {

  set(fn) {
    _Queue2.default.push(() => (0, _updateRC2.default)(this.props.app.directory, fn));
  }

  render() {
    console.info(this);
    return _react2.default.createElement(
      _reactorsGrid.Stack,
      null,
      _react2.default.createElement(_Entry2.default, {
        label: 'Parser',
        data: [..._config2.default.parsers, { label: 'Other', key: '*' }],
        value: this.props.app.parser,
        update: parser => this.set(rc => {
          rc.parser = parser;
        })
      }),
      _react2.default.createElement(_Entry2.default, {
        label: 'ECMA version',
        data: [..._config2.default.ecmaVersions, { label: 'Other', key: '*' }],
        value: this.props.app.parserOptions.ecmaVersion,
        update: ecmaVersion => this.set(rc => {
          rc.parserOptions.ecmaVersion = ecmaVersion;
        })
      }),
      _react2.default.createElement(_Entry2.default, {
        label: 'Source Type',
        data: [{ key: 'module', label: 'Module' }, { key: 'script', label: 'Script' }],
        value: this.props.app.parserOptions.sourceType,
        update: sourceType => this.set(rc => {
          rc.parserOptions.sourceType = sourceType;
        })
      }),
      [{
        label: 'Global return',
        key: 'globalReturn'
      }, {
        label: 'Strict implied',
        key: 'impliedStrict'
      }, {
        label: 'JSX',
        key: 'jsx'
      }].map(ecmaFeature => _react2.default.createElement(_Entry2.default, {
        key: ecmaFeature.key,
        label: ecmaFeature.label,
        data: [{ key: true, label: 'Enabled' }, { key: false, label: 'Disabled' }],
        value: this.props.app.parserOptions.ecmaFeatures[ecmaFeature.key],
        update: value => this.set(rc => {
          rc.parserOptions.ecmaFeatures[ecmaFeature.key] = value;
        })
      }))
    );
  }
}
exports.default = Parser;