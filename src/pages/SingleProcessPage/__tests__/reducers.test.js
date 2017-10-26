import SingleProcessReducer from '../reducers';

import * as types from '../action-types';
import { mockCgsFiles, mockPngFile, mockCggFile } from '../__mocks__/fileMocks';
const { objectContaining, arrayContaining } = expect;

/*```
SingleUnitReducer: {
  id: number,
  animePath: string,
  cggPath: string,
  cgsPaths: arrayOf(strings)
  loading: boolean,
  error: arrayOf(Error)
}
```
*/

describe('SingleProcessReducer', () => {
  const INITIAL_STATE = {
    id: 0,
    animePath: '',
    cggPath: '',
    cgsPaths: [],
    loading: false,
    error: []
  };

  it('returns the initial state', () => {
    const noAction = { type: 'NONE' };
    const state = SingleProcessReducer(undefined, noAction);

    expect(state).toEqual(INITIAL_STATE);
  });

  describe('Anime File', () => {
    const { ANIME_FILE_ERROR, ADD_ANIME_FILE, LOAD_ANIME_FILE, REMOVE_ANIME_FILE } = types;

    it('sets the animePath state', () => {
      const { path: animePath } = mockPngFile;
      const expected = { animePath };
      const action = { type: ADD_ANIME_FILE, payload: mockPngFile };
      const state = SingleProcessReducer(INITIAL_STATE, action);

      expect(state).toEqual(objectContaining(expected));
    });

    it('sets the id state', () => {
      const action = { type: ADD_ANIME_FILE, payload: mockPngFile };
      const state = SingleProcessReducer(INITIAL_STATE, action);

      expect(state).toEqual(objectContaining({ id: 253001205 }));
    });

    it('sets the loading state', () => {
      const action = { type: LOAD_ANIME_FILE, payload: true };
      const state = SingleProcessReducer(INITIAL_STATE, action);

      expect(state).toEqual(objectContaining({ loading: true }));
    });

    it('adds the anime file error onto the error list', () => {
      const expectedError = new Error('Failed to load png file');
      const action = { type: ANIME_FILE_ERROR, payload: expectedError };
      const { error } = SingleProcessReducer(INITIAL_STATE, action);

      expect(error).toEqual(arrayContaining([expectedError]));
    });

    it('clears the id and animePath', () => {
      const currentState = { ...INITIAL_STATE, id: 253001205, animePath: mockPngFile.path };
      const expected = { id: 0, animePath: '' };
      const action = { type: REMOVE_ANIME_FILE };
      const state = SingleProcessReducer(currentState, action);

      expect(state).toEqual(objectContaining(expected));
    });
  });

  describe('Cgg File', () => {
    const { LOAD_CGG_FILE, ADD_CGG_FILE, REMOVE_CGG_FILE, CGG_FILE_ERROR } = types;

    it('sets the cggPath state', () => {
      const { path: cggPath } = mockCggFile;
      const expected = { cggPath };
      const action = { type: ADD_CGG_FILE, payload: mockCggFile };
      const state = SingleProcessReducer(INITIAL_STATE, action);

      expect(state).toEqual(objectContaining(expected));
    });

    it('sets the loading state', () => {
      const action = { type: LOAD_CGG_FILE, payload: true };
      const state = SingleProcessReducer(INITIAL_STATE, action);

      expect(state).toEqual(objectContaining({ loading: true }));
    });

    it('adds the cgg file error onto the error list', () => {
      const expectedError = new Error('Failed to load cgg file');
      const action = { type: CGG_FILE_ERROR, payload: expectedError };
      const { error } = SingleProcessReducer(INITIAL_STATE, action);

      expect(error).toEqual(arrayContaining([expectedError]));
    });

    it('clears the cggPath state', () => {
      const currentState = { ...INITIAL_STATE, cggPath: mockCggFile.path };
      const action = { type: REMOVE_CGG_FILE };
      const state = SingleProcessReducer(currentState, action);

      expect(state).toEqual(objectContaining({ cggPath: '' }));
    });
  });

  describe('Cgs Files', () => {
    const {
      ADD_CGS_FILE,
      LOAD_CGS_FILE,
      REMOVE_CGS_FILE,
      CGS_FILE_ERROR,
      BATCH_ADD_CGS_FILES,
      CLEAR_CGS_FILES
    } = types;

    it('sets the loading state', () => {
      const action = { type: LOAD_CGS_FILE, payload: true };
      const state = SingleProcessReducer(INITIAL_STATE, action);

      expect(state).toEqual(objectContaining({ loading: true }));
    });

    it('adds a cgs file path to the cgsPaths list', () => {
      const cgsFile = mockCgsFiles[1];
      const expected = cgsFile.path;
      const action = { type: ADD_CGS_FILE, payload: cgsFile };
      const { cgsPaths } = SingleProcessReducer(INITIAL_STATE, action);

      expect(cgsPaths).toEqual(arrayContaining([expected]));
    });

    it('adds a cgs file error onto the error list', () => {
      const expectedError = new Error('Failed to load cgs file');
      const action = { type: CGS_FILE_ERROR, payload: expectedError };
      const { error } = SingleProcessReducer(INITIAL_STATE, action);

      expect(error).toEqual(arrayContaining([expectedError]));
    });

    it('removes a cgs file path from the cgsPaths list', () => {
      const currentState = {
        ...INITIAL_STATE,
        cgsPaths: mockCgsFiles.map(({ path }) => path)
      };
      const pathToRemove = mockCgsFiles[1].path;
      const action = { type: REMOVE_CGS_FILE, payload: pathToRemove };
      const { cgsPaths } = SingleProcessReducer(currentState, action);

      expect(cgsPaths).not.toEqual(arrayContaining([pathToRemove]));
    });

    it('does not contain duplicate cgs file paths', () => {
      const currentState = {
        ...INITIAL_STATE,
        cgsPaths: mockCgsFiles.map(({ path }) => path)
      };
      const mockCgsFile = mockCgsFiles[0];
      const action = { type: ADD_CGS_FILE, payload: mockCgsFile };
      const { cgsPaths } = SingleProcessReducer(currentState, action);

      const pathOccurrences = cgsPaths.filter((path) => path === mockCgsFile.path);

      expect(pathOccurrences.length).toBe(1);
    });

    it('adds two cgs file paths onto the cgsPaths list', () => {
      const expected = mockCgsFiles.slice(0, 2).map(({ path }) => path);
      const action = { type: BATCH_ADD_CGS_FILES, payload: mockCgsFiles.slice(0, 2) };
      const { cgsPaths } = SingleProcessReducer(INITIAL_STATE, action);

      expect(cgsPaths).toEqual(arrayContaining(expected));
    });
    it('adds three cgs file paths onto the cgsPaths list');
    it('adds multiple cgs file paths onto the cgsPaths list');
    it('clears the cgsPaths list')
  });
});

/*

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
