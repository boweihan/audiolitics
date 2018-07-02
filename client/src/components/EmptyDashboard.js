import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';

const styles = {
  bubble: {
    backgroundColor: '#323E47',
    height: 200,
    width: '100%',
    borderRadius: 3,
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

class Bubble extends PureComponent {
  render() {
    let className;
    return (
      <Container style={styles.container}>
        <Row>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
          <Col style={styles.column} className={className}>
            <div style={styles.bubble} />
          </Col>
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

export default Bubble;
