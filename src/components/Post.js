import React from 'react';

export default props => {
  const { index, author, title, url, deleteItem } = props;

  /**
   * NOTE: I've modified your deletion onclick below to pass the event through
   *
   * This is useful for preventingDefault or getting values from fields/info
   * about the element.
   *
   * I've also leaned on bootstrap here for some nice styles
   */

  return (
    <li className="post">
      <h2>
        <strong>Author:</strong> {author}
      </h2>
      <h3>
        <strong>Link:</strong>{' '}
        <a rel="noopener noreferrer" target="_blank" href={url}>
          {title}
        </a>{' '}
      </h3>
      <button
        className="btn btn-primary"
        onClick={event => deleteItem(index, event)}
      >
        Delete This
      </button>
    </li>
  );
};
