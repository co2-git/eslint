'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TopBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactors = require('reactors');

var _package = require('../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TopBar(props) {
  return _react2.default.createElement(
    _reactors.View,
    { style: styles.header },
    _react2.default.createElement(
      _reactors.Text,
      { style: styles.title },
      'eslint v',
      _package.version
    )
  );
}

const styles = _reactors.StyleSheet.create({
  header: {
    backgroundColor: '#4B32C3',
    padding: 8
  },
  title: {
    color: 'white',
    fontSize: 16
  }
});