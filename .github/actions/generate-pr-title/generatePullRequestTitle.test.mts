import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { generatePullRequestTitle } from './generatePullRequestTitle.mts';

const added = (addedFiles: string[], title: string) =>
  generatePullRequestTitle({ addedFiles, changedFiles: [] }, title);

const changed = (changedFiles: string[], title: string) =>
  generatePullRequestTitle({ addedFiles: [], changedFiles }, title);

describe('generatePullRequestTitle', () => {
  describe('icon titles', () => {
    it('generates a title for a single icon and dedupes svg and json', () => {
      assert.equal(
        added(['icons/heart.svg', 'icons/heart.json'], 'add heart'),
        'feat(icons): added `heart` icon',
      );
    });

    it('lists multiple icons', () => {
      assert.equal(
        added(['icons/heart.svg', 'icons/heart-off.svg'], 'icons'),
        'feat(icons): added `heart`, `heart-off` icons',
      );
    });

    it('summarises many icons', () => {
      assert.equal(
        added(['icons/a.svg', 'icons/b.svg', 'icons/c.svg', 'icons/d.svg', 'icons/e.svg'], 'x'),
        'feat(icons): added `a`, `b`, `c` and 2 more icons',
      );
    });

    it('generates a title for lab icons', () => {
      assert.equal(added(['lab/ghost.svg'], 'x'), 'feat(lab): added `ghost` icon');
    });

    it('returns null when the title is already correct', () => {
      assert.equal(added(['icons/heart.svg'], 'feat(icons): added `heart` icon'), null);
    });

    it('ignores other changed files when an icon is added', () => {
      assert.equal(
        generatePullRequestTitle(
          { addedFiles: ['icons/heart.svg'], changedFiles: ['docs/guide.md'] },
          'x',
        ),
        'feat(icons): added `heart` icon',
      );
    });
  });

  describe('scope resolution', () => {
    it('uses the package name as scope', () => {
      assert.equal(
        changed(['packages/lucide-react/src/a.ts'], 'fix: crash'),
        'fix(lucide-react): crash',
      );
    });

    it('joins multiple packages with a pipe', () => {
      assert.equal(
        changed(['packages/vue/src/b.ts', 'packages/lucide-react/src/a.ts'], 'chore: Fix export'),
        'chore(lucide-react|@lucide/vue): Fix export',
      );
    });

    it('summarises more than three packages as `packages`', () => {
      assert.equal(
        changed(
          [
            'packages/lucide-react/a.ts',
            'packages/vue/a.ts',
            'packages/svelte/a.ts',
            'packages/angular/a.ts',
          ],
          'refactor: shared types',
        ),
        'refactor(packages): shared types',
      );
    });

    it('prefers packages over docs', () => {
      assert.equal(
        changed(['docs/guide/react.md', 'packages/lucide-react/src/a.ts'], 'feat: new prop'),
        'feat(lucide-react): new prop',
      );
    });

    it('joins docs and site scopes', () => {
      assert.equal(
        changed(['docs/guide/a.md', 'docs/.vitepress/theme/b.vue'], 'docs: update'),
        'docs(docs|site): update',
      );
    });

    it('uses `metadata` for icon and category json files', () => {
      assert.equal(changed(['icons/heart.json'], 'fix: tags'), 'fix(metadata): tags');
      assert.equal(changed(['categories/shapes.json'], 'fix: category'), 'fix(metadata): category');
    });

    it('prefers icons over metadata for changed icons', () => {
      assert.equal(
        changed(['icons/heart.svg', 'icons/heart.json'], 'fix: heart'),
        'fix(icons): heart',
      );
    });

    it('supports @lucide/solid', () => {
      assert.equal(changed(['packages/solid/src/a.ts'], 'feat: x'), 'feat(@lucide/solid): x');
    });

    it('does not match lucide-react for lucide-react-native files', () => {
      assert.equal(
        changed(['packages/lucide-react-native/src/a.ts'], 'fix: x'),
        'fix(lucide-react-native): x',
      );
    });

    it('returns null when no rule matches', () => {
      assert.equal(changed(['README.md'], 'chore: readme'), null);
    });
  });

  describe('prefix titles', () => {
    const files = ['packages/lucide-react/src/a.ts'];

    it('keeps a custom scope', () => {
      assert.equal(changed(files, 'fix(react): crash'), null);
    });

    it('extends a generated scope', () => {
      assert.equal(
        changed([...files, 'packages/vue/src/a.ts'], 'fix(lucide-react): crash'),
        'fix(lucide-react|@lucide/vue): crash',
      );
    });

    it('normalises the type casing', () => {
      assert.equal(changed(files, 'Fix: crash'), 'fix(lucide-react): crash');
    });

    it('normalises whitespace and keeps a custom scope', () => {
      assert.equal(changed(files, 'feat (react): x'), 'feat(react): x');
    });

    it('keeps the breaking-change marker', () => {
      assert.equal(changed(files, 'feat!: drop old api'), 'feat(lucide-react)!: drop old api');
    });

    it('returns null for an empty subject', () => {
      assert.equal(changed(files, 'fix:'), null);
    });

    it('falls back to the default type', () => {
      assert.equal(changed(files, 'Fix crash'), 'chore(lucide-react): Fix crash');
    });
  });
});
