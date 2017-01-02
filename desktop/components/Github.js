'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Github;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactors = require('reactors');

var _reactorsIcons = require('reactors-icons');

var _reactorsIcons2 = _interopRequireDefault(_reactorsIcons);

var _reactorsGrid = require('reactors-grid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Github() {
  const icons = [{
    name: 'bug',
    label: 'Issues'
  }];

  return _react2.default.createElement(
    _reactorsGrid.Stack,
    { style: styles.container },
    icons.map(icon => _react2.default.createElement(
      _reactorsGrid.Stack,
      { key: icon.name, style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        } },
      _react2.default.createElement(_reactorsIcons2.default, {
        name: icon.name,
        style: {
          color: 'white',
          padding: 4
        }
      }),
      _react2.default.createElement(
        _reactors.Text,
        { style: { color: 'white', fontSize: 12 } },
        icon.label
      )
    ))
  );
}

const styles = _reactors.StyleSheet.create({
  container: {
    backgroundColor: '#333',
    padding: 8,
    borderBottom: '2px solid black',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});