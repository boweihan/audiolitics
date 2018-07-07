import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'reactstrap';

const styles = {
  container: {
    backgroundColor: '#323E47',
    width: '100%',
    height: '100%',
    borderRadius: 5,
    borderTopRightRadius: 0,
    color: 'white',
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: '7vw',
  },
};

class SingleValueChart extends PureComponent {
  render() {
    return (
      <Jumbotron style={styles.container}>
        <h3 style={styles.text}>{this.props.text}</h3>
      </Jumbotron>
    );
  }
}

SingleValueChart.propTypes = {
  text: PropTypes.string,
};

export default SingleValueChart;
