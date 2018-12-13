const http = require('http');
const fs = require('fs');


http.createServer(function(req, res) {
    // This line opens the file as a readable stream
    const readStream = fs.createReadStream('./index.html');
  
    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
      // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe(res);
    });
  
    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
      res.end(err);
    });
  }).listen(8008);