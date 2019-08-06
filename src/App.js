import React, { Component } from 'react';
import logo from './img/logo.png';
import './App.scss';
import PostList from './components/PostList';
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
      return (
        <div className="App">
          <div className="App-header">
            <div className="top-bar"><img src={logo} className="logo" alt="App-logo"/></div>
            <div className="right-top">Navigation to go here.</div>
          </div>
          <div className="App-body">
                  <h1>List of Hot Reddit Topics</h1>
                  <PostList />
          </div>
        </div>
      );
  }
}

export default App;
