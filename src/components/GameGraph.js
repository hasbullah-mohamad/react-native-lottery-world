import React from 'react';
import { View } from 'react-native';
import { Colors, Metrics } from '../theme';
import BarChart from './BarChart';

const styles = {
  container: {
    paddingTop: Metrics.padding.small,
    backgroundColor: Colors.background
  }
};

const GameGraph = (props) => {
  const { data } = props;

  if (!data || data.length === 0) {
    return null;
  }
  const { width } = Metrics.dimension;
  const options = {
    width: (width - (Metrics.padding.tiny * 7)),
    height: 100,
    margin: {
      top: 20,
      left: 20,
      bottom: 50,
      right: 20
    },

    color: Colors.chartLine,
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
      gridColor: Colors.chartGrid,
      color: Colors.chartGrid,
      label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: true,
        fill: Colors.chartAxis,
        marginLeft: -4,
        rotate: -45
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'left',
      gridColor: Colors.chartGrid,
      color: Colors.chartGrid,
      label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: true,
        fill: Colors.chartAxis
      }
    }
  };

  return (
    <View style={styles.container}>
      <BarChart data={data} options={options} accessorKey="v" />
    </View>
  );
};

export default GameGraph;
