let router = require('express').Router();
let path = require('path');
let fs = require('fs');
let formidable = require('formidable');
let storageService = require('../../services/storageService');

router.get('/', (req, res) => {
  res.sendStatus(200);
  storageService.getAllFiles();
});

router.post('/', (req, res) => {
  // create an incoming form object
  let form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../../uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's original name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name), () => {});
    // storageService.uploadFileFromPath(path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
});

module.exports = router;
