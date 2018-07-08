import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';

import SingleProcessPage from '../SingleProcessPage';
import { renderComponent } from '../../../testUtils/reactHelpers';

const renderPage = (props) => renderComponent(SingleProcessPage, props);

describe('SingleProcessPage component', () => {
  it('renders', () => {
    expect(renderPage()).toBePresent();
  });

  it('renders three Dropzone components', () => {
    const component = renderPage();
    const dropzones = component.find(Dropzone);

    expect(dropzones.length).toBe(3);
  });

  describe('Anime Dropzone', () => {
    let dropzone = null;

    beforeEach(() => {
      dropzone = renderPage()
        .find(Dropzone)
        .findWhere((elem) => elem.prop('name') === 'select-anime');
    });

    afterEach(() => {
      dropzone = null;
    });

    it('renders a Dropzone component that only accepts "image/png"', () => {
      expect(dropzone.prop('accept')).toBe('image/png');
    });

    it('renders a Dropzone component that only accepts a single "image/png"', () => {
      expect(dropzone.prop('multiple')).toBe(false);
    });

    it('renders a button labeled "SELECT ANIME"', () => {
      const button = dropzone.find(RaisedButton)
        .findWhere((btn) => btn.prop('label') === 'SELECT ANIME');

      expect(button).toBePresent();
    });
  });

  describe('Cgg Dropzone', () => {
    let dropzone = null;

    beforeEach(() => {
      dropzone = renderPage().find(Dropzone)
        .findWhere((elem) => elem.prop('name') === 'select-cgg');
    });
    afterEach(() => dropzone = null);

    it('renders a Dropzone component for "cgg" file', () => {
      expect(dropzone).toBePresent();
    });

    it('renders a Dropzone component that only accepts "text/csv"', () => {
      expect(dropzone.prop('accept')).toBe('text/csv');
    });

    it('renders a Dropzone component that only accepts a single "text/csv"', () => {
      expect(dropzone.prop('multiple')).toBe(false);
    });

    it('renders a button labeled "SELECT CGG"', () => {
      const button = dropzone
        .find(RaisedButton)
        .findWhere((btn) => btn.prop('label') === 'SELECT CGG');

      expect(button).toBePresent();
    });
  });

  describe('Cgs Dropzone', () => {
    let dropzone = null;

    beforeEach(() => {
      dropzone = renderPage().find(Dropzone)
        .findWhere((elem) => elem.prop('name') === 'select-cgs');
    });
    afterEach(() => dropzone = null);

    it('renders a Dropzone for "cgs" files', () => {
      expect(dropzone).toBePresent();
    });

    it('renders a Dropzone component that only accepts "text/csv"', () => {
      expect(dropzone.prop('accept')).toBe('text/csv');
    });

    it('renders a Dropzone component that accepts multiple "text/csv"', () => {
      expect(dropzone.prop('multiple')).toBe(true);
    });

    it('renders a button labeled "SELECT CGS"', () => {
      const button = dropzone
        .find(RaisedButton)
        .findWhere((btn) => btn.prop('label') === 'SELECT CGS');

      expect(button).toBePresent();
    });
  });
});
