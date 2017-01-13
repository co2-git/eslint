import React, {Component} from 'react';
import {remote} from 'electron';
import {
  Dimensions,
  Image,
  Link,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'reactors';
import {Row, Stack} from 'reactors-grid';
import {Button, TextInput} from 'reactors-form';
import {createWriteStream, readdir, stat, watch} from 'fs';
import path from 'path';
import _ from 'lodash';
import FileDialog from 'reactors-file-dialog';

import readRC from './tools/readRC';

import TopBar from './components/TopBar';
import Directory from './components/Directory';
import BottomNav from './components/BottomNav';
import Parser from './components/Parser';
import Plugins from './components/Plugins';
import Rules from './components/Rules';

import _switch from './tools/_switch';
import Queue from './tools/Queue';

import config from './config';


// console.info(remote.process.argv);
// const [, directory] = remote.process.argv;

export default class App extends Component {
  watcher;

  state = {
    directory: this.props.directory || path.dirname(__dirname),
    hasRC: true,
    rules: {},
    parser: '',
    view: 'rules',
    parserOptions: config.parserOptions,
    plugins: [],
    availableRules: [],
  };

  componentDidMount() {
    if (this.state.directory) {
      this.changeDirectory(this.state.directory);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.directory !== this.state.directory) {
      nextState.hasRC = true;
      const {directory} = nextState;
      this.changeDirectory(directory);
    }
  }

  changeDirectory(directory) {
    if (this.watcher) {
      this.watcher.close();
    }

    const file = path.join(directory, '.eslintrc.json');

    stat(file, (error) => {
      if (error) {
        this.setState({hasRC: false});
      } else {
        this.readRC(directory);
        this.watcher = watch(file, (eventType, filename) => {
          this.readRC(directory);
        });
      }
    });
  }

  async readRC(directory) {
    const {parser, parserOptions, rules, plugins = []} = await readRC(directory);
    this.setState({parser, parserOptions, rules, plugins}, async () => {
      const pathToRules = path.join(
        directory,
        'node_modules',
        'eslint',
        'lib',
        'rules',
      );
      readdir(pathToRules, (error, files) => {
        if (error) {
          console.log(error.stack);
        } else {
          const availableRules = files.filter((file) => !/^\./.test(file));

          Queue.push(
            ...availableRules.map((rule) => () =>
              new Promise(async (resolve, reject) => {
                try {
                  const ruleDef = require(path.join(pathToRules, rule));
                  this.setState({
                    availableRules: this.state.availableRules.map(
                      (availableRule) => ({
                        ...availableRule,
                        description:
                          availableRule.name === rule.replace(/\.js$/, '')
                          ? ruleDef.meta.docs.description
                          : availableRule.description,
                      }),
                    ),
                  }, resolve);
                } catch (error) {
                  console.log(error.stack);
                  reject(error);
                }
              })),
          );

          this.setState({
            availableRules: _.uniqBy([
              ...this.state.availableRules,
              ...availableRules.map((file) => ({
                  name: file.replace(/\.js$/, ''),
                  description: 'Fetching description in local libs',
                })),
            ], 'name'),
          });
        }
      });
    });
  }

  init() {
    Queue.push(() => {
      const {directory} = this.state;

      const initial = {
        ..._.pick(config, ['parser', 'parserOptions']),
        plugins: [],
        rules: {},
      };

      const write = createWriteStream(path.join(directory, '.eslintrc.json'));

      write
        .on('error', (error) => console.log(error.stack))
        .on('finish', () => {
          this.setState({hasRC: true}, () => this.readRC(directory));
        });

      write.write(JSON.stringify(initial, null, 2));

      write.end();
    });
  }

  render() {
    const {directory, hasRC, rules, view} = this.state;

    return (
      <Stack style={styles.container}>
        <View style={{flexShrink: 1}}>
          <TopBar
            app={this.state}
            />
        </View>

        <View style={{flexShrink: 1}}>
          <FileDialog
            directory={this.state.directory}
            onChange={(directory) => this.setState({directory})}
            />
        </View>

        <View style={styles.main}>
          {directory && !hasRC && (
            <View>
              <Button onPress={() => this.init()}>
                Init
              </Button>
            </View>
          )}

          {directory && hasRC && (
            _switch(view, {
              rules: (
                <Rules app={this.state} />
              ),

              plugins: (
                <Plugins app={this.state} />
              ),

              config: (
                <Parser app={this.state} />
              ),
            })
          )}
        </View>

        <View>
          <BottomNav
            app={this.state}
            switchView={(view) => {
              this.setState({view});
            }}
            />
        </View>
      </Stack>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  main: {
    flexGrow: 2,
    overflow: 'auto',
  },
});
