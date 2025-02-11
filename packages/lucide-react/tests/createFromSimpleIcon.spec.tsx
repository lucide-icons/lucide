import { describe, it, expect } from 'vitest';
import createFromSimpleIcon from '../src/createFromSimpleIcon';
import type { SimpleIcon } from 'simple-icons';
import { render } from '@testing-library/react';

describe('Using createFromSimpleIcon', () => {
  it('should create a component from a SimpleIcon', () => {
    const mockSimpleIcon: SimpleIcon = {
      title: 'Test Icon',
      slug: 'testicon',
      hex: '000000',
      source: 'https://test.com',
      svg: '<svg>...</svg>',
      path: 'M10 10 H 90 V 90 H 10 L 10 10',
    };

    const TestIcon = createFromSimpleIcon('TestIcon', mockSimpleIcon);

    const { container } = render(<TestIcon />);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toBeDefined();
  });
});
