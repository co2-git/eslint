import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'reactors';
import Icon from 'reactors-icons';
import {Row} from 'reactors-grid';
import {version} from '../../package.json';

type $props = {};

export default function TopBar(props: $props) {
  return (
    <Row style={styles.header}>
      <Row style={{justifyContent: 'flex-start'}}>
        <Text style={[styles.title, {fontWeight: 'bold', paddingRight: 5}]}>eslint</Text>
        <Text style={styles.title}>v{version}</Text>
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4B32C3',
    padding: 8,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});
