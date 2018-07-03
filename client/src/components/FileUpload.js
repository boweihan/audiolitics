import React, { PureComponent } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import rest from '../helpers/rest';
import PropTypes from 'prop-types';
import { PacmanLoader } from 'react-spinners';

const styles = {
  container: {
    padding: 20,
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
  uploadFile = async e => {
    let files = e.target.files;

    if (files.length > 0) {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append('uploads[]', file, file.name);
      }
      this.props.startUpload();
      let resp = await rest.post('/api/files', null, formData);
      this.props.finishUpload(resp);
    }
  };

  render() {
    return (
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
        <div style={{ flex: 1 }}>
          <PacmanLoader color="white" loading={this.props.loading} />
        </div>
      </Form>
    );
  }
}

FileUpload.propTypes = {
  finishUpload: PropTypes.func.isRequired,
  startUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default FileUpload;
