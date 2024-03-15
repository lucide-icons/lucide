import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';

import { airVent } from './testIconNodes';
import Icon from '../src/Icon';

describe('Using Icon Component', () => {
  it('should render icon based on a iconNode', async () => {
    const { container, getByLabelText } = render(
      <Icon
        iconNode={airVent}
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    await waitFor(() => getByLabelText('smile'))

    expect( container.innerHTML ).toMatchSnapshot();
  });
})
