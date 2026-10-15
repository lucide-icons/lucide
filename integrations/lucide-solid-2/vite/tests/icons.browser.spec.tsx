import { createRouter, memoryHistory } from '@solidjs/router';
import { render } from '@solidjs/testing-library';
import { Loading } from 'solid-js';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { routes } from '../src/router';

test('renders Lucide public APIs and survives router navigation', async () => {
  const Router = createRouter({ routes, history: memoryHistory('/') });

  render(() => <Router>{(props) => <Loading>{props.children}</Loading>}</Router>);

  const staticIcon = page.getByTestId('static-icon');
  await expect.element(staticIcon).toBeVisible();
  await expect.element(staticIcon).toHaveAttribute('width', '24');
  await expect.element(staticIcon).toHaveAttribute('height', '24');
  await expect.element(staticIcon).toHaveAttribute('viewBox', '0 0 24 24');
  await expect.element(staticIcon).toHaveAttribute('aria-hidden', 'true');

  const customIcon = page.getByTestId('custom-icon');
  await expect.element(customIcon).toBeVisible();
  await expect.element(customIcon).toHaveAttribute('width', '48');
  await expect.element(customIcon).toHaveAttribute('height', '48');
  await expect.element(customIcon).toHaveAttribute('stroke', 'red');
  await expect.element(customIcon).toHaveAttribute('stroke-width', '2');
  await expect.element(customIcon).toHaveClass('consumer-icon');

  const providerIcon = page.getByTestId('provider-icon');
  await expect.element(providerIcon).toHaveAttribute('width', '32');
  await expect.element(providerIcon).toHaveAttribute('stroke', 'purple');
  await expect.element(providerIcon).toHaveAttribute('stroke-width', '3');

  const aliasIcon = page.getByTestId('alias-icon');
  const canonicalIcon = page.getByTestId('canonical-icon');
  await expect.element(aliasIcon).toBeVisible();
  await expect.element(canonicalIcon).toBeVisible();
  expect(aliasIcon.element().innerHTML).toBe(canonicalIcon.element().innerHTML);

  const deepImportIcon = page.getByTestId('deep-import-icon');
  await expect.element(deepImportIcon).toBeVisible();
  await expect.element(deepImportIcon).toHaveAttribute('aria-label', 'Deep import circle');
  await expect.element(deepImportIcon).not.toHaveAttribute('aria-hidden');

  await page.getByRole('link', { name: 'About' }).click();
  await expect.element(page.getByTestId('route-icon')).toBeVisible();
});
