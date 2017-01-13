import _switch from './tools/_switch';
import {Dimensions, StyleSheet, Text, View} from 'reactors';
import {Stack} from 'reactors-grid';
import BottomNav from './components/BottomNav';
import fetchRules from './actions/fetchRules';
import FileDialog from 'reactors-file-dialog';
import path from 'path';
import Queue from './tools/Queue';
import React, {Component} from 'react';
import Rules from './components/Rules';
import Plugins from './components/Plugins';
import Parser from './components/Parser';
import TopBar from './components/TopBar';
import readRC from './tools/readRC';
import {stat} from 'fs';

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
    // if (this.watcher) {
    //   this.watcher.close();
    // }

    const file = path.join(directory, '.eslintrc.json');

    stat(file, (error) => {
      if (error) {
        this.setState({hasRC: false});
      } else {
        this.readRC(directory);
        // this.watcher = watch(file, (eventType, filename) => {
        //   this.readRC(directory);
        // });
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

  render() {
    return (
      <Stack style={styles.container}>
        <View style={{flexShrink: 1}}>
          <TopBar app={this.state} />
        </View>

        <View style={styles.main}>
          {
            !this.state.availableRules.length &&
            <Text>Fetching rules</Text>
          }
          {
            this.state.availableRules.length &&
            <FileDialog
              directory={this.state.directory}
              onChange={(directory) => this.setState({directory})}
              />
          }
          {
            this.state.availableRules.length &&
            _switch(this.state.view, {
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
});
