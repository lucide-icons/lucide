import { MemoryRouter, Route } from '@solidjs/router';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-solid';
import About from '../src/routes/about';
import Home from '../src/routes/index';

test('renders Lucide public APIs and survives router navigation', async () => {
  const screen = render(() => (
    <MemoryRouter>
      <Route
        component={Home}
        path="/"
      />
      <Route
        component={About}
        path="/about"
      />
    </MemoryRouter>
  ));

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

  const aliasIcon = screen.getByTestId('alias-icon');
  const canonicalIcon = screen.getByTestId('canonical-icon');
  await expect.element(aliasIcon).toBeVisible();
  await expect.element(canonicalIcon).toBeVisible();
  expect(aliasIcon.element().innerHTML).toBe(canonicalIcon.element().innerHTML);

  const deepImportIcon = screen.getByTestId('deep-import-icon');
  await expect.element(deepImportIcon).toBeVisible();
  await expect.element(deepImportIcon).toHaveAttribute('aria-label', 'Deep import circle');
  await expect.element(deepImportIcon).not.toHaveAttribute('aria-hidden');

  await screen.getByRole('link', { name: 'About' }).click();
  await expect.element(screen.getByTestId('route-icon')).toBeVisible();
});
