/**
 * Gets the repositories of the user from Github
 */

/* eslint-disable no-constant-condition */

import { take, call, put, select, race } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_PRODUCTS } from 'containers/App/constants';
import { productsLoaded, productLoadingError } from 'containers/App/actions';

import request from 'utils/request';

// Bootstrap sagas
export default [
  getGithubData,
];

// Individual exports for testing
export function* getGithubData() {
  while (true) {
    const watcher = yield race({
      loadProducts: take(LOAD_PRODUCTS),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const requestURL = `https://lendi-api-dev.herokuapp.com/api/suggested-products`;

    // Use call from redux-saga for easier testing
    const products = yield call(request, requestURL);

    if (products.err === undefined || products.err === null) {
      // We return an object in a specific format, see utils/request.js for more information
      yield put(productsLoaded(products.data.data));
    } else {
      console.log(products.err.response); // eslint-disable-line no-console
      yield put(productLoadingError(products.err));
    }
  }
}
