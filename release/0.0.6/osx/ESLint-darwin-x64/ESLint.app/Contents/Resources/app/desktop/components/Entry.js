'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactorsGrid = require('reactors-grid');

var _reactors = require('reactors');

var _reactorsForm = require('reactors-form');

var _updateRC = require('../tools/updateRC');

var _updateRC2 = _interopRequireDefault(_updateRC);

var _Queue = require('../tools/Queue');

var _Queue2 = _interopRequireDefault(_Queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Entry extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      value: this.props.value,
      other: false
    }, _temp;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value && !this.throttle) {
      this.setState({ value: nextProps.value });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.other = nextState.value === '*';
  }

  componentDidUpdate(prevProps, prevState) {
    const currentState = this.state;

    if (prevState.value !== currentState.value) {
      if (this.throttle) {
        clearTimeout(this.throttle);
      }
      this.throttle = setTimeout(() => {
        this.props.update(currentState.value);
      }, 2500);
    }
  }

  render() {
    return _react2.default.createElement(
      _reactorsGrid.Stack,
      null,
      _react2.default.createElement(
        _reactorsGrid.Row,
        null,
        _react2.default.createElement(
          _reactors.Text,
          { style: { padding: 10 } },
          this.props.label
        ),
        _react2.default.createElement(_reactorsForm.Dropdown, {
          style: { flexGrow: 2, padding: 4 },
          data: this.props.data,
          onChange: value => this.setState({ value }),
          selected: this.state.value
        })
      ),
      this.state.other && _react2.default.createElement(_reactorsForm.TextInput, {
        style: {
          padding: 10
        },
        placeholder: this.props.label,
        value: this.state.value,
        onChange: value => this.setState({ value })
      })
    );
  }
}
exports.default = Entry;