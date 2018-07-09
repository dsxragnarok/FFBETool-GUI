import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import uniq from 'lodash/uniq';
import Image from '../../components/Image';

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr minmax(400px, 2fr)',
    gridGap: '1em'
  },
  animeSheetContainer: { outline: '2px solid #ccc' },
  animeSheetContent: {
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },
  dropZone: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    border: '1px solid black',
    margin: '0.5em 0'
  },
  button: {
    margin: 10
  }
}

function getIdFromFileName (filename) {
  return filename.split('_').slice(-1);
}

export default class SingleProcessPage extends Component {
  static displayName = 'SingleProcessPage'
  static defaultProps = {}
  static propTypes = {}

  state = {
    anime: null,
    id: 0,
    animePath: '',
    cggPath: '',
    cgsPaths: [],
    loading: false,
    error: [],
  }

  setAnimeFile ([file]) {
    console.log('setAnimeFile', file);
    const { name, path: animePath } = file;
    const id = parseInt(getIdFromFileName(name), 10);

    this.setState({
      id,
      animePath,
      anime: { ...file },
    });
  }

  setCggFile ([file]) {
    console.log('setCggFile', file);
    const { path: cggPath } = file;

    this.setState({ cggPath });
  }

  addCgsFiles (files) {
    console.log('setCgsFile', files);
    const paths = [
      ...this.state.cgsPaths,
      ...files.map(({ name, path }) => ({ name, path }))
    ];

    this.setState({ cgsPaths: uniq(paths) })
  }

  appendError (message) {
    this.setState({
      error: [...this.state.error, message]
    });
  }

  render () {
    const { cgsPaths, anime } = this.state;

    return (
      <div style={ styles.grid }>
        <div style={{}}>
          <Dropzone
            name="select-anime"
            accept="image/png"
            multiple={ false }
            style={ styles.dropZone }
            onDropAccepted={ this.setAnimeFile.bind(this) }
            onDropRejected={ () =>
              this.appendError('Error: Incorrect file. Expected PNG file.')
            }
          >
            <p>Drag & Drop the anime file here</p>
            <RaisedButton label="SELECT ANIME" style={ styles.button } />
          </Dropzone>
          <Dropzone
            name="select-cgg"
            accept="text/csv"
            multiple={ false }
            style={ styles.dropZone }
            onDropAccepted={ this.setCggFile.bind(this) }
            onDropRejected={ () =>
              this.appendError('Error: Incorrect file. Expected a CSV file.')
            }
          >
            <p>Drag & Drop the cgg file here</p>
            <RaisedButton label="SELECT CGG" style={ styles.button } />
          </Dropzone>
          <Dropzone
            name="select-cgs"
            accept="text/csv"
            style={ styles.dropZone }
            onDropAccepted={ this.addCgsFiles.bind(this) }
            onDropRejected={ () =>
              this.appendError('Error: Incorrect file. Expected a CSV file.')
            }
          >
            <p>Drag & Drop the cgs files here</p>
            <RaisedButton label="SELECT CGS" style={ styles.button } />
          </Dropzone>
          <div style={{ background: '#eee' }}>
          { cgsPaths.length > 0 &&
            cgsPaths.map(({ name }) => <li>{ name }</li>)
          }
          </div>
        </div>
        <div style={ styles.animeSheetContainer }>
          <div style={ styles.animeSheetContent }>
            <div>{ anime && <Image source={ anime.preview } /> }</div>
          </div>
        </div>
      </div>
    );
  }
}
