import Image from '../Image';
import { renderComponent } from '../../testUtils/reactHelpers';

const IMG_PATH = 'unit_anime_253001205.png';

const renderImage = (props) => renderComponent(Image, props);

describe('Image component', () => {
  it('renders', () => {
    expect(renderImage()).toBePresent();
  });

  it('sets the src attribute', () => {
    const component = renderImage({ source: IMG_PATH });
    expect(component.prop('src')).toBe(IMG_PATH);
  });
});
