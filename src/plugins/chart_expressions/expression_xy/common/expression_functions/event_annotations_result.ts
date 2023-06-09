/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Datatable, ExpressionFunctionDefinition } from '@kbn/expressions-plugin/common';
import { ExtendedAnnotationLayerConfigResult } from '../types';
import { strings } from '../i18n';
import { EXTENDED_ANNOTATION_LAYER } from '../constants';

export interface EventAnnotationResultArgs {
  layers?: ExtendedAnnotationLayerConfigResult[];
  datatable: Datatable;
}

export interface EventAnnotationResultResult {
  type: 'event_annotations_result';
  layers: ExtendedAnnotationLayerConfigResult[];
  datatable: Datatable;
}

export function eventAnnotationsResult(): ExpressionFunctionDefinition<
  'event_annotations_result',
  null,
  EventAnnotationResultArgs,
  EventAnnotationResultResult
> {
  return {
    name: 'event_annotations_result',
    aliases: [],
    type: 'event_annotations_result',
    inputTypes: ['null'],
    help: strings.getAnnotationLayerFnHelp(),
    args: {
      layers: {
        types: [EXTENDED_ANNOTATION_LAYER],
        multi: true,
        help: strings.getAnnotationLayerFnHelp(),
      },
      datatable: {
        types: ['datatable'],
        help: strings.getAnnotationLayerFnHelp(),
      },
    },
    fn: (input, args) => {
      return {
        ...args,
        type: 'event_annotations_result',
        layers: args.layers || [],
        datatable: args.datatable || {},
      };
    },
  };
}
