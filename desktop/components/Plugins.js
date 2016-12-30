'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Plugins;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactorsGrid = require('reactors-grid');

var _reactors = require('reactors');

var _AddPlugin = require('./AddPlugin');

var _AddPlugin2 = _interopRequireDefault(_AddPlugin);

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
      { key: plugin },
      _react2.default.createElement(
        _reactors.Text,
        null,
        plugin
      )
    ))
  );
}