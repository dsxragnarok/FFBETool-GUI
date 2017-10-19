import { createAction } from 'redux-actions';
import pick from 'lodash/pick';
import {
  LOAD_ANIME_FILE,
  ANIME_FILE_ERROR,
  ADD_ANIME_FILE,
  REMOVE_ANIME_FILE
} from './action-types';

export const loadAnimeFile = createAction(LOAD_ANIME_FILE);
export const animeFileError = createAction(ANIME_FILE_ERROR);
export const addAnimeFile = createAction(
  ADD_ANIME_FILE,
  (file) => pick(file, ['lastModified', 'name', 'path', 'preview'])
);
export const removeAnimeFile = createAction(REMOVE_ANIME_FILE);
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
