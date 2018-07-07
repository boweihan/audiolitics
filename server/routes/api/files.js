const router = require('express').Router();
const multiparty = require('multiparty');
const fileService = require('../../services/fileService');

router.get('/', (req, res) => {
  if (req.session.singleFileResult) {
    let responseJSON = req.session.singleFileResult;
    delete req.session.singleFileResult;
    req.session.save();
    res.json(responseJSON);
  } else {
    res.sendStatus(204);
  }
});

router.post('/', (req, res) => {
  let duration = parseInt(req.query.duration);
  if (duration > 1120) {
    res.status(422).send('Please upload a file with duration < 2 minutes.');
  }

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
        res.sendStatus(204);
        fileService.processFile(part, buffer, req, duration);
      });
      part.resume();
    }

    part.on('error', err => {});
  });

  form.on('close', () => {});
  form.parse(req);
});

module.exports = router;
