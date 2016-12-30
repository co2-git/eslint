import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Link,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'reactors';
import Icon from 'reactors-icons';
import {Row, Stack} from 'reactors-grid';
import {Button, TextInput} from 'reactors-form';
import {remote} from 'electron';
import {createReadStream, createWriteStream, stat} from 'fs';
import path from 'path';
import _ from 'lodash';

import readRC from './tools/readRC';

import TopBar from './components/TopBar';
import Directory from './components/Directory';
import BottomNav from './components/BottomNav';
import Parser from './components/Parser';
import _switch from './tools/_switch';
import Queue from './tools/Queue';

import config from './config';

const {dialog} = remote;

Icon.href =
  'node_modules/reactors-icons/assets/font-awesome/css/font-awesome.min.css';

export default class App extends Component {
  state = {
    directory: '',
    hasRC: false,
    rules: {},
    parser: '',
    view: 'config',
    parserOptions: config.parserOptions,
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextState.directory !== this.state.directory) {
      nextState.hasRC = true;
      const {directory} = nextState;
      this.changeDirectory(directory);
    }
  }

  changeDirectory(directory) {
    stat(path.join(directory, '.eslintrc.json'), (error) => {
      if (error) {
        this.setState({hasRC: false});
      } else {
        this.readRC(directory);
      }
    });
  }

  async readRC(directory) {
    const {parser, parserOptions, rules} = await readRC(directory);
    this.setState({parser, parserOptions, rules});
  }

  init() {
    Queue.push(() => {
      const {directory} = this.state;

      const initial = {
        ..._.pick(config, ['parser', 'parserOptions']),
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
        <TopBar
          app={this.state}
          />

        <Directory
          directory={directory}
          updateDirectory={(directory) => this.setState({directory})}
          />

        <View style={{flexGrow: 2}}>
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
                <Row>
                  <Text>Rules ({_.keys(rules).length})</Text>
                </Row>
              ),

              config: (<Parser app={this.state} />),
            })
          )}
        </View>

        <BottomNav
          rules={rules}
          />
      </Stack>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column',
  }
});
