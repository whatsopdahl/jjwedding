const Dao = require('../server/dao')
const dao = new Dao()
const newGuests = require('../guestData/guestsRound2_10102018')
const _ = require('lodash')

let completed = 0

let interval = setInterval(() => {
    checkProgress(completed, newGuests.length)
}, 500)

_.forEach(newGuests, guest => {
    dao.savePartyData(guest).then(resp => {
        completed++
        console.log(`${guest.name} data saved`)
    }).catch(err => {
        completed++
        console.error(`Error saving ${guest.name}'s data:`)
        console.error(JSON.stringify(err))
    })
})

function checkProgress(completed, total) {
    if (completed === total) {
        return exit()
    }
}

function exit() {
    clearInterval(interval)
    process.exit(0)
}

