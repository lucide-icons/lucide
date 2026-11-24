import fs from 'node:fs';
import path from 'node:path';
import type { RuleDefinition } from '@eslint/core';
import type { ValidateFunction } from 'ajv';
import { Ajv2020 } from 'ajv/dist/2020.js';
import type { ESLint, Linter, SourceCode } from 'eslint';
import { type AST, type RuleListener, getStaticJSONValue } from 'jsonc-eslint-parser';

/**
 * ESLint plugin that validates JSON files against a configured JSON Schema (draft 2020-12),
 * reporting each error at the offending property. It also requires the file's `$schema` field to
 * point at that schema.
 *
 * Off-the-shelf plugins (e.g. eslint-plugin-json-schema-validator) only run Ajv in draft-07 mode,
 * which silently skips 2020-12 keywords such as `dependentRequired`.
 */

/** A rule for the tree `jsonc-eslint-parser` produces, with `Options` as its `context.options`. */
type JsonRule<Options extends unknown[]> = RuleDefinition<{
  LangOptions: Linter.LanguageOptions;
  Code: SourceCode;
  RuleOptions: Options;
  Visitor: RuleListener;
  Node: AST.JSONNode;
  MessageIds: string;
  ExtRuleDocs: Record<string, unknown>;
}>;

const ajv = new Ajv2020({ allErrors: true });
const validators = new Map<string, ValidateFunction>();

const getValidator = (schemaPath: string) => {
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
 */
const findNode = (node: AST.JSONExpression, pointer: string) => {
  const segments = pointer
    .split('/')
    .slice(1)
    .map((segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~'));
  let current = node;
  let reportNode: AST.JSONExpression | AST.JSONProperty = node;
  for (const segment of segments) {
    if (current.type === 'JSONObjectExpression') {
      const property = current.properties.find(
        ({ key }) => ('name' in key ? key.name : key.value) === segment,
      );
      if (!property) break;
      reportNode = property;
      current = property.value;
    } else if (current.type === 'JSONArrayExpression') {
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

type Options = [
  {
    /** Path to the schema, relative to the ESLint working directory (the repo root). */
    schema: string;
  },
];

const noInvalid: JsonRule<Options> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Validate JSON files against a JSON Schema and require `$schema` to point at it',
    },
    schema: [
      {
        type: 'object',
        properties: {
          schema: { type: 'string' },
        },
        required: ['schema'],
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    return {
      Program(program) {
        const root = program.body[0]?.expression;
        if (root?.type !== 'JSONObjectExpression') {
          context.report({ node: root ?? program, message: 'Root value must be an object.' });
          return;
        }

        const data = getStaticJSONValue(root);
        if (typeof data.$schema !== 'string') {
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

          if (error.keyword === 'additionalProperties' && node.type === 'JSONObjectExpression') {
            const additionalProperty: string = error.params.additionalProperty;
            const property = findNode(
              node,
              `/${additionalProperty.replaceAll('~', '~0').replaceAll('/', '~1')}`,
            ).reportNode;
            context.report({
              node: property,
              message: `${location} has unexpected property "${additionalProperty}".`,
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

const plugin = {
  meta: { name: 'json-schema' },
  rules: { 'no-invalid': noInvalid },
} satisfies ESLint.Plugin;

export default plugin;
