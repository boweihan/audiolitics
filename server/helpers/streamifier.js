'use strict';

let util = require('util');
let stream = require('stream');

module.exports.createReadStream = function(object, options) {
  return new MultiStream(object, options);
};

let MultiStream = function(object, options) {
  if (object instanceof Buffer || typeof object === 'string') {
    options = options || {};
    stream.Readable.call(this, {
      highWaterMark: options.highWaterMark,
      encoding: options.encoding,
    });
  } else {
    stream.Readable.call(this, { objectMode: true });
  }
  this._object = object;
};

util.inherits(MultiStream, stream.Readable);

MultiStream.prototype._read = function() {
  this.push(this._object);
  this._object = null;
};
