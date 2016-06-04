/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';

import ListItem from 'components/ListItem';
import styles from './styles.css';

export default class ProductListItem extends React.Component {

  static propTypes = {
    item: React.PropTypes.object
  };

  render() {
    const item = this.props.item;

    const content = (
      <div className={styles.itemWrapper}>
          {item.product_name}
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`product-list-item-${item.product_id}`} item={content} />
    );
  }
}

