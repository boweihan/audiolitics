let router = require('express').Router();
let multiparty = require('multiparty');
let storageService = require('../../services/storageService');
let analyticsService = require('../../services/analyticsService');

router.post('/', (req, res) => {
  let form = new multiparty.Form();

  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });

  form.on('part', function(part) {
    if (!part.filename) {
      part.resume();
    }

    if (part.filename) {
      let buffers = [];
      part.on('data', function(buffer) {
        buffers.push(buffer);
      });

      part.on('end', async () => {
        let buffer = Buffer.concat(buffers);
        res.json(
          analyticsService.buildSingleFileAnalytics(
            await storageService.transcribeContents(buffer),
          ),
        );
        // storageService.uploadFileFromBuffer(buffer, 'test1');
      });
      part.resume();
    }

    part.on('error', function(err) {});
  });

  form.on('close', function() {});
  form.parse(req);
});

module.exports = router;
