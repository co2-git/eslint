'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactorsGrid = require('reactors-grid');

var _reactorsForm = require('reactors-form');

var _reactorsIcons = require('reactors-icons');

var _reactorsIcons2 = _interopRequireDefault(_reactorsIcons);

var _Queue = require('../tools/Queue');

var _Queue2 = _interopRequireDefault(_Queue);

var _updateRC = require('../tools/updateRC');

var _updateRC2 = _interopRequireDefault(_updateRC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AddRule extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = { level: 0, value: '' }, _temp;
  }

  render() {
    return _react2.default.createElement(
      _reactorsGrid.Row,
      null,
      _react2.default.createElement(_reactorsForm.TextInput, {
        style: {
          padding: 10,
          flexGrow: 2,
          fontSize: 16
        },
        placeholder: 'Rule name',
        value: this.state.value,
        onChange: value => this.setState({ value })
      }),
      _react2.default.createElement(_reactorsForm.Dropdown, {
        data: [{ key: 0, label: 'Ignore' }, { key: 1, label: 'Warning' }, { key: 2, label: 'Error' }],
        selected: this.state.level,
        onChange: level => this.setState({ level })
      }),
      _react2.default.createElement(
        _reactorsForm.Button,
        {
          onPress: () => {
            _Queue2.default.push(() => (0, _updateRC2.default)(this.props.directory, rc => {
              var _state = this.state;
              const level = _state.level;
              const value = _state.value;

              if (!rc.rules) {
                rc.rules = {};
              }
              rc.rules[value] = level;
              this.setState({ value: '' });
            }));
          }
        },
        _react2.default.createElement(_reactorsIcons2.default, { name: 'plus', style: { fontSize: 16, margin: 3 } })
      )
    );
  }
}
exports.default = AddRule;