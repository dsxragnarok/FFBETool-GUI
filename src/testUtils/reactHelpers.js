import React from 'react';
import { shallow } from 'enzyme';

export function renderComponent (Component, props = {}) {
  return shallow(<Component { ...props } />);
}
