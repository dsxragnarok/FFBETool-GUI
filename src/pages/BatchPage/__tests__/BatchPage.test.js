import React from 'react';
import { shallow } from 'enzyme';
import BatchPage from '../BatchPage';

describe('SinglePage component', () => {
  it('renders', () => {
    const component = shallow(<BatchPage />);
    expect(component).toBePresent();
  });
});
