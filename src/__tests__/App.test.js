import { renderComponent } from '../testUtils/reactHelpers';
import { Route } from 'react-router-dom';

import { Tabs, Tab } from 'material-ui/Tabs';

import App from '../App';
import SingleProcessPage from '../pages/SingleProcessPage';
import BatchProcessPage from '../pages/BatchProcessPage';

jest.mock('material-ui/Tabs');

describe('App component', () => {
  let component = null;
  beforeEach(() => component = renderComponent(App));
  afterEach(() => component = null);

  it('renders without crashing', () => {
    expect(component).toBePresent();
  });

  it('renders the <Tabs /> component', () => {
    expect(component.find(Tabs)).toBePresent();
  });

  it('renders a <Tab /> component', () => {
    expect(component.find(Tab)).toBePresent();
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

  it('renders the <Route /> to SingleProcessPage', () => {
    const route = component.find(Route).findWhere((route) => route.prop('component')=== SingleProcessPage);

    expect(route).toBePresent();
  });


  it('renders the <Route /> to BatchProcessPage', () => {
    const route = component.find(Route).findWhere((route) => route.prop('component') === BatchProcessPage);

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
