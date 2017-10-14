/**
 * @todo Remove this `raf` polyfill once the below issue is sorted
 * https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
 */
import './polyfills'

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });
