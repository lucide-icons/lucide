/// <reference types="mocha" />

import { html } from 'lit';
import { assert, elementUpdated, fixture } from '@open-wc/testing';

import expected from './expectedShadowHtml';
import { normalizeShadowHtml } from './shadowHtml';
import { airVent } from './testIconNodes';
import { Icon } from '../src/Icon';

describe('lucide-lit Icon', () => {
  before(() => {
    if (!customElements.get('test-lucide-icon')) {
      customElements.define('test-lucide-icon', Icon);
    }
  });

  it('renders from iconNode with size, color, and absoluteStrokeWidth', async () => {
    const el = await fixture<Icon>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
      ></test-lucide-icon>
    `);
    assert.strictEqual(normalizeShadowHtml(el.shadowRoot?.innerHTML), expected.default);
  });

  it('does not set aria-hidden when aria-label is set', async () => {
    const el = await fixture<Icon>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
        aria-label="Air conditioning"
      ></test-lucide-icon>
    `);
    assert.strictEqual(normalizeShadowHtml(el.shadowRoot?.innerHTML), expected['aria-label']);
  });

  it('does not set aria-hidden when title is set', async () => {
    const el = await fixture<Icon>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
        title="Air conditioning"
      ></test-lucide-icon>
    `);
    assert.strictEqual(normalizeShadowHtml(el.shadowRoot?.innerHTML), expected.title);
  });

  it('respects aria-hidden=false', async () => {
    const el = await fixture<Icon>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
        aria-hidden="false"
      ></test-lucide-icon>
    `);
    assert.strictEqual(
      normalizeShadowHtml(el.shadowRoot?.innerHTML),
      expected['aria-hidden-false'],
    );
  });

  it('does not set aria-hidden when default slot has element content', async () => {
    const el = await fixture<Icon>(html`
      <test-lucide-icon
        .iconNode=${airVent}
        .size=${48}
        .color=${'red'}
        .absoluteStrokeWidth=${true}
      >
        <span>slotted</span>
      </test-lucide-icon>
    `);
    await elementUpdated(el);
    assert.strictEqual(normalizeShadowHtml(el.shadowRoot?.innerHTML), expected['slotted-span']);
  });
});
