import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import EmptyDashboard from './EmptyDashboard';
import BarChart from './BarChart';
import TextChart from './TextChart';
import AreaChart from './AreaChart';
import RadarChart from './RadarChart';
import SingleValueChart from './SingleValueChart';

const styles = {
  container: {
    maxWidth: '100%',
  },
  column: {
    minWidth: 'calc(30vw - 40px)',
    border: '10px solid #253239',
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 30,
    minHeight: 300,
  },
  row: {
    minHeight: 300,
  },
  title: {
    position: 'absolute',
    right: '0px',
    top: '-10px',
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
    let loading = this.props.loading;
    return response ? (
      <Container style={styles.container} className="bounceIn">
        <Row style={styles.row}>
          <Col xs="12" sm="6" style={styles.column}>
            <p style={styles.title}>TRANSCRIPTION</p>
            <TextChart text={response.transcription} />
          </Col>
          <Col xs="12" sm="6" style={styles.column}>
            <p style={styles.title}>SPEECH RATE</p>
            <SingleValueChart text={response.wpm} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col xs="12" sm="6" style={styles.column}>
            <p style={styles.title}>MOST FREQUENT WORDS</p>
            <BarChart data={response.mostUsedWords} />
          </Col>
          <Col xs="12" sm="6" style={styles.column}>
            <p style={styles.title}>SENTIMENT</p>
            <AreaChart data={response.sentiment} />
          </Col>
        </Row>
        <Row style={styles.row}>
          <Col xs="12" sm="6" style={styles.column}>
            <p style={styles.title}>CATEGORIES</p>
            <RadarChart data={response.categories} />
          </Col>
          <Col xs="12" sm="6" style={styles.column}>
            <p style={styles.title}>MENTIONED ENTITIES</p>
            <TextChart text={response.entities.join(', ')} />
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
  loading: PropTypes.bool.isRequired,
};

export default Dashboard;
