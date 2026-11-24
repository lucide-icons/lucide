import type { RuleDefinition } from '@eslint/core';
import type { Linter, SourceCode } from 'eslint';
import type { Attribute, Element, Other, Program, Text } from './parser.ts';

/** ESLint gives every node a `parent` while it walks the tree. */
export type ElementNode = Element & { parent: ElementNode | Program };

type Visitor = {
  Program?: (node: Program) => void;
  Element?: (node: ElementNode) => void;
  Attribute?: (node: Attribute) => void;
  Text?: (node: Text) => void;
  CData?: (node: Other) => void;
};

/** A rule for the tree `parser.ts` produces, with `Options` as its `context.options`. */
export type SvgRule<Options extends unknown[] = []> = RuleDefinition<{
  LangOptions: Linter.LanguageOptions;
  Code: SourceCode;
  RuleOptions: Options;
  Visitor: Visitor;
  Node: Program | Element | Attribute | Text | Other;
  MessageIds: string;
  ExtRuleDocs: Record<string, unknown>;
}>;
