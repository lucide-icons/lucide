import { screen, render } from '@testing-library/react';
import Index from '../src/pages/index';
import React from 'react';
import { getAllData } from '../src/lib/icons';

import App from '../src/pages/_app';

describe('App', () => {
  it('renders without crashing', async () => {
    const allData = await getAllData();
    render(<App Component={Index} pageProps={{ data: allData }} />);
    expect(
      screen.getByText('Simply beautiful open source icons, community-sourced')
    ).toBeInTheDocument();
  });
});
