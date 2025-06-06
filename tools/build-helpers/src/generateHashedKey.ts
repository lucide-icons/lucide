/* eslint-disable import/prefer-default-export */
import { hash } from './hash.mjs';

/**
 * Generate Hashed string based on name and attributes
 *
 * @param {object} seed
 * @param {string} seed.name A name, for example an icon name
 * @param {object} seed.attributes An object of SVGElement Attrbutes
 * @returns {string} A hashed string of 6 characters
 */
export const generateHashedKey = ({ name, attributes }) => hash(JSON.stringify([name, attributes]));
