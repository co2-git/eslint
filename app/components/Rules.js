import React from 'react';
import {Row, Stack} from 'reactors-grid';
import {Text} from 'reactors';
import _ from 'lodash';
import AddRule from './AddRule';

type $props = {};

export default function Rules(props: $props) {
  return (
    <Stack style={{margin: 10}}>
      <Text style={{fontSize: 24, marginBottom: 10}}>
        {_.keys(props.app.rules).length} Rule(s)
      </Text>

      <AddRule directory={props.app.directory} />

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
