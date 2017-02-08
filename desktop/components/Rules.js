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

var _underscoreSwitch = require('underscore-switch');

var _underscoreSwitch2 = _interopRequireDefault(_underscoreSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function findColor(rule, level) {
  if (typeof rule === 'number') {
    return (0, _underscoreSwitch2.default)(rule.toString(), {
      [0]: level === 0 ? 'green' : 'gray',
      [1]: level === 1 ? 'orange' : 'gray',
      [2]: level === 2 ? 'red' : 'gray'
    });
  }
  return 'gray';
}

class Rules extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = { query: '' }, _temp;
  }

  render() {
    var _this = this;

    const query = this.state.query;
    var _props$app = this.props.app;
    const availableRules = _props$app.availableRules;
    const rules = _props$app.rules;
    // console.log({availableRules});

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
              opacity: availableRule.name in rules ? 1 : 0.25
            }
          },
          _react2.default.createElement(
            _reactorsGrid.Stack,
            { style: { padding: 10 } },
            _react2.default.createElement(_reactorsIcons2.default, {
              name: 'check',
              onPress: _asyncToGenerator(function* () {
                try {
                  if (availableRule.name in rules) {
                    yield _this.props.removeRule(availableRule.name);
                  } else {
                    yield _this.props.addRule(availableRule);
                  }
                } catch (error) {
                  console.log(error.stack);
                }
              })
            })
          ),
          _react2.default.createElement(
            _reactorsGrid.Stack,
            { style: { flexGrow: 2 } },
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
                  onPress: () => {
                    this.props.changeRule(availableRule.name, 0);
                  },
                  style: [styles.button, {
                    backgroundColor: findColor(rules[availableRule.name], 0)
                  }]
                },
                'Off'
              ),
              _react2.default.createElement(
                _reactors.Text,
                {
                  onPress: () => {
                    this.props.changeRule(availableRule.name, 1);
                  },
                  style: [styles.button, { backgroundColor: findColor(rules[availableRule.name], 1) }]
                },
                'Warn'
              ),
              _react2.default.createElement(
                _reactors.Text,
                {
                  onPress: () => {
                    this.props.changeRule(availableRule.name, 2);
                  },
                  style: [styles.button, {
                    backgroundColor: findColor(rules[availableRule.name], 2)
                  }]
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
  },
  rule: {
    margin: 2,
    padding: 10,
    borderBottom: '1px solid #ccc',
    flexShrink: 0
  },
  button: {
    flexGrow: 2,
    padding: 6,
    textAlign: 'center',
    color: 'white',
    cursor: 'pointer'
  }
});