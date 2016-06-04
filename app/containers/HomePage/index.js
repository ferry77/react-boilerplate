/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

import { createSelector } from 'reselect';

import {
  selectProducts,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import {
  selectKeyword,
} from './selectors';

import { changeKeyword } from './actions';
import { loadProducts } from '../App/actions';

import ProductListItem from 'containers/ProductListItem';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import styles from './styles.css';

export class HomePage extends React.Component {

  /**
   * load bank list
   */
  componentDidMount() {
      this.props.onComponentWillMount();
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are products, show the products
    } else if (this.props.products !== false) {

      mainContent = (<List items={this.props.products} component={ProductListItem} />);
    }

    return (
      <article>
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
            <H2>Click Loan Products</H2>
          </section>
          <section className={styles.textSection}>
            <form className={styles.usernameForm} onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">Search Product
                <span className={styles.atPrefix}> </span>
                <input
                  id="username"
                  className={styles.input}
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeKeyword}
                />
              </label>
            </form>
            {mainContent}
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  products: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeKeyword: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeKeyword: (evt) => dispatch(changeKeyword(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadProducts());
    },
    onComponentWillMount() {
      dispatch(loadProducts());
    },
    dispatch,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectProducts(),
  selectKeyword(),
  selectLoading(),
  selectError(),
  (products, keyword, loading, error) => ({ products, keyword, loading, error })
), mapDispatchToProps)(HomePage);
