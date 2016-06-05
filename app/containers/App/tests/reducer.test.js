import expect from 'expect';
import appReducer from '../reducer';
import {
  loadProducts,
  productsLoaded,
  productLoadingError,
} from '../actions';
import { fromJS } from 'immutable';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      userData: fromJS({
        products: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadProducts action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'products'], false);

    expect(appReducer(state, loadProducts())).toEqual(expectedResult);
  });

  it('should handle the productsLoaded action correctly', () => {
    const fixture = [{
      name: 'My Product',
    }];
    const expectedResult = state
      .setIn(['userData', 'products'], fixture)
      .set('loading', false);

    expect(appReducer(state, productsLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the productLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, productLoadingError(fixture))).toEqual(expectedResult);
  });
});
