'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactorsGrid = require('reactors-grid');

var _reactors = require('reactors');

var _reactorsIcons = require('reactors-icons');

var _reactorsIcons2 = _interopRequireDefault(_reactorsIcons);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _reactorsForm = require('reactors-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Rules extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = { query: '' }, _temp;
  }

  render() {
    const query = this.state.query;
    var _props$app = this.props.app;
    const availableRules = _props$app.availableRules;
    const rules = _props$app.rules;

    return _react2.default.createElement(
      _reactorsGrid.Stack,
      { style: styles.container },
      _react2.default.createElement(
        _reactorsGrid.Row,
        null,
        _react2.default.createElement(_reactorsForm.TextInput, {
          onChange: query => this.setState({ query }),
          placeholder: 'Search rule',
          style: styles.searchInput,
          value: this.state.query
        })
      ),
      _react2.default.createElement(
        _reactorsGrid.Stack,
        { style: styles.list },
        availableRules.filter(availableRule => {
          if (query) {
            return (0, _includes2.default)(availableRule.name, query);
          } else {
            return true;
          }
        }).map(availableRule => _react2.default.createElement(
          _reactorsGrid.Row,
          {
            key: availableRule.name,
            style: {
              margin: 2,
              padding: 10,
              borderBottom: '1px solid #ccc',
              flexShrink: 0,
              opacity: (0, _find2.default)(rules, { name: availableRule.name }) ? 1 : 0.25
            }
          },
          _react2.default.createElement(
            _reactorsGrid.Stack,
            {
              style: {
                padding: 10
              }
            },
            _react2.default.createElement(_reactorsIcons2.default, { name: 'check' })
          ),
          _react2.default.createElement(
            _reactorsGrid.Stack,
            {
              style: {
                flexGrow: 2
              }
            },
            _react2.default.createElement(
              _reactors.Link,
              {
                href: `http://eslint.org/docs/rules/${ availableRule.name }`,
                target: '_blank',
                style: { fontWeight: 'bold' }
              },
              availableRule.name
            ),
            _react2.default.createElement(
              _reactors.Text,
              { style: { color: '#999' } },
              availableRule.description
            ),
            _react2.default.createElement(
              _reactorsGrid.Row,
              null,
              _react2.default.createElement(
                _reactors.Text,
                {
                  style: {
                    backgroundColor: 'green',
                    flexGrow: 2,
                    padding: 6,
                    textAlign: 'center'
                  }
                },
                'Ignore'
              ),
              _react2.default.createElement(
                _reactors.Text,
                {
                  style: {
                    backgroundColor: 'orange',
                    flexGrow: 2,
                    padding: 6,
                    textAlign: 'center'
                  }
                },
                'Warning'
              ),
              _react2.default.createElement(
                _reactors.Text,
                {
                  style: {
                    backgroundColor: 'red',
                    flexGrow: 2,
                    padding: 6,
                    textAlign: 'center'
                  }
                },
                'Error'
              )
            )
          )
        ))
      )
    );
  }
}

exports.default = Rules;
const styles = new _reactors.StyleSheet({
  container: {},
  list: {
    height: _reactors.Dimensions.get('window').height - 150,
    overflow: 'auto'
  },
  searchInput: {
    padding: 6,
    fontSize: 18,
    flexGrow: 2
  }
});