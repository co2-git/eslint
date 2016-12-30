import React from 'react';
import {Row, Stack} from 'reactors-grid';
import {Text} from 'reactors';
import {Button} from 'reactors-form';
import Icon from 'reactors-icons';
import _ from 'lodash';
import AddPlugin from './AddPlugin';
import Queue from '../tools/Queue';
import updateRC from '../tools/updateRC';

type $props = {};

export default function Plugins(props: $props) {
  return (
    <Stack style={{margin: 10}}>
      <Text style={{fontSize: 24, marginBottom: 10}}>
        {props.app.plugins.length} Plugin(s)
      </Text>

      <AddPlugin directory={props.app.directory} />

      {
        props.app.plugins.map((plugin) => (
          <Row key={plugin} style={{
              border: '1px solid #ccc',
            }}>
            <Text style={{
                fontSize: 16, padding: 10,
              }}>{plugin}</Text>
            <Button style={{
                fontSize: 16, padding: 10,
              }} onPress={() => {
                Queue.push(() => updateRC(props.app.directory, (rc) => {
                  rc.plugins = _.filter(rc.plugins, plugin);
                }))
              }}>
              <Icon name="times" />
            </Button>
          </Row>
        ))
      }
    </Stack>
  );
}
