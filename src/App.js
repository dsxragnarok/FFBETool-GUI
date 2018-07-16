import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SingleProcessPage from './pages/SingleProcessPage';

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

  render() {
    return (
      <MuiThemeProvider>
        <SingleProcessPage />
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps ({ router }) {
  return { router };
}

export const ConnectedApp = connect(mapStateToProps)(App);
export const AppWithRouter = withRouter(ConnectedApp);
