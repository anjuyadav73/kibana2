/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { IUiSettingsClient } from '@kbn/core/public';
import { DataPublicPluginStart, UI_SETTINGS } from '@kbn/data-plugin/public';
import type { DataView, DataViewsContract } from '@kbn/data-views-plugin/common';
import { lastValueFrom } from 'rxjs';
import { FIELD_EXISTENCE_SETTING } from '../../../common';
import { fetchFieldExistence } from '../../../common/utils/field_existing_utils';

interface FetchFieldExistenceParams {
  data: DataPublicPluginStart;
  dataView: DataView;
  fromDate: string;
  toDate: string;
  dslQuery: object;
  timeFieldName?: string;
  dataViewsService: DataViewsContract;
  uiSettingsClient: IUiSettingsClient;
}

export async function loadFieldExisting({
  data,
  dslQuery,
  fromDate,
  toDate,
  timeFieldName,
  dataViewsService,
  uiSettingsClient,
  dataView,
}: FetchFieldExistenceParams) {
  const includeFrozen = uiSettingsClient.get(UI_SETTINGS.SEARCH_INCLUDE_FROZEN);
  const useSampling = uiSettingsClient.get(FIELD_EXISTENCE_SETTING);
  const metaFields = uiSettingsClient.get(UI_SETTINGS.META_FIELDS);

  return await fetchFieldExistence({
    dslQuery,
    fromDate,
    toDate,
    timeFieldName,
    dataViewsService,
    includeFrozen,
    useSampling,
    metaFields,
    dataView,
    search: async (params) => {
      const response = await lastValueFrom(data.search.search({ params }));
      return response.rawResponse;
    },
  });
}
