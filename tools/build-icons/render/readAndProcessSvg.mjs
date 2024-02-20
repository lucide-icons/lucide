/* eslint-disable import/prefer-default-export */
import path from 'path';
import { readSvg } from '@lucide/helpers';
import processSvg from './processSvg.mjs';

/**
 * Read and process svg from directory
 *
 * @param {string} fileName
 * @param {string} directory
 * @returns {Promise<string>} An optimized svg
 */
const readAndProcessSvg = async (fileName, directory) =>
  await processSvg(readSvg(fileName, directory), path.join(directory, fileName));

export default readAndProcessSvg;
