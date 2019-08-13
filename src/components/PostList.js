import React, { Component } from 'react';
import request from 'superagent';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import Post from './Post';
import NoPosts from './NoPosts';
import '../App.scss';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      error: false
    };

    /**
     * NOTE: You bound /this/ at a lower lever, I suggest doing it higher as it's easier to see what methods should
     * have access to the higher scope
     */

    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    request.get('https://www.reddit.com/hot.json').end((error, response) => {
      if (error) {
        this.setState({
          isLoaded: true,
          error: true
        });

        /**
         * NOTE: In this error block you were catching the error but then allowing the rest of the method to continue.
         * This results in the whole app crashing if the request fails as the response object will be null.
         * Additionally, if you have a loading state prop, you should probably inform the UI the request failed and
         * is no longer in a loading state.
         */

        return;
      }

      const { body = {} } = response;
      const { data = {} } = body;
      const { children = [] } = data;

      this.setState({
        isLoaded: true,
        items: children
      });
    });
  }

  deleteItem = (index, event) => {
    /**
     * NOTE: Your issue here is actually that you are splicing the item out (correct) but then you are setting the items array
     * as the single /item/ you've spliced out, so it's deleting everything from your UI.
     * It's also generally a good idea to check it exists first so you don't get an error (e.g. index out of range or set to a
     * negative value).
     *
     * Once again, we're also going to use the clever destructuring approach of setting a default while defining a variable.
     *
     * Also you're passing the event through (the click) but not doing anything with it, so let's prevent the default action
     */

    event.preventDefault();

    let { items = [] } = this.state;

    if (index > -1) {
      items.splice(index, 1);
    }

    /**
     * NOTE: In modern JavaScript we can save some keystrokes by assigning values to objects in this way, it sets the same of the
     * property to whatever the variable name is. Pretty neat.
     */

    this.setState({ items });
  };

  render() {
    /**
     * NOTE: Try to avoid using var these days if you are transpiling your code (e.g. with webpack) as it sets window/document
     * level variables. using let or const instead keeps it scoped.
     * Use let if you are going to change the value later, use const if the value will remain /constant/.
     *
     * Your code will be easier to read and will inform others, as they parse it, what will or may happen later.
     */

    const { isLoaded, error, items = [] } = this.state;

    /**
     * NOTE: A few things below:
     *
     * 1. You have loaded boostrap as a dependency and then not leaned on it. Let's use some of the nice stuff bootstrap
     * gives us, such as grid support, button styles and alerts.
     * 2. This might be a good time to swap out to some functional components for re-useable elements to keep everything DRY as possible
     * See <Loading /> and <ErrorMessage /> below and how they correspond to functional components in the components dir
     * 3. There is a tidier way of structuring out this code, this is just one example
     * 4. I've added some handlers for whether there is an error, if there are no posts etc.
     */

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {!isLoaded && !error && <Loading />}
            {isLoaded && error && <ErrorMessage />}
            {isLoaded && !error && (
              <ul className="list-unstyled post-list">
                {items.map((item, index) => {
                  /**
                   * NOTE (above): You brought items out of state above and then didn't use it which is bad practice (unused variable).
                   *
                   * Below: I'd also suggest destructuring the variables you need at the start for tidiness but this is personal preference.
                   */

                  const { data = {} } = item;
                  const { author, title, url, id } = data;

                  return (
                    <Post
                      key={id}
                      author={author}
                      title={title}
                      url={url}
                      index={index}
                      deleteItem={this.deleteItem}
                    />
                  );
                })}
              </ul>
            )}
            {isLoaded && !error && items.length === 0 && <NoPosts />}
          </div>
        </div>
      </div>
    );
  }
}

export default PostList;
