import React from 'react';
import Image from '../../components/Image';

const styles = {
  previewContainer: { outline: '2px solid #ccc' },
  previewContent: {
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },
}

export default function Preview ({ source }) {
  return (
    <div style={ styles.previewContainer }>
      <div style={ styles.previewContent }>
        <div>{source && <Image source={ source } /> }</div>
      </div>
    </div>
  );
}
