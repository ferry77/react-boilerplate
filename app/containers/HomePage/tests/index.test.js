/**
 * Test the HomePage
 */

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { HomePage } from '../index';
import ProductListItem from 'containers/ProductListItem';
import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';

describe('<HomePage />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <HomePage loading />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <HomePage
        loading={false}
        error={{ message: 'Loading failed!' }}
      />
    );
    expect(
      renderedComponent
        .text()
        .indexOf('Something went wrong, please try again!')
      ).toBeGreaterThan(-1);
  });

  it('should render the products if loading was successful', () => {
    const products = [{
      product_name: 'Awesome loan no repayment',
    }];
    const renderedComponent = shallow(
      <HomePage
        products={products}
        keyword=""
        error={false}
      />
    );

    expect(renderedComponent.contains(<List items={products} component={ProductListItem} />)).toEqual(true);
  });
});
