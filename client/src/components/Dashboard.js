import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import EmptyDashboard from './EmptyDashboard';
import BarGraph from './BarGraph';
import TextChart from './TextChart';

const styles = {
  column: {
    minWidth: 'calc(30vw - 40px)',
    margin: 10,
    paddingRight: 0,
    paddingLeft: 0,
  },
};

class Dashboard extends PureComponent {
  render() {
    let response = this.props.singleFileResponse;
    return response ? (
      <Container style={styles.container}>
        <Row>
          <Col style={styles.column}>
            <TextChart text={response.transcription} />
          </Col>
          <Col style={styles.column}>
            <BarGraph />
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
