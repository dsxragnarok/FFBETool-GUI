import pick from 'lodash/pick';

import * as actions from '../actions';
import * as types from '../action-types';
import { mockCggFile, mockCgsFiles, mockPngFile } from '../__mocks__/fileMocks';

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
        payload: pick(mockPngFile, ['lastModified', 'name', 'path', 'preview'])
      };
      const action = addAnimeFile(mockPngFile);

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

  describe('loadCggFile', () => {
    const { LOAD_CGG_FILE } = types;
    const { loadCggFile } = actions;

    it('create the appropriate action and payload', () => {
      const expectedAction = {
        type: LOAD_CGG_FILE,
        payload: true
      };
      const action = loadCggFile(true);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('cggFileErrored', () => {
    const { CGG_FILE_ERROR } = types;
    const { cggFileError } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: CGG_FILE_ERROR,
        payload: 'The error of file cgg'
      };
      const action = cggFileError('The error of file cgg');

      expect(action).toEqual(expectedAction);
    });
  });

  describe('addCggFile', () => {
    const { ADD_CGG_FILE } = types;
    const { addCggFile } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: ADD_CGG_FILE,
        payload: pick(mockCggFile, ['name', 'path', 'lastModified'])
      };
      const action = addCggFile(mockCggFile);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('removeCggFile', () => {
    const { REMOVE_CGG_FILE } = types;
    const { removeCggFile } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: REMOVE_CGG_FILE
      };
      const action = removeCggFile();

      expect(action).toEqual(expectedAction);
    });
  });

  describe('loadCgsFile', () => {
    const { LOAD_CGS_FILE } = types;
    const { loadCgsFile } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: LOAD_CGS_FILE,
        payload: true
      };
      const action = loadCgsFile(true);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('cgsFileErrored', () => {
    const { CGS_FILE_ERROR } = types;
    const { cgsFileError } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: CGS_FILE_ERROR,
        payload: 'You are the error!'
      };
      const action = cgsFileError('You are the error!');

      expect(action).toEqual(expectedAction);
    });
  });

  describe('addCgsFile', () => {
    const { ADD_CGS_FILE } = types;
    const { addCgsFile } = actions;

    it('creates the appropriate action and payload', () => {
      const mockCgsFile = mockCgsFiles[0];
      const expectedAction = {
        type: ADD_CGS_FILE,
        payload: pick(mockCgsFile, ['name', 'path', 'lastModified'])
      };
      const action = addCgsFile(mockCgsFile);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('removeCgsFile', () => {
    const { REMOVE_CGS_FILE } = types;
    const { removeCgsFile } = actions;

    it('creates the appropriate action and payload', () => {
      const fileToRemove = mockCgsFiles[1];
      const { name, path } = fileToRemove;
      const expectedAction = {
        type: REMOVE_CGS_FILE,
        payload: { name, path }
      };
      const action = removeCgsFile({ name, path });

      expect(action).toEqual(expectedAction);
    });
  });

  describe('batchAddCgsFiles', () => {
    const { BATCH_ADD_CGS_FILES } = types;
    const { batchAddCgsFiles } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: BATCH_ADD_CGS_FILES,
        payload: mockCgsFiles.map(({ name, path, lastModified }) => ({ name, path, lastModified }))
      };
      const action = batchAddCgsFiles(mockCgsFiles);

      expect(action).toEqual(expectedAction);
    });
  });

  describe('clearCgsFiles', () => {
    const { CLEAR_CGS_FILES } = types;
    const { clearCgsFiles } = actions;

    it('creates the appropriate action and payload', () => {
      const expectedAction = {
        type: CLEAR_CGS_FILES
      };
      const action = clearCgsFiles();

      expect(action).toEqual(expectedAction);
    });
  });
});
