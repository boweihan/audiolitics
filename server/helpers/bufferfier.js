module.exports.createBuffer = function(stream) {
  return new Promise((resolve, reject) => {
    stream.data = []; // We'll store all the data inside this array
    stream.on('data', chunk => {
      this.data.push(chunk);
    });
    stream.on('end', () => {
      let buffer = Buffer.concat(this.data);
      resolve(buffer);
    });
    stream.on('error', e => {
      reject(e);
    });
  });
};
