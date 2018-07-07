import React from 'react';
import { string } from 'prop-types';

export default function Image ({ source = '' }) {
  return <img src={ source } alt="" />;
}

Image.displayName = 'Image';
Image.propTypes = {
  source: string
};
