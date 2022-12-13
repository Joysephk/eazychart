import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ChartWrapper, buildTemplate } from '../../lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  markerArgTypes,
  flattenTabArgs,
  setTabArgs,
  cartesianChartArgTypes,
} from 'eazychart-dev/storybook/utils';
import {
  areaColors,
  evolutionData,
  animationOptions,
  padding,
} from 'eazychart-dev/storybook/data';
import { MultiAreaChart, MultiAreaChartProps } from './MultiAreaChart';
import { MULTI_Y_AXIS_CONTROLS } from 'eazychart-dev/storybook/storybook-configs';

const areaChartArgTypes = {
  ...setTabArgs(areaColors, 'colors', 'color'),
  ...MULTI_Y_AXIS_CONTROLS,
  ...markerArgTypes,
  ...baseChartArgTypes,
  ...cartesianChartArgTypes,
};

const meta: Meta = {
  id: '3',
  title: 'React/Multi Area Chart',
  component: MultiAreaChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: areaChartArgTypes,
};

export default meta;

const Template: Story<MultiAreaChartProps> = buildTemplate(
  (args: MultiAreaChartProps) => {
    return (
      <ChartWrapper>
        <MultiAreaChart {...args} />
      </ChartWrapper>
    );
  }
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const MultiArea = Template.bind({});

const defaultArguments = {
  ...flattenArgs({
    colors: ['#339999', '#993399', '#333399'],

    marker: {
      hidden: true,
      radius: 5,
      color: '#FFF',
    },
    animationOptions,
    isRTL: false,
    padding,
    dimensions: { width: 800, height: 600 },
    grid: { directions: [] },
    xAxis: {
      domainKey: 'xValue',
      title: 'Hours',
      tickFormat: (d: number) => `${d}h`,
      nice: 0,
    },
    data: evolutionData,
  }),
  yAxis: {
    domainKeys: ['yValue', 'yValue1', 'yValue2'],
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
  ...flattenTabArgs(areaColors, 'colors'),
};

MultiArea.args = defaultArguments;
