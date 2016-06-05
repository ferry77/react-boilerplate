/**
 * Test the getProductData saga
 */

import expect from 'expect';
import { take, call, put, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getProductData } from '../sagas';

import { LOAD_PRODUCTS } from 'containers/App/constants';
import { productsLoaded, productLoadingError } from 'containers/App/actions';

import request from 'utils/request';

const generator = getProductData();

describe('getProductData Saga', () => {
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    expect(generator.next().value).toEqual(race({
      loadProducts: take(LOAD_PRODUCTS),
      stop: take(LOCATION_CHANGE),
    }));
    const requestURL = 'https://lendi-api-dev.herokuapp.com/api/suggested-products';
    expect(generator.next(take(LOAD_PRODUCTS)).value).toEqual(call(request, requestURL));
  });

  it('should dispatch the productsLoaded action if it requests the data successfully', () => {
    const response = {
      data: {
        data: [{
          product_id: 1,
          product_name: 'First product',
        }, {
          product_id: 2,
          product_name: 'Second product',
        }],
      },
    };
    expect(generator.next(response).value).toEqual(put(productsLoaded(response.data.data)));
  });

  it('should call the productLoadingError action if the response errors', () => {
    const response = {
      err: 'Some error',
    };
    expect(generator.next(response).value).toEqual(put(productLoadingError(response.err)));
  });
});
