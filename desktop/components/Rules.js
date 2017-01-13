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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Rules(props) {
  console.info(props.app.availableRules);
  return _react2.default.createElement(
    _reactorsGrid.Stack,
    { style: { margin: 10 } },
    props.app.availableRules.map(availableRule => _react2.default.createElement(
      _reactorsGrid.Row,
      { key: availableRule.name, style: {
          margin: 2,
          padding: 10,
          borderBottom: '1px solid #ccc'
        } },
      _react2.default.createElement(
        _reactorsGrid.Stack,
        null,
        _react2.default.createElement(
          _reactors.Text,
          { style: { fontWeight: 'bold' } },
          availableRule.name
        ),
        _react2.default.createElement(
          _reactors.Text,
          { style: { color: '#999' } },
          availableRule.description
        )
      )
    ))
  );
}