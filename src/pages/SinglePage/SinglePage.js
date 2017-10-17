import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';

const dropZoneStyles = {
  width: '100%',
  backgroundColor: '#F5F5F5',
  border: '1px solid black',
  margin: '0.5em 0'
};

const dropZoneBtnStyles = {
  margin: 10
};

export default class SinglePage extends Component {
  static displayName = 'SinglePage'
  static defaultProps = {}
  static propTypes = {}

  state = {
    anime: null
  }

  setAnimeFile ([file], event) {
    console.log('setAnimeFile', file);

    const img = new Image();
    img.src = file.preview;
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      this.setState({ anime: { ...file, width, height } });
    }
  }

  render () {
    return (
      <div style={ { display: 'flex', flexDirection: 'row' } }>
        <div style={ { display: 'flex', flex: '1 0 auto', flexDirection: 'column', width: '50%', padding: 10 } }>
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
        <div style={{ display: 'flex', flex: '1 0 auto', outline: '2px solid #ccc' }}>
          { this.state.anime &&
            <img src={ this.state.anime.preview } alt="Anime Preview" style={{ width: this.state.anime.width, height: this.state.anime.height }} />
          }
        </div>
      </div>
    );
  }
}
