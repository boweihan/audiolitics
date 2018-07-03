import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  Tooltip,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import PropTypes from 'prop-types';

const styles = {
  container: {
    backgroundColor: '#323E47',
    borderRadius: 5,
    color: 'white',
  },
};

class HigherOrderRadarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={this.props.data} style={styles.container}>
          <Tooltip />
          <PolarGrid />
          <PolarAngleAxis stroke="white" dataKey="name" />
          <PolarRadiusAxis />
          <Radar
            name="Confidence"
            dataKey="confidence"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}

HigherOrderRadarChart.propTypes = {
  data: PropTypes.object,
};

export default HigherOrderRadarChart;
