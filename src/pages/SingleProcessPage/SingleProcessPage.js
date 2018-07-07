import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import Image from '../../components/Image';

const dropZoneStyles = {
  width: '100%',
  backgroundColor: '#F5F5F5',
  border: '1px solid black',
  margin: '0.5em 0'
};

const dropZoneBtnStyles = {
  margin: 10
};

export default class SingleProcessPage extends Component {
  static displayName = 'SingleProcessPage'
  static defaultProps = {}
  static propTypes = {}

  state = {
    anime: null
  }

  setAnimeFile ([file], event) {
    console.log('setAnimeFile', file);
    this.setState({ anime: { ...file } });
  }

  render () {
    return (
      <div style={ { display: 'flex', flexDirection: 'row' } }>
        <div style={ { display: 'flex', flex: '1 0 auto', flexDirection: 'column', padding: 10 } }>
          <Dropzone
            name="select-anime"
            accept="image/png"
            multiple={ false }
            style={ dropZoneStyles }
            onDropAccepted={ this.setAnimeFile.bind(this) }
          >
            <p>Drag & Drop the anime file here</p>
            <RaisedButton label="SELECT ANIME" style={ dropZoneBtnStyles } />
          </Dropzone>
          <Dropzone
            name="select-cgg"
            accept="text/csv"
            multiple={ false }
            style={ dropZoneStyles }
          >
            <p>Drag & Drop the cgg file here</p>
            <RaisedButton label="SELECT CGG" style={ dropZoneBtnStyles } />
          </Dropzone>
          <Dropzone
            name="select-cgs"
            accept="text/csv"
            style={ dropZoneStyles }
          >
            <p>Drag & Drop the cgs files here</p>
            <RaisedButton label="SELECT CGS" style={ dropZoneBtnStyles } />
          </Dropzone>
        </div>
        <div style={{ display: 'flex', flex: '3 0 auto', outline: '2px solid #ccc', margin: 10 }}>
          <div style={{ width: 800, height: 400, margin: 'auto', overflow: 'auto' }}>
          { this.state.anime && <Image source={ this.state.anime.preview } /> }
          </div>
        </div>
      </div>
    );
  }
}
