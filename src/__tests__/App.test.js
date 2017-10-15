import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import App from '../App';
import SinglePage from '../pages/SinglePage';
import BatchPage from '../pages/BatchPage';

describe('App component', () => {
  it('renders without crashing', () => {
    const component = shallow(<App />);
    expect(component).toBePresent();
  });

  it('renders the <Route /> to SinglePage', () => {
    const component = shallow(<App />);
    const route = component.find(Route).findWhere((route) => route.prop('component')=== SinglePage);

    expect(route).toBePresent();
  });

  it('renders the <Route /> to BatchPage', () => {
    const component = shallow(<App />);
    const route = component.find(Route).findWhere((route) => route.prop('component') === BatchPage);

    expect(route).toBePresent();
  });
});
