import React from 'react';
import { shallow } from 'enzyme';
import BatchProcessPage from '../BatchProcessPage';

describe('SinglePage component', () => {
  it('renders', () => {
    const component = shallow(<BatchProcessPage />);
    expect(component).toBePresent();
  });
});
