const fs = require('fs');
const path = require('path');

logger = {
  log: function(msg) {
    let message = `${(new Date).toISOString()} [INFO] ${msg}\n`
    fs.writeFile(path.resolve(__dirname,"..","logs","log.txt"), message, (err) => {
      if (err) {
        throw err;
      }
    })
  },
  error: function(err) {
    let message = `${(new Date).toISOString()} [ERROR] ${err}\n`
    fs.writeFile(path.resolve(__dirname,"..","logs","log.txt"), message, (errLogging) => {
      if (errLogging) {
        throw errLogging;
      }
    })
  }
}

module.exports = logger;
