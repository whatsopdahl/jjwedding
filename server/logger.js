const fs = require('fs');
const path = require('path');

logger = {
  logRequest: function(req) {
    fs.writeFile(path.resolve(__dirname,"..","logs","log.txt"), req, (err) => {
      if (err) {
        throw err;
      }
    })
  },
  logError: function(err) {
    fs.writeFile(path.resolve(__dirname,"logs","log.txt"), err, (errLogging) => {
      if (errLogging) {
        throw errLogging;
      }
    })
  }
}

module.exports = logger;
