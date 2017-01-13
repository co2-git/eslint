'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BottomNav;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactorsGrid = require('reactors-grid');

var _reactorsIcons = require('reactors-icons');

var _reactorsIcons2 = _interopRequireDefault(_reactorsIcons);

var _reactors = require('reactors');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BottomNav({ app: { plugins, rules }, switchView }) {
  return _react2.default.createElement(
    _reactorsGrid.Row,
    { style: styles.container },
    _react2.default.createElement(
      _reactorsGrid.Stack,
      { style: styles.tab, onClick: () => switchView('rules') },
      _react2.default.createElement(_reactorsIcons2.default, { name: 'sliders', style: styles.icon }),
      _react2.default.createElement(
        _reactors.Text,
        { style: styles.label },
        _lodash2.default.keys(rules).length,
        ' Rules'
      )
    ),
    _react2.default.createElement(
      _reactorsGrid.Stack,
      { style: styles.tab, onClick: () => switchView('plugins') },
      _react2.default.createElement(_reactorsIcons2.default, { name: 'puzzle-piece', style: styles.icon }),
      _react2.default.createElement(
        _reactors.Text,
        { style: styles.label },
        plugins.length,
        ' Plugins'
      )
    ),
    _react2.default.createElement(
      _reactorsGrid.Stack,
      {
        style: styles.tab,
        onPress: () => {
          switchView('config');
        }
      },
      _react2.default.createElement(_reactorsIcons2.default, { name: 'cog', style: styles.icon }),
      _react2.default.createElement(
        _reactors.Text,
        { style: styles.label },
        'Config'
      )
    )
  );
}

const styles = _reactors.StyleSheet.create({
  container: {
    borderTop: `2px solid ${ _config2.default.color }`,
    padding: 10,
    backgroundColor: '#eee',
    paddingLeft: 40,
    paddingRight: 40
  },
  icon: {
    fontSize: 26,
    color: _config2.default.color,
    padding: 8
  },
  label: {
    fontSize: 12,
    color: _config2.default.color
  },
  tab: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
});