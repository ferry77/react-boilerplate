import expect from 'expect';

import {
  CHANGE_KEYWORD,
} from '../constants';

import {
  changeKeyword,
} from '../actions';

describe('Home Actions', () => {
  describe('changeKeyword', () => {
    it('should return the correct type and the passed keyword', () => {
      const fixture = 'Max';
      const expectedResult = {
        type: CHANGE_KEYWORD,
        keyword: fixture,
      };

      expect(changeKeyword(fixture)).toEqual(expectedResult);
    });
  });
});
