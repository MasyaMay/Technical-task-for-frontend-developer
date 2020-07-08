import React, { Component } from 'react';
import Login from '../login'
import './app.css';
import PostList from '../post-list';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: null
    }
    this.setIdFromLocalStorage();
  }

  setIdFromLocalStorage = async () => {
    const id = await +localStorage.getItem('user');
    if (id) {
      this.setState({id})
    }
  }

  defineLogin = id => {
    this.setState({id})
    if (id) {
      localStorage.setItem('user', id);
    } else {
      localStorage.removeItem('user', id);
    }
  }

  render() {
    const {id} = this.state;
    const component = !id ? <Login defineLogin = {this.defineLogin}/> : <PostList idItem = {this.state.id} defineLogin = {this.defineLogin}/>;

    return (
      <div className='app'>
        {component}
      </div>
    )
  }
}