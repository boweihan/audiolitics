let Storage = require('@google-cloud/storage');
const speech = require('@google-cloud/speech').v1p1beta1;
const language = require('@google-cloud/language');

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
  const languageCode = 'en-US';

  const config = {
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

  return new Promise((res, rej) => {
    client
      .recognize(request)
      .then(data => {
        const response = data[0];
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        res(transcription);
      })
      .catch(err => {
        rej(err);
      });
  });
};

analyzeSentiment = text => {
  const client = new language.LanguageServiceClient();
  const doc = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  return new Promise((res, rej) => {
    client
      .analyzeSentiment({ document: doc })
      .then(results => {
        const sentiment = results[0].documentSentiment;
        res(sentiment);
        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      })
      .catch(err => {
        rej(err);
      });
  });
};

analyzeSyntax = text => {
  const client = new language.LanguageServiceClient();
  const doc = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  return new Promise((res, rej) => {
    client
      .analyzeSyntax({ document: doc })
      .then(responses => {
        let response = responses[0];
        res(response);
      })
      .catch(err => {
        rej(err);
      });
  });
};

classifyText = text => {
  const client = new language.LanguageServiceClient();
  const doc = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  return new Promise((res, rej) => {
    client
      .classifyText({ document: doc })
      .then(results => {
        const classification = results[0];
        res(classification);
        classification.categories.forEach(category => {
          console.log(
            `Name: ${category.name}, Confidence: ${category.confidence}`,
          );
        });
      })
      .catch(err => {
        rej(err);
      });
  });
};

module.exports = {
  uploadFileFromPath,
  uploadFileFromBuffer,
  getAllFiles,
  transcribeCloudFiles,
  transcribeContents,
  analyzeSentiment,
  analyzeSyntax,
  classifyText,
};