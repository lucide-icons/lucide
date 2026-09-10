import { expect, afterEach } from 'vitest';
import { cleanup } from '@solidjs/testing-library';
import '@testing-library/jest-dom/vitest';
import htmlSerializer from 'jest-serializer-html';

expect.addSnapshotSerializer(htmlSerializer);

afterEach(() => {
  cleanup();
});
