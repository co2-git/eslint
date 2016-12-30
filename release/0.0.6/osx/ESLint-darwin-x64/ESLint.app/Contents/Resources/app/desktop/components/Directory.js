'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Directory;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactors = require('reactors');

var _reactorsIcons = require('reactors-icons');

var _reactorsIcons2 = _interopRequireDefault(_reactorsIcons);

var _reactorsGrid = require('reactors-grid');

var _reactorsForm = require('reactors-form');

var _electron = require('electron');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dialog = _electron.remote.dialog;
function Directory(props) {
  const directory = props.directory;
  const updateDirectory = props.updateDirectory;


  const handler = () => {
    dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory', 'showHiddenFiles']
    }, (filePaths = []) => {
      filePaths.length && updateDirectory(filePaths[0]);
    });
  };

  return _react2.default.createElement(
    _reactorsGrid.Stack,
    null,
    _react2.default.createElement(
      _reactors.Text,
      { style: styles.title },
      _path2.default.basename(directory)
    ),
    _react2.default.createElement(
      _reactorsGrid.Row,
      null,
      _react2.default.createElement(_reactorsIcons2.default, {
        name: 'folder',
        style: styles.icon,
        onPress: handler
      }),
      _react2.default.createElement(_reactorsForm.TextInput, {
        value: directory,
        onChange: directory => updateDirectory(directory),
        style: styles.input,
        placeholder: '<-- Click on folder icon'
      })
    )
  );
}

const styles = _reactors.StyleSheet.create({
  title: {
    color: '#4B32C3',
    fontSize: 44,
    padding: 10
  },
  icon: {
    color: '#4B32C3',
    fontSize: 28,
    padding: 10
  },
  input: {
    padding: 6,
    fontSize: 16,
    flexGrow: 2,
    color: '#4B32C3',
    borderWidth: 0
  }
});