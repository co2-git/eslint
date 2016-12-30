'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Rules;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactorsGrid = require('reactors-grid');

var _reactors = require('reactors');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _AddRule = require('./AddRule');

var _AddRule2 = _interopRequireDefault(_AddRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Rules(props) {
  return _react2.default.createElement(
    _reactorsGrid.Stack,
    { style: { margin: 10 } },
    _react2.default.createElement(
      _reactors.Text,
      { style: { fontSize: 24, marginBottom: 10 } },
      _lodash2.default.keys(props.app.rules).length,
      ' Rule(s)'
    ),
    _react2.default.createElement(_AddRule2.default, { directory: props.app.directory }),
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