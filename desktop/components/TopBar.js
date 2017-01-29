'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TopBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactors = require('reactors');

var _reactorsIcons = require('reactors-icons');

var _reactorsIcons2 = _interopRequireDefault(_reactorsIcons);

var _reactorsGrid = require('reactors-grid');

var _reactorsFileDialog = require('reactors-file-dialog');

var _reactorsFileDialog2 = _interopRequireDefault(_reactorsFileDialog);

var _package = require('../../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TopBar(props) {
  return _react2.default.createElement(
    _reactorsGrid.Row,
    { style: styles.header },
    _react2.default.createElement(
      _reactorsGrid.Row,
      { style: { justifyContent: 'flex-start' } },
      _react2.default.createElement(
        _reactors.Text,
        { style: [styles.title, { fontWeight: 'bold', paddingRight: 5 }] },
        'eslint'
      ),
      _react2.default.createElement(
        _reactors.Text,
        { style: styles.title },
        'v',
        _package.version
      ),
      props.app.availableRules.length && _react2.default.createElement(_reactorsFileDialog2.default, {
        color: 'white',
        directory: props.app.directory,
        onChange: directory => props.setAppState({ directory })
      })
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