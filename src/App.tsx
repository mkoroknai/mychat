//import React from 'react';
import './App.css';
import { proxy } from './Proxy';

import React, { Component } from 'react';
import { Login } from './Login'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from './Main';


export default class App extends Component {
  
  componentDidMount(): void {
    proxy.addEventListener("login", () => {this.setState({loggedIn: true})}, this)
  }
  
  componentWillUnmount() {
    proxy.removeAllEventListener(this);
  }

  state = {loggedIn: false};

  render() {
    return (
      <div className="app">
        {this.state.loggedIn ? <Main /> : <Login /> }
      </div>
    );
  }
}