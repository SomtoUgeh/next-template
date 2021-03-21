import App from 'pages';
import React from 'react';
import { render } from 'test-utils';

describe('App page', () => {
  it('matches snapshot', () => {
    const { debug } = render(<App />, {});
    debug();
  });
});
