// eslint-disable-next-line object-curly-newline
import { Args, ArgTypes, Meta, Story } from '@storybook/vue';
import LineChart from '@/recipes/line/LineChart';
import LineErrorMarginChart from '@/recipes/line/LineErrorMarginChart';
import { ChartWrapper, buildTemplate } from '@/lib/storybook-utils';
import {
  flattenArgs,
  baseChartArgTypes,
  markerArgTypes,
  yAxisArgTypes,
  getArgTypesByProp,
  cartesianChartArgTypes,
} from 'eazychart-dev/storybook/utils';
import {
  animationOptions,
  colors,
  evolutionData,
  padding,
} from 'eazychart-dev/storybook/data';

const lineChartArgTypes: Partial<ArgTypes<Args>> = {
  ...getArgTypesByProp('line'),
  ...cartesianChartArgTypes,
  ...yAxisArgTypes,
  ...markerArgTypes,
  ...baseChartArgTypes,
};

const meta: Meta = {
  title: 'Vue/Line Chart',
  component: LineChart,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: lineChartArgTypes,
};
export default meta;

type LineChartProps = InstanceType<typeof LineChart>['$props'];
type LineErrorMarginChartProps = InstanceType<
  typeof LineErrorMarginChart
>['$props'];

const DefaultTemplate: Story = buildTemplate((args: LineChartProps) => ({
  title: 'Default',
  components: { LineChart, ChartWrapper },
  props: {
    allPropsFromArgs: {
      default: () => args,
    },
  },
  template: `
    <ChartWrapper>
      <LineChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
}));

const LineErrorMarginTemplate: Story = buildTemplate(
  (args: LineErrorMarginChartProps) => ({
    title: 'LineErrorMargin',
    components: { LineErrorMarginChart, ChartWrapper },
    props: {
      allPropsFromArgs: {
        default: () => args,
      },
    },
    template: `
    <ChartWrapper>
      <LineErrorMarginChart v-bind="allPropsFromArgs" />
    </ChartWrapper>
  `,
  }),
);

// By passing using the Args format for exported stories,
// you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/vue/workflows/unit-testing
export const Default = DefaultTemplate.bind({});

const defaultArguments = flattenArgs({
  line: {
    strokeWidth: 2,
    stroke: colors[1],
    curve: 'curveLinear',
    beta: 0,
  },
  isRTL: false,
  dimensions: { width: 800, height: 600 },
  marker: {
    hidden: false,
    radius: 5,
    color: '#FFF',
  },
  grid: { directions: [] },
  xAxis: {
    domainKey: 'xValue',
    title: 'Hours',
    tickFormat: (d: number) => `${d}h`,
  },
  yAxis: {
    domainKey: 'yValue',
    title: 'Temperature',
    tickFormat: (d: number) => `${d}°`,
  },
  padding,
  animationOptions,
  data: evolutionData,
});

Default.args = defaultArguments;

export const LineErrorMargin = LineErrorMarginTemplate.bind({});

LineErrorMargin.args = {
  ...defaultArguments,
  area: {
    fill: `${colors[1]}b0`,
  },
};
