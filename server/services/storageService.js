let Storage = require('@google-cloud/storage');
const speech = require('@google-cloud/speech').v1p1beta1;

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

const uploadFileFromBuffer = (buffer, fileName) => {
  const storage = new Storage();
  const bucket = storage.bucket('audiolitics-bh');
  const file = bucket.file(fileName);

  const stream = file
    .createWriteStream()
    .on('error', err => {
      console.log(err);
    })
    .on('finish', () => {
      file.makePublic().then(() => {});
    });

  stream.end(buffer);
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

const transcribeCloudFiles = () => {
  const storage = new Storage();
  const bucket = storage.bucket('audiolitics-bh');
  bucket.getFiles((err, files) => {
    if (!err) {
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        if (files[i].name === 'mp3test2.flac') {
          files[i].download((err, contents) => {});
        }
      }
    }
  });
};

const transcribeContents = contents => {
  const client = new speech.SpeechClient();
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
      console.log('GOT DATA');
      const response = data[0];
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      console.log(`Transcription: `, transcription);
    })
    .catch(err => {
      console.log('ERROR:', err);
    });
};

module.exports = {
  uploadFileFromPath,
  uploadFileFromBuffer,
  getAllFiles,
  transcribeCloudFiles,
  transcribeContents,
};
