/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import * as t from 'io-ts';
import { get } from 'lodash/fp';
import type {
  Meta,
  Name,
  RuleNameOverrideOrUndefined,
} from '../../../../../common/detection_engine/schemas/common/schemas';
import type { SignalSource } from '../types';

interface BuildRuleNameFromMappingProps {
  eventSource: SignalSource;
  ruleName: Name;
  ruleNameMapping: RuleNameOverrideOrUndefined;
}

interface BuildRuleNameFromMappingReturn {
  ruleName: Name;
  ruleNameMeta: Meta; // TODO: Stricter types
}

export const buildRuleNameFromMapping = ({
  eventSource,
  ruleName,
  ruleNameMapping,
}: BuildRuleNameFromMappingProps): BuildRuleNameFromMappingReturn => {
  if (ruleNameMapping != null) {
    // TODO: Expand by verifying fieldType from index via doc._index
    const mappedValue = get(ruleNameMapping, eventSource);
    if (t.string.is(mappedValue)) {
      return { ruleName: mappedValue, ruleNameMeta: { ruleNameOverridden: true } };
    }
  }

  return { ruleName, ruleNameMeta: {} };
};
