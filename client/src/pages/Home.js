import React, { Component } from 'react';

// components
import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard';
import FileUpload from '../components/FileUpload';

const styles = {
  app: {
    backgroundColor: '#253239',
    width: '100vw',
    padding: 10,
  },
};

class Home extends Component {
  render() {
    return (
      <div style={styles.app}>
        <NavBar />
        <FileUpload />
        <Dashboard />
      </div>
    );
  }
}

export default Home;
