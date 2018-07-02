import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'reactstrap';

const styles = {
  container: {
    backgroundColor: '#323E47',
    width: '100%',
    borderRadius: 5,
    color: 'white',
  },
  text: {
    lineHeight: '1.5em',
    fontSize: '0.8em',
    maxHeight: 500,
    overflowY: 'scroll',
    marginBottom: 0,
  },
};

class BarGraph extends PureComponent {
  render() {
    return (
      <Jumbotron style={styles.container}>
        <h3>Text</h3>
        <hr className="my-2" />
        <p style={styles.text}>{this.props.text}</p>
        <hr className="my-2" />
      </Jumbotron>
    );
  }
}

BarGraph.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BarGraph;
