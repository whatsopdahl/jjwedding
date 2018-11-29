const Dao = require('../server/dao')
const dao = new Dao()

let guests = [
    "Joe & Penny Hora",
    "Scott & Lauren Jacobson",
    "Ed Pearsall",
    "Brian & Kathy Wood",
    "Aunt Marlene",
    "Kornowski Family",
    "Steve & Becky Malme"
]
let statuses = []
let completed = 0

let interval = setInterval(() => {
    checkProgress(completed, guests.length)
}, 500)

guests.forEach(guestName => {
    dao.getPartyByName(guestName).then(guestData => {
        if (guestData.length == 0) {
            throw new Error("User not found")
        }
        guest = guestData[0]
        let obj = {}
        obj[guest.name] = guest.rsvped ? guest.attending : 'no response'

        statuses.push(obj)
        completed++
    }).catch(err => {
        console.log(`could not retrieve ${guestName}`)
        completed++
    })
})

function checkProgress(completed, total) {
    if (completed === total) {
        return exit()
    }
}

function exit() {
    clearInterval(interval)
    console.log(JSON.stringify(statuses, null, 2))
    process.exit(0)
}