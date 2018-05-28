const fs = require('fs');
const path = require('path');

logger = function() {
  this.logRequest = (req) => {
    fs.writeFile(path.resolve(__dirname,"..","logs","log.txt"), req, (err) => {
      if (err) {
        throw err;
      }
    })
  };
  this.logError = (err) => {
    fs.writeFile(path.resolve(__dirname,"logs","log.txt"), err, (errLogging) => {
      if (errLogging) {
        throw errLogging;
      }
    })
  };
}

module.exports = logger;
