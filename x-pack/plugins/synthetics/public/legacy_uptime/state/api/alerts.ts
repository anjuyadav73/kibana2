/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { ActionType, AsApiContract, Rule } from '@kbn/triggers-actions-ui-plugin/public';
import { RuleTypeParams } from '@kbn/alerting-plugin/common';
import { CLIENT_ALERT_TYPES } from '../../../../common/constants/alerts';
import { apiService } from './utils';
import { ActionConnector } from '../alerts/alerts';

import { AlertsResult, MonitorIdParam } from '../actions/types';
import { API_URLS } from '../../../../common/constants';
import { AtomicStatusCheckParams } from '../../../../common/runtime_types/alerts';

import { populateAlertActions, RuleAction } from './alert_actions';
import { Ping } from '../../../../common/runtime_types/ping';
import { DefaultEmail } from '../../../../common/runtime_types';

const UPTIME_AUTO_ALERT = 'UPTIME_AUTO';

export const fetchConnectors = async (): Promise<ActionConnector[]> => {
  const response = (await apiService.get(API_URLS.RULE_CONNECTORS)) as Array<
    AsApiContract<ActionConnector>
  >;
  return response.map(
    ({
      connector_type_id: actionTypeId,
      referenced_by_count: referencedByCount,
      is_preconfigured: isPreconfigured,
      is_deprecated: isDeprecated,
      is_missing_secrets: isMissingSecrets,
      ...res
    }) => ({
      ...res,
      actionTypeId,
      referencedByCount,
      isDeprecated,
      isPreconfigured,
      isMissingSecrets,
    })
  );
};

export interface NewAlertParams extends RuleTypeParams {
  selectedMonitor: Ping;
  defaultActions: ActionConnector[];
  defaultEmail?: DefaultEmail;
}

type NewMonitorStatusAlert = Omit<
  Rule<AtomicStatusCheckParams>,
  | 'id'
  | 'createdBy'
  | 'updatedBy'
  | 'createdAt'
  | 'updatedAt'
  | 'apiKey'
  | 'apiKeyOwner'
  | 'muteAll'
  | 'mutedInstanceIds'
  | 'executionStatus'
  | 'ruleTypeId'
  | 'notifyWhen'
  | 'actions'
> & {
  rule_type_id: Rule<AtomicStatusCheckParams>['ruleTypeId'];
  notify_when: Rule<AtomicStatusCheckParams>['notifyWhen'];
  actions: RuleAction[];
};

export const createAlert = async ({
  defaultActions,
  monitorId,
  selectedMonitor,
  defaultEmail,
}: NewAlertParams): Promise<Rule> => {
  const actions: RuleAction[] = populateAlertActions({
    defaultActions,
    selectedMonitor,
    defaultEmail,
  });

  const data: NewMonitorStatusAlert = {
    actions,
    params: {
      numTimes: 1,
      timerangeUnit: 'm',
      timerangeCount: 1,
      shouldCheckStatus: true,
      shouldCheckAvailability: false,
      isAutoGenerated: true,
      search: `monitor.id : ${monitorId} `,
      filters: { 'url.port': [], 'observer.geo.name': [], 'monitor.type': [], tags: [] },
    },
    consumer: 'uptime',
    rule_type_id: CLIENT_ALERT_TYPES.MONITOR_STATUS,
    schedule: { interval: '1m' },
    notify_when: 'onActionGroupChange',
    tags: [UPTIME_AUTO_ALERT],
    name: `${selectedMonitor?.monitor.name || selectedMonitor?.url?.full}(Simple status alert)`,
    enabled: true,
    throttle: null,
  };

  return await apiService.post(API_URLS.CREATE_RULE, data);
};

export const fetchMonitorAlertRecords = async (): Promise<AlertsResult> => {
  const data = {
    page: 1,
    per_page: 500,
    filter: `alert.attributes.alertTypeId:(${CLIENT_ALERT_TYPES.MONITOR_STATUS})`,
    default_search_operator: 'AND',
    sort_field: 'name.keyword',
    sort_order: 'asc',
    search_fields: ['name', 'tags'],
    search: 'UPTIME_AUTO',
  };
  return await apiService.get(API_URLS.RULES_FIND, data);
};

export const fetchAnomalyAlertRecords = async ({
  monitorId,
}: MonitorIdParam): Promise<Rule<NewAlertParams> | undefined> => {
  const data = {
    page: 1,
    per_page: 500,
    filter: `alert.attributes.alertTypeId:(${CLIENT_ALERT_TYPES.DURATION_ANOMALY})`,
    default_search_operator: 'AND',
    sort_field: 'name.keyword',
    sort_order: 'asc',
  };
  const rawRules = await apiService.get<{
    data: Array<Rule<NewAlertParams> & { rule_type_id: string }>;
  }>(API_URLS.RULES_FIND, data);
  const monitorRule = rawRules.data.find(
    (rule) => rule.params.monitorId === monitorId
  ) as Rule<NewAlertParams> & { rule_type_id: string };
  if (monitorRule) {
    return {
      ...monitorRule,
      ruleTypeId: monitorRule.rule_type_id,
    };
  }
};

export const disableAlertById = async ({ alertId }: { alertId: string }) => {
  return await apiService.delete(API_URLS.DELETE_RULE + alertId);
};

export const fetchActionTypes = async (): Promise<ActionType[]> => {
  const response = (await apiService.get(API_URLS.CONNECTOR_TYPES, {
    feature_id: 'uptime',
  })) as Array<AsApiContract<ActionType>>;
  return response.map<ActionType>(
    ({
      enabled_in_config: enabledInConfig,
      enabled_in_license: enabledInLicense,
      minimum_license_required: minimumLicenseRequired,
      supported_feature_ids: supportedFeatureIds,
      ...res
    }: AsApiContract<ActionType>) => ({
      ...res,
      enabledInConfig,
      enabledInLicense,
      minimumLicenseRequired,
      supportedFeatureIds,
    })
  );
};