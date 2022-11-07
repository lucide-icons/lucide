import { getAllData } from '../src/lib/icons';
import { renderHook } from '@testing-library/react-hooks';
import useSearch from '../src/lib/useSearch';

const keys = [
  { name: 'name', weight: 2 },
  { name: 'tags', weight: 1 },
]

describe('Icon Overview', () => {
  it('can search filter icons', async () => {
    const allData = await getAllData();

    const { result: result1 } = renderHook(() => useSearch('', allData, keys));
    expect(result1.current).toHaveLength(allData.length);

    const { result: result2, waitForNextUpdate: wait2 } = renderHook(() =>
      useSearch(allData, 'airplay', keys)
    );
    await wait2();
    expect(result2.current).toHaveLength(2);
  });
});
