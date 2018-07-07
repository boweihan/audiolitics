const gcpService = require('./gcpService');
const analyticsService = require('./analyticsService');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const streamifier = require('../helpers/streamifier');
const toArray = require('stream-to-array');

const processFile = async (part, buffer, req, duration) => {
  let tokens = part.filename.split('.');
  let extension = tokens.pop();
  let uploadName = `${tokens.join('')}.flac`;
  if (extension !== 'flac') {
    console.log('processing extension');

    // file isn't flac coming in, try to convert it to a flac file
    let outputStream = fs.createWriteStream('./temp.flac');
    ffmpeg()
      .input(streamifier.createReadStream(buffer))
      .format('flac')
      .audioChannels(1)
      .on('error', (err, stdout, stderr) => {
        console.log('Error: ' + err.message);
        console.log('ffmpeg output:\n' + stdout);
        console.log('ffmpeg stderr:\n' + stderr);
      })
      .on('end', async (stdout, stderr) => {
        // we've finished writing to the temp file. Let's pull it into a buffer
        // todo - we probably don't want to load the entire file in memory
        console.log('transcription finished');
        let readStream = fs.createReadStream('./temp.flac');
        toArray(readStream).then(async parts => {
          const buffers = parts.map(part => Buffer.from(part));
          let buffer = Buffer.concat(buffers);

          let singleFileResult = await transcribeBasedOnDuration(
            duration,
            buffer,
            uploadName,
          );

          // use express sessions to store result
          req.session.singleFileResult = singleFileResult;
          req.session.save();
        });
      })
      .pipe(
        outputStream,
        { end: true },
      );
  } else {
    let singleFileResult = await transcribeBasedOnDuration(
      duration,
      buffer,
      uploadName,
    );

    // use express sessions to store result
    req.session.singleFileResult = singleFileResult;
    req.session.save();
  }
};

const transcribeBasedOnDuration = async (duration, buffer, uploadName) => {
  let singleFileResult;
  if (duration > 60) {
    console.log('processing long file');
    await gcpService.uploadFileFromBuffer(buffer, uploadName);
    singleFileResult = await analyticsService.buildSingleFileAnalytics(
      await gcpService.transcribeContentsLong(
        `gs://audiolitics-bh/${uploadName}`,
      ),
      duration,
    );
  } else {
    console.log('processing short file');
    singleFileResult = await analyticsService.buildSingleFileAnalytics(
      await gcpService.transcribeContents(buffer),
      duration,
    );
  }
  return singleFileResult;
};

module.exports = { processFile };
