import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import List, { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import AnimeSheetPreview from './Preview';

// We want to require electron during runtime from the nodejs environment provided at the runtime
// rather than the nodejs environment used during compilation by webpack. By default, globals are
// bound to window and webpack compilation ignores the window global
const {ipcRenderer} = window.require('electron');

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr minmax(400px, 2fr)',
    gridGap: '1em',
    margin: '1em'
  },
  dropZone: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    border: '1px solid black',
    margin: '0.5em 0',
    textAlign: 'center'
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
    cursor: 'pointer',
    display: 'block',
    filter: 'alpha(opacity=0)',
    minHeight: '100%',
    minWidth: '100%',
    opacity: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    top: 0,
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
    removedAnimations: [],
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

  addAnim (anim) {
    const { removedAnimations } = this.state;
    const index = removedAnimations.indexOf(anim);

    console.log('[addAnim]', anim);
    if (index < 0) {
      return;
    }

    this.setState({
      removedAnimations: [
        ...removedAnimations.slice(0, index),
        ...removedAnimations.slice(index + 1)
      ],
    });
  }

  removeAnim (anim) {
    const { removedAnimations } = this.state;
    console.log('[removeAnim]', anim);

    this.setState({ removedAnimations: [...removedAnimations, anim] });
  }

  renderAnimationsList (animations, removedAnimations, addAnim, removeAnim) {
    return animations.map((anim, index) => {
      return <ListItem
        key={`${index}-${anim}`}
        leftCheckbox={
          removedAnimations.includes(anim) ?
          <Checkbox checked={false} onCheck={() => addAnim(anim)} /> :
          <Checkbox checked={true} onCheck={() => removeAnim(anim)} />
        }
      >
        {anim}
      </ListItem>;
    });
  }

  invokeFFBETool () {
    const {
      id,
      animations,
      removedAnimations,
      inputPath,
      outputPath: {
        path: outputPath
      } = {}
    } = this.state

    const options = {
      ...defaultOptions,
      id,
      inputPath,
      outputPath
    };

    const message = {
      options,
      animations: removedAnimations.length === 0 ? null : animations.filter((name) => !removedAnimations.includes(name))
    }

    console.log('--[invokeFFBETool]--', this.state.anime);

    ipcRenderer.send('invoke-ffbetool', message);
  }

  render () {
    const { anime, id, animations, removedAnimations, inputPath, outputPath } = this.state;

    return (
      <div style={ styles.grid }>
        <div>
          <TextField
            floatingLabelText="Unit ID"
            floatingLabelFixed={false}
            disabled={false}
            style={{ marginRight: 5, width: '17%' }}
            value={ id > 0 ? id : '' }
          />
          <TextField
            floatingLabelText="Input Path: "
            floatingLabelFixed={false}
            disabled={false}
            style={{ marginLeft: 5, width: '80%'}}
            value={ inputPath || '' }
          />
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
            <p>Drag & Drop the anime file here</p>
            <RaisedButton label="SELECT ANIME" style={ styles.button } />
          </Dropzone>
          <label style={ styles.outputContainer }>
            <TextField
              id="output-directory"
              floatingLabelText="Output Path"
              value={ outputPath ? outputPath.path : '' }
              margin="normal"
              style={{ width: '80%' }}
            />
            <input
              type="file"
              webkitdirectory="webkitdirectory"
              style={ styles.outputPathChooser }
              onChange={this.handleOutputPathChange.bind(this)}
            />
            <RaisedButton
              label="Start"
              style={ styles.button }
              onClick={ this.invokeFFBETool.bind(this) }
            />
          </label>
          { (animations.length > 0 || removedAnimations.length > 0) &&
            <List>{ this.renderAnimationsList(animations, removedAnimations, this.addAnim.bind(this), this.removeAnim.bind(this)) }</List>
          }
        </div>
        <AnimeSheetPreview source={ anime && anime.preview } />
      </div>
    );
  }
}
