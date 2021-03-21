import App from 'pages';
import React from 'react';
import { render } from '@testing-library/react';

describe('App page', () => {
  it('matches snapshot', () => {
    const { debug } = render(<App />, {});
    debug();
  });
});
