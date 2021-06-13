import { act, fireEvent, screen } from '@testing-library/react';
import Index from '../src/pages/index';
import React from 'react';
import { render } from './test-utils';
import { getAllData } from '../src/lib/icons';

import App from '../src/pages/_app';

describe('App', () => {
  it('renders without crashing', () => {
    let allData = getAllData();
    render(<App Component={Index} pageProps={{ data: allData }} />);
    expect(
      screen.getByText('Simply beautiful open source icons, community-sourced')
    ).toBeInTheDocument();
  });
});
