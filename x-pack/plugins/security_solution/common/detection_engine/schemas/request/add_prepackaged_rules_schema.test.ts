/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { AddPrepackagedRulesSchema } from './add_prepackaged_rules_schema';
import { addPrepackagedRulesSchema } from './add_prepackaged_rules_schema';

import { exactCheck, foldLeftRight, getPaths } from '@kbn/securitysolution-io-ts-utils';
import { pipe } from 'fp-ts/lib/pipeable';
import { left } from 'fp-ts/lib/Either';
import {
  getAddPrepackagedRulesSchemaMock,
  getAddPrepackagedThreatMatchRulesSchemaMock,
} from './add_prepackaged_rules_schema.mock';
import { getListArrayMock } from '../types/lists.mock';

describe('add prepackaged rules schema', () => {
  test('empty objects do not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {};

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "description"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "risk_score"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "name"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "severity"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "rule_id"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "version"'
    );
    expect(message.schema).toEqual({});
  });

  test('made up values do not validate', () => {
    const payload: AddPrepackagedRulesSchema & { madeUp: string } = {
      ...getAddPrepackagedRulesSchemaMock(),
      madeUp: 'hi',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual(['invalid keys "madeUp"']);
    expect(message.schema).toEqual({});
  });

  test('[rule_id] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "description"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "risk_score"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "name"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "severity"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "version"'
    );
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "risk_score"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "name"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "severity"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "version"'
    );
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "risk_score"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "name"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "severity"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "version"'
    );
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from, to] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
      to: 'now',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "risk_score"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "name"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "severity"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "version"'
    );
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from, to, name] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      name: 'some-name',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "risk_score"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "severity"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "version"'
    );
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from, to, name, severity] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      name: 'some-name',
      severity: 'low',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "risk_score"'
    );
    expect(getPaths(left(message.errors))).toContain(
      'Invalid value "undefined" supplied to "version"'
    );
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from, to, name, severity, type] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      name: 'some-name',
      severity: 'low',
      type: 'query',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "risk_score"',
      'Invalid value "undefined" supplied to "version"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from, to, name, severity, type, interval] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      name: 'some-name',
      severity: 'low',
      interval: '5m',
      type: 'query',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "risk_score"',
      'Invalid value "undefined" supplied to "version"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from, to, name, severity, type, interval, index] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      name: 'some-name',
      severity: 'low',
      type: 'query',
      interval: '5m',
      index: ['index-1'],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "risk_score"',
      'Invalid value "undefined" supplied to "version"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from, to, name, severity, type, query, index, interval, version] does validate', () => {
    const payload: AddPrepackagedRulesSchema = {
      rule_id: 'rule-1',
      risk_score: 50,
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      name: 'some-name',
      severity: 'low',
      type: 'query',
      query: 'some query',
      index: ['index-1'],
      interval: '5m',
      version: 1,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('[rule_id, description, from, to, index, name, severity, interval, type, query, language] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      index: ['index-1'],
      name: 'some-name',
      severity: 'low',
      interval: '5m',
      type: 'query',
      query: 'some query',
      language: 'kuery',
      risk_score: 50,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "version"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from, to, index, name, severity, interval, type, query, language, version] does validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      index: ['index-1'],
      name: 'some-name',
      severity: 'low',
      interval: '5m',
      type: 'query',
      query: 'some query',
      language: 'kuery',
      risk_score: 50,
      version: 1,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('[rule_id, description, from, to, index, name, severity, interval, type, query, language, risk_score, output_index] does not validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> & { output_index: string } = {
      rule_id: 'rule-1',
      output_index: '.siem-signals',
      risk_score: 50,
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      index: ['index-1'],
      name: 'some-name',
      severity: 'low',
      interval: '5m',
      type: 'query',
      query: 'some query',
      language: 'kuery',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "version"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('[rule_id, description, from, to, index, name, severity, interval, type, filter, risk_score, version] does validate', () => {
    const payload: Partial<AddPrepackagedRulesSchema> = {
      rule_id: 'rule-1',
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      index: ['index-1'],
      name: 'some-name',
      severity: 'low',
      interval: '5m',
      type: 'query',
      risk_score: 50,
      version: 1,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You can send in a namespace', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      namespace: 'a namespace',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You can send in an empty array to threat', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      threat: [],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('[rule_id, description, from, to, index, name, severity, interval, type, filter, risk_score, output_index, threat] does validate', () => {
    const payload: AddPrepackagedRulesSchema = {
      rule_id: 'rule-1',
      risk_score: 50,
      description: 'some description',
      from: 'now-5m',
      to: 'now',
      index: ['index-1'],
      name: 'some-name',
      severity: 'low',
      interval: '5m',
      type: 'query',
      threat: [
        {
          framework: 'someFramework',
          tactic: {
            id: 'fakeId',
            name: 'fakeName',
            reference: 'fakeRef',
          },
          technique: [
            {
              id: 'techniqueId',
              name: 'techniqueName',
              reference: 'techniqueRef',
            },
          ],
        },
      ],
      version: 1,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('allows references to be sent as valid', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      references: ['index-1'],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('immutable cannot be set in a pre-packaged rule', () => {
    const payload: AddPrepackagedRulesSchema & { immutable: boolean } = {
      ...getAddPrepackagedRulesSchemaMock(),
      immutable: true,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual(['invalid keys "immutable"']);
    expect(message.schema).toEqual({});
  });

  test('rule_id is required', () => {
    const payload: AddPrepackagedRulesSchema = getAddPrepackagedRulesSchemaMock();
    // @ts-expect-error
    delete payload.rule_id;

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "rule_id"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('references cannot be numbers', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'references'> & { references: number[] } = {
      ...getAddPrepackagedRulesSchemaMock(),
      references: [5],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual(['Invalid value "5" supplied to "references"']);
    expect(message.schema).toEqual({});
  });

  test('indexes cannot be numbers', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'index'> & { index: number[] } = {
      ...getAddPrepackagedRulesSchemaMock(),
      index: [5],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual(['Invalid value "5" supplied to "index"']);
    expect(message.schema).toEqual({});
  });

  test('saved_query type can have filters with it', () => {
    const payload = {
      ...getAddPrepackagedRulesSchemaMock(),
      filters: [],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('filters cannot be a string', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'filters'> & { filters: string } = {
      ...getAddPrepackagedRulesSchemaMock(),
      filters: 'some string',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "some string" supplied to "filters"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('language validates with kuery', () => {
    const payload = {
      ...getAddPrepackagedRulesSchemaMock(),
      language: 'kuery',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('language validates with lucene', () => {
    const payload = {
      ...getAddPrepackagedRulesSchemaMock(),
      language: 'lucene',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('language does not validate with something made up', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'language'> & { language: string } = {
      ...getAddPrepackagedRulesSchemaMock(),
      language: 'something-made-up',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "something-made-up" supplied to "language"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('max_signals cannot be negative', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      max_signals: -1,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "-1" supplied to "max_signals"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('max_signals cannot be zero', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      max_signals: 0,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual(['Invalid value "0" supplied to "max_signals"']);
    expect(message.schema).toEqual({});
  });

  test('max_signals can be 1', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      max_signals: 1,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You can optionally send in an array of tags', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      tags: ['tag_1', 'tag_2'],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You cannot send in an array of tags that are numbers', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'tags'> & { tags: number[] } = {
      ...getAddPrepackagedRulesSchemaMock(),
      tags: [0, 1, 2],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "0" supplied to "tags"',
      'Invalid value "1" supplied to "tags"',
      'Invalid value "2" supplied to "tags"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('You cannot send in an array of threat that are missing "framework"', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'threat'> & {
      threat: Array<Partial<Omit<AddPrepackagedRulesSchema['threat'], 'framework'>>>;
    } = {
      ...getAddPrepackagedRulesSchemaMock(),
      threat: [
        {
          tactic: {
            id: 'fakeId',
            name: 'fakeName',
            reference: 'fakeRef',
          },
          technique: [
            {
              id: 'techniqueId',
              name: 'techniqueName',
              reference: 'techniqueRef',
            },
          ],
        },
      ],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "threat,framework"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('You cannot send in an array of threat that are missing "tactic"', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'threat'> & {
      threat: Array<Partial<Omit<AddPrepackagedRulesSchema['threat'], 'tactic'>>>;
    } = {
      ...getAddPrepackagedRulesSchemaMock(),
      threat: [
        {
          framework: 'fake',
          technique: [
            {
              id: 'techniqueId',
              name: 'techniqueName',
              reference: 'techniqueRef',
            },
          ],
        },
      ],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "threat,tactic"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('You can send in an array of threat that are missing "technique"', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'threat'> & {
      threat: Array<Partial<Omit<AddPrepackagedRulesSchema['threat'], 'technique'>>>;
    } = {
      ...getAddPrepackagedRulesSchemaMock(),
      threat: [
        {
          framework: 'fake',
          tactic: {
            id: 'fakeId',
            name: 'fakeName',
            reference: 'fakeRef',
          },
        },
      ],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You can optionally send in an array of false positives', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      false_positives: ['false_1', 'false_2'],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You cannot send in an array of false positives that are numbers', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'false_positives'> & {
      false_positives: number[];
    } = {
      ...getAddPrepackagedRulesSchemaMock(),
      false_positives: [5, 4],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "5" supplied to "false_positives"',
      'Invalid value "4" supplied to "false_positives"',
    ]);
    expect(message.schema).toEqual({});
  });
  test('You cannot set the risk_score to 101', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      risk_score: 101,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "101" supplied to "risk_score"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('You cannot set the risk_score to -1', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      risk_score: -1,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual(['Invalid value "-1" supplied to "risk_score"']);
    expect(message.schema).toEqual({});
  });

  test('You can set the risk_score to 0', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      risk_score: 0,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You can set the risk_score to 100', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      risk_score: 100,
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You can set meta to any object you want', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      meta: {
        somethingMadeUp: { somethingElse: true },
      },
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You cannot create meta as a string', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'meta'> & { meta: string } = {
      ...getAddPrepackagedRulesSchemaMock(),
      meta: 'should not work',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "should not work" supplied to "meta"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('validates with timeline_id and timeline_title', () => {
    const payload: AddPrepackagedRulesSchema = {
      ...getAddPrepackagedRulesSchemaMock(),
      timeline_id: 'timeline-id',
      timeline_title: 'timeline-title',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([]);
  });

  test('You cannot set the severity to a value other than low, medium, high, or critical', () => {
    const payload: Omit<AddPrepackagedRulesSchema, 'severity'> & { severity: string } = {
      ...getAddPrepackagedRulesSchemaMock(),
      severity: 'junk',
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual(['Invalid value "junk" supplied to "severity"']);
    expect(message.schema).toEqual({});
  });

  test('You cannot send in an array of actions that are missing "group"', () => {
    const payload: Omit<AddPrepackagedRulesSchema['actions'], 'group'> = {
      ...getAddPrepackagedRulesSchemaMock(),
      actions: [{ id: 'id', action_type_id: 'action_type_id', params: {} }],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "actions,group"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('You cannot send in an array of actions that are missing "id"', () => {
    const payload: Omit<AddPrepackagedRulesSchema['actions'], 'id'> = {
      ...getAddPrepackagedRulesSchemaMock(),
      actions: [{ group: 'group', action_type_id: 'action_type_id', params: {} }],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "actions,id"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('You cannot send in an array of actions that are missing "action_type_id"', () => {
    const payload: Omit<AddPrepackagedRulesSchema['actions'], 'action_type_id'> = {
      ...getAddPrepackagedRulesSchemaMock(),
      actions: [{ group: 'group', id: 'id', params: {} }],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "actions,action_type_id"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('You cannot send in an array of actions that are missing "params"', () => {
    const payload: Omit<AddPrepackagedRulesSchema['actions'], 'params'> = {
      ...getAddPrepackagedRulesSchemaMock(),
      actions: [{ group: 'group', id: 'id', action_type_id: 'action_type_id' }],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "actions,params"',
    ]);
    expect(message.schema).toEqual({});
  });

  test('You cannot send in an array of actions that are including "actionTypeId"', () => {
    const payload: Omit<AddPrepackagedRulesSchema['actions'], 'actions'> = {
      ...getAddPrepackagedRulesSchemaMock(),
      actions: [
        {
          group: 'group',
          id: 'id',
          actionTypeId: 'actionTypeId',
          params: {},
        },
      ],
    };

    const decoded = addPrepackagedRulesSchema.decode(payload);
    const checked = exactCheck(payload, decoded);
    const message = pipe(checked, foldLeftRight);
    expect(getPaths(left(message.errors))).toEqual([
      'Invalid value "undefined" supplied to "actions,action_type_id"',
    ]);
    expect(message.schema).toEqual({});
  });

  describe('note', () => {
    test('You can set note to a string', () => {
      const payload: AddPrepackagedRulesSchema = {
        ...getAddPrepackagedRulesSchemaMock(),
        note: '# documentation markdown here',
      };

      const decoded = addPrepackagedRulesSchema.decode(payload);
      const checked = exactCheck(payload, decoded);
      const message = pipe(checked, foldLeftRight);
      expect(getPaths(left(message.errors))).toEqual([]);
    });

    test('You can set note to an empty string', () => {
      const payload: AddPrepackagedRulesSchema = {
        ...getAddPrepackagedRulesSchemaMock(),
        note: '',
      };

      const decoded = addPrepackagedRulesSchema.decode(payload);
      const checked = exactCheck(payload, decoded);
      const message = pipe(checked, foldLeftRight);
      expect(getPaths(left(message.errors))).toEqual([]);
    });

    test('You cannot create note as an object', () => {
      const payload: Omit<AddPrepackagedRulesSchema, 'note'> & { note: {} } = {
        ...getAddPrepackagedRulesSchemaMock(),
        note: {
          somethingHere: 'something else',
        },
      };

      const decoded = addPrepackagedRulesSchema.decode(payload);
      const checked = exactCheck(payload, decoded);
      const message = pipe(checked, foldLeftRight);
      expect(getPaths(left(message.errors))).toEqual([
        'Invalid value "{"somethingHere":"something else"}" supplied to "note"',
      ]);
      expect(message.schema).toEqual({});
    });

    test('[rule_id, description, from, to, index, name, severity, interval, type, filter, risk_score, note] does validate', () => {
      const payload: AddPrepackagedRulesSchema = {
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        risk_score: 50,
        note: '# some markdown',
        version: 1,
      };

      const decoded = addPrepackagedRulesSchema.decode(payload);
      const checked = exactCheck(payload, decoded);
      const message = pipe(checked, foldLeftRight);
      expect(getPaths(left(message.errors))).toEqual([]);
    });
  });

  describe('exception_list', () => {
    test('[rule_id, description, from, to, index, name, severity, interval, type, filters, risk_score, note, version, and exceptions_list] does validate', () => {
      const payload: AddPrepackagedRulesSchema = {
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        filters: [],
        risk_score: 50,
        note: '# some markdown',
        version: 1,
        exceptions_list: getListArrayMock(),
      };

      const decoded = addPrepackagedRulesSchema.decode(payload);
      const checked = exactCheck(payload, decoded);
      const message = pipe(checked, foldLeftRight);
      expect(getPaths(left(message.errors))).toEqual([]);
    });

    test('[rule_id, description, from, to, index, name, severity, interval, type, filter, risk_score, note, version, and empty exceptions_list] does validate', () => {
      const payload: AddPrepackagedRulesSchema = {
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        filters: [],
        risk_score: 50,
        version: 1,
        note: '# some markdown',
        exceptions_list: [],
      };

      const decoded = addPrepackagedRulesSchema.decode(payload);
      const checked = exactCheck(payload, decoded);
      const message = pipe(checked, foldLeftRight);
      expect(getPaths(left(message.errors))).toEqual([]);
    });

    test('rule_id, description, from, to, index, name, severity, interval, type, filters, risk_score, note, version, and invalid exceptions_list] does NOT validate', () => {
      const payload = {
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        filters: [],
        risk_score: 50,
        version: 1,
        note: '# some markdown',
        exceptions_list: [{ id: 'uuid_here', namespace_type: 'not a namespace type' }],
      };

      const decoded = addPrepackagedRulesSchema.decode(payload);
      const checked = exactCheck(payload, decoded);
      const message = pipe(checked, foldLeftRight);
      expect(getPaths(left(message.errors))).toEqual([
        'Invalid value "undefined" supplied to "exceptions_list,list_id"',
        'Invalid value "undefined" supplied to "exceptions_list,type"',
        'Invalid value "not a namespace type" supplied to "exceptions_list,namespace_type"',
      ]);
      expect(message.schema).toEqual({});
    });

    test('[rule_id, description, from, to, index, name, severity, interval, type, filters, risk_score, note, version, and non-existent exceptions_list] does validate with empty exceptions_list', () => {
      const payload: AddPrepackagedRulesSchema = {
        rule_id: 'rule-1',
        description: 'some description',
        from: 'now-5m',
        to: 'now',
        index: ['index-1'],
        name: 'some-name',
        severity: 'low',
        interval: '5m',
        type: 'query',
        filters: [],
        risk_score: 50,
        version: 1,
        note: '# some markdown',
      };

      const decoded = addPrepackagedRulesSchema.decode(payload);
      const checked = exactCheck(payload, decoded);
      const message = pipe(checked, foldLeftRight);
      expect(getPaths(left(message.errors))).toEqual([]);
    });
  });

  describe('threat_mapping', () => {
    test('You can set a threat query, index, mapping, filters on a pre-packaged rule', () => {
      const payload = getAddPrepackagedThreatMatchRulesSchemaMock();
      const decoded = addPrepackagedRulesSchema.decode(payload);
      const checked = exactCheck(payload, decoded);
      const message = pipe(checked, foldLeftRight);
      expect(getPaths(left(message.errors))).toEqual([]);
    });
  });
});