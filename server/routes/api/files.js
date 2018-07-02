let router = require('express').Router();
let multiparty = require('multiparty');
let storageService = require('../../services/storageService');

router.get('/analyze', (req, res) => {
  res.sendStatus(200);
  storageService.transcribe();
});

router.post('/', (req, res) => {
  let form = new multiparty.Form();

  // Errors may be emitted
  // Note that if you are listening to 'part' events, the same error may be
  // emitted from the `form` and the `part`.
  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });

  // Parts are emitted when parsing the form
  form.on('part', function(part) {
    // You *must* act on the part by reading it
    // NOTE: if you want to ignore it, just call "part.resume()"

    if (!part.filename) {
      // filename is not defined when this is a field and not a file
      console.log('got field named ' + part.name);
      // ignore field's content
      part.resume();
    }

    if (part.filename) {
      let buffers = [];
      part.on('data', function(buffer) {
        buffers.push(buffer);
      });

      part.on('end', function() {
        let buffer = Buffer.concat(buffers);
        storageService.transcribeContents(buffer);
        storageService.uploadFileFromBuffer(buffer, 'test1');
      });
      part.resume();
    }

    part.on('error', function(err) {
      // decide what to do
    });
  });

  // Close emitted after form parsed
  form.on('close', function() {
    console.log('Upload completed!');
    res.end('Received files');
  });

  // Parse req
  form.parse(req);
});

module.exports = router;
