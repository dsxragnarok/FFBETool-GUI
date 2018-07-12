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
  outputPathChooser: {
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

function getPathFromFilePath (filepath) {
  return filepath.substring(0, filepath.lastIndexOf('/'));
}

export default class SingleProcessPage extends Component {
  static displayName = 'SingleProcessPage'
  static defaultProps = {}
  static propTypes = {}

  state = {
    anime: null,
    id: 0,
    animePath: '',
    cgsPaths: [],
    animations: [],
    inputPath: null,
    outputPath: null,
    loading: false,
    error: [],
  }

  handleAcceptedAnimeFile ([file]) {
    console.log('[handleAcceptedAnimeFile]', file);
    const { name, path: animePath } = file;
    const id = parseInt(getIdFromFileName(name), 10);
    const inputPath = getPathFromFilePath(animePath);

    this.retrieveAnimationNames(id, inputPath);

    this.setState({
      id,
      animePath,
      inputPath,
      anime: { ...file }
    });
  }

  retrieveAnimationNames (id, path) {
    ipcRenderer.send('retrieve-animNames', { id, path });
    ipcRenderer.once('acquired-animNames', (event, { animations }) => {
      console.log('[acquired-aninNames]', animations);

      this.setState({ animations });
    });
  }

  handleOutputPathChange (event) {
    this.setState({ outputPath: event.target.files[0] })
  }

  appendError (message) {
    this.setState({
      error: [...this.state.error, message]
    });
  }

  invokeFFBETool () {
    const {
      id,
      cgsPaths: [anim] = [],
      animePath,
      outputPath: {
        path: outputPath
      } = {}
    } = this.state

    // unit_limit_atk_cgs_401001705.csv
    const inputPath = animePath.substring(0, animePath.lastIndexOf('/'));
    const animName = anim.name.substring('unit_'.length, anim.name.indexOf('_cgs'));
    const options = {
      ...defaultOptions,
      id,
      inputPath,
      outputPath,
      animName
    };

    console.log('--[invokeFFBETool]--', this.state.anime);

    ipcRenderer.send('invoke-ffbetool', options);
  }

  render () {
    const { anime, id, cgsPaths, outputPath } = this.state;

    return (
      <div style={ styles.grid }>
        <div style={{}}>
          <Dropzone
            name="select-anime"
            accept="image/png"
            multiple={ false }
            style={ styles.dropZone }
            onDropAccepted={ this.handleAcceptedAnimeFile.bind(this) }
            onDropRejected={ () =>
              this.appendError('Error: Incorrect file. Expected PNG file.')
            }
          >
            { id > 0 && <p>ID: { id }</p> }
            <p>Drag & Drop the anime file here</p>
            <RaisedButton label="SELECT ANIME" style={ styles.button } />
          </Dropzone>
          <label style={ styles.outputContainer }>
            <span style={ styles.outputLabel }>Save to:</span>
            <TextField
              id="output-directory"
              placeholder={ outputPath ? outputPath.path : "Choose your output directory" }
              margin="normal"
            />
            <input
              type="file"
              webkitdirectory="webkitdirectory"
              style={ styles.outputPathChooser }
              onChange={this.handleOutputPathChange.bind(this)}
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
