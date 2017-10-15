import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SinglePage extends Component {
  static displayName = 'SinglePage'
  static defaultProps = {}
  static propTypes = {}

  render () {
    return <div><h2>I am the Single Page</h2></div>;
  }
}
