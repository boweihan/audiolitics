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
    flexDirection: 'column',
  },
  text: {
    flex: 1,
    lineHeight: '1.5em',
    fontSize: '0.8em',
    maxHeight: 300,
    overflowY: 'scroll',
    marginBottom: 0,
    wordWrap: 'break-word',
  },
  title: {
    wordWrap: 'break-word',
  },
};

class TextChart extends PureComponent {
  render() {
    return (
      <Jumbotron style={styles.container}>
        <hr className="my-2" />
        <p style={styles.text}>{this.props.text}</p>
        <hr className="my-2" />
      </Jumbotron>
    );
  }
}

TextChart.propTypes = {
  text: PropTypes.string,
};

export default TextChart;
