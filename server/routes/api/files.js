const router = require('express').Router();
const multiparty = require('multiparty');
const gcpService = require('../../services/gcpService');
const analyticsService = require('../../services/analyticsService');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const streamifier = require('../../helpers/streamifier');
const toArray = require('stream-to-array');

router.post('/', (req, res) => {
  let form = new multiparty.Form();

  form.on('error', err => {
    console.log('Error parsing form: ' + err.stack);
  });

  form.on('part', part => {
    if (!part.filename) {
      part.resume();
    }

    if (part.filename) {
      let buffers = [];
      part.on('data', buffer => {
        buffers.push(buffer);
      });

      part.on('end', async () => {
        let buffer = Buffer.concat(buffers);

        let tokens = part.filename.split('.');
        let extension = tokens.pop();

        if (extension !== 'flac') {
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
              res.status(422).send(err.message);
            })
            .on('end', async (stdout, stderr) => {
              // we've finished writing to the temp file. Let's pull it into a buffer
              // todo - we probably don't want to load the entire file in memory
              console.log('transcription finished');
              let readStream = fs.createReadStream('./temp.flac');
              toArray(readStream).then(async parts => {
                const buffers = parts.map(part => Buffer.from(part));
                let buffer = Buffer.concat(buffers);
                // res.json(
                //   await analyticsService.buildSingleFileAnalytics(
                //     await gcpService.transcribeContents(buffer),
                //   ),
                // );
                let uploadedName = `${tokens.join('')}.flac`;
                await gcpService.uploadFileFromBuffer(buffer, uploadedName);
                res.json(
                  await analyticsService.buildSingleFileAnalytics(
                    await gcpService.transcribeContentsLong(
                      `gs://audiolitics-bh/${uploadedName}`,
                    ),
                  ),
                );
              });
            })
            .pipe(
              outputStream,
              { end: true },
            );
        } else {
          res.json(
            await analyticsService.buildSingleFileAnalytics(
              await gcpService.transcribeContentsLong(buffer),
            ),
          );
        }
      });
      part.resume();
    }

    part.on('error', err => {});
  });

  form.on('close', () => {});
  form.parse(req);
});

module.exports = router;
