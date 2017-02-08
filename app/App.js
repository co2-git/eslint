import _switch from 'underscore-switch';
import {Dimensions, StyleSheet, Text, View} from 'reactors';
import {Stack} from 'reactors-grid';
import {stat} from 'fs';
import BottomNav from './components/BottomNav';
import fetchRules from './actions/fetchRules';
import Parser from './components/Parser';
import path from 'path';
import Plugins from './components/Plugins';
import Queue from './tools/Queue';
import React, {Component} from 'react';
import readRC from './tools/readRC';
import Rules from './components/Rules';
import TopBar from './components/TopBar';
import updateRC from './tools/updateRC';
import omit from 'lodash/omit';

export default class App extends Component {
  state = {
    availableRules: [],
    directory: this.props.directory || path.dirname(__dirname),
    hasRC: true,
    plugins: [],
    rules: [],
    view: 'rules',
  };

  componentDidMount() {
    if (this.state.directory) {
      this.changeDirectory(this.state.directory);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.directory !== this.state.directory) {
      this.changeDirectory(this.state.directory);
    }
  }

  fetchRules(directory) {
    return new Promise(async (resolve, reject) => {
      try {
        this.setState({availableRules: await fetchRules(directory)}, resolve);
      } catch (error) {
        console.log(error.stack);
        reject(error);
      }
    });
  }

  changeDirectory(directory) {
    const file = path.join(directory, '.eslintrc.json');

    stat(file, (error) => {
      if (error) {
        this.setState({hasRC: false});
      } else {
        this.readRC(directory);
      }
    });
  }

  readRC(directory) {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          parser,
          parserOptions,
          rules,
          plugins = [],
        } = await readRC(directory);

        this.setState(
          {parser, parserOptions, rules, plugins},
          () => {
            this.fetchRules(directory);
          },
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  addRule(rule) {
    return new Promise(async (resolve, reject) => {
      try {
        await updateRC(this.state.directory, (rc) => {
          rc.rules[rule.name] = 0;
        });
        this.setState({rules: {
          ...this.state.rules,
          [rule.name]: 0,
        }}, resolve);
      } catch (error) {
        reject(error);
      }
    });
  }

  changeRule(ruleName, ruleLevel) {
    return new Promise(async (resolve, reject) => {
      try {
        await updateRC(this.state.directory, (rc) => {
          rc.rules[ruleName] = ruleLevel;
        });
        this.setState({rules: {
          ...this.state.rules,
          [ruleName]: ruleLevel,
        }}, resolve);
      } catch (error) {
        reject(error);
      }
    });
  }

  removeRule(ruleName) {
    return new Promise(async (resolve, reject) => {
      try {
        await updateRC(this.state.directory, (rc) => {
          delete rc.rules[ruleName];
        });
        this.setState({rules: omit(this.state.rules, [ruleName])}, resolve);
      } catch (error) {
        reject(error);
      }
    });
  }

  render() {
    return (
      <Stack style={styles.container}>
        <View style={{flexShrink: 1}}>
          <TopBar
            app={this.state}
            setAppState={(partial) => this.setState(partial)}
            />
        </View>

        <View style={styles.main}>
          {
            !this.state.availableRules.length &&
            <Text style={styles.fetching}>Fetching rules</Text>
          }
          {
            this.state.availableRules.length > 0 &&
            _switch(this.state.view, {
              rules: (
                <Rules
                  app={this.state}
                  addRule={this.addRule.bind(this)}
                  changeRule={this.changeRule.bind(this)}
                  removeRule={this.removeRule.bind(this)}
                  />
              ),

              plugins: (
                <Plugins app={this.state} />
              ),

              config: (
                <Parser app={this.state} />
              ),
            })
          }
        </View>

        {
          this.state.hasRC &&
          <View style={{flexShrink: 1}}>
            <BottomNav
              app={this.state}
              switchView={(view) => {
                this.setState({view});
              }}
              />
          </View>
        }
      </Stack>
    );
  }
}

const styles = new StyleSheet({
  container: {
    height: Dimensions.get('window').height,
  },
  main: {
    flexGrow: 2,
    overflow: 'auto',
  },
  fetching: {
    height: Dimensions.get('window').height - 160,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
