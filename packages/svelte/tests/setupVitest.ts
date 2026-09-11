import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import htmlSerializer from 'jest-serializer-html';

expect.extend(matchers);
expect.addSnapshotSerializer(htmlSerializer);
