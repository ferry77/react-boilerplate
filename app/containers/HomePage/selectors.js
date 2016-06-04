/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectKeyword = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('keyword')
);

export {
  selectHome,
  selectKeyword,
};
