import React from 'react';
import {Row, Stack} from 'reactors-grid';
import {Text} from 'reactors';
import _ from 'lodash';

type $props = {};

export default function Rules(props: $props) {
  return (
    <Stack style={{margin: 10}}>
      {
        props.app.availableRules.map((availableRule) => (
          <Row key={availableRule.name} style={{
              margin: 2,
              padding: 10,
              borderBottom: '1px solid #ccc',
            }}>

            <Stack>
              <Text style={{fontWeight: 'bold'}}>{availableRule.name}</Text>
              <Text style={{color: '#999'}}>{availableRule.description}</Text>
            </Stack>
          </Row>
        ))
      }
    </Stack>
  );
}
