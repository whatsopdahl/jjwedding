const Dao = require('../server/dao')
const dao = new Dao()

if (process.argv[2] === '--help') {
  console.log('USAGE: node cmdDao.js [command] [args...]')
  console.log('COMMANDS')
  Object.getOwnPropertyNames(Object.getPrototypeOf(dao)).forEach(name => {
    if (name !== 'constructor') {
      console.log(`\t${name}`)
    }
  })
  process.exit()
}

const args = process.argv.slice(3, process.argv.length)

let result = dao[process.argv[2]].apply(dao, args)

result.then(res => {
  console.log(JSON.stringify(res, null, 2))
}).catch(err => {
  console.error(err)
})
