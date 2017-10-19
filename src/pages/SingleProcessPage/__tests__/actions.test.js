import pick from 'lodash/pick';

import * as actions from '../actions';
import * as types from '../action-types';

const mockFile = {
  lastModified : 1507666290000,
  lastModifiedDate : new Date(1507666290000),
  name: 'unit_anime_253001205',
  path: '/Users/erdrick.loto/Share/ffbe-2.3.1/unit_anime_253001205.png',
  preview: 'blob:http://localhost:3000/616351f0-27bc-42d3-b6fd-fdd9f4f28d06',
  size: 56324,
  type: 'image/png',
  webkitRelativePath: ''
};

describe('SingleProcess actions', () => {
  describe('loadAnimeFile', () => {
    const { LOAD_ANIME_FILE } = types;
    const { loadAnimeFile } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: LOAD_ANIME_FILE,
        payload: true
      };
      const action = loadAnimeFile(true);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('animeFileErrored', () => {
    const { ANIME_FILE_ERROR } = types;
    const { animeFileError } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: ANIME_FILE_ERROR,
        payload: 'Errorman'
      };
      const action = animeFileError('Errorman');

      expect(action).toEqual(expectedAction);
    });
  });

  describe('addAnimeFile', () => {
    const { ADD_ANIME_FILE } = types;
    const { addAnimeFile } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: ADD_ANIME_FILE,
        payload: pick(mockFile, ['lastModified', 'name', 'path', 'preview'])
      };
      const action = addAnimeFile(mockFile);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('removeAnimeFile', () => {
    const { REMOVE_ANIME_FILE } = types;
    const { removeAnimeFile } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: REMOVE_ANIME_FILE
      };
      const action = removeAnimeFile();

      expect(action).toEqual(expectedAction);
    });
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
