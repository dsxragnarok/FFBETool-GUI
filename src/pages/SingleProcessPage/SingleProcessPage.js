import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import uniq from 'lodash/uniq';
import Image from '../../components/Image';

// We want to require electron during runtime from the nodejs environment provided at the runtime
// rather than the nodejs environment used during compilation by webpack. By default, globals are
// bound to window and webpack compilation ignores the window global
const {ipcRenderer} = window.require('electron');

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
  },
  outputContainer: {
    overflow: 'hidden',
    position: 'relative'
  },
  outputLabel: {
    marginRight: 10
  },
  outputDirectoryChooser: {
    cursor: 'inherit',
    display: 'block',
    fontSize: '999px',
    filter: 'alpha(opacity=0)',
    minHeight: '100%',
    minWidth: '100%',
    opacity: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    top: 0
  }
}

const defaultOptions = {
    id: -1,                 // {number} the unitId
    animName: '',           // {string} animation name
    columns: 0,             // {number} columns in sheet or strip
    inputPath: '.',         // {string} source file(s) path
    outputPath: '.',        // {string} output path
    includeEmpty: true,    // {boolean} determines whether to include empty frames
    verbose: false,         // {boolean} determines logging verbosity
    saveJson: true,        // {boolean} determines whether to output json file
    outputGif: true,       // {boolean} determines whether to output animated gif
};

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
    cggPath: null,
    cgsPaths: [],
    outputDirectory: null,
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
    const { path, name } = file;


    this.setState({ cggPath: { name, path } });
  }

  addCgsFiles (files) {
    console.log('setCgsFile', files);
    const paths = [
      ...this.state.cgsPaths,
      ...files.map(({ name, path }) => ({ name, path }))
    ];

    this.setState({ cgsPaths: uniq(paths) })
  }

  handleOutputDirectoryChange (event) {
    this.setState({ outputDirectory: event.target.files[0] })
  }

  appendError (message) {
    this.setState({
      error: [...this.state.error, message]
    });
  }

  invokeFFBETool () {
    const [anim] = this.state.cgsPaths;

    const options = {
      ...defaultOptions,
      id: this.state.id,
      inputPath: this.state.animePath,
      outputPath: this.state.outputDirectory,
      animName: anim.name
    };

    ipcRenderer.send('invoke-ffbetool', options);
  }

  render () {
    const { anime, id, cggPath, cgsPaths, outputDirectory } = this.state;

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
            { id > 0 && <p>ID: { id }</p> }
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
            { cggPath && <p>{ cggPath.name }</p> }
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
          <label style={ styles.outputContainer }>
            <span style={ styles.outputLabel }>Save to:</span>
            <TextField
              id="output-directory"
              placeholder={ outputDirectory ? outputDirectory.path : "Choose your output directory" }
              margin="normal"
            />
            <input
              type="file"
              webkitdirectory="webkitdirectory"
              style={ styles.outputDirectoryChooser }
              onChange={this.handleOutputDirectoryChange.bind(this)}
            />
          </label>
          <div style={{ background: '#eee' }}>
          { cgsPaths.length > 0 &&
            cgsPaths.map(({ name}, index) => <li key={index}>{ name }</li>)
          }
          </div>
          <div>
            <RaisedButton
              label="Start"
              style={ styles.button }
              onClick={ this.invokeFFBETool.bind(this) }
            />
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
