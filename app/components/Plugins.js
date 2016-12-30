import React from 'react';
import {Row, Stack} from 'reactors-grid';
import {Text} from 'reactors';
import AddPlugin from './AddPlugin';

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
          <Row key={plugin}>
            <Text>{plugin}</Text>
          </Row>
        ))
      }
    </Stack>
  );
}
