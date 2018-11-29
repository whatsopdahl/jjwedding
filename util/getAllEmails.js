const Dao = require('../server/dao')
const dao = new Dao()
const fs = require('fs')

let emails = []
let completed = false

let interval = setInterval(() => {
    checkProgress(completed)
}, 500)

dao.getAllAttending().then(res => {
    res.forEach(party => {
        emails.push(party.email)
    })
    console.log(emails)
    fs.writeFileSync('./emails.json', JSON.stringify(emails, null, 2))
    completed = true
})

function checkProgress(completed) {
    console.log('working...')
    if (completed) {
        return exit()
    }
}

function exit() {
    clearInterval(interval)
    console.log("done")
    process.exit(0)
}