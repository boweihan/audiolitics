import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import Bubble from './Bubble';

const styles = {
  container: {
    maxWidth: '100%',
  },
  column: {
    minWidth: 'calc(25vw - 40px)',
    height: 200,
    margin: 10,
    paddingRight: 0,
    paddingLeft: 0,
  },
};

class Dashboard extends PureComponent {
  render() {
    let className = this.props.singleFileResponse ? '' : 'flash';
    return (
      <Container style={styles.container}>
        <Row>
          <Col style={styles.column} className={className}>
            <Bubble />
          </Col>
          <Col style={styles.column} className={className}>
            <Bubble />
          </Col>
          <Col style={styles.column} className={className}>
            <Bubble />
          </Col>
          <Col style={styles.column} className={className}>
            <Bubble />
          </Col>
          <Col style={styles.column} className={className}>
            <Bubble />
          </Col>
          <Col style={styles.column} className={className}>
            <Bubble />
          </Col>
          <Col style={styles.column} className={className}>
            <Bubble />
          </Col>
        </Row>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  singleFileResponse: PropTypes.object,
};

export default Dashboard;
