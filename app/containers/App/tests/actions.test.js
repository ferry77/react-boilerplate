import expect from 'expect';

import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR,
} from '../constants';

import {
  loadProducts,
  productsLoaded,
  productLoadingError,
} from '../actions';

describe('App Actions', () => {
  describe('loadProducts', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_PRODUCTS,
      };

      expect(loadProducts()).toEqual(expectedResult);
    });
  });

  describe('productsLoaded', () => {
    it('should return the correct type and the passed products', () => {
      const fixture = ['Test'];
      const expectedResult = {
        type: LOAD_PRODUCTS_SUCCESS,
        products: fixture,
      };

      expect(productsLoaded(fixture)).toEqual(expectedResult);
    });
  });

  describe('productLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_PRODUCTS_ERROR,
        error: fixture,
      };

      expect(productLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
