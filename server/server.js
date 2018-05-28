const express = require('express')
const app = express()
const port = 8080
const path = require("path")
const logger = require("./logger.js")
const bodyParser = require("body-parser")
const _ = require('lodash')
const rsvpApi = require('./rsvpApi')
const config = require('../environment.dev')
const dao = require('./dao')()

app.use(express.static(path.resolve(__dirname, "..")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  try {
    logger.logRequest(req)
  } catch (e) {
    console.error(e)
  }
  next()
});


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
      res.status(400).send(err)
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
      res.status(400).send(err)
    })
});


app.listen(port, () => {
  console.log(`Wedding server listening on port ${port}`);
});
