import React, { PureComponent } from 'react';
import { Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import rest from '../helpers/rest';
import PropTypes from 'prop-types';
import { ScaleLoader } from 'react-spinners';

const styles = {
  container: {
    padding: 20,
    height: 200,
    backgroundColor: '#1f282e',
    margin: 10,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    color: 'white',
  },
  input: {
    color: 'lightgray',
    fontSize: '1em',
  },
  formText: {
    marginTop: 10,
    fontSize: '1em',
  },
  errorBar: {
    margin: '10px 20px',
    marginTop: 20,
    padding: '5px 20px',
    opacity: 0.8,
  },
};

class FileUpload extends PureComponent {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      audioSrc: null,
      formData: null,
    };
  }

  handleUpload = async e => {
    this.props.setError(null); // reset error
    let files = e.target.files;
    if (files.length > 0) {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append('uploads[]', file, file.name);
      }
      // get a duration for the audio file
      if (files[0].name.match(/\.(avi|mp3|mp4|mpeg|ogg|flac|wav)$/i)) {
        let obUrl = URL.createObjectURL(files[0]);
        this.setState({ audioSrc: obUrl, formData });
      } else {
        this.props.setError('Please upload a valid audio file');
      }
    }
  };

  handleAudioLoad = e => {
    const duration = Math.round(e.currentTarget.duration);
    this.uploadFile(duration);
    URL.revokeObjectURL(this.state.audioSrc);
  };

  uploadFile = async duration => {
    this.props.startUpload();
    try {
      let response = await rest.postWithAxios(
        this.state.formData,
        `/api/files?duration=${duration}`,
      );
      if (response && response.status === 204) {
        let pollForResult = () => {
          setTimeout(async () => {
            let response = await rest.getWithAxios('api/files');
            if (response && response.status === 204) {
              pollForResult();
            } else if (response && response.status === 200) {
              this.props.finishUpload(response.data);
            }
          }, 5000);
        };
        pollForResult();
      } else if (response && response.status === 200) {
        this.props.finishUpload(response.data);
      }
    } catch (e) {
      this.props.finishUpload(null);
      this.props.setError(e.response.data);
    }
  };

  render() {
    return (
      <div>
        <Form style={styles.container}>
          <FormGroup style={{ flex: 1, marginBottom: 0 }}>
            <Label for="exampleFile" style={styles.label}>
              Upload an audio file to begin generating insights
            </Label>
            <Input
              type="file"
              name="file"
              id="fileUpload"
              style={styles.input}
              onChange={this.handleUpload}
            />
            <FormText color="muted" style={styles.formText}>
              For best performance, upload a .flac file
            </FormText>
          </FormGroup>
          {this.props.loading && (
            <div
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: 20,
              }}
            >
              <p style={{ color: 'white', fontSize: '1em', marginBottom: 0 }}>
                PROCESSING...
              </p>
              <p style={{ color: 'white', fontSize: '0.7em' }}>
                (This may take a while for larger files or files that must be
                decoded (i.e. mp3, mp4))
              </p>
              <ScaleLoader
                color="white"
                loading={this.props.loading}
                style={{ flex: 1 }}
              />
            </div>
          )}
        </Form>
        {this.props.error && (
          <Alert color="danger" style={styles.errorBar}>
            {this.props.error}
          </Alert>
        )}
        <audio
          id="audio"
          onCanPlayThrough={this.handleAudioLoad}
          src={this.state.audioSrc}
          ref={this.audioRef}
        />
      </div>
    );
  }
}

FileUpload.propTypes = {
  finishUpload: PropTypes.func.isRequired,
  startUpload: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default FileUpload;
