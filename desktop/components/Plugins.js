'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Plugins;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactorsGrid = require('reactors-grid');

var _reactors = require('reactors');

var _reactorsForm = require('reactors-form');

var _reactorsIcons = require('reactors-icons');

var _reactorsIcons2 = _interopRequireDefault(_reactorsIcons);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _AddPlugin = require('./AddPlugin');

var _AddPlugin2 = _interopRequireDefault(_AddPlugin);

var _Queue = require('../tools/Queue');

var _Queue2 = _interopRequireDefault(_Queue);

var _updateRC = require('../tools/updateRC');

var _updateRC2 = _interopRequireDefault(_updateRC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Plugins(props) {
  return _react2.default.createElement(
    _reactorsGrid.Stack,
    { style: { margin: 10 } },
    _react2.default.createElement(
      _reactors.Text,
      { style: { fontSize: 24, marginBottom: 10 } },
      props.app.plugins.length,
      ' Plugin(s)'
    ),
    _react2.default.createElement(_AddPlugin2.default, { directory: props.app.directory }),
    props.app.plugins.map(plugin => _react2.default.createElement(
      _reactorsGrid.Row,
      { key: plugin, style: {
          border: '1px solid #ccc'
        } },
      _react2.default.createElement(
        _reactors.Text,
        { style: {
            fontSize: 16, padding: 10
          } },
        plugin
      ),
      _react2.default.createElement(
        _reactorsForm.Button,
        { style: {
            fontSize: 16, padding: 10
          }, onPress: () => {
            _Queue2.default.push(() => (0, _updateRC2.default)(props.app.directory, rc => {
              rc.plugins = _lodash2.default.filter(rc.plugins, plugin);
            }));
          } },
        _react2.default.createElement(_reactorsIcons2.default, { name: 'times' })
      )
    ))
  );
}