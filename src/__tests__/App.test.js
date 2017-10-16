import { renderComponent } from '../testUtils/reactHelpers';
import { Route } from 'react-router-dom';

import { Tabs, Tab } from 'material-ui/Tabs';

import App from '../App';
import SinglePage from '../pages/SinglePage';
import BatchPage from '../pages/BatchPage';

jest.mock('material-ui/Tabs');

describe('App component', () => {
  let component = null;
  beforeEach(() => component = renderComponent(App));
  afterEach(() => component = null);

  it('renders without crashing', () => {
    expect(component).toBePresent();
  });

  it('renders the <Tabs /> component', () => {
    expect(component.find(Tabs).exists()).toBe(true);
  });

  it('renders a <Tab /> component', () => {
    expect(component.find(Tab).exists()).toBe(true);
  });

  it('renders two <Tab /> component', () => {
    expect(component.find(Tab).length).toBe(2);
  });

  it('renders a <Tab /> labeled "Single"', () => {
    const tab = component.find(Tab).findWhere((tab) => tab.prop('label') === 'Single');
    expect(tab).toBePresent();
  });

  it('renders a <Tab /> labeled "Batch"', () => {
    const tab = component.find(Tab).findWhere((tab) => tab.prop('label') === 'Batch');
    expect(tab).toBePresent();
  });

  it('renders the <Route /> to SinglePage', () => {
    const route = component.find(Route).findWhere((route) => route.prop('component')=== SinglePage);

    expect(route).toBePresent();
  });


  it('renders the <Route /> to BatchPage', () => {
    const route = component.find(Route).findWhere((route) => route.prop('component') === BatchPage);

    expect(route).toBePresent();
  });

  describe('routes', () => {
    const props = {
      history: {
        push: jest.fn()
      }
    };

    beforeEach(() => {
      component = renderComponent(App, props);
    });
    afterEach(() => {
      props.history.push.mockClear();
    });

    it('pushes the "/" route on Tab change to Single', () => {
      component.find(Tabs).simulate('change', '/');
      expect(props.history.push).toBeCalledWith('/');
    });

    it('pushes the "/batch" route on Tab change to Batch', () => {
      component.find(Tabs).simulate('change', '/batch');
      expect(props.history.push).toBeCalledWith('/batch');
    });
  });
});
