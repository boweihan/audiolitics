import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';

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
    return (
      <Container style={styles.container}>
        <Row>
          <Col style={styles.column}>
            <Bubble />
          </Col>
          <Col style={styles.column}>
            <Bubble />
          </Col>
          <Col style={styles.column}>
            <Bubble />
          </Col>
          <Col style={styles.column}>
            <Bubble />
          </Col>
          <Col style={styles.column}>
            <Bubble />
          </Col>
          <Col style={styles.column}>
            <Bubble />
          </Col>
          <Col style={styles.column}>
            <Bubble />
          </Col>
          <Col style={styles.column}>
            <Bubble />
          </Col>
          <Col style={styles.column}>
            <Bubble />
          </Col>
          <Col style={styles.column}>
            <Bubble />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
