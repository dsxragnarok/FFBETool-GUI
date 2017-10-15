import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SinglePage from './pages/SinglePage';
import BatchPage from './pages/BatchPage';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <button onClick={() => this.props.history.push('/') }>Single</button>
          <button onClick={() => this.props.history.push('/batch') }>Batch</button>
        </header>
        <Route exact path="/" component={ SinglePage } />
        <Route path="/batch" component={ BatchPage } />
      </div>
    );
  }
}

export default App;

function mapStateToProps ({ router }) {
  return { router };
}

export const ConnectedApp = connect(mapStateToProps)(App);
export const AppWithRouter = withRouter(ConnectedApp);
