import * as matchers from '@testing-library/jest-dom/matchers';
import htmlSerializer from 'jest-serializer-html';
import { expect } from 'vitest';

expect.addSnapshotSerializer(htmlSerializer);

expect.extend({
  ...matchers,
});
