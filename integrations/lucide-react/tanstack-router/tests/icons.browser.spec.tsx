import { createMemoryHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { routeTree } from '../src/routeTree.gen';

test('renders Lucide public APIs and survives router navigation', async () => {
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/'] }),
    routeTree,
  });
  const screen = await render(<RouterProvider router={router} />);

  const staticIcon = screen.getByTestId('static-icon');
  await expect.element(staticIcon).toBeVisible();
  await expect.element(staticIcon).toHaveAttribute('width', '24');
  await expect.element(staticIcon).toHaveAttribute('height', '24');
  await expect.element(staticIcon).toHaveAttribute('viewBox', '0 0 24 24');
  await expect.element(staticIcon).toHaveAttribute('aria-hidden', 'true');

  const customIcon = screen.getByTestId('custom-icon');
  await expect.element(customIcon).toBeVisible();
  await expect.element(customIcon).toHaveAttribute('width', '48');
  await expect.element(customIcon).toHaveAttribute('height', '48');
  await expect.element(customIcon).toHaveAttribute('stroke', 'red');
  await expect.element(customIcon).toHaveAttribute('stroke-width', '2');
  await expect.element(customIcon).toHaveClass('consumer-icon');

  const providerIcon = screen.getByTestId('provider-icon');
  await expect.element(providerIcon).toHaveAttribute('width', '32');
  await expect.element(providerIcon).toHaveAttribute('stroke', 'purple');
  await expect.element(providerIcon).toHaveAttribute('stroke-width', '3');

  const aliasIcon = document.querySelector('[data-testid="alias-icon"]');
  const canonicalIcon = document.querySelector('[data-testid="canonical-icon"]');
  expect(aliasIcon?.innerHTML).toBe(canonicalIcon?.innerHTML);

  const dynamicIcon = screen.getByTestId('dynamic-icon');
  await expect.element(dynamicIcon).toBeVisible();
  await expect.element(dynamicIcon).toHaveAttribute('aria-label', 'Dynamic circle');
  await expect.element(dynamicIcon).not.toHaveAttribute('aria-hidden');

  await screen.getByRole('link', { name: 'About' }).click();
  await expect.element(screen.getByTestId('route-icon')).toBeVisible();
});
