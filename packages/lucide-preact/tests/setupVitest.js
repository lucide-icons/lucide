import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/preact';
import '@testing-library/jest-dom/vitest';
import htmlSerializer from 'jest-serializer-html';

expect.addSnapshotSerializer(htmlSerializer);

afterEach(() => {
  cleanup();
});
