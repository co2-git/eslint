import React, {Component} from 'react';
import {Row, Stack} from 'reactors-grid';
import {Dropdown, TextInput} from 'reactors-form';
import {Text} from 'reactors';
import _ from 'lodash';
import updateRC from '../tools/updateRC';
import Queue from '../tools/Queue';
import config from '../config';
import Entry from './Entry';

type $props = {};

type $state = {};

export default class Parser extends Component {
  props: $props;

  set(fn) {
    Queue.push(() => updateRC(this.props.app.directory, fn));
  }

  render() {
    console.info(this);
    return (
      <Stack>
        <Entry
          label="Parser"
          data={[
            ...config.parsers,
            {label: 'Other', key: '*'},
          ]}
          value={this.props.app.parser}
          update={(parser) => this.set((rc) => {
            rc.parser = parser;
          })}
          />

        <Entry
          label="ECMA version"
          data={[
            ...config.ecmaVersions,
            {label: 'Other', key: '*'},
          ]}
          value={this.props.app.parserOptions.ecmaVersion}
          update={(ecmaVersion) => this.set((rc) => {
            rc.parserOptions.ecmaVersion = ecmaVersion;
          })}
          />

        <Entry
          label="Source Type"
          data={[
            {key: 'module', label: 'Module'},
            {key: 'script', label: 'Script'},
          ]}
          value={this.props.app.parserOptions.sourceType}
          update={(sourceType) => this.set((rc) => {
            rc.parserOptions.sourceType = sourceType;
          })}
          />

        {
          [
            {
              label: 'Global return',
              key: 'globalReturn',
            },
            {
              label: 'Strict implied',
              key: 'impliedStrict',
            },
            {
              label: 'JSX',
              key: 'jsx',
            },
          ]
          .map((ecmaFeature) => (
            <Entry
              key={ecmaFeature.key}
              label={ecmaFeature.label}
              data={[
                {key: true, label: 'Enabled'},
                {key: false, label: 'Disabled'},
              ]}
              value={this.props.app.parserOptions.ecmaFeatures[ecmaFeature.key]}
              update={(value) => this.set((rc) => {
                rc.parserOptions.ecmaFeatures[ecmaFeature.key] = value;
              })}
              />
          ))
        }
      </Stack>
    );
  }
}
