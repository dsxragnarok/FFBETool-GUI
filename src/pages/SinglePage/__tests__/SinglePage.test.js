import React from 'react';
import { shallow } from 'enzyme';
import SinglePage from '../SinglePage';

describe('SinglePage component', () => {
  it('renders', () => {
    expect(shallow(<SinglePage />)).toBePresent();
  });
});
