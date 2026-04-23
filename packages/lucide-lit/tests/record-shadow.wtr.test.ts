/// <reference types="mocha" />

import { html } from 'lit';
import { elementUpdated, fixture, waitUntil } from '@open-wc/testing';

import { normalizeShadowHtml } from './shadowHtml';
import { airVent } from './testIconNodes';
import { Icon } from '../src/Icon';
import createLucideIcon from '../src/createLucideIcon';
import type { Icon as IconType } from '../src/Icon';

describe('record shadow fixtures', () => {
  before(() => {
    if (!customElements.get('test-lucide-icon')) {
      customElements.define('test-lucide-icon', Icon);
    }
  });

  it('writes normalized shadow HTML for tests/expectedShadowHtml.ts', async () => {
    const cases: [string, string][] = [];

    const a = await fixture<IconType>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
      ></test-lucide-icon>
    `);
    cases.push(['default', a.shadowRoot?.innerHTML ?? '']);

    const b = await fixture<IconType>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
        aria-label="Air conditioning"
      ></test-lucide-icon>
    `);
    cases.push(['aria-label', b.shadowRoot?.innerHTML ?? '']);

    const c = await fixture<IconType>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
        title="Air conditioning"
      ></test-lucide-icon>
    `);
    cases.push(['title', c.shadowRoot?.innerHTML ?? '']);

    const d = await fixture<IconType>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
        aria-hidden="false"
      ></test-lucide-icon>
    `);
    cases.push(['aria-hidden-false', d.shadowRoot?.innerHTML ?? '']);

    const e = await fixture<IconType>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
      >
        <span>slotted</span>
      </test-lucide-icon>
    `);
    await elementUpdated(e);
    await waitUntil(() => {
      const svg = e.shadowRoot?.querySelector('svg');
      return !!(svg && !svg.hasAttribute('aria-hidden'));
    });
    cases.push(['slotted-span', e.shadowRoot?.innerHTML ?? '']);

    createLucideIcon('AirVent', airVent);
    const f = await fixture(html`<lucide-air-vent></lucide-air-vent>`);
    cases.push(['create-air-vent', (f as HTMLElement & IconType).shadowRoot?.innerHTML ?? '']);

    createLucideIcon('test-back-compat-icon', airVent);
    await customElements.whenDefined('lucide-test-back-compat-icon');
    const g = await fixture(html`<lucide-test-back-compat-icon></lucide-test-back-compat-icon>`);
    cases.push(['back-compat', (g as HTMLElement & IconType).shadowRoot?.innerHTML ?? '']);

    const normalized = Object.fromEntries(cases.map(([k, v]) => [k, normalizeShadowHtml(v)]));

    console.log('NORM_JSON_START');
    console.log(JSON.stringify(normalized));
    console.log('NORM_JSON_END');
  });
});
