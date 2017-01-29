import React, {Component} from 'react';
import {Row, Stack} from 'reactors-grid';
import {Dimensions, Link, StyleSheet, Text} from 'reactors';
import Icon from 'reactors-icons';
import find from 'lodash/find';
import includes from 'lodash/includes';
import {TextInput} from 'reactors-form';

type $props = {};

export default class Rules extends Component {
  state = {query: ''};

  render() {
    const {query} = this.state;
    const {availableRules, rules} = this.props.app;
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
            .filter(availableRule => {
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
                  opacity:
                    find(rules, {name: availableRule.name}) ? 1 : 0.25,
                }}
                >
                <Stack
                  style={{
                    padding: 10,
                  }}
                  >
                  <Icon name="check" />
                </Stack>

                <Stack
                  style={{
                    flexGrow: 2,
                  }}
                  >
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
                      style={{
                        backgroundColor: 'green',
                        flexGrow: 2,
                        padding: 6,
                        textAlign: 'center',
                      }}
                      >
                      Ignore
                    </Text>

                    <Text
                      style={{
                        backgroundColor: 'orange',
                        flexGrow: 2,
                        padding: 6,
                        textAlign: 'center',
                      }}
                      >
                      Warning
                    </Text>

                    <Text
                      style={{
                        backgroundColor: 'red',
                        flexGrow: 2,
                        padding: 6,
                        textAlign: 'center',
                      }}
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
});
