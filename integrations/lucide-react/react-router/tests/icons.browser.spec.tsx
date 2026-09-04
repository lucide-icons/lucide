import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter, Route, Routes } from 'react-router';
import About from '../app/routes/about';
import Home from '../app/routes/home';

test('renders Lucide public APIs and survives router navigation', async () => {
  const screen = await render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          element={<Home />}
          path="/"
        />
        <Route
          element={<About />}
          path="/about"
        />
      </Routes>
    </MemoryRouter>,
  );

  const staticIcon = screen.getByTestId('static-icon');
  await expect.element(staticIcon).toBeVisible();
  await expect.element(staticIcon).toHaveAttribute('width', '24');
  await expect.element(staticIcon).toHaveAttribute('height', '24');
  await expect.element(staticIcon).toHaveAttribute('viewBox', '0 0 24 24');
  await expect.element(staticIcon).toHaveAttribute('aria-hidden', 'true');

  const customIcon = screen.getByTestId('custom-icon');
  await expect.element(customIcon).toBeVisible();
  await expect.element(customIcon).toHaveAttribute('width', '48');
  const aliasIcon = screen.getByTestId('alias-icon');
  const canonicalIcon = screen.getByTestId('canonical-icon');
  await expect.element(aliasIcon).toBeVisible();
  await expect.element(canonicalIcon).toBeVisible();
  expect(await aliasIcon.innerHTML()).toBe(await canonicalIcon.innerHTML());
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
