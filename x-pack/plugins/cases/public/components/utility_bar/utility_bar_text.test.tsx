/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { shallow } from 'enzyme';
import React from 'react';

import { TestProviders } from '../../common/mock';
import { UtilityBarText } from '.';

describe('UtilityBarText', () => {
  test('it renders', () => {
    const wrapper = shallow(
      <TestProviders>
        <UtilityBarText>{'Test text'}</UtilityBarText>
      </TestProviders>
    );

    expect(wrapper.find('UtilityBarText')).toMatchSnapshot();
  });
});
