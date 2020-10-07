import { act, fireEvent, screen } from '@testing-library/react';
import Index from '../pages/index';
import React from 'react';
import { render } from './test-utils';
import { getAllData } from '../lib/icons';
import App from '../pages/_app';
import { renderHook } from '@testing-library/react-hooks';
import useSearch from '../lib/search';

describe('App', () => {
  it('renders without crashing', () => {
    let allData = getAllData();
    render(<App Component={Index} pageProps={{ data: allData }} />);
    expect(
      screen.getByText('Simply beautiful open source icons, community-sourced')
    ).toBeInTheDocument();
  });
  it('can search filter icons', async () => {
    let allData = getAllData();

    const { result: result1, waitForNextUpdate: wait1 } = renderHook(() => useSearch(allData, ''));
    expect(result1.current).toHaveLength(allData.length);

    const { result: result2, waitForNextUpdate: wait2 } = renderHook(() =>
      useSearch(allData, 'airplay')
    );
    await wait2();
    expect(result2.current).toHaveLength(2);
  });
});
