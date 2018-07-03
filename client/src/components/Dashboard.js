import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import EmptyDashboard from './EmptyDashboard';
import BarChart from './BarChart';
import TextChart from './TextChart';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import RadarChart from './RadarChart';

const styles = {
  container: {
    maxWidth: '100%',
  },
  column: {
    minWidth: 'calc(30vw - 40px)',
    margin: 10,
    paddingRight: 0,
    paddingLeft: 0,
  },
  row: {
    minHeight: 300,
  },
  title: {
    position: 'absolute',
    right: '30px',
    top: '10px',
    color: 'white',
    zIndex: 1000,
  },
};

class Dashboard extends PureComponent {
  render() {
    let response = this.props.singleFileResponse;
    return response ? (
      <Container style={styles.container}>
        <Row style={styles.row}>
          <Col style={styles.column}>
            <TextChart text={response.transcription} />
          </Col>
          <Col style={styles.column}>
            <p style={styles.title}>WORD FREQUENCY</p>
            <BarChart data={response.mostUsedWords} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col style={styles.column}>
            <p style={styles.title}>SENTIMENT</p>
            <AreaChart data={response.sentiment} />
          </Col>
          <Col style={styles.column}>
            <p style={styles.title}>CATEGORIES</p>
            <RadarChart data={response.categories} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col style={styles.column}>
            <PieChart />
          </Col>
        </Row>
      </Container>
    ) : (
      <EmptyDashboard />
    );
  }
}

Dashboard.propTypes = {
  singleFileResponse: PropTypes.object,
};

export default Dashboard;
