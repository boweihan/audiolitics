import React, { PureComponent } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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
};

class FileUpload extends PureComponent {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      audioSrc: null,
    };
  }

  uploadFile = async e => {
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
        this.setState({ audioSrc: obUrl });
      }
      this.props.startUpload();
      let resp = await rest.post('/api/files', null, formData);
      this.props.finishUpload(resp);
    }
  };

  handleAudioLoad = e => {
    const duration = Math.round(e.currentTarget.duration);
    this.props.setDuration(duration);
    URL.revokeObjectURL(this.state.audioSrc);
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
              onChange={this.uploadFile}
            />
            <FormText color="muted" style={styles.formText}>
              Valid formats are .raw, .flac, .mp3
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
                (For large files this may take a while)
              </p>
              <ScaleLoader
                color="white"
                loading={this.props.loading}
                style={{ flex: 1 }}
              />
            </div>
          )}
        </Form>
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
  setDuration: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FileUpload;
