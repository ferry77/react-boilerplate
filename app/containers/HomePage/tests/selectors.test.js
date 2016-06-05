import { fromJS } from 'immutable';
import expect from 'expect';

import {
  selectHome,
  selectKeyword,
} from '../selectors';

describe('selectHome', () => {
  const homeSelector = selectHome();
  it('should select the home state', () => {
    const homeState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(homeSelector(mockedState)).toEqual(homeState);
  });
});

describe('selectKeyword', () => {
  const keywordSelector = selectKeyword();
  it('should select the keyword', () => {
    const keyword = 'mxstbr';
    const mockedState = fromJS({
      home: {
        keyword,
      },
    });
    expect(keywordSelector(mockedState)).toEqual(keyword);
  });
});
