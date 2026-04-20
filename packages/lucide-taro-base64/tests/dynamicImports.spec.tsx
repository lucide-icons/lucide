import { describe, it, expect } from 'vitest';
import { Suspense, lazy } from 'react';
import { render, waitFor } from '@testing-library/react';

import dynamicIconImports from '../src/dynamicIconImports';
import { LucideProps } from '../src/types';

describe('Using dynamicImports', () => {
  it('should render icons dynamically by using the dynamicIconImports module', async () => {
    interface IconProps extends Omit<LucideProps, 'ref'> {
      name: keyof typeof dynamicIconImports;
    }

    const Icon = ({ name, ...props }: IconProps) => {
      const LucideIcon = lazy(dynamicIconImports[name]);

      return (
        <Suspense fallback={null}>
          <LucideIcon {...props} />
        </Suspense>
      );
    };

    const { container, getByLabelText } = render(
      <Icon
        aria-label="smile"
        name="smile"
        size={48}
        stroke="red"
        absoluteStrokeWidth
      />,
    );

    await waitFor(() => getByLabelText('smile'));

    expect(container.innerHTML).toMatchSnapshot();
  });
});
