import React, { Component } from 'react';

// components
import NavBar from '../components/NavBar';
import Dashboard from '../components/Dashboard';
import FileUpload from '../components/FileUpload';
import Login from '../components/Login';

const styles = {
  app: {
    backgroundColor: '#253239',
    width: '100vw',
    minHeight: '100vh',
    padding: 30,
  },
};

class Home extends Component {
  // store all app state here for now
  state = {
    route: 'main',
    // singleFileResponse: null,
    singleFileResponse: {
      transcription: 'boop',
    },
    singleFileLoading: false,
  };

  setRoute = route => {
    this.setState({ route });
  };

  startUpload = () => {
    this.setState({ singleFileLoading: true });
  };

  finishUpload = resp => {
    this.setState({
      singleFileResponse: resp,
      singleFileLoading: false,
    });
  };

  render() {
    const { route, singleFileResponse, singleFileLoading } = this.state;
    return (
      <div style={styles.app}>
        <NavBar setRoute={this.setRoute} />
        {route === 'main' && (
          <FileUpload
            finishUpload={this.finishUpload}
            startUpload={this.startUpload}
            loading={singleFileLoading}
          />
        )}
        {route === 'main' && (
          <Dashboard singleFileResponse={singleFileResponse} />
        )}
        {route === 'login' && <Login />}
      </div>
    );
  }
}

export default Home;
