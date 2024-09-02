/* eslint-disable import/prefer-default-export */
import path from 'path';
import { readSvg } from '@lucide/helpers';
import processSvg from './processSvg.mjs';

/**
 * Read and process svg from directory
 *
 * @param {string} fileName
 * @param {string} directory
 * @param {boolean} flatten
 * @returns {Promise<string>} An optimized svg
 */
const readAndProcessSvg = async (fileName, directory, flatten) =>
  await processSvg(readSvg(fileName, directory), path.join(directory, fileName), flatten);

export default readAndProcessSvg;
