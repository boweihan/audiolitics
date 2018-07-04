import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import util from '../helpers/util';
import EmptyDashboard from './EmptyDashboard';
import BarChart from './BarChart';
import TextChart from './TextChart';
import AreaChart from './AreaChart';
import PieChart from './PieChart';
import RadarChart from './RadarChart';
import SingleValueChart from './SingleValueChart';

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
    paddingTop: 30,
  },
  title: {
    position: 'absolute',
    right: '0px',
    top: '-40px',
    height: 40,
    padding: '10px 20px',
    backgroundColor: '#323E47',
    color: 'white',
    zIndex: 1000,
    marginLeft: 10,
    marginBottom: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
};

class Dashboard extends PureComponent {
  render() {
    let response = this.props.singleFileResponse;
    let duration = this.props.duration;
    let loading = this.props.loading;
    return response ? (
      <Container style={styles.container} className="bounceIn">
        <Row style={styles.row}>
          <Col style={styles.column}>
            <p style={styles.title}>TRANSCRIPTION</p>
            <TextChart text={response.transcription} />
          </Col>
          <Col style={styles.column}>
            <p style={styles.title}>SPEECH RATE</p>
            <SingleValueChart
              text={util.getWPM(duration, response.transcription)}
            />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col style={styles.column}>
            <p style={styles.title}>MOST FREQUENT WORDS</p>
            <BarChart data={response.mostUsedWords} />
          </Col>
          <Col style={styles.column}>
            <p style={styles.title}>SENTIMENT</p>
            <AreaChart data={response.sentiment} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col style={styles.column}>
            <p style={styles.title}>CATEGORIES</p>
            <RadarChart data={response.categories} />
          </Col>
          <Col style={styles.column}>
            <PieChart />
          </Col>
        </Row>
      </Container>
    ) : (
      <EmptyDashboard loading={loading} />
    );
  }
}

Dashboard.propTypes = {
  singleFileResponse: PropTypes.object,
  duration: PropTypes.number,
  loading: PropTypes.bool.isRequired,
};

export default Dashboard;
