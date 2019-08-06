import React, { Component } from 'react';
import List from './List'
import request from 'superagent';
import '../App.scss';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          isLoaded: false,
          error: null,
        }
      }
    
      componentDidMount() {
        request.get('https://www.reddit.com/hot.json')
          .end((error, response) => {
            if (error) {
              this.setState({
                error: true
              });
            }
    
            const { body = {} } = response;
            const { data = {} } = body;
            const { children = [] } = data;
    
            this.setState({
              isLoaded: true,
              items: children,
            })
          });
      }

      deleteItem = (index, e) => {
            const item = Object.assign([], this.state.item);
            item.splice(index, 1);
            this.setState({items: item})
        }
    
      render() {
    
        var { isLoaded, items } = this.state;
    
        console.log(items);
    
        if (!isLoaded) {
          return (
            <div className='Loading'>Loading, please wait...</div>
          );
        }
        else {
          return (
                  <ul>
                    {this.state.items.map((item, index)=>{
                    return ( 
                      <li key={item.kind}>
                        <strong>Author:</strong> {item.data.author}
                        <strong>Link:</strong> <a href={item.data.url}>{item.data.title}</a>  <List delEvent={this.deleteItem.bind(this, index)}></List>
                        </li>
                               
                    )})
                  }
                  </ul>
          );
        }
      }
    }

export default PostList;