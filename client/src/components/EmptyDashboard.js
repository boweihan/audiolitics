import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

const styles = {
  bubble: {
    backgroundColor: '#323E47',
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  row: {
    minHeight: 300,
  },
  container: {
    maxWidth: '100%',
  },
  column: {
    minWidth: 'calc(30vw - 40px)',
    margin: 10,
    paddingRight: 0,
    paddingLeft: 0,
  },
};

class EmptyDashboard extends PureComponent {
  render() {
    let className = this.props.loading ? 'flash' : '';
    return (
      <Container style={styles.container}>
        <Row style={styles.row}>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
        </Row>
      </Container>
    );
  }
}

EmptyDashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default EmptyDashboard;
