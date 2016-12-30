import React, {Component} from 'react';
import {Row} from 'reactors-grid';
import {Button, TextInput} from 'reactors-form';
import Icon from 'reactors-icons';
import Queue from '../tools/Queue';
import updateRC from '../tools/updateRC';

export default class AddPlugin extends Component {
  state = {value: ''};

  render() {
    return (
      <Row>
        <TextInput
          style={{
            padding: 10,
            flexGrow: 2,
            fontSize: 16,
          }}
          placeholder="Plugin name"
          value={this.state.value}
          onChange={(value) => this.setState({value})}
          />
        <Button
          onPress={() => {
            Queue.push(() => updateRC(this.props.directory, (rc) => {
              const {value} = this.state;
              if (!Array.isArray(rc.plugins)) {
                rc.plugins = [];
              }
              rc.plugins.push(value);
              this.setState({value: ''})
            }));
          }}
          >
          <Icon name="plus" style={{fontSize: 16, margin: 3}} />
        </Button>
      </Row>
    );
  }
}
