import { expect, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import htmlSerializer from 'jest-serializer-html';
import { cleanup } from './utils/render';

expect.addSnapshotSerializer(htmlSerializer);

afterEach(() => {
  cleanup();
});
