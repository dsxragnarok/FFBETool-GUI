import { handleActions } from 'redux-actions';
import uniq from 'lodash/uniq';
import {
  ADD_ANIME_FILE,
  ANIME_FILE_ERROR,
  LOAD_ANIME_FILE,
  REMOVE_ANIME_FILE,
  CGG_FILE_ERROR,
  ADD_CGG_FILE,
  LOAD_CGG_FILE,
  REMOVE_CGG_FILE,
  ADD_CGS_FILE,
  CGS_FILE_ERROR,
  LOAD_CGS_FILE,
  REMOVE_CGS_FILE,
  BATCH_ADD_CGS_FILES,
  CLEAR_CGS_FILES
} from './action-types';

const INITIAL_STATE = {
  id: 0,
  animePath: '',
  cggPath: '',
  cgsPaths: [],
  loading: false,
  error: [],
}

function getIdFromFileName (filename) {
  return filename.split('_').slice(-1);
}

function addAnimeFile (state, { payload: { name, path: animePath } = {} } = {}) {
  const id = parseInt(getIdFromFileName(name), 10);

  return {
    ...state,
    animePath,
    id,
  };
}

function addCgsFile ({ cgsPaths, ...state }, { payload: { path } = {} } = {}) {
  if (cgsPaths.includes(path)) {
    return { ...state, cgsPaths };
  }

  return {
    ...state,
    cgsPaths: cgsPaths.concat(path)
  };
}

export default handleActions({
  [ADD_ANIME_FILE]: addAnimeFile,
  [LOAD_ANIME_FILE]: (state, { payload: loading }) => ({ ...state, loading }),
  [ANIME_FILE_ERROR]: ({ error, ...state }, { payload }) => ({
    ...state,
    error: error.concat(payload)
  }),
  [REMOVE_ANIME_FILE]: (state) => ({ ...state, id: 0, animePath: '' }),

  [ADD_CGG_FILE]: (state, { payload: { path: cggPath } = {} } = {}) => ({ ...state, cggPath }),
  [LOAD_CGG_FILE]: (state, { payload: loading }) => ({ ...state, loading }),
  [CGG_FILE_ERROR]: ({ error, ...state }, { payload }) => ({
    ...state,
    error: error.concat(payload)
  }),
  [REMOVE_CGG_FILE]: (state) => ({ ...state, cggPath: '' }),

  [LOAD_CGS_FILE]: (state, { payload: loading }) => ({ ...state, loading }),
  [ADD_CGS_FILE]: addCgsFile,
  [CGS_FILE_ERROR]: ({ error, ...state }, { payload }) => ({
    ...state,
    error: error.concat(payload)
  }),
  [REMOVE_CGS_FILE]: ({ cgsPaths, ...state }, { payload }) => ({
    ...state,
    cgsPaths: cgsPaths.filter((path) => path !== payload)
  }),
  [BATCH_ADD_CGS_FILES]: ({ cgsPaths, state }, { payload }) => {
    return {
      ...state,
      cgsPaths: uniq(cgsPaths.concat(payload.map(({ path }) => path)))
    };
  },
}, INITIAL_STATE);

/*

```
SingleUnitReducer: {
  id: number,
  animePath: string,
  cggPath: string,
  cgsPaths: arrayOf(strings)
  loading: boolean,
  error: arrayOf(Error)
}
```

I want to add an anime file
  * Anime File Loading  -> LOAD_ANIME_FILE
  * Anime File Error  -> ANIME_FILE_ERROR
  * Add Anime File  -> ADD_ANIME_FILE
  * Remove Anime File  -> REMOVE_ANIME_FILE

I want to add a cgg file
  * Cgg File Loading -> LOAD_CGG_FILE
  * Cgg File Error  -> CGG_FILE_ERROR
  * Add Cgg File  -> ADD_CGG_FILE
  * Remove Cgg File -> REMOVE_CGG_FILE

I want to add a cgs file
  * Cgs File Loading -> LOAD_CGS_FILE
  * Cgs File Error -> CGS_FILE_ERROR
  * Add Cgs File -> ADD_CGS_FILE
  * Remove Cgs File -> REMOVE_CGS_FILE

I want to add multiple cgs files
  * Batch add Cgs File -> BATCH_ADD_CGS_FILES
  * Clear Cgs Files -> CLEAR_CGS_FILES

*/
