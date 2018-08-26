const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const app = express()
const path = require("path")
const logger = require("./logger.js")
const bodyParser = require("body-parser")
const _ = require('lodash')
const rsvpApi = require('./rsvpApi')
const Dao = require('./dao')
const dao = new Dao()
const port = 443
/*
const serverOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/jonandjenna12-23-18.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/jonandjenna12-23-18.com/fullchain.pem')
}
/*/
const serverOptions = {
   key: fs.readFileSync(path.resolve('../server.key')),
   cert: fs.readFileSync(path.resolve('../server.crt'))
}

//*/

app.use(express.static(path.resolve(__dirname, "..")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/rsvp/:func", (req, res) => {
  let func = req.params.func
  if (!rsvpApi.post[func]) {
    if (rsvpApi.get[func]) {
      res.header("allow", 'GET')
      res.status(405).jsonp({error: 'POST is not supported'}).send()
    } else {
      res.status(400).jsonp({error: `Unrecognized api call /rsvp/${func}`}).send()
    }
    return
  }
  rsvpApi.post[func].call(dao, req.body)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      logger.error(err)
      res.status(400).send(err.message)
    })
});

app.get("/rsvp/:func", (req, res) => {
  let func = req.params.func
  if (!rsvp.get[func]) {
    if (rsvpApi.post[func]) {
      res.header("allow", 'POST')
      res.status(405).jsonp({error: 'GET is not supported'})
    } else {
      res.status(400).jsonp({error: `Unrecognized api call /rsvp/${func}`})
    }
  }
  rsvpApi.post[func].call(dao, req.params)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      logger.error(err)
      res.status(400).send(err.message)
    })
});


https.createServer(serverOptions, app).listen(port, () => {
  console.log(`Wedding server listening on port ${port}`);
});

const httpApp = express()

httpApp.use((req, res) => {
  res.writeHead(301, {
    Location: `https://${req.hostname}${req.originalUrl}`
  })
  res.end()
})

http.createServer(httpApp).listen(80, () => {
  console.log('listening for redirects on port 80')
})
