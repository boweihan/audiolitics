import React, { PureComponent } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import rest from '../helpers/rest';

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#1f282e',
    margin: 10,
    borderRadius: 3,
  },
  label: {
    color: 'white',
  },
  input: {
    color: 'lightgray',
    fontSize: '1em',
  },
};

class FileUpload extends PureComponent {
  uploadFile = e => {
    let files = e.target.files;

    if (files.length > 0) {
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append('uploads[]', file, file.name);
      }

      rest.post('/api/files', null, formData);
    }
  };

  render() {
    return (
      <Form style={styles.container}>
        <FormGroup>
          <Label for="exampleFile" style={styles.label}>
            Upload an audio file to get started
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
      </Form>
    );
  }
}

export default FileUpload;
