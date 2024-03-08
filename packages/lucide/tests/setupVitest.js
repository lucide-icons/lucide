import { expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import htmlSerializer from 'jest-serializer-html';

expect.addSnapshotSerializer(htmlSerializer);
