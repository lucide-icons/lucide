import '@testing-library/jest-dom/vitest';
import htmlSerializer from 'jest-serializer-html';
import { expect } from 'vitest';

expect.addSnapshotSerializer(htmlSerializer);
