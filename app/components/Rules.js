import React, {Component} from 'react';
import {Row, Stack} from 'reactors-grid';
import {Dimensions, Link, StyleSheet, Text} from 'reactors';
import Icon from 'reactors-icons';
import find from 'lodash/find';
import includes from 'lodash/includes';
import {TextInput} from 'reactors-form';
import _switch from 'underscore-switch';

type $props = {};

function findColor(rule, level) {
  if (typeof rule === 'number') {
    return _switch(rule.toString(), {
      [0]: level === 0 ? 'green' : 'gray',
      [1]: level === 1 ? 'orange' : 'gray',
      [2]: level === 2 ? 'red' : 'gray',
    });
  }
  return 'gray';
}

export default class Rules extends Component {
  state = {query: ''};

  render() {
    const {query} = this.state;
    const {availableRules, rules} = this.props.app;
    // console.log({availableRules});
    return (
      <Stack style={styles.container}>
        <Row>
          <TextInput
            onChange={(query) => this.setState({query})}
            placeholder="Search rule"
            style={styles.searchInput}
            value={this.state.query}
            />
        </Row>
        <Stack style={styles.list}>
          {
            availableRules
            .filter((availableRule) => {
              if (query) {
                return includes(availableRule.name, query);
              } else {
                return true;
              }
            })
            .map((availableRule) => (
              <Row
                key={availableRule.name}
                style={{
                  margin: 2,
                  padding: 10,
                  borderBottom: '1px solid #ccc',
                  flexShrink: 0,
                  opacity: (availableRule.name in rules) ? 1 : 0.25,
                }}
                >
                <Stack style={{padding: 10}}>
                  <Icon
                    name="check"
                    onPress={async () => {
                      try {
                        if ((availableRule.name in rules)) {
                          await this.props.removeRule(availableRule.name);
                        } else {
                          await this.props.addRule(availableRule);
                        }
                      } catch (error) {
                        console.log(error.stack);
                      }
                    }}
                    />
                </Stack>

                <Stack style={{flexGrow: 2}}>
                  <Link
                    href={`http://eslint.org/docs/rules/${availableRule.name}`}
                    target="_blank"
                    style={{fontWeight: 'bold'}}
                    >
                    {availableRule.name}
                  </Link>

                  <Text style={{color: '#999'}}>{availableRule.description}</Text>

                  <Row>
                    <Text
                      onPress={() => {
                        this.props.changeRule(availableRule.name, 0);
                      }}
                      style={[
                        styles.button,
                        {
                          backgroundColor: findColor(
                            rules[availableRule.name],
                            0,
                          ),
                        },
                      ]}
                      >
                      Off
                    </Text>

                    <Text
                      onPress={() => {
                        this.props.changeRule(availableRule.name, 1);
                      }}
                      style={[
                        styles.button,
                        {backgroundColor: findColor(rules[availableRule.name], 1)},
                      ]}
                      >
                      Warn
                    </Text>

                    <Text
                      onPress={() => {
                        this.props.changeRule(availableRule.name, 2);
                      }}
                      style={[
                        styles.button,
                        {
                          backgroundColor: findColor(
                            rules[availableRule.name],
                            2,
                          ),
                        },
                      ]}
                      >
                      Error
                    </Text>
                  </Row>
                </Stack>
              </Row>
            ))
          }
        </Stack>
      </Stack>
    );
  }
}

const styles = new StyleSheet({
  container: {
  },
  list: {
    height: Dimensions.get('window').height - 150,
    overflow: 'auto',
  },
  searchInput: {
    padding: 6,
    fontSize: 18,
    flexGrow: 2,
  },
  rule: {
    margin: 2,
    padding: 10,
    borderBottom: '1px solid #ccc',
    flexShrink: 0,
  },
  button: {
    flexGrow: 2,
    padding: 6,
    textAlign: 'center',
    color: 'white',
    cursor: 'pointer',
  },
});
