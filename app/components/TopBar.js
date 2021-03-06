import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'reactors';
import Icon from 'reactors-icons';
import {Row} from 'reactors-grid';
import FileDialog from 'reactors-file-dialog';
import {version} from '../../package.json';

type $props = {};

export default function TopBar(props: $props) {
  return (
    <Row style={styles.header}>
      <Row style={{justifyContent: 'flex-start'}}>
        <Text style={[styles.title, {fontWeight: 'bold', paddingRight: 5}]}>eslint</Text>
        <Text style={styles.title}>v{version}</Text>
        {
          props.app.availableRules.length > 1 &&
          <FileDialog
            color="white"
            directory={props.app.directory}
            onChange={(directory) => props.setAppState({directory})}
            />
        }
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
