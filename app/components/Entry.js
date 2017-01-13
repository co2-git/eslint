import React, {Component} from 'react';
import {Row, Stack} from 'reactors-grid';
import {Text} from 'reactors';
import {Dropdown, TextInput} from 'reactors-form';
import updateRC from '../tools/updateRC';
import Queue from '../tools/Queue';

export default class Entry extends Component {
  throttle;

  state = {
    value: this.props.value,
    other: false,
  };

  componentWillReceiveProps(nextProps: $props) {
    if (nextProps.value !== this.state.value && !this.throttle) {
      this.setState({value: nextProps.value});
    }
  }

  componentWillUpdate(nextProps: $props, nextState: $state) {
    nextState.other = (nextState.value === '*');
  }

  componentDidUpdate(prevProps: $props, prevState: $state) {
    const currentState = this.state;

    if (prevState.value !== currentState.value) {
      if (this.throttle) {
        clearTimeout(this.throttle);
      }
      this.throttle = setTimeout(() => {
        this.props.update(currentState.value);
      }, 500);
    }
  }

  render() {
    return (
      <Stack>
        <Row>
          <Text style={{padding: 10}}>{this.props.label}</Text>

          <Dropdown
            style={{flexGrow: 2, padding: 4}}
            data={this.props.data}
            onChange={(value) => this.setState({value})}
            selected={this.state.value}
            />
        </Row>

        {this.state.other && (
          <TextInput
            style={{
              padding: 10,
            }}
            placeholder={this.props.label}
            value={this.state.value}
            onChange={(value) => this.setState({value})}
            />
        )}
      </Stack>
    );
  }
}
