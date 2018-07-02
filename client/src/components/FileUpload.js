import React, { PureComponent } from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
  render() {
    return (
      <Form style={styles.container}>
        <FormGroup>
          <Label for="exampleFile" style={styles.label}>
            Upload an audio file to get started
          </Label>
          <Input type="file" name="file" id="fileUpload" style={styles.input} />
          <FormText color="muted" style={styles.formText}>
            Valid formats are .raw, .flac, .mp3
          </FormText>
        </FormGroup>
      </Form>
    );
  }
}

export default FileUpload;
