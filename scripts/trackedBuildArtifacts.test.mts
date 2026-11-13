import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { describe, it } from 'node:test';

const repoRoot = new URL('..', import.meta.url);

function git(args: string[]): string {
  return execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8' });
}

describe('tracked build artifacts', () => {
  // The Angular build cache is regenerated on every build and is far larger
  // than the rest of the repository combined, so committing it bloats every
  // source archive. Guard both halves of that contract: nothing tracked, and
  // the ignore rule that keeps it from coming back.
  it('does not commit the Angular build cache', () => {
    const tracked = git(['ls-tree', '-r', '--name-only', 'HEAD', '--', 'packages/angular/.angular'])
      .split('\n')
      .filter(Boolean);

    assert.deepEqual(tracked, []);
  });

  it('keeps the Angular build cache out of version control', () => {
    const probe = 'packages/angular/.angular/cache/probe';

    assert.equal(git(['check-ignore', '--', probe]).trim(), probe);
  });
});
