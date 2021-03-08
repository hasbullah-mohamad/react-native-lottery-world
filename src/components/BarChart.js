import React, { Component } from 'react';
import { Text as ReactText } from 'react-native';
import Svg, { G, Path, Text } from 'react-native-svg';
import {
  Colors, Options, fontAdapt, cyclic, color, identity
} from 'react-native-pathjs-charts/src/util';
import _ from 'lodash';
import Axis from 'react-native-pathjs-charts/src/Axis';
import 'babel-polyfill';

const Bar = require('paths-js/bar');

export default class BarChart extends Component {
    static defaultProps = {
      accessorKey: '',
      options: {
        width: 600,
        height: 600,
        margin: {
          top: 20, left: 20, bottom: 50, right: 20
        },
        color: '#2980B9',
        gutter: 20,
        animate: {
          type: 'oneByOne',
          duration: 200,
          fillTransition: 3
        },
        axisX: {
          showAxis: true,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: false,
          orient: 'bottom',
          label: {
            fontFamily: 'Arial',
            fontSize: 14,
            bold: true,
            color: '#34495E',
            rotate: 45
          }
        },
        axisY: {
          min: false,
          max: false,
          showAxis: true,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: false,
          orient: 'left',
          label: {
            fontFamily: 'Arial',
            fontSize: 14,
            bold: true,
            color: '#34495E'
          }
        }
      }
    }

    getMaxAndMin(values, scale) {
      const { axisY } = this.props.options;
      let maxValue = axisY.max || 0;
      let minValue = axisY.min || 0;

      const max = _.max(values);
      if (max > maxValue) maxValue = max;
      const min = _.min(values);
      if (min < minValue) minValue = min;

      return {
        minValue,
        maxValue,
        min: scale(minValue),
        max: scale(maxValue)
      };
    }

    color(i) {
      let { color } = this.props.options;
      if (!_.isString(this.props.options.color)) {
        color = color.color;
      }
      const pallete = this.props.pallete || Colors.mix(color || '#9ac7f7');
      return Colors.string(cyclic(pallete, i));
    }

    render() {
      const noDataMsg = this.props.noDataMessage || 'No data available';
      if (this.props.data === undefined) return (<ReactText>{noDataMsg}</ReactText>);

      const options = new Options(this.props);
      const accessor = this.props.accessor || identity(this.props.accessorKey);

      const chart = Bar({
        data: this.props.data,
        gutter: this.props.options.gutter || 10,
        width: options.chartWidth,
        height: options.chartHeight,
        accessor,
        min: this.props.options.axisY.min || undefined,
        max: this.props.options.axisY.max || undefined
      });

      const values = chart.curves.map(curve => accessor(curve.item));
      const chartArea = {
        x: {
          minValue: 0, maxValue: 200, min: 0, max: options.chartWidth
        },
        y: this.getMaxAndMin(values, chart.scale),
        margin: options.margin
      };

      const textStyle = fontAdapt(options.axisX.label);
      const labelOffset = this.props.options.axisX.label.offset || 20;

      const curvesLength = chart.curves.length;

      let curvesStep = parseInt(Math.round(curvesLength / 12), 0);
      if (curvesStep === 0) {
        curvesStep = 1;
      }

      const lines = chart.curves.map((c, i) => {
        const numDataGroups = this.props.data.length || 0;
        const colorVariationVal = numDataGroups > 1 ? numDataGroups : 3;
        const color = this.color(i % colorVariationVal);
        const stroke = Colors.darkenColor(color);
        return (
          <G key={`lines${i}`}>
            <Path d={c.line.path.print()} stroke={stroke} fill={color} />
            {(options.axisX.showLabels && i % curvesStep === 0)
              ? (
                <Text
                  fontFamily={textStyle.fontFamily}
                  fontSize={textStyle.fontSize}
                  fontWeight={textStyle.fontWeight}
                  fontStyle={textStyle.fontStyle}
                  fill={textStyle.fill}
                  x={c.line.centroid[0]}
                  y={labelOffset + chartArea.y.min}
                  originX={c.line.centroid[0]}
                  originY={labelOffset + chartArea.y.min}
                  rotate={textStyle.rotate}
                  textAnchor="middle">
                  {c.item.name}
                </Text>
              )
              : null}
          </G>
        );
      }, this);

      return (
        <Svg width={options.width} height={options.height}>
          <G x={options.margin.left} y={options.margin.top}>
            <Axis scale={chart.scale} options={options.axisY} chartArea={chartArea} />
            {lines}
          </G>
        </Svg>
      );
    }
}
