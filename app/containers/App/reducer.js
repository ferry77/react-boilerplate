/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  userData: fromJS({
    products: false,
  }),
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'products'], false);
    case LOAD_PRODUCTS_SUCCESS:
      return state
        .setIn(['userData', 'products'], action.products)
        .set('loading', false);
    case LOAD_PRODUCTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
