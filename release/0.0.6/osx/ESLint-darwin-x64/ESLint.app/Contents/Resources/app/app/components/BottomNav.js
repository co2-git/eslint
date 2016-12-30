import React from 'react';
import {Row, Stack} from 'reactors-grid';
import Icon from 'reactors-icons';
import {StyleSheet, Text} from 'reactors';
import config from '../config';
import _ from 'lodash';

type $props = {};

export default function BottomNav(props: $props) {
  const {rules} = props;

  return (
    <Row style={styles.container}>
      <Stack style={styles.tab}>
        <Icon name="sliders" style={styles.icon} />
        <Text style={styles.label}>
          Rules
          ({_.keys(rules).length})
        </Text>
      </Stack>

      <Stack style={styles.tab}>
        <Icon name="puzzle-piece" style={styles.icon} />
        <Text style={styles.label}>Plugins</Text>
      </Stack>

      <Stack style={styles.tab}>
        <Icon name="cog" style={styles.icon} />
        <Text style={styles.label}>Config</Text>
      </Stack>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTop: `2px solid ${config.color}`,
    padding: 10,
    backgroundColor: '#eee',
    paddingLeft: 40,
    paddingRight: 40,
  },
  icon: {
    fontSize: 26,
    color: config.color,
    padding: 8,
  },
  label: {
    fontSize: 12,
    color: config.color,
  },
  tab: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});
