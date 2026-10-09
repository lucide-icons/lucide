import { describe, it, expect } from 'vitest';
import { hasA11yProp } from '../src/utils/hasA11yProp';

describe('hasA11yProp', () => {
  it('returns true if props contain an aria- attribute', () => {
    expect(hasA11yProp({ 'aria-label': 'Close' })).toBe(true);
    expect(hasA11yProp({ 'aria-hidden': true })).toBe(true);
  });

  it('returns true if props contain a role attribute', () => {
    expect(hasA11yProp({ role: 'button' })).toBe(true);
  });

  it('returns true if props contain a title attribute', () => {
    expect(hasA11yProp({ title: 'Icon' })).toBe(true);
  });

  it('returns false if props do not contain any a11y attributes', () => {
    expect(hasA11yProp({ className: 'foo', id: 'bar' })).toBe(false);
    expect(hasA11yProp({})).toBe(false);
  });

  it('returns true if multiple a11y props are present', () => {
    expect(hasA11yProp({ 'aria-label': 'Close', role: 'button', title: 'Close icon' })).toBe(true);
  });

  it('returns true if a11y prop is present among other props', () => {
    expect(hasA11yProp({ className: 'foo', 'aria-label': 'Close' })).toBe(true);
  });
});
