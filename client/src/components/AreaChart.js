import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';

const styles = {
  container: {
    backgroundColor: '#323E47',
    borderRadius: 5,
    borderTopRightRadius: 0,
  },
};

class HigherOrderAreaChart extends PureComponent {
  render() {
    let data = this.props.data ? this.props.data[0] : {};
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={[{ ...data }, { ...data }]}
          style={styles.container}
          baseValue={-1}
        >
          <XAxis hide={true} dataKey="name" />
          <YAxis stroke="white" domain={[-1, 1]} />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={-1} stopColor="green" stopOpacity={1} />
              <stop offset={1} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#000"
            fill="url(#splitColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

HigherOrderAreaChart.propTypes = {
  data: PropTypes.array,
};

export default HigherOrderAreaChart;
