/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { IEsSearchResponse } from '@kbn/data-plugin/server';
import type {
  ActionDetails,
  ActionDetailsStrategyResponse,
  ActionDetailsRequestOptions,
  OsqueryQueries,
} from '../../../../../../common/search_strategy/osquery';

import { inspectStringifyObject } from '../../../../../../common/utils/build_query';
import type { OsqueryFactory } from '../../types';
import { buildActionDetailsQuery } from './query.action_details.dsl';

export const actionDetails: OsqueryFactory<OsqueryQueries.actionDetails> = {
  buildDsl: (options: ActionDetailsRequestOptions) => buildActionDetailsQuery(options),
  parse: async (
    options: ActionDetailsRequestOptions,
    response: IEsSearchResponse<ActionDetails>
  ): Promise<ActionDetailsStrategyResponse> => {
    const inspect = {
      dsl: [inspectStringifyObject(buildActionDetailsQuery(options))],
    };

    return {
      ...response,
      inspect,
      actionDetails: response.rawResponse.hits.hits[0],
    };
  },
};