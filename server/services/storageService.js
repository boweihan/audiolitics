let Storage = require('@google-cloud/storage');
const speech = require('@google-cloud/speech').v1p1beta1;
const fs = require('fs');

const uploadFileFromPath = path => {
  const storage = new Storage();
  const bucket = storage.bucket('audiolitics-bh');

  bucket.upload(path, { gzip: true }, function(err, file) {
    // Your bucket now contains:
    // - "index.html" (automatically compressed with gzip)
    // Downloading the file with `file.download` will automatically decode the
    // file.
    console.log(err);
  });
};

const getAllFiles = () => {
  const storage = new Storage();
  const bucket = storage.bucket('audiolitics-bh');
  bucket.getFiles(function(err, files) {
    if (!err) {
      console.log(files);
      files[0].download(function(err, contents) {
        console.log(contents);
      });
    }
  });
};

const transcribe = () => {
  // Creates a client
  const client = new speech.SpeechClient();
  const storage = new Storage();
  const bucket = storage.bucket('audiolitics-bh');
  bucket.getFiles((err, files) => {
    if (!err) {
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        if (files[i].name === 'mp3test2.flac') {
          files[i].download((err, contents) => {
            const model = 'default';
            // const encoding = 'FLAC';
            // const sampleRateHertz = 16000;
            const languageCode = 'en-US';

            const config = {
              // encoding: encoding,
              // sampleRateHertz: sampleRateHertz,
              languageCode: languageCode,
              model: model,
            };

            const audio = {
              content: contents.toString('Base64'),
            };
            const request = {
              config: config,
              audio: audio,
            };

            // Detects speech in the audio file
            client
              .recognize(request)
              .then(data => {
                const response = data[0];
                const transcription = response.results
                  .map(result => result.alternatives[0].transcript)
                  .join('\n');
                console.log(`Transcription: `, transcription);
              })
              .catch(err => {
                console.error('ERROR:', err);
              });
          });
        }
      }
    }
  });
};

module.exports = { uploadFileFromPath, getAllFiles, transcribe };
