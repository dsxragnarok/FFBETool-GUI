import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';

import SinglePage from './pages/SinglePage';
import BatchPage from './pages/BatchPage';

import './App.css';

export default class App extends Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired })
  }
  static defaultProps = {
    history: {
      push: () => null
    }
  }
  state = {
    tab: '/'
  }

  constructor (props) {
    super(props);

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange (value) {
    this.setState({ tab: value });
    this.props.history.push(value);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Tabs
            value={ this.state.tab }
            onChange={ this.handleTabChange }
          >
            <Tab label="Single" value="/" />
            <Tab label="Batch" value="/batch" />
          </Tabs>
          <Route exact path="/" component={ SinglePage } />
          <Route path="/batch" component={ BatchPage } />
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps ({ router }) {
  return { router };
}

export const ConnectedApp = connect(mapStateToProps)(App);
export const AppWithRouter = withRouter(ConnectedApp);
