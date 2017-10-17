import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';

export default class SinglePage extends Component {
  static displayName = 'SinglePage'
  static defaultProps = {}
  static propTypes = {}

  render () {
    return (
      <div>
        <Dropzone name="select-anime" accept="image/png" multiple={ false }>
          <RaisedButton label="SELECT ANIME" />
        </Dropzone>

        <Dropzone name="select-cgg" accept="text/csv" multiple={ false }>
          <RaisedButton label="SELECT CGG" />
        </Dropzone>

        <Dropzone name="select-cgs" accept="text/csv">
          <RaisedButton label="SELECT CGS" />
        </Dropzone>
      </div>
    );
  }
}
