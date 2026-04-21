/// <reference types="mocha" />

import { html } from 'lit';
import { assert, fixture } from '@open-wc/testing';

import expected from './expectedShadowHtml';
import { normalizeShadowHtml } from './shadowHtml';
import createLucideIcon from '../src/createLucideIcon';
import type { Icon } from '../src/Icon';
import { airVent } from './testIconNodes';

describe('lucide-lit createLucideIcon', () => {
  it('registers and renders lucide-air-vent', async () => {
    createLucideIcon('AirVent', airVent);
    const el = await fixture<Icon & HTMLElement>(html`<lucide-air-vent></lucide-air-vent>`);
    assert.strictEqual(normalizeShadowHtml(el.shadowRoot?.innerHTML), expected['create-air-vent']);
  });

  it('applies backwards-compatible class names for a unique icon id', async () => {
    createLucideIcon('test-back-compat-icon', airVent);
    await customElements.whenDefined('lucide-test-back-compat-icon');
    const el = await fixture<Icon & HTMLElement>(html`
      <lucide-test-back-compat-icon></lucide-test-back-compat-icon>
    `);
    assert.strictEqual(normalizeShadowHtml(el.shadowRoot?.innerHTML), expected['back-compat']);
  });
});
