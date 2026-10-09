import fs from 'node:fs';
import path from 'node:path';
import { Ajv2020 } from 'ajv/dist/2020.js';
import { getStaticJSONValue } from 'jsonc-eslint-parser';

/**
 * ESLint plugin that validates JSON files against a configured JSON Schema (draft 2020-12),
 * reporting each error at the offending property. It also requires the file's `$schema` field to
 * point at that schema.
 *
 * Off-the-shelf plugins (e.g. eslint-plugin-json-schema-validator) only run Ajv in draft-07 mode,
 * which silently skips 2020-12 keywords such as `dependentRequired`.
 */

const ajv = new Ajv2020({ allErrors: true });
/** @type {Map<string, import('ajv').ValidateFunction>} */
const validators = new Map();

/** @param {string} schemaPath */
const getValidator = (schemaPath) => {
  let validate = validators.get(schemaPath);
  if (!validate) {
    validate = ajv.compile(JSON.parse(fs.readFileSync(schemaPath, 'utf-8')));
    validators.set(schemaPath, validate);
  }
  return validate;
};

/**
 * Find the AST node for a JSON pointer (e.g. `/aliases/0/name`). Returns the property node for
 * object members so the report points at the key, falling back to the closest existing parent.
 *
 * @param {any} node
 * @param {string} pointer
 */
const findNode = (node, pointer) => {
  const segments = pointer
    .split('/')
    .slice(1)
    .map((segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~'));
  let current = node;
  let reportNode = node;
  for (const segment of segments) {
    if (current?.type === 'JSONObjectExpression') {
      const property = current.properties.find(
        (/** @type {any} */ prop) => (prop.key.value ?? prop.key.name) === segment,
      );
      if (!property) break;
      reportNode = property;
      current = property.value;
    } else if (current?.type === 'JSONArrayExpression') {
      const element = current.elements[Number(segment)];
      if (!element) break;
      reportNode = element;
      current = element;
    } else {
      break;
    }
  }
  return { node: current, reportNode };
};

/** @type {import('eslint').Rule.RuleModule} */
const noInvalid = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Validate JSON files against a JSON Schema and require `$schema` to point at it',
    },
    schema: [
      {
        type: 'object',
        properties: {
          // Path to the schema, relative to the ESLint working directory (the repo root).
          schema: { type: 'string' },
        },
        required: ['schema'],
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    return {
      /** @param {any} program */
      Program(program) {
        const root = program.body[0]?.expression;
        if (root?.type !== 'JSONObjectExpression') {
          context.report({ node: root ?? program, message: 'Root value must be an object.' });
          return;
        }

        const data = getStaticJSONValue(root);
        if (typeof data?.$schema !== 'string') {
          context.report({ node: root, message: 'Missing `$schema` field.' });
          return;
        }

        // Validate against the configured schema, not whatever `$schema` points at, so a file can't
        // opt out of validation by referencing a more permissive schema.
        const schemaPath = path.resolve(context.cwd, context.options[0].schema);
        const expectedRef = path
          .relative(path.dirname(context.filename), schemaPath)
          .split(path.sep)
          .join('/');
        if (path.resolve(path.dirname(context.filename), data.$schema) !== schemaPath) {
          context.report({
            node: findNode(root, '/$schema').reportNode,
            message: `\`$schema\` must be "${expectedRef}".`,
          });
        }

        const validate = getValidator(schemaPath);
        if (validate(data)) return;

        for (const error of validate.errors ?? []) {
          const { node, reportNode } = findNode(root, error.instancePath);
          const location = error.instancePath || '(root)';

          if (error.keyword === 'additionalProperties' && node?.type === 'JSONObjectExpression') {
            const property = findNode(
              node,
              `/${error.params.additionalProperty.replaceAll('~', '~0').replaceAll('/', '~1')}`,
            ).reportNode;
            context.report({
              node: property,
              message: `${location} has unexpected property "${error.params.additionalProperty}".`,
            });
            continue;
          }

          const isContainer =
            reportNode.type === 'JSONObjectExpression' || reportNode.type === 'JSONArrayExpression';
          context.report({
            // Report objects and arrays at their opening bracket only, not their whole range.
            loc: isContainer ? reportNode.loc.start : reportNode.loc,
            message: `${location} ${error.message}.`,
          });
        }
      },
    };
  },
};

export default {
  meta: { name: 'json-schema' },
  rules: { 'no-invalid': noInvalid },
};
