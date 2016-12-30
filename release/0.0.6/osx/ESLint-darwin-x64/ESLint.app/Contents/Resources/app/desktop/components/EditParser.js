'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactorsGrid = require('reactors-grid');

var _reactorsForm = require('reactors-form');

var _reactors = require('reactors');

var _updateRC = require('../tools/updateRC');

var _updateRC2 = _interopRequireDefault(_updateRC);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EditParser extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      parser: '',
      useOtherParser: false,
      useOtherECMAVersion: false
    }, _temp;
  }

  componentWillUpdate(nextProps, nextState) {
    const currentParser = this.state.parser;
    const nextParser = nextState.parser;

    if (currentParser !== nextParser) {
      if (nextParser === '*' && !nextState.useOtherParser) {
        nextState.useOtherParser = true;
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.parser !== this.state.parser) {
      if (this.throttler) {
        clearTimeout(this.throttler);
      }
      this.throttler = setTimeout(() => {
        this.save();
      }, 2500);
    }
  }

  save() {
    const parser = this.state.parser;
    const directory = this.props.directory;

    (0, _updateRC2.default)(directory, { parser });
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
          'Parser'
        ),
        _react2.default.createElement(_reactorsForm.Dropdown, {
          style: { flexGrow: 2, padding: 4 },
          data: [..._config2.default.parsers, { label: 'Other', key: '*' }],
          onChange: e => this.setState({ parser: e.target.value })
        })
      ),
      this.state.useOtherParser && _react2.default.createElement(_reactorsForm.TextInput, {
        style: {
          padding: 10
        },
        placeholder: 'Parser name',
        value: this.state.parser,
        onChange: parser => this.setState({ parser })
      }),
      _react2.default.createElement(
        _reactorsGrid.Row,
        null,
        _react2.default.createElement(
          _reactors.Text,
          { style: { padding: 10 } },
          'ECMA version'
        ),
        _react2.default.createElement(_reactorsForm.Dropdown, {
          style: { flexGrow: 2, padding: 4 },
          data: [..._config2.default.ecmaVersions],
          onChange: e => this.setState({ parser: e.target.value })
        })
      ),
      this.state.useOtherECMAVersion && _react2.default.createElement(_reactorsForm.TextInput, {
        style: {
          padding: 10
        },
        placeholder: 'Parser name',
        value: this.state.parser,
        onChange: parser => this.setState({ parser })
      })
    );
  }
}
exports.default = EditParser;