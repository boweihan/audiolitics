import React, { PureComponent } from 'react';
import { ResponsiveContainer, BarChart, Bar, Tooltip, XAxis } from 'recharts';
import PropTypes from 'prop-types';

const styles = {
  container: {
    backgroundColor: '#323E47',
    borderRadius: 5,
  },
};

class HigherOrderBarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={this.props.data} style={styles.container}>
          <Tooltip />
          <XAxis stroke="white" dataKey="word" />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

HigherOrderBarChart.propTypes = {
  data: PropTypes.object,
};

export default HigherOrderBarChart;
