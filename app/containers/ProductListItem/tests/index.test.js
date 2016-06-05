/**
 * Test the product list item
 */

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

import ProductListItem from '../index';
import ListItem from 'components/ListItem';

describe('<ProductListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      product_id: 1,
      product_name: 'Awesome home loan',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(
      <ProductListItem item={item} />
    );
    expect(renderedComponent.find(ListItem).length).toEqual(1);
  });
});
