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

  it('returns false when props is null, undefined, or a non-object', () => {
    expect(hasA11yProp(null)).toBe(false);
    expect(hasA11yProp(undefined)).toBe(false);
    expect(hasA11yProp()).toBe(false);
    expect(hasA11yProp('not-an-object' as unknown as object)).toBe(false);
    expect(hasA11yProp(123 as unknown as object)).toBe(false);
  });

  it('returns false when a11y props are explicitly undefined or null', () => {
    expect(hasA11yProp({ 'aria-label': undefined })).toBe(false);
    expect(hasA11yProp({ role: null })).toBe(false);
    expect(hasA11yProp({ title: undefined, 'aria-hidden': null })).toBe(false);
  });

  it('ignores inherited properties on the prototype chain', () => {
    const proto = { 'aria-label': 'Inherited' };
    const props = Object.create(proto);
    props.className = 'icon';
    expect(hasA11yProp(props)).toBe(false);
  });
});
