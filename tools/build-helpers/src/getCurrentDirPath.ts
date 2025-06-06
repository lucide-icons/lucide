/* eslint-disable import/prefer-default-export */
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Get the current directory path.
 *
 * @param {string} currentPath
 * @returns {string}
 */
export const getCurrentDirPath = (currentPath) => path.dirname(fileURLToPath(currentPath));
