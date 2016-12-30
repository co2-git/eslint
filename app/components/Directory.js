import React from 'react';
import {StyleSheet, Text} from 'reactors';
import Icon from 'reactors-icons';
import {Row, Stack} from 'reactors-grid';
import {Button, TextInput} from 'reactors-form';
import {remote} from 'electron';
import path from 'path';

const {dialog} = remote;

export default function Directory(props) {
  const {directory, updateDirectory} = props;

  const handler = () => {
    dialog.showOpenDialog(
      {
        properties: [
          'openDirectory',
          'createDirectory',
          'showHiddenFiles',
        ],
      },
      (filePaths = []) => {
        filePaths.length && updateDirectory(filePaths[0]);
      },
    );
  };

  return (
    <Stack>
      <Text style={styles.title}>{path.basename(directory)}</Text>
      <Row>
        <Icon
          name="folder"
          style={styles.icon}
          onPress={handler}
          />

        <TextInput
          value={directory}
          onChange={(directory) => updateDirectory(directory)}
          style={styles.input}
          placeholder="<-- Click on folder icon"
          />
      </Row>
    </Stack>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#4B32C3',
    fontSize: 44,
    padding: 10,
  },
  icon: {
    color: '#4B32C3',
    fontSize: 28,
    padding: 10,
  },
  input: {
    padding: 6,
    fontSize: 16,
    flexGrow: 2,
    color: '#4B32C3',
    borderWidth: 0,
  },
});
